import {useState} from 'react'
import { BiSearch, BiCurrentLocation } from 'react-icons/bi'

const Inputs = ({setQuery, setUnits}) => {

  const [city, setCity] = useState('')

  const handleSearchClick = () =>{
    if(city !== "") setQuery({q: city});
  };

  const handleLocationClick =() =>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords 
        setQuery({lat: latitude, lon:longitude})
      })
    }
  }

  return (
    <div className='flex flex-row justify-center my-4'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-3'>
            <input type="text" placeholder='Search by City Name...' className='text-black p-[0.30rem] w-full text-sm m-3 rounded-sm shadow-xl capitalize ' value={city} onChange={(e) =>setCity(e.currentTarget.value)}/>

            <BiSearch onClick={handleSearchClick} size={30} className=' transition ease-out cursor-pointer hover:scale-125' />

            <BiCurrentLocation size={30} className='transition ease-out cursor-pointer hover:scale-125' onClick={handleLocationClick}/>
        </div>
        <div className='flex flex-row w-1/4 items-center justify-center'>
        <button className='text-1xl font-medium transition ease-out hover:scale-125' onClick={() =>{setUnits("metric")}}>°C</button> 
        <p className='text-2xl m-1 font-medium'>|</p>
        <button className='text-1xl font-medium transition ease-out hover:scale-125' onClick={() =>{setUnits("imperial")}}>°F</button>
        </div>
    </div>
  )
}

export default Inputs
