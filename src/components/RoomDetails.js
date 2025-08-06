import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const type = localStorage.getItem('type');

    useEffect(() => {
        const fetchRoomDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/rooms/${id}`);
                setRoom(response.data);
            } catch (error) {
                console.error('Error fetching room details', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!room) {
        return <div>Room not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div class="flow-root mt-10 mb-10">
                <dl class="-my-3 divide-y divide-gray-100 text-sm">

                    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
                        <img src={room.image} alt={room.ownerName} className="w-full h-48 object-cover" />
                        <img src={room.image2} alt={room.ownerName} className="w-full h-48 object-cover" />
                        <img src={room.image3} alt={room.ownerName} className="w-full h-48 object-cover" />
                    </div>

                    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="text-md font-medium text-gray-900">Name</dt>
                        <dd class="text-gray-700 sm:col-span-2">{room.ownerName}</dd>
                    </div>

                    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="text-md font-medium text-gray-900">Price (ruppes)</dt>
                        <dd class="text-gray-700 sm:col-span-2">{room.price}</dd>
                    </div>

                    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="text-md font-medium text-gray-900">mobile Number</dt>
                        <dd class="text-gray-700 sm:col-span-2">{room.mobileNumber}</dd>
                    </div>
                    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="text-md font-medium text-gray-900">Address</dt>
                        <dd class="text-gray-700 sm:col-span-2">{room.location}</dd>
                    </div>
                    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="text-md font-medium text-gray-900">Location Link</dt>
                        <dd class="text-gray-700 sm:col-span-2">
                            <a href={room.address} target="_blank" rel="noopener noreferrer">
                                {room.address.length > 25 ? `${room.address.substring(0, 25)}...` : room.address}
                            </a> (Click on link for location)</dd>
                    </div>

                    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="text-md font-medium text-gray-900">Description</dt>
                        <dd class="text-gray-700 sm:col-span-2">{room.discription}</dd>
                    </div>
                    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="text-md font-medium text-gray-900">Facilities</dt>
                        <dd class="text-gray-700 sm:col-span-2">{room.facilities}</dd>
                    </div>
                    {/* {(type === 'user') && <a href={`tel:${room.mobileNumber}`} className="w-full mt-2 px-2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-500 ease-in-out transform hover:scale-105 text-center block">
                        📞 call now or send message on whatsapp
                    </a>} */}

                    {(type === 'user') && <button
                        class="mt-5 w-full font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                        type="submit"
                    >
                        <a href={`tel:${room.mobileNumber}`} >
                            📞 call now or send message on whatsapp
                        </a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 19"
                            class="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                        >
                            <path
                                class="fill-gray-800 group-hover:fill-gray-800"
                                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                            ></path>
                        </svg>
                    </button>}

                </dl>
            </div>
        </div>






    );
};

export default RoomDetails;