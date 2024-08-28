import React from 'react'

const TimeandLocation = ({weather: {formattedLocalTime, name, country}}) => {
  return (
    <div>
      <div className="flex items-center justify-center my-2">
        <p className='text-lg font-extralight'>
          
          {formattedLocalTime}
        </p>
      </div>
      <div className='flex items-center justify-center'>
        <p className='text-xl font-medium'>{`${name}, ${country}`}</p>
      </div>
    </div>
  )
}

export default TimeandLocation
