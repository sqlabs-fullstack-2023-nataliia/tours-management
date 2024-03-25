import { useEffect, useState } from 'react'
import TourItemRow from '../../components/tour/TourItemRow';
import { useTourStore } from '../../../store/useTourStore';
import { TourItemView } from '../../../models/TourItemView';
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { useTourSettingsStore } from '../../../store/useTourSettingsStore';

const STRING_TYPE = 'string'
const NUMBER_TYPE = 'number'
const DESCENDING_ORDER  = 'descending'
const ASCENDING_ORDER = 'ascending'
const MIN_DATE_VALUE = '2023-12-31'
const MAX_DATE_VALUE = new Date(`${new Date().getFullYear() + 2}-12-31`).toISOString().split("T")[0]

const TourItems = () => {

  const tours = useTourStore((state) => state.tours)
  const settings = useTourSettingsStore((state) => state.settings)
  const [tourItemsView, setTourItemsView] = useState<TourItemView[]>([])

  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [days, setDays] = useState(7)
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [language, setLanguage] = useState('')
  const [duration, setDuration] = useState(1)
  const [destination, setDestination] = useState('')

  useEffect(() => {
    const tourItems: TourItemView[] = tours.flatMap((tour) => tour.tourItems.map(tourItem => ({
        id: tourItem.id,
        name: tour.name,
        image: tour.image,
        destination: tour.destination,
        language: tourItem.language,
        duration: tour.duration,
        departureDate: tourItem.departureDate,
        status: tourItem.status,
        totalAvailability: tourItem.totalAvailability,
        availability: tourItem.availability,
    })));
    setTourItemsView(tourItems);
}, []);

// TODO: filters - startind fro date, days, status, duration, language, availability

  const handleSort = (filter: string, type: string, order: string) => {
    const sortedTours = type === 'string' 
      ? [...tourItemsView].sort((a: any, b: any) => order === ASCENDING_ORDER ? a[filter].localeCompare(b[filter]) : b[filter].localeCompare(a[filter])) 
      : [...tourItemsView].sort((a: any, b: any) => order === ASCENDING_ORDER ? a[filter] - b[filter] : b[filter] - a[filter]);
    
    setTourItemsView(sortedTours)
  }

  return (
    <div className="container-fluid">
      <div className="container-fluid my-4 py-2" style={{background: 'white', borderRadius: '15px'}}>
      <div className="row m-2 p-1">
        <div className="col col-lg-1">
          <label className="form-label" style={{ fontWeight: 'bold' }}>From</label>
        </div>
        <div className="col col-lg-2">
          <input
            onKeyDown={(e) => { e.preventDefault() }}
            onChange={(e) => setDate(e.target.value)}
            min={MIN_DATE_VALUE}
            max={MAX_DATE_VALUE}
            type="date"
            className="form-control"
            value={date} />
        </div>
        <div className="col col-lg-1">
          <label className="form-label" style={{ fontWeight: 'bold' }}>Days</label>
        </div>
        <div className="col col-lg-2">
          <input onChange={(e) => setDays(+e.target.value)} type="text" className="form-control" value={days} />
        </div>
        <div className="col col-lg-1">
          <label className="form-label" style={{ fontWeight: 'bold' }}>Name</label>
        </div>
        <div className="col col-lg-2">
          <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" value={name} />
        </div>
        <div className="col col-lg-1">
          <label className="form-label" style={{ fontWeight: 'bold' }}>Status</label>
        </div>
        <div className="col col-lg-2">
          <select onChange={(e) => setStatus(e.target.value)} className="form-select" value={status}>
            {
              settings?.status.map(e => <option value={e} key={e}>{e}</option>)
            }
          </select>
        </div>
      </div>
      <div className="row m-2 p-1" >
        <div className="col col-lg-1">
          <label className="form-label" style={{ fontWeight: 'bold' }}>Language</label>
        </div>
        <div className="col col-lg-2">
          <select onChange={(e) => setStatus(e.target.value)} className="form-select" value={status}>
            {
              settings?.languages.map(e => <option value={e} key={e}>{e}</option>)
            }
          </select>
        </div>
        <div className="col col-lg-1">
          <label className="form-label" style={{ fontWeight: 'bold' }}>Duration</label>
        </div>
        <div className="col col-lg-2">
          <input onChange={(e) => setDuration(+e.target.value)} type="text" className="form-control" value={duration} />
        </div>
        <div className="col col-lg-1">
          <label className="form-label" style={{ fontWeight: 'bold' }}>Destination</label>
        </div>
        <div className="col col-lg-2">
          <input onChange={(e) => setDestination(e.target.value)} type="text" className="form-control" value={destination} />
        </div>
        <div className="col col-lg-3">
          <div className="row">
            <div className="col col-lg-6">
              <button className='btn btn-primary p-1 mx-2' style={{width: '100%'}}>Search</button>
            </div>
            <div className="col col-lg-6">
              <button className='btn btn-outline-secondary p-1 mx-2' style={{width: '100%'}}>Reset</button>
            </div>
          </div>
        </div>
      </div>
      </div>


    <div className="row mb-2 px-2 mx-1">
      <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
        Name
        <br/>
        <button onClick={() => handleSort('name', STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleSort('name', STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Image</div>
      <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
        Language
        <br/>
        <button onClick={() => handleSort('language', STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleSort('language', STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
        Duration
        <br/>
        <button onClick={() => handleSort('duration', NUMBER_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleSort('duration', NUMBER_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col col-2 " style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
        Destination
        <br/>
        <button onClick={() => handleSort('destination', STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleSort('destination', STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
        Departure
        <br/>
        <button onClick={() => handleSort('departureDate', STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleSort('departureDate', STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>

      <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
        Status
        <br/>
        <button onClick={() => handleSort('status', STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleSort('status', STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Availability</div>
    </div>
    <div className='p-4' style={{background: 'white', borderRadius: '15px'}}>
    {
      tours.length === 0 
      ? (<div className='container d-flex justify-content-center'><h2>No Tour items Found</h2></div>) 
      : (<>
        <TourItemRow tourItemsView={tourItemsView} />
        </>
      )
    }
    </div>
  </div>
  )
}

export default TourItems
