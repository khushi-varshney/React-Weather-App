import { useEffect, useState } from 'react'
import TopButtons from './Components/TopButtons'
import Inputs from './Components/Inputs'
import TimeandLocation from './Components/TimeandLocation'
import Forecast from './Components/Forecast'
import TempratureandDetails from './Components/TempratureandDetails'
import getFormattedWeatherData from './services/weatherServices'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const App = () => {

  const [query, setQuery] = useState({q: 'bareilly'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  const getWeather = async() =>{

    const message = query.q ? query.q : 'current location';
    toast.info(`Fetching Weather data for ${message.toUpperCase()}`)

    const data = await getFormattedWeatherData({ ...query, units}).then( data => {
      toast.success(`Fetched Weather Data for ${data.name}, ${data.country}`)
      setWeather(data)
    })
    console.log(data)
  }

  useEffect(()=>{getWeather();}, [query, units])

  const formatBackground = () =>{
    if(!weather) return 'from-cyan-600 t0-blue-700';
    const threshold = units === 'metric' ? 20:60
    if(weather.temp<=threshold) return 'from-cyan-600 to-blue-700'
    return 'from-yellow-600 to-orange-600'
  }

  return (
    <div className={`mx-auto max-w-screen-lg mt-2 py-5 px-3 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      { weather && (
        <>
           <TimeandLocation weather={weather}/>
           <TempratureandDetails weather={weather} units={units}/>
           <Forecast title='3 hour step forecast' data={weather.hourly}/>
           <Forecast title='daily forecast' data={weather.daily}/>
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme='colored' />
    </div>
  )
}

export default App
