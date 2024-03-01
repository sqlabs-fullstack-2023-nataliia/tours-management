import React, { useState } from 'react'
import { tourService } from '../../config/service-config'

const AddTour = () => {
  
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [destination, setDestination] = useState('')
  const [image, setImage] = useState('')
  const [duration, setDuration] = useState(0)
  const [description, setDescription] = useState([])

  const handleAdd = async () => {
    console.log('add')
    setIsLoading(true)
    console.log('add')
    await tourService.add({
      // TODO no need here id
      id: '',
      name: name,
      destination: destination,
      image: image,
      duration: duration,
      tourItems: []
    })
    resetTour()
    setIsLoading(false)
  }

  const handleReset = () => {
    resetTour()
  }

  const resetTour = () => {
    setName(''),
    setDestination('')
    setImage('')
  }


  return (
    <div className='container mt-4'>
    <h1 className='d-flex justify-content-center'>Add tour</h1>
    {
      isLoading ? (
      <div className='container d-flex justify-content-center'>
        <div className="spinner-border text-secondary" role="status"></div>
      </div>
      ) 
      : (
        <>
          <div className="row">
            <div className="col col-lg-2 col-md-1 col-0"></div>
            <div className="col col-lg-4 col-md-5 col-12">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                <input onChange={(e) => setName(e.target.value)} type="email" className="form-control" placeholder=""/>
              </div>
            </div>
            <div className="col col-lg-4 col-md-5 col-12">
              <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Destination</label>
                <input onChange={(e) => setDestination(e.target.value)} type="email" className="form-control" placeholder=""/>
              </div>
            </div>
            <div className="col col-lg-2 col-md-1 col-0"></div>

            <div className="col col-lg-2 col-md-1 col-0"></div>
            <div className="col col-lg-4 col-md-5 col-12">
              <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Duration</label>
                <input onChange={(e) => setDuration(+e.target.value)} type="number" className="form-control" placeholder="" min={1} max={15}/>
              </div>
            </div>
            <div className="col col-lg-4 col-md-5 col-12">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Load image</label>
                <input onChange={(e) => setImage(e.target.value)} type="file" className="form-control" placeholder="" min={1}/>
              </div>
            </div>
            <div className="col ccol-lg-2 col-md-1 col-0"></div>
          </div>

          <div className="row pt-3">
            <div className="col col-md-3 col-2"></div>
            <div className="col col-md-3 col-8">
              <div className="mb-3">
                <button onClick={handleAdd} type="button" className="btn btn-success " style={{width: '100%'}}>Add tour</button>
              </div>
            </div>
            <div className="col col-md-3 col-8">
              <div className="mb-3">
                <button onClick={handleReset} type="button" className="btn btn-outline-secondary" style={{width: '100%'}}>Reset</button>
              </div>
            </div>
            <div className="col col-md-3 col-2"></div>
          </div>
        </>
      )
    }
  </div>
  )
}

export default AddTour
