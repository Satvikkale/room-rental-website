import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
    const navigate = useNavigate();

    const [roomDetails, setRoomDetails] = useState({
        image: '',
        image2: '',
        image3: '',
        ownerName: '',
        price: '',
        mobileNumber: '',
        location: '',
        address: '',
        facilities: '',
        discription: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails({
            ...roomDetails,
            [name]: value
        });
    };

    const handleImageChange = async (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        
        if (!file) return;
        
        console.log(`Processing ${name}:`, file.name); // Debug log
        
        try {
            const base64 = await convertToBase64(file);
            setRoomDetails(prevState => ({
                ...prevState,
                [name]: base64
            }));
            console.log(`${name} converted to base64`); // Debug log
        } catch (error) {
            console.error(`Error converting ${name}:`, error);
            alert(`Error uploading ${name}`);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!roomDetails.ownerName || !roomDetails.price || !roomDetails.location) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (!roomDetails.image) {
            alert('Please upload at least the first image');
            return;
        }
        
        const roomData = {
            image: roomDetails.image,
            image2: roomDetails.image2 || '', // Ensure empty string if no image
            image3: roomDetails.image3 || '', // Ensure empty string if no image
            status: true,
            ownerName: roomDetails.ownerName,
            price: roomDetails.price,
            mobileNumber: roomDetails.mobileNumber,
            location: roomDetails.location,
            address: roomDetails.address,
            facilities: roomDetails.facilities,
            discription: roomDetails.discription
        };

        console.log('Submitting room with images:', {
            hasImage: !!roomData.image,
            hasImage2: !!roomData.image2,
            hasImage3: !!roomData.image3
        }); // Debug log

        try {
            const response = await axios.post('https://backend-fswr.onrender.com/api/addroom', roomData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                alert('Room added successfully with all images');
                navigate('/');
            } else {
                alert('Fill all the fields to add room');
            }
        } catch (error) {
            console.error('Error adding room:', error);
            alert('Error adding room');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <form onSubmit={handleSubmit} className="w-full max-w-xl p-8 space-y-6 mb-[100px] bg-white rounded shadow-md mt-5">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Upload Room Image 1 (Required) *
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                    {roomDetails.image && <p className="text-green-600 text-sm mt-1">✓ Image 1 uploaded</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image2">
                        Upload Room Image 2 (Optional)
                    </label>
                    <input
                        type="file"
                        id="image2"
                        name="image2"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    {roomDetails.image2 && <p className="text-green-600 text-sm mt-1">✓ Image 2 uploaded</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image3">
                        Upload Room Image 3 (Optional)
                    </label>
                    <input
                        type="file"
                        id="image3"
                        name="image3"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    {roomDetails.image3 && <p className="text-green-600 text-sm mt-1">✓ Image 3 uploaded</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ownerName">
                        Room Owner Name
                    </label>
                    <input
                        placeholder='ex: John Doe'
                        type="text"
                        id="ownerName"
                        name="ownerName"
                        value={roomDetails.ownerName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price
                    </label>
                    <input
                        placeholder='ex: 2000'
                        type="text"
                        id="price"
                        name="price"
                        value={roomDetails.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                        Mobile Number
                    </label>
                    <input
                        placeholder='ex: 1234567890'
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={roomDetails.mobileNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                        Location
                    </label>
                    <input
                        placeholder='ex: plot_no.123,street name,city name'
                        type="text"
                        id="location"
                        name="location"
                        value={roomDetails.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address Link (Google Maps Link)
                    </label>
                    <input
                        placeholder='ex: https://google/maps/1q2w3e4r5t6y7u8i9o'
                        type="text"
                        id="address"
                        name="address"
                        value={roomDetails.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facilities">
                        Facilities
                    </label>
                    <textarea
                        placeholder='ex: 24/7 water supply, 24/7 electricity supply, Wifi connection'
                        type="text"
                        id="facilities"
                        name="facilities"
                        value={roomDetails.facilities}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discription">
                        Description
                    </label>
                    <textarea
                        placeholder='ex: For boys only, 2 sharing room with attached bathroom'
                        type="text"
                        id="discription"
                        name="discription"
                        value={roomDetails.discription}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    Add Room
                </button>
            </form>
        </div>
    );
};

export default AddRoom;
