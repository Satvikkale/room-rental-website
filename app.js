const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Room = require('./models/Room');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Owner = require('./models/Owner');
// const bcrypt = require('bcryptjs');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }))

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/room_rent', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Routes
app.post('/api/addroom', async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).send(room);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).send(rooms);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).send('Room not found');
        }
        res.status(200).send(room);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/api/rooms/:id/availability', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).send('Room not found');
        }
        room.status = req.body.status;
        await room.save();
        res.status(200).send(room);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/api/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).send('Room not found');
        }
        res.status(200).send({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/api/login', async (req, res) => {

    if (req.body.email && req.body.password) {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            res.send(user);
        } else {
            res.send({ result: 'Invalid email or password' });
        }
    } else {
        res.send({ result: 'Enter valid email or password' });
    }
});


app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received signup request:', req.body); // Add logging
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.send('Sign-up successful');
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(400).send('Error signing up');
    }
});

app.post('/api/owner_login', async (req, res) => {

    if (req.body.email && req.body.password) {
        let user = await Owner.findOne({ email: req.body.email })
        if (user) {
            res.send(user);
        } else {
            res.send({ result: 'Invalid email or password' });
        }
    } else {
        res.send({ result: 'Enter valid email or password' });
    }
});


app.post('/api/owner_signup', async (req, res) => {
    const { name, email, password, address, age, mobile } = req.body;
    console.log('Received signup request:', req.body); // Add logging
    try {
        const user = new Owner({ name, email, password, address, age, mobile });
        await user.save();
        res.send('Sign-up successful');
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(400).send('Error signing up');
    }
});

app.get('/api/profile', async (req, res) => {
    const { email, type } = req.query;
    try {
        let user;
        if (type === 'user') {
            user = await User.findOne({ email });
        } else if (type === 'owner') {
            user = await Owner.findOne({ email });
        }
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/api/profile', async (req, res) => {
    const { email, type, profileImage } = req.body;
    try {
        let user;
        if (type === 'user') {
            user = await User.findOneAndUpdate({ email }, { profileImage }, { new: true });
        } else if (type === 'owner') {
            user = await Owner.findOneAndUpdate({ email }, { profileImage }, { new: true });
        }
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/search/:key", async (req, res) => {
    let result = await Room.find(
        {
            "$and": [
                { status: true },
                {
                    "$or": [
                        { price: { $regex: req.params.key, $options: 'i' } },
                        { location: { $regex: req.params.key, $options: 'i' } }
                    ]
                }
            ]
        });

    res.send(result);
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
