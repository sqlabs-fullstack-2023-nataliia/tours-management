import TourRow from '../../components/tour/TourRow';
import { useTourStore } from '../../../store/useTourStore';
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { useEffect, useState } from 'react';
import { TourModel } from '../../../models/TourModel';

const STRING_TYPE = 'string'
const NUMBER_TYPE = 'number'
const DESCENDING_ORDER  = 'descending'
const ASCENDING_ORDER = 'ascending'

const Tours = () => {

  const tours = useTourStore((state) => state.tours)
  const [initialTours, setInitialTours] = useState<TourModel[]>([...tours])
  const [sort, setSort] = useState<string[]>([])

  const [id, setId] = useState('');
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')
  const [destination, setDestination] = useState('')

  useEffect(() => {
    setInitialTours(tours)
    if(sort.length === 3){
      handleSort(sort)
    }
  }, [tours])

  useEffect(() => {
    if(sort.length === 3){
      handleSort(sort)
    }
  }, [sort])

  const handleSort = ([filter, type, order]: string[]) => {
    let sortedTours: TourModel[] = []
    if(filter === 'tourItems') {
      sortedTours = [...initialTours].sort((a: any, b: any) => order === ASCENDING_ORDER ? +a[filter].length - +b[filter].length : +b[filter].length - +a[filter].length);
    } else {
      sortedTours = type === 'string' 
      ? [...initialTours].sort((a: any, b: any) => order === ASCENDING_ORDER ? a[filter].localeCompare(b[filter]) : b[filter].localeCompare(a[filter])) 
      : [...initialTours].sort((a: any, b: any) => order === ASCENDING_ORDER ? +a[filter] - +b[filter] : +b[filter] - +a[filter]);
      
    }

    setInitialTours(sortedTours)
  }

  const handleFilters = () => {
    let curTourItems: TourModel[] = [...tours]
    if(name) curTourItems = curTourItems.filter(e => e.name.toLocaleLowerCase().includes(name.trim().toLocaleLowerCase()))
    if(duration) curTourItems = curTourItems.filter(e => e.duration === +duration)
    if(destination) curTourItems = curTourItems.filter(e => e.destination.toLowerCase() === destination.trim().toLowerCase())
    setInitialTours([...curTourItems])
  }
  
  const handleResetFilters = () => {
    setId('')
    setName('')
    setDuration('')
    setDestination('')
    setInitialTours([...tours])
    setSort([])
  }

  return (
    <div className="container-fluid">
      <div className="container-fluid my-4 py-2" style={{background: 'white', borderRadius: '15px'}}>
      <div className="row mx-2 px-1">
          <div className="col col-lg-9 col-md-6 col-12">
            <h2 style={{color: 'rgb(44, 48, 53)'}}>TOURS</h2>
          </div>
          <div className="col col-lg-1 col-md-2 col-12">
          <label className="form-label" style={{ fontWeight: 'bold' }}>Tour ID</label>
          </div>
          <div className="col col-lg-2 col-md-4 col-12">
            <input onChange={(e) => setId(e.target.value)} type="text" className="form-control" value={id} />
          </div>
        </div>
        <div className="row m-2 p-1" >
        <div className="col col-lg-1 col-md-2 col-12 mb-2 mb-lg-0">
            <label className="form-label" style={{ fontWeight: 'bold' }}>Name</label>
          </div>
          <div className="col col-lg-2 col-md-4 col-12 mb-2 mb-lg-0">
            <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" value={name} />
          </div>
          <div className="col col-lg-1 col-md-2 col-12 mb-2 mb-lg-0">
            <label className="form-label" style={{ fontWeight: 'bold' }}>Duration</label>
          </div>
          <div className="col col-lg-2 col-md-4 col-12 mb-2 mb-lg-0">
            <input onChange={(e) => setDuration(e.target.value)} type="text" className="form-control" value={duration} />
          </div>
          <div className="col col-lg-1 col-md-2 col-12 mb-2 mb-lg-0">
            <label className="form-label" style={{ fontWeight: 'bold' }}>Destination</label>
          </div>
          <div className="col col-lg-2 col-md-4 col-12 mb-2 mb-lg-0">
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
      <div className="row py-3 mb-2 px-2">
        <div className="col col-3 d-none d-lg-block" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          ID
          <br/>
          <button onClick={() => setSort(['id', STRING_TYPE, ASCENDING_ORDER])} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => setSort(['id', STRING_TYPE, DESCENDING_ORDER])} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        <div className="col col-xl-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          Name
          <br/>
          <button onClick={() => setSort(['name', STRING_TYPE, ASCENDING_ORDER])} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => setSort(['name', STRING_TYPE, DESCENDING_ORDER])} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        <div className="col col-xl-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          Destination
          <br/>
          <button onClick={() => setSort(['destination', STRING_TYPE, ASCENDING_ORDER])} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => setSort(['destination', STRING_TYPE, DESCENDING_ORDER])} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        <div className="col col-xl-1 d-none d-sm-block" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          Duration
          <br/>
          <button onClick={() => setSort(['duration', NUMBER_TYPE, ASCENDING_ORDER])} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => setSort(['duration', NUMBER_TYPE, DESCENDING_ORDER])} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        <div className="col col-xl-1 " style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          Commission
          <br/>
          <button onClick={() => setSort(['commission', NUMBER_TYPE, ASCENDING_ORDER])} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => setSort(['commission', NUMBER_TYPE, DESCENDING_ORDER])} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        <div className="col col-xl-1 d-none d-xl-block" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
          Items
          <br/>
          <button onClick={() => setSort(['tourItems', NUMBER_TYPE, ASCENDING_ORDER])} className='btn p-0'><IoIosArrowRoundUp/></button>
          <button onClick={() => setSort(['tourItems', NUMBER_TYPE, DESCENDING_ORDER])} className='btn p-0'><IoIosArrowRoundDown/></button>
        </div>
        
        <div className="col col-lg-1 " style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='d-none d-lg-block'>Image</span></div>
        <div className="col col-lg-1 " style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='d-none d-lg-block'>Details</span></div>
        <div className="col col-lg-1 " style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='d-none d-lg-block'>Edit</span></div>
        <div className="col col-lg-1 " style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='d-none d-lg-block'>Remove</span></div>

      </div>
      <div className='p-2' style={{background: 'white', borderRadius: '15px'}}>
      {
          initialTours.length === 0 
          ? (<div className='container d-flex justify-content-center'><h2>No Tours Found</h2></div>) 
          : (
            initialTours.map((e) => {
              return <TourRow tour={e} key={e.id}/>
            })
          )
        }
      </div>
    </div>
  )
}

export default Tours

