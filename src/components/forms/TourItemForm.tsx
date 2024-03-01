import React, { useState } from 'react'
import toursData from '../../config/tours-data-config.json'

// interface Props {
//   tour: TourModel
// }

const AddTourItem = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [language, setlanguage] = useState('');
  const [totalAvailability, setTotalAvailability] = useState(0);
  const [price, setPrice] = useState(0)


  const handleAdd = () => {
    console.log(departureDate)
    console.log(language)
    console.log(totalAvailability)
    resetForm()
  }

  const handleReset = () => {
    resetForm()
  }

  const resetForm = () => {
    setDepartureDate('')
    setlanguage('')
    setTotalAvailability(0)
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
                <label htmlFor="exampleFormControlInput1" className="form-label">Deparcher date</label>
                <input 
                  onChange={(e) => setDepartureDate(e.target.value)} 
                  type="date" 
                  className="form-control" 
                  placeholder="" 
                  min={new Date().toISOString().split("T")[0]} 
                  max={new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate()).toISOString().split("T")[0]}/>
              </div>
            </div>
            <div className="col col-lg-4 col-md-5 col-12">
              <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Language</label>
              <select onChange={(e) => setlanguage(e.target.value)} className="form-select" aria-label="Default select example">
                {
                  toursData.languages.map(e => <option value={e} key={e}>{e}</option>)
                }
              </select>
              </div>
            </div>
            <div className="col col-lg-2 col-md-1 col-0"></div>

            <div className="col col-lg-2 col-md-1 col-0"></div>
            <div className="col col-lg-4 col-md-5 col-12">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Total Availability</label>
                <select onChange={(e) => setTotalAvailability(+e.target.value)} className="form-select" aria-label="Default select example">
                {
                  toursData.availability.map(e => <option value={e} key={e}>{e}</option>)
                }
              </select>
              </div>
            </div>
            <div className="col col-lg-4 col-md-5 col-12">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Price $</label>
                <input onChange={(e) => setPrice(+e.target.value)} type="number" className="form-control" placeholder="" min={700} max={2500} step={50}/>
              </div>
            </div>
            <div className="col ccol-lg-2 col-md-1 col-0"></div>

            
          </div>

          <div className="row pt-3">
            <div className="col col-md-3 col-2"></div>
            <div className="col col-md-3 col-8">
              <div className="mb-3">
                <button onClick={handleAdd} type="button" className="btn btn-success " style={{width: '100%'}}>Add tour item</button>
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

export default AddTourItem
