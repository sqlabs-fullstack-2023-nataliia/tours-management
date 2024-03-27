import { useEffect, useState } from 'react'
import { TourItemModel } from '../../models/TourItemModel'
import { useTourSettingsStore } from '../../store/useTourSettingsStore'
import { useTourItemStore } from '../../store/useTourItemStore'
import { useTourStore } from '../../store/useTourStore'

const initialTourItem: TourItemModel = {
    id: '',
    departureDate: '',
    language: '',
    totalAvailability: 0,
    availability: 0,
    price: 0,
    status: ''
  }
  
  const DEFAULT_VALUE = 'Select option'
  const DEPARTURE_NOT_VALID = 'Departure field is required.'
  const LANGUAGE_NOT_VALID = 'Language field is required.'
  const AVAILABILITY_NOT_VALID = 'Availability field is required.'
  const PRICE_NOT_VALID = 'Price field is required.'
  const STATUS_NOT_VALID = 'Status field is required.'
  
const TourItemForm = () => {

    const tourSettings = useTourSettingsStore((state) => state.settings)
    const tour = useTourStore((state) => state.tour)
    const tourItem = useTourItemStore((state) => state.tourItem)
    const setTourItem = useTourItemStore((state) => state.setTourItem)
    const addTourItem = useTourItemStore((state) => state.addTourItem)
    const updateTourItem = useTourItemStore((state) => state.updateTourItems)
    const [messages, setMessages] = useState<string[]>([])
    const [modalOpen, setModalOpen] = useState(false)

  
    const [currentTourItem, setCurrentTourItem] = useState<TourItemModel>(tourItem || initialTourItem)

    useEffect(() => {
        setCurrentTourItem(tourItem || initialTourItem)
    }, [tourItem])
  
    const handleReset = () => {      
      setCurrentTourItem(tourItem || initialTourItem)
    }
  
    const handleAdd = async () => {
        if(validateInput()){
            addTourItem({...currentTourItem, id: Date.now().toString()})
            handleReset()
        } else {
            setModalOpen(true)
        }
    }
  
    const handleUpdate = async () => {
        if(validateInput()){
            updateTourItem(currentTourItem)
            handleReset()
        } else {
            setModalOpen(true)
        }
    }
  
    const handleCancel = () => {
      setTourItem(null)
      setCurrentTourItem(initialTourItem)
    }
  
    const validateInput = () => {
      let res = true;
      let errMesseges = []
      if(!currentTourItem.departureDate){
        errMesseges.push(DEPARTURE_NOT_VALID)
        res = false
      } if(!currentTourItem.language){
        errMesseges.push(LANGUAGE_NOT_VALID)
        res = false
      } if(!currentTourItem.availability){
        errMesseges.push(AVAILABILITY_NOT_VALID)
        res = false
      } if(!currentTourItem.price){
        errMesseges.push(PRICE_NOT_VALID)
        res = false
      } if(!currentTourItem.status){
        errMesseges.push(STATUS_NOT_VALID)
        res = false
      } 
      setMessages(errMesseges)
      return res
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
          <label htmlFor="exampleFormControlInput1" className="form-label">
            <span style={{color: 'red'}}>*</span>
            Departure
          </label>
        </div>
        <div className="col col-9 mb-2">
          <input
            onKeyDown={(e) => { e.preventDefault() }}
            value={currentTourItem.departureDate || ''}
            onChange={departureHandler}
            type="date"
            className="form-control"
            placeholder=""
            min={new Date().toISOString().split("T")[0]}
            max={new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate()).toISOString().split("T")[0]} />
        </div>
        <div className="col col-3 mt-1">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            <span style={{color: 'red'}}>*</span>
            Language
          </label>
        </div>
        <div className="col col-9 mb-2">
          <select onChange={languageHandler} className="form-select" aria-label="Default select example" value={currentTourItem.language}>
            <option value=''>{DEFAULT_VALUE}</option>
            {
              tourSettings?.languages.map(e => <option value={e} key={e}>{e}</option>)
            }
          </select>
        </div>
        <div className="col col-3 mt-1">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            <span style={{color: 'red'}}>*</span>
            Availability
          </label>
        </div>
        <div className="col col-9 mb-2">
          <select onChange={availabilityHandler} className="form-select" value={currentTourItem.availability}>
            <option value=''>{DEFAULT_VALUE}</option>
            {
              tourSettings?.availability.map(e => <option value={e} key={e}>{e}</option>)
            }
          </select>
        </div>
        <div className="col col-3 mt-1">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            <span style={{color: 'red'}}>*</span>
            Price
          </label>
        </div>
        <div className="col col-9 mb-2">
          <div className="input-group">
            <input onKeyDown={(e) => { e.preventDefault() }} onChange={priceHandler} type="number" className="form-control" placeholder="" min={tourSettings?.price[0]} max={tourSettings?.price[1]} step={tourSettings?.price[2]} value={currentTourItem.price || 0} />
            <span className="input-group-text" id="basic-addon1">$</span>
          </div>
        </div>
        <div className="col col-3 mt-1">
          <label className="form-label">
            <span style={{color: 'red'}}>*</span>
            Status
          </label>
        </div>
        <div className="col col-9 mb-2">
          <select onChange={statusHandler} className="form-select" value={currentTourItem.status}>
            <option value=''>{DEFAULT_VALUE}</option>
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
        {modalOpen && (
            <div className="modal fade show" tabIndex={-1} style={{ display: 'block' }} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h3>Wrong input!</h3>
                                <ul className="list-group list-group-flush">
                                  {
                                    messages.map((e, i) => <li className='list-group-item' style={{border: 'none'}} key={i}>{e}</li>)
                                  }
                                </ul>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col col-8"></div>
                                    <div className="col col-4 pb-3">
                                        <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)} style={{width: '100%'}}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
  </div>
  )
}

export default TourItemForm
