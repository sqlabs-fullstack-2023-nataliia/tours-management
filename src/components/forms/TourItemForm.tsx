import React, { useEffect, useState } from 'react'
import toursData from '../../config/tours-data-config.json'
import { TourItemModel } from '../../models/TourItemModel';
import { TourModel } from '../../models/TourModel';

interface Props {
  tour: TourModel | null,
  isUpdate: TourItemModel | null
  addTourItem: (tourItem: TourItemModel) => void
  updateTourItem: (tourItem: TourItemModel | null) => void
}

const AddTourItem = ({addTourItem, isUpdate, updateTourItem, tour}: Props) => {

  console.log(isUpdate)

  const [departureDate, setDepartureDate] = useState(isUpdate?.departureDate || '');
  const [language, setlanguage] = useState(isUpdate?.language || toursData.languages[0]);
  const [totalAvailability, setTotalAvailability] = useState(isUpdate?.totalAvailability || 0);
  const [price, setPrice] = useState(isUpdate?.price || 0);
  const [status, setStatus] = useState(isUpdate?.status || toursData.status[0])

  const handleReset = () => {
   console.log(' handle reset')
    setDepartureDate(isUpdate?.departureDate || '')
    setlanguage(isUpdate?.language || toursData.languages[0])
    setTotalAvailability(isUpdate?.totalAvailability || 0)
    setPrice(isUpdate?.price || 0)
    setStatus(isUpdate?.status || toursData.status[0])
  }

  useEffect(() => {
    handleReset()
  }, [isUpdate])

  const handleAdd = () => {
    addTourItem({
      id: Date.now().toString(),
      departureDate: departureDate,
      language: language,
      totalAvailability: totalAvailability,
      availability: totalAvailability,
      price: price,
      status: status
    })
    handleReset()
  }

  const handleUpdate = () => {
    updateTourItem({
        id: isUpdate?.id || '',
        departureDate: departureDate,
        language: language,
        totalAvailability: totalAvailability,
        availability: totalAvailability,
        price: price,
        status: status
      })
  }

  const handleCancel = () => {
    updateTourItem(null)
  }

  return (
    <div className="col col-lg-7 col-12">
    <div className="container">
    <h6 style={{fontWeight: 'bold'}}>Tour option</h6>
      <div className="row py-4" style={{background: 'rgb(251, 253, 255)', borderRadius: '15px'}}>
        <div className="col col-3 mt-1">
        <label htmlFor="exampleFormControlInput1" className="form-label">Deparcher</label>
        </div>
        <div className="col col-9 mb-2">
      <input 
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)} 
        type="date" 
        className="form-control" 
        placeholder="" 
        min={new Date().toISOString().split("T")[0]} 
        max={new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate()).toISOString().split("T")[0]}/>
        </div>
        <div className="col col-3 mt-1">
        <label htmlFor="exampleFormControlInput1" className="form-label">Language</label>
        </div>
        <div className="col col-9 mb-2">
          <select onChange={(e) => setlanguage(e.target.value)} className="form-select" aria-label="Default select example" value={language}>
      {
        toursData.languages.map(e => <option value={e} key={e}>{e}</option>)
      }
        </select>
        </div>
        <div className="col col-3 mt-1">
        <label htmlFor="exampleFormControlInput1" className="form-label">Availability</label>
        </div>
        <div className="col col-9 mb-2">
          <select onChange={(e) => setTotalAvailability(+e.target.value)} className="form-select" aria-label="Default select example" value={totalAvailability}>
          {
            toursData.availability.map(e => <option value={e} key={e}>{e}</option>)
          }
          </select>
        </div>
        <div className="col col-3 mt-1">
          <label htmlFor="exampleFormControlInput1" className="form-label">Price</label>
        </div>
        <div className="col col-9 mb-2">
          <div className="input-group">
            <input onChange={(e) => setPrice(+e.target.value)} type="number" className="form-control" placeholder="" min={700} max={2500} step={50} value={price}/>
            <span className="input-group-text" id="basic-addon1">$</span>
          </div>
        </div>
        <div className="col col-3 mt-1">
          <label className="form-label">Status</label>
        </div>
        <div className="col col-9 mb-2">
        <select onChange={(e) => setStatus(e.target.value)} className="form-select" value={status}>
        {
          toursData.status.map(e => <option value={e} key={e}>{e}</option>)
        }
        </select>
        </div>
        <div className={`col col-${isUpdate ? '4' : '6'} mb-1 px-2`}>
          <button disabled={tour === null} onClick={!!isUpdate ? handleUpdate : handleAdd} className={`btn ${!!isUpdate ? 'btn-warning' : 'btn-success'}`} style={{width: '100%'}}>{!!isUpdate ? 'Update option' : 'Add option'}</button>
        </div>
        <div className={`col col-${isUpdate ? '4' : '6'} mb-1 px-2`}>
        <button onClick={handleReset} className='btn btn-outline-secondary' style={{width: '100%'}}>Reset</button>
        </div>

        {
          isUpdate && 
          <div className="col col-4 mb-1 px-2">
            <button onClick={handleCancel} className='btn btn-outline-danger' style={{width: '100%'}}>Cancel</button>
          </div>
        }

      </div>
    </div>
  </div>
  )
}

export default AddTourItem
