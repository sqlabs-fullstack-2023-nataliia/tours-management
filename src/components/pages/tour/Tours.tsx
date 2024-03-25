import TourRow from '../../components/tour/TourRow';
import { useTourStore } from '../../../store/useTourStore';
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { useState } from 'react';
import { TourModel } from '../../../models/TourModel';

const STRING_TYPE = 'string'
const NUMBER_TYPE = 'number'
const DESCENDING_ORDER  = 'descending'
const ASCENDING_ORDER = 'ascending'
const MIN_DATE_VALUE = '2023-12-31'
const MAX_DATE_VALUE = new Date(`${new Date().getFullYear() + 2}-12-31`).toISOString().split("T")[0]

const Tours = () => {

  const [id, setId] = useState('');
  const [date, setDate] = useState('')
  const [days, setDays] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [language, setLanguage] = useState('')
  const [duration, setDuration] = useState('')
  const [destination, setDestination] = useState('')

  const tours = useTourStore((state) => state.tours)
  const [curTours, setCurTours] = useState<TourModel[]>([...tours])

  const handleSort = (filter: string, type: string, order: string) => {
    const sortedTours = type === 'string' 
      ? [...tours].sort((a: any, b: any) => order === ASCENDING_ORDER ? a[filter].localeCompare(b[filter]) : b[filter].localeCompare(a[filter])) 
      : [...tours].sort((a: any, b: any) => order === ASCENDING_ORDER ? +a[filter] - +b[filter] : +b[filter] - +a[filter]);
      
    setCurTours(sortedTours)
  }

  console.log(curTours)

  return (
    <div className="container-fluid">
      <div className="row py-3 mb-2 px-2">
        <div className="col col-3 d-none d-lg-block" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          ID
          <br/>
          <button onClick={() => handleSort('id', STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => handleSort('id', STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        <div className="col col-lg-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          Name
          <br/>
          <button onClick={() => handleSort('name', STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => handleSort('name', STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        <div className="col col-lg-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          Destination
          <br/>
          <button onClick={() => handleSort('destination', STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => handleSort('destination', STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        <div className="col col-lg-1 d-none d-sm-block" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          Duration
          <br/>
          <button onClick={() => handleSort('duration', NUMBER_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => handleSort('duration', NUMBER_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        <div className="col col-lg-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          Commission
          <br/>
          <button onClick={() => handleSort('commission', NUMBER_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => handleSort('commission', NUMBER_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        <div className="col col-lg-1 " style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='d-none d-lg-block'>Details</span></div>
        <div className="col col-lg-1 " style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='d-none d-lg-block'>Edit</span></div>
        <div className="col col-lg-1 " style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='d-none d-lg-block'>Remove</span></div>

      </div>
      <div className='p-2' style={{background: 'white', borderRadius: '15px'}}>
      {
          curTours.length === 0 
          ? (<div className='container d-flex justify-content-center'><h2>No Tours Found</h2></div>) 
          : (
            curTours.map((e, i) => {
              return <TourRow tour={e} index={i + 1} key={e.id}/>
            })
          )
        }
      </div>
    </div>
  )
}

export default Tours

