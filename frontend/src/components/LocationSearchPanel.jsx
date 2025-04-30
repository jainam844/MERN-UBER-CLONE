import React from 'react'

const locations = [
    '24 B Manek Nagar, Ahmedabad',
    '42 MG Road, Mumbai',
    '18 Rajpath, Delhi'
]

const LocationSearchPanel = (props) => {
    console.log('LocationSearchPanel', props)
    return (
        <div>
            {locations.map((location, index) => (
                <div
                    key={index}
                    onClick={() => props.setVehicalePanel(true)}
                    className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
                >
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                        <i className="ri-map-pin-fill"></i>
                    </h2>
                    <h4 className='font-medium'>{location}</h4>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel
