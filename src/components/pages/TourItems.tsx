import { useEffect, useState } from 'react'
import TourItemRow from '../components/TourItemRow';
import { useTourStore } from '../../store/useTourStore';
import { TourItemView } from '../../models/TourItemView';

const STRING_TYPE = 'string'
const NUMBER_TYPE = 'number'
const TourItems = () => {
  const tours = useTourStore((state) => state.tours)
  const [tourItemsView, setTourItemsView] = useState<TourItemView[]>([])

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
    console.log(tourItems);
    setTourItemsView(tourItems);
}, []);

// TODO: filters - startind fro date, days, status, duration, language, availability

  const handleSort = (filter: string, type: string) => {
    const sortedTours = type === 'string' 
      ? [...tourItemsView].sort((a: any, b: any) => a[filter].localeCompare(b[filter])) 
      : [...tourItemsView].sort((a: any, b: any) => a[filter] - b[filter]);
    
    setTourItemsView(sortedTours)
  }

  return (
    <div className="container-fluid">
      <h1>TODO: filters - startind fro date, days, status, duration, language, availability</h1>
    <div className="row py-3 mb-2 px-2 mx-1">
      <div onClick={() => handleSort('name', STRING_TYPE)} className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='clickable p-2'>Name</span></div>
      <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Image</div>
      <div onClick={() => handleSort('language', STRING_TYPE)} className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='clickable p-2'>Language</span></div>
      <div onClick={() => handleSort('duration', NUMBER_TYPE)} className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='clickable p-2'>Duration</span></div>
      <div onClick={() => handleSort('destination', STRING_TYPE)} className="col col-2 " style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='clickable p-2'>Destination</span></div>
      <div onClick={() => handleSort('departureDate', STRING_TYPE)} className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='clickable p-2'>Departure</span></div>

      <div onClick={() => handleSort('status', STRING_TYPE)} className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}><span className='clickable p-2'>Status</span></div>
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
