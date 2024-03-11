import React, { useEffect, useState } from 'react'
import { tourService } from '../../config/service-config'
import { TourModel } from '../../models/TourModel'

const BookTour = () => {

  const [tours, setTours] = useState<TourModel[]>([])

  const loadData = async () => {
    const data = (await tourService.getAll()).request
    if(data) {
      console.log(data.docs)
      setTours(
        data.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          destination: doc.data().destination, 
          duration: doc.data().duration,
          image: doc.data().image,
          tourItems: doc.data().tourItems
        }))
      );
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="container">
      <div className="row">
        {
          tours.map((e) => {
            return <div className="col col-lg-4 py-3 d-flex justify-content-center" key={e.id}>
            <div className="card" style={{width: '300px'}}>
              <img src={e.image} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <p className="card-text">Destination: {e.destination}</p>
                <p className="card-text">Duration: {e.duration}</p>
                <a href="#" className="btn btn-success">More details</a>
              </div>
            </div>
          </div>
          })
        }

      </div>
    </div>
  )
}

export default BookTour
