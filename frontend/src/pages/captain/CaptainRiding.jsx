import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../../components/captainComponents/FinishRide '
import LiveTracking from '../../components/LiveTracking'
const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (
        <div className='relative h-screen w-screen overflow-hidden'>
        {/* Map behind everything */}
        <div className='absolute inset-0 z-0'>
            <LiveTracking />
        </div>

        {/* Top Nav */}
        <div className='fixed p-4 top-0 left-0 right-0 z-10 flex items-center justify-between bg-transparent'>
            <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" />
            <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md'>
                <i className="text-lg font-medium ri-logout-box-r-line"></i>
            </Link>
        </div>

        {/* Ride Info Bar */}
        <div
            className='fixed bottom-0 left-0 right-0 z-20 bg-yellow-400 p-6 pt-10 flex items-center justify-between'
            onClick={() => setFinishRidePanel(true)}
        >
            <h5 className='absolute top-1 left-1/2 -translate-x-1/2'>
                <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
            </h5>
            <h4 className='text-xl font-semibold'>{'4 KM away'}</h4>
            <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>
                Complete Ride
            </button>
        </div>

        {/* Slide-up Finish Ride Panel */}
        <div
            ref={finishRidePanelRef}
            className='fixed bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-lg px-3 py-10 pt-12 translate-y-full'
            style={{ height: '65vh' }}
        >
            <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
        </div>
    </div>
    )
}

export default CaptainRiding