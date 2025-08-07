import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const type = localStorage.getItem('type');
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://backend-fswr.onrender.com/api/rooms');
                setRooms(response.data);
                if (type === 'user') {
                    const filteredRooms = response.data.filter(room => room.status === true);
                    setRooms(filteredRooms);
                } else {
                    setRooms(response.data);
                }
            } catch (error) {
                console.error('Error fetching rooms', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [type]);

    const searchhandle = async (e) => {
        let key = e.target.value;
        setLoading(true);
        if (key) {
            try {
                const response = await axios.get(`https://backend-fswr.onrender.com/search/${key}`);
                const filteredRooms = response.data.filter(room => room.status === true);
                setRooms(filteredRooms);
            } catch (error) {
                console.error('Error searching rooms', error);
            } finally {
                setLoading(false);
            }
        } else {
            const fetchRooms = async () => {
                try {
                    const response = await axios.get('https://backend-fswr.onrender.com/api/rooms');
                    const filteredRooms = response.data.filter(room => room.status === true);
                    setRooms(filteredRooms);
                } catch (error) {
                    console.error('Error fetching rooms', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchRooms();
        }
    };

    const handleReadMore = (roomId) => {
        navigate(`/roomdetails/${roomId}`);
    };

    const handleDeleteRoom = async (roomId) => {
        try {
            await axios.delete(`https://backend-fswr.onrender.com/api/rooms/${roomId}`);
            setRooms(rooms.filter(room => room._id !== roomId));
            alert('Room deleted successfully');
        } catch (error) {
            console.error('Error deleting room', error);
            alert('Failed to delete room');
        }
    };

    return (
        <div className="container mx-auto p-2 mb-[100px]">
            <div className="my-4 flex items-center">
                <h1 className="text-xl font-bold">
                    👋 Welcome, {user?.name}
                </h1>
            </div>

            {/* hero section */}

            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                        <div>
                            <div className="max-w-lg md:max-w-none">
                                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                                    Find Your Perfect Space, Anytime, Anywhere
                                </h2>
                                <p className="mt-4 text-gray-700">
                                    Explore affordable, fully-furnished rooms for rent tailored to your lifestyle. Whether you're a student, professional, or traveler, your next home is just a click away.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img
                                src="https://imgs.search.brave.com/DnEv79TGr4BmlQQFYvx20yiDEP6cCH2vrhORcbaDCLA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAz/MjYyODc4Ni9waG90/by9yZWFsLXBob3Rv/LW9mLWJyaWdodC1u/b3JkaWMtc3R5bGUt/bGl2aW5nLXJvb20t/aW50ZXJpb3Itd2l0/aC1mcmVzaC1wbGFu/dHMtd2hpdGUtY3Vw/Ym9hcmQuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXNkNUhJ/Q09iOWZZaThqNXBR/VjZDVVdHTmNJcFJP/eXhwUzZuTFdRYVhH/QTA9"
                                className="rounded"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* close hero section */}

            {/* search bar */}
            < div className='my-8' >
                <div className="relative justify-center flex">
                    <input type="text" onChange={searchhandle} placeholder="🔍 Enter location, price, name" className="w-[90%] p-2 border border-indigo-900 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300 ease-in-out transform hover:scale-105" />
                </div>
            </div >

            {/* .card  */}
            {
                loading ? (
                    <div className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-400" >
                        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-400">
                            <svg
                                viewBox="0 0 16 20"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            >
                                <path
                                    d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
                                ></path>
                                <path
                                    d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"
                                ></path>
                            </svg>
                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {rooms.length > 0 ? rooms.map(room => (
                            <div key={room._id} className="block rounded-lg p-5 shadow-lg shadow-indigo-100 transition duration-500 ease-in-out transform hover:scale-105 block border-2 border-black bg-white hover:bg-gray-50">
                                <img src={room.image} alt={room.ownerName} className="h-56 w-full rounded-md object-cover" />
                                <div className="p-4">
                                    {type === 'owner' && (
                                        <span className={`text-sm font-semibold ${room.isAvailable ? 'text-red-500' : 'text-green-500'}`}>
                                            {room.status ? 'Available' : 'Non-Available'}
                                        </span>
                                    )}
                                    <div className="mt-2">
                                        <dl>
                                            <div>
                                                <dt className="sr-only">Price</dt>
                                                <dd className="text-sm text-gray-500">{room.price}</dd>
                                            </div>

                                            <div>
                                                <dt className="sr-only">Address</dt>
                                                <dd className="font-medium">{room.location}</dd>
                                            </div>
                                            <div className="flex justify-between mt-4">
                                                <button
                                                    type="submit"
                                                    onClick={() => handleReadMore(room._id)}
                                                    className="flex justify-center gap-1 items-center mx-auto shadow-xl text-md bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                                                >
                                                    Read more
                                                    <svg
                                                        className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                                                        viewBox="0 0 16 19"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                                            className="fill-gray-800 group-hover:fill-gray-800"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            {(type === 'owner') && (
                                                    <button
                                                        className="mt-2 px-2 py-1 w-full rounded bg-red-500 hover:bg-red-700 text-white transition duration-300 ease-in-out transform hover:scale-105"
                                                        onClick={() => handleDeleteRoom(room._id)}
                                                    >
                                                        
                                                    Delete
                                                    </button>
                                                )}
                                            {(type === 'owner') && (
                                                <div className="flex justify-between mt-2">
                                                    <button
                                                        className={`px-2 py-1 w-full rounded ${room.status ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white transition duration-300 ease-in-out transform hover:scale-105`}
                                                        onClick={async () => {
                                                            try {
                                                                const updatedRoom = { ...room, status: !room.status };
                                                                await axios.put(`${process.env.REACT_APP_API_URL}/api/rooms/${room._id}/availability`, { status: updatedRoom.status });
                                                                setRooms(rooms.map(r => r._id === room._id ? updatedRoom : r));
                                                            } catch (error) {
                                                                console.error('Error updating room availability', error);
                                                            }
                                                        }}
                                                    >
                                                        {room.status ? 'Mark Not Available' : 'Mark Available'}
                                                    </button>
                                                    
                                                </div>
                                            )}
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        ))
                            : 
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <svg
                                    className="w-24 h-24 text-gray-400 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M21 12A9 9 0 1 1 3 12A9 9 0 0 1 21 12Z"
                                    ></path>
                                </svg>
                                <p className="text-gray-500 text-lg">No rooms available</p>
                            </div>
                            
                            
                            }
                    </div>
                )}
        </div >
    );
};

export default Home;
