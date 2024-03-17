import { useEffect, useState } from 'react'
import { useTourStore } from '../../store/useTourStore';
import { useTourSettingsStore } from '../../store/interfaces/useTourSettingsStore';
import { TourItemModel } from '../../models/TourItemModel';
import { tourService } from '../../config/service-config';

const DEFAULT_VALUE = 'Select option'

const AddTourItem = () => {

  const tourSettings = useTourSettingsStore((state) => state.settings)
  const tour = useTourStore((state) => state.tour)
  const tourItem = useTourStore((state) => state.tourItem)
  const updateTour = useTourStore((state) => state.updateTour)
  const tourItems = useTourStore((state) => state.tourItems)

  const addTourItem = useTourStore((state) => state.addTourItem)
  const updateTourItem = useTourStore((state) => state.updateTourItems)
  const setTourItem = useTourStore((state) => state.setTourItem)


  const initialTourItem: TourItemModel = tourItem || {
    id: Date.now().toString(),
    departureDate: new Date().toISOString().split("T")[0],
    language: tourSettings?.languages[0] || '',
    totalAvailability: tourSettings?.availability[0] || 0,
    availability: tourSettings?.availability[0] || 0,
    price: tourSettings?.price[0] || 0,
    status: tourSettings?.status[0] || ''
  }
  // deep copy
  const [currentTourItem, setCurrentTourItem] = useState<TourItemModel>(
    tourItem ? JSON.parse(JSON.stringify(tourItem)) : { ...initialTourItem }
  );

  const handleReset = () => {
    setCurrentTourItem(tourItem ? JSON.parse(JSON.stringify(tourItem)) : { ...initialTourItem })
  }

  useEffect(() => {
    handleReset()
  }, [tourItem])

  const updateCurrentTour = async () => {
    if (tour) {
      updateTour({ ...tour, tourItems: tourItems });
      await tourService.update({ ...tour, tourItems: tourItems })
    }
  }

  useEffect(() => {
    updateCurrentTour()
  }, [tour, tourItems])

  const handleAdd = async () => {
    addTourItem(currentTourItem)
    handleReset()
  }

  const handleUpdate = async () => {
    updateTourItem(currentTourItem)
    setTourItem(null)
  }

  const handleCancel = () => {
    setTourItem(null)
  }

  const departureHandler = (event: any) => {
    const tourItemCopy = { ...currentTourItem };
    tourItemCopy.departureDate = event.target.value;
    setCurrentTourItem(tourItemCopy)
  }

  const languageHandler = (event: any) => {
    const tourItemCopy = { ...currentTourItem };
    tourItemCopy.language = event.target.value;
    setCurrentTourItem(tourItemCopy)
  }

  const availabilityHandler = (event: any) => {
    const tourItemCopy = { ...currentTourItem };
    tourItemCopy.availability = +event.target.value;
    tourItemCopy.totalAvailability = +event.target.value;
    setCurrentTourItem(tourItemCopy)
  }

  const priceHandler = (event: any) => {
    const tourItemCopy = { ...currentTourItem };
    tourItemCopy.price = +event.target.value;
    setCurrentTourItem(tourItemCopy)
  }

  const statusHandler = (event: any) => {
    const tourItemCopy = { ...currentTourItem };
    tourItemCopy.status = event.target.value;
    setCurrentTourItem(tourItemCopy)
  }

  return (
    <div className="col col-lg-7 col-12">
      <div className="container">
        <h6 style={{ fontWeight: 'bold' }}>Tour option</h6>
        <div className="row py-4" style={{ background: 'rgb(251, 253, 255)', borderRadius: '15px' }}>
          <div className="col col-3 mt-1">
            <label htmlFor="exampleFormControlInput1" className="form-label">Departure</label>
          </div>
          <div className="col col-9 mb-2">
            <input
              value={currentTourItem.departureDate || ''}
              onChange={departureHandler}
              type="date"
              className="form-control"
              placeholder=""
              min={new Date().toISOString().split("T")[0]}
              max={new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate()).toISOString().split("T")[0]} />
          </div>
          <div className="col col-3 mt-1">
            <label htmlFor="exampleFormControlInput1" className="form-label">Language</label>
          </div>
          <div className="col col-9 mb-2">
            <select onChange={languageHandler} className="form-select" aria-label="Default select example" value={currentTourItem.language}>
              {
                tourSettings?.languages.map(e => <option value={e} key={e}>{e}</option>)
              }
            </select>
          </div>
          <div className="col col-3 mt-1">
            <label htmlFor="exampleFormControlInput1" className="form-label">Availability</label>
          </div>
          <div className="col col-9 mb-2">
            <select onChange={availabilityHandler} className="form-select" value={currentTourItem.availability}>
              {
                tourSettings?.availability.map(e => <option value={e} key={e}>{e}</option>)
              }
            </select>
          </div>
          <div className="col col-3 mt-1">
            <label htmlFor="exampleFormControlInput1" className="form-label">Price</label>
          </div>
          <div className="col col-9 mb-2">
            <div className="input-group">
              <input onChange={priceHandler} type="number" className="form-control" placeholder="" min={tourSettings?.price[0]} max={tourSettings?.price[1]} step={tourSettings?.price[2]} value={currentTourItem.price || 0} />
              <span className="input-group-text" id="basic-addon1">$</span>
            </div>
          </div>
          <div className="col col-3 mt-1">
            <label className="form-label">Status</label>
          </div>
          <div className="col col-9 mb-2">
            <select onChange={statusHandler} className="form-select" value={currentTourItem.status}>
              {
                tourSettings?.status.map(e => <option value={e} key={e}>{e}</option>)
              }
            </select>
          </div>
          <div className={`col col-${tourItem ? '4' : '6'} mb-1 px-2`}>
            <button disabled={tour === null} onClick={!!tourItem ? handleUpdate : handleAdd} className={`btn ${!!tourItem ? 'btn-warning' : 'btn-success'}`} style={{ width: '100%' }}>{!!tourItem ? 'Update option' : 'Add option'}</button>
          </div>
          <div className={`col col-${tourItem ? '4' : '6'} mb-1 px-2`}>
            <button onClick={handleReset} className='btn btn-outline-secondary' style={{ width: '100%' }}>Reset</button>
          </div>

          {
            tourItem &&
            <div className="col col-4 mb-1 px-2">
              <button onClick={handleCancel} className='btn btn-outline-danger' style={{ width: '100%' }}>Cancel</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default AddTourItem
