import { useGSAP } from '@gsap/react'
import React, { use, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../../components/captainComponents/CaptainDetails'
import ConfirmRidePopUp from '../../components/captainComponents/ConfirmRidePopUp'
import gsap from 'gsap';
import RidePopUp from '../../components/captainComponents/RidePopup'
import { SocketContext } from '../../context/SocketContext'
import { CaptainDataContext } from '../../context/CaptainDataContext'
import axios from 'axios'
import apiRoutes from '../../services/apiRoutes'

const CaptainHome = () => {

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const [ride, setRide] = useState(null);
    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        if (!socket) return;

        socket.emit('join', {
            userId: captain._id,
            userType: 'captain',
        });

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                    });
                });
            }
        };

        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation();

        const handleNewRide = (data) => {
            console.log("Received ride:", data);
            setRide(data); // Set ride to show it in popup
            setRidePopupPanel(true); // Open the popup
        };

        socket.on('new-ride', handleNewRide);

        return () => {
            clearInterval(locationInterval);
            socket.off('new-ride', handleNewRide); // Cleanup on unmount
        };
    }, [socket, captain]);

    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopupPanel])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel])


    async function comfirmRide() {
        await axios.post(apiRoutes.confirmRide, {
            rideId: ride._id,
            captainId: captain._id,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)
    }
    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12'>
                <RidePopUp ride={ride} comfirmRide={comfirmRide} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0  bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}
                />
            </div>
        </div>
    )
}

export default CaptainHome