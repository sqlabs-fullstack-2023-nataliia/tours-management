import React, { useEffect, useState } from 'react'

import { tourService } from '../../config/service-config';
import { TourModel } from '../../models/TourModel';
import TourItem from '../components/TourRow';

const Tours = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [tours, setTours] = useState<TourModel[]>([])

  const loadData = async () => {
    setIsLoading(true)
    const data = (await tourService.getAll()).request
    if(!data.empty) {
      // console.log(data.docs)
      setTours(
        data.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          destination: doc.data().destination, 
          duration: doc.data().duration,
          image: doc.data().image,
          commission: doc.data().commission,
          tourItems: doc.data().tourItems
        }))
      );
    }
    setIsLoading(false)
  }

  const removeTour = async (id: string) => {
    setIsLoading(true)
    await tourService.delete(id)
    setIsLoading(false)
    loadData()
  }

  const updateTour = () => {

  }

  useEffect(() => {
    loadData()
  }, [])





  return (
    <div className="container-fluid">
      <div className="row py-3 mb-2 px-2">
        <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>#</div>
        <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Name</div>
        <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Destination</div>
        <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Duration</div>
        <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Commition</div>
        <div className="col col-3"></div>
      </div>
      <div className='p-2' style={{background: 'white'}}>
      {
        isLoading 
        ? (<div className='container d-flex justify-content-center'>
            <div className="spinner-border text-secondary" role="status"></div>
          </div>) 
        : (<>
        {
          tours.length === 0 
          ? (<div className='container d-flex justify-content-center'><h2>No Tours Found</h2></div>) 
          : (
            tours.map((e, i) => {
              return <TourItem tour={e} index={i + 1} key={e.id} removeTour={removeTour}/>
            })
          )
        }
        </>)
      }
      </div>
    </div>
  )
}

export default Tours

