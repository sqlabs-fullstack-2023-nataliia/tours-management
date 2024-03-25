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
  const [tourItems, setTourItems] = useState<TourItemView[]>([])
  const [initialTourItems, setInitialTourItems] = useState<TourItemView[]>([])

  const [id, setId] = useState('');
  const [date, setDate] = useState('')
  const [days, setDays] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [language, setLanguage] = useState('')
  const [duration, setDuration] = useState('')
  const [destination, setDestination] = useState('')

  useEffect(() => {
    const curTourItems: TourItemView[] = tours.flatMap((tour) => tour.tourItems.map(tourItem => ({
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
    setTourItems(curTourItems);
    setInitialTourItems(curTourItems)
}, []);

const handleFilters = () => {
  //setTourItems([...initialTourItems])
  let curTourItems: TourItemView[] = [...initialTourItems]
  if(id) curTourItems = curTourItems.filter(e => e.id.includes(id.trim()))
  if(language) curTourItems = curTourItems.filter(e => e.language === language)
  if(name) curTourItems = curTourItems.filter(e => e.name.toLocaleLowerCase().includes(name.trim().toLocaleLowerCase()))
  if(status) curTourItems = curTourItems.filter(e => e.status === status)
  if(duration) curTourItems = curTourItems.filter(e => e.duration === +duration)
  if(destination) curTourItems = curTourItems.filter(e => e.destination === destination)
  if(date) curTourItems = curTourItems = curTourItems.filter(e => new Date(e.departureDate) >= new Date(date))
  if(days && date) {
    const dateInput = new Date(date)
    const toDate = new Date(dateInput.getFullYear(), dateInput.getMonth() , dateInput.getDate() + +days).toISOString().split("T")[0];
    curTourItems = curTourItems.filter(e => new Date(e.departureDate) <= new Date(toDate));
  }
  setTourItems([...curTourItems])
}

const handleResetFilters = () => {
  setId('')
  setDate('')
  setDays('')
  setName('')
  setStatus('')
  setLanguage('')
  setDuration('')
  setDestination('')
  setTourItems([...initialTourItems])
}

const handleSort = (filter: string, type: string, order: string) => {
  const sortedTours = type === 'string' 
    ? [...tourItems].sort((a: any, b: any) => order === ASCENDING_ORDER ? a[filter].localeCompare(b[filter]) : b[filter].localeCompare(a[filter])) 
    : [...tourItems].sort((a: any, b: any) => order === ASCENDING_ORDER ? +a[filter] - +b[filter] : +b[filter] - +a[filter]);
    
  setTourItems(sortedTours)
}

  return (
    <div className="container-fluid">
      <div className="container-fluid mb-4 py-2" style={{background: 'white', borderRadius: '15px'}}>
      <div className="row mx-2 px-1">
          <div className="col col-lg-9">
            <h2 style={{color: 'rgb(44, 48, 53)'}}>TOURS</h2>
          </div>
          <div className="col col-lg-1">
          <label className="form-label" style={{ fontWeight: 'bold' }}>Tour ID</label>
            {/* <button onClick={handleSearchById} className='btn btn-success' style={{width: '100%'}}>Search</button> */}
          </div>
          <div className="col col-lg-2">
            <input onChange={(e) => setId(e.target.value)} type="text" className="form-control" value={id} />
          </div>
        </div>
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
            <input onChange={(e) => setDays(e.target.value)} type="text" className="form-control" value={days} />
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
              <option value={status} >{status}</option>
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
            <select onChange={(e) => setLanguage(e.target.value)} className="form-select" value={language}>
              <option value={language} >{language}</option>
              {
                settings?.languages.map(e => <option value={e} key={e}>{e}</option>)
              }
            </select>
          </div>
          <div className="col col-lg-1">
            <label className="form-label" style={{ fontWeight: 'bold' }}>Duration</label>
          </div>
          <div className="col col-lg-2">
            <input onChange={(e) => setDuration(e.target.value)} type="text" className="form-control" value={duration} />
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
                <button onClick={handleFilters} className='btn btn-primary p-1 mx-2' style={{width: '100%'}}>Search</button>
              </div>
              <div className="col col-lg-6">
                <button onClick={handleResetFilters} className='btn btn-outline-secondary p-1 mx-2' style={{width: '100%'}}>Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-2 px-2 mx-1">
        <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          ID
          <br/>
          <button onClick={() => handleSort('id', NUMBER_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => handleSort('id', NUMBER_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          Name
          <br/>
          <button onClick={() => handleSort('name', STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => handleSort('name', STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Image</div>
        <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
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
        <div className="col col-1 " style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
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
          <TourItemRow tourItemsView={tourItems} />
        </>
        )
      }
    </div>
  </div>
  )
}

export default TourItems
