import React, { useEffect, useState } from 'react'
import TourItemRow from '../components/TourItemRow';
import { useTourStore } from '../../store/useTourStore';
import { TourItemModel } from '../../models/TourItemModel';

const TourItems = () => {

  const [isLoading, setIsLoading] = useState(false);
  const tours = useTourStore((state) => state.tours)

  return (
    <div className="container-fluid">
    <div className="row py-3 mb-2 px-2 mx-4">
      <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Name</div>
      <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Image</div>
      <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Destination</div>
      <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Duration</div>
      <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Departure</div>
      <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Status</div>
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
           <TourItemRow tours={tours} />
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
