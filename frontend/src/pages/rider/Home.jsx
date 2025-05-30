import React, { use, useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../../components/riderComponents/LocationSearchPanel';
import VehiclePanel from '../../components/riderComponents/VehiclePanel';
import ConfirmRide from '../../components/riderComponents/ConfirmRide';
import WaitingForDriver from '../../components/riderComponents/WaitingForDriver';
import LookingForDriver from '../../components/riderComponents/LookingForDriver';
import axios from 'axios';
import apiRoutes from '../../services/apiRoutes';
import { SocketContext } from '../../context/SocketContext';
import { UserDataContext } from '../../context/UserDataContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../../components/LiveTracking';

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehicalePanel, setVehicalePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  const [ride, setRide] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  useGSAP(() => {
    if (panelOpen) {
      // Animate input panel up
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
        duration: 0.5,
        ease: 'power2.out'
      });

      // Show close button
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.3
      });

      // Move the map down
      gsap.to(mapRef.current, {
        y: 200, // or whatever value fits visually
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      // Animate input panel down
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });

      // Hide close button
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.3
      });

      // Move the map back to normal
      gsap.to(mapRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }
  }, [panelOpen]);


  useGSAP(function () {
    if (vehicalePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicalePanel])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  const submitHanldler = async (e) => {
    e.preventDefault()
  }

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(apiRoutes.getMapSuggestions, {
        params: { text: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }

      })
      const suggestions = response.data.map((item) => item.name);
      setPickupSuggestions(suggestions)
    } catch (error) {
      console.error('Error fetching pickup suggestions:', error);
      // handle error
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(apiRoutes.getMapSuggestions, {
        params: { text: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const suggestions = response.data.map((item) => item.name);
      setDestinationSuggestions(suggestions)
    } catch (error) {
      console.error('Error fetching destination suggestions:', error);
      // handle error

    }
  }

  async function findTrip() {
    setVehicalePanel(true)
    setPanelOpen(false)

    const response = await axios.get(apiRoutes.getRide, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data)
  }

  async function createRide() {
    await axios.post(apiRoutes.createRide, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
  useEffect(() => {
    const handleRideConfirmed = (ride) => {
      setVehicleFound(false);
      setWaitingForDriver(true);
      setRide(ride);
    };

    socket.on('ride-confirmed', handleRideConfirmed);

    return () => {
      socket.off('ride-confirmed', handleRideConfirmed); // cleanup
    };
  }, [socket]);

  useEffect(() => {
    const handleRideStrated = (ride) => {
      setWaitingForDriver(false);
      navigate('/riding', { state: { ride } })
    };
    socket.on('ride-started', handleRideStrated);
    return () => {
      socket.off('ride-started', handleRideStrated);
    };
  })
  const mapRef = useRef(null);

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div ref={mapRef} className='h-screen w-screen relative z-0'>
        <LiveTracking />
      </div>

      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div ref={panelRef} className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form className='relative py-3' onSubmit={submitHanldler}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => { setPanelOpen(true), setActiveField('pickup') }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
              type="text"
              placeholder='Add a pick-up location'
            />
            <input
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
              type="text"
              placeholder='Enter your destination' />
          </form>
          <button onClick={findTrip} className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>
        <div className='bg-white h-0' ref={panelRef} >
          <LocationSearchPanel suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehicalePanel={setVehicalePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12'>
        <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehicalePanel={setVehicalePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12'>
        <ConfirmRide
          createRide={createRide}
          vehicleType={vehicleType}
          fare={fare}
          pickup={pickup}
          destination={destination}
          setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12'>
        <LookingForDriver createRide={createRide}
          vehicleType={vehicleType}
          fare={fare}
          pickup={pickup}
          destination={destination} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
        <WaitingForDriver ride={ride} setWaitingForDriver={setWaitingForDriver} setVehicleFound={setVehicleFound}
          waitingForDriver={waitingForDriver} />
      </div>
    </div>
  )
}

export default Home