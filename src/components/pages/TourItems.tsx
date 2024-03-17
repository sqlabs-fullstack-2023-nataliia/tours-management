import { useState } from 'react'
import TourItemRow from '../components/TourItemRow';
import { useTourStore } from '../../store/useTourStore';
import { TourModel } from '../../models/TourModel';

const TourItems = () => {

  const [isLoading, setIsLoading] = useState(false);
  const tours = useTourStore((state) => state.tours)
  const [currentTours, setCurrentTours] = useState<TourModel[]>(tours)

  const handleSort = (filter: string) => {
    // TODO sorting
    const sortedTours = [...tours].sort((a: any, b: any) => a.name.localeCompare(b.name));
    console.log(sortedTours)
    setCurrentTours(sortedTours)
  }

  return (
    <div className="container-fluid">
    <div className="row py-3 mb-2 px-2 mx-4">
      <div onClick={() => handleSort('name')} className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Name</div>
      <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Image</div>
      <div onClick={() => handleSort('destination')} className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Destination</div>
      <div onClick={() => handleSort('duration')} className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Duration</div>
      <div onClick={() => handleSort('departure')} className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Departure</div>
      <div onClick={() => handleSort('status')} className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Status</div>
      <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Availability</div>
    </div>
    <div className='p-4' style={{background: 'white', borderRadius: '15px'}}>
    {
      isLoading 
      ? (<div className='container d-flex justify-content-center'>
          <div className="spinner-border text-secondary" role="status"></div>
        </div>) 
      : (<>
      {
        tours.length === 0 
        ? (<div className='container d-flex justify-content-center'><h2>No Tour items Found</h2></div>) 
        : (<>
           <TourItemRow tours={currentTours} />
          </>
        )
      }
      </>)
    }
    </div>
  </div>
  )
}

export default TourItems
