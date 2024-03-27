import { useEffect, useState } from 'react'
import { useTourStore } from '../../store/useTourStore'
import { tourService } from '../../config/service-config'
import { useNavigate } from 'react-router-dom'
import { useTourSettingsStore } from '../../store/useTourSettingsStore'
import { TourModel } from '../../models/TourModel'
import { useTourItemStore } from '../../store/useTourItemStore'

const initialTour = {
  id: '',
  uid: '',
  name: '',
  destination: '',
  image: '',
  duration: 0,
  tourItems: [], 
  commission: 0,
}

const TOUR_NAME_NOT_VALID = 'Tour name field is required.'
const TOUR_DESTINATION_NOT_VALID = 'Destination field is required.'
const TOUR_DURATION_NOT_VALID = 'Duration field is required.'
const TOUR_COMMISSION_NOT_VALID = 'Commission field is required.'
const DEFAULT_VALUE = 'Select option'

const TourForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const tourSettings = useTourSettingsStore((state) => state.settings)
  const tour = useTourStore((state) => state.tour)
  const removeTour = useTourStore((state) => state.deleteTour)
  const addTour = useTourStore((state) => state.addTour)
  const updateTour = useTourStore((state) => state.updateTour)
  const tourItems = useTourItemStore((state) => state.tourItems)

  const [currentTour, setCurrentTour] = useState<TourModel>(tour || initialTour);
  const [isBooked, setIsBooked] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setIsBooked(() => isTourBooked())
  }, [])

  const isTourBooked = () => {
    return currentTour.tourItems.reduce((res, cur) => res += cur.totalAvailability - cur.availability, 0) !== 0
  }

  const handleSave = async () => {
    setIsLoading(true)
    if(validateInput()){
      if (currentTour.id) {
        updateTour(currentTour)
        await tourService.update({ ...currentTour, tourItems: tourItems })
        
      } else {
        const res = await tourService.add(currentTour)
        if (res) {
          currentTour.id = res.id
          currentTour.image = res.image
          addTour(res)
          navigate(`/tours/update/${res.id}`);
        } 
      }
    } else {
      setModalOpen(true)
    }
    setIsLoading(false)
  }

  const handleRemove = async (id: string) => {
    setIsLoading(true)
    await tourService.delete(id)
    removeTour(id)
    setIsLoading(false)
    navigate('/tours')
  }

  const handleReset = () => {
    setCurrentTour(tour || initialTour)
  }

  const validateInput = () => {
    let res = true;
    let errMesseges = []
    if(!currentTour.name){
      errMesseges.push(TOUR_NAME_NOT_VALID)
      res = false
    } if(!currentTour.destination){
      errMesseges.push(TOUR_DESTINATION_NOT_VALID)
      res = false
    } if(!currentTour.duration){
      errMesseges.push(TOUR_DURATION_NOT_VALID)
      res = false
    } if(!currentTour.commission){
      errMesseges.push(TOUR_COMMISSION_NOT_VALID)
      res = false
    } 
    setMessages(errMesseges)
    return res
  }

  const nameHandler = (event: any) => {
    const value = event.target.value
    if (value.length < 30 && /^[a-zA-Z0-9 -]*$/.test(value)){
      const tourCopy = { ...currentTour };
      tourCopy.name = value;
      setCurrentTour(tourCopy)
    }
  }

  const destinationHandler = (event: any) => {
    const value = event.target.value
    if (value.length < 30 && /^[a-zA-Z -]*$/.test(value)){
      const tourCopy = { ...currentTour };
      tourCopy.destination = value;
      setCurrentTour(tourCopy)
    }
  }

  const durationHandler = (event: any) => {
    const tourCopy = { ...currentTour };
    tourCopy.duration = +event.target.value;
    setCurrentTour(tourCopy)
  }

  const imageHandler = (event: any) => {
    const tourCopy = { ...currentTour };
    tourCopy.image = event.target.files?.[0];
    setCurrentTour(tourCopy)
  }

  const commitionHandler = (event: any) => {
    const tourCopy = { ...currentTour };
    tourCopy.commission = +event.target.value;
    setCurrentTour(tourCopy)
  }

  return (
    <div className="col col-lg-5 col-12">
      {
        isLoading
          ? (<div className='container d-flex justify-content-center'>
            <div className="spinner-border text-secondary" role="status"></div>
          </div>)
          : (<div className="container">
            <h6 style={{ fontWeight: 'bold' }}>Tour</h6>
            <div className="row py-4" style={{ background: 'rgb(251, 253, 255)', borderRadius: '15px' }}>
              <div className="col col-3 mt-1">
                <label className="form-label"><span style={{color: 'red'}}>*</span>Name</label>
              </div>
              <div className="col col-9 mb-2">
                <input onChange={nameHandler} type="text" className="form-control" value={currentTour.name} />
              </div>
              <div className="col col-3 mt-1">
                <label className="form-label"><span style={{color: 'red'}}>*</span>Destination</label>
              </div>
              <div className="col col-9 mb-2">
                <input onChange={destinationHandler} type="text" className="form-control" value={currentTour.destination} />
              </div>
              <div className="col col-3 mt-1">
                <label className="form-label"><span style={{color: 'red'}}>*</span>Duration</label>
              </div>
              <div className="col col-9 mb-2">
                <input onKeyDown={(e) => { e.preventDefault() }} onChange={durationHandler} type="number" className="form-control" min={1} max={15} value={currentTour.duration} />
              </div>
              <div className="col col-3 mt-1">
                <label className="form-label">&nbsp;&nbsp;Image</label>
              </div>
              <div className="col col-9 mb-2">
                <input  onChange={imageHandler} type="file" className="form-control" name={'no name'} />
              </div>
              <div className="col col-3 mt-1">
                <label className="form-label"><span style={{color: 'red'}}>*</span>Commission</label>
              </div>
              <div className="col col-9 mb-2">
                <div className="input-group">
                  <select onChange={commitionHandler} className="form-control form-select" aria-label="Default select example" value={currentTour.commission}>
                    <option value={''} >{DEFAULT_VALUE}</option>
                    {
                      tourSettings?.commission.map(e => <option value={e} key={e}>{e}</option>)
                    }
                  </select>
                  <span className="input-group-text" id="basic-addon1">%</span>
                </div>
              </div>
              <div className="col col-4 mt-1 px-2">
                <button 
                  onClick={handleSave} className={`btn ${!!tour ? 'btn-warning' : 'btn-primary'}`} 
                  style={{ width: '100%' }}>
                    {!!tour ? 'Update' : 'Save'}
                  </button>
              </div>
              <div className="col col-4 mt-1 px-2">
                <button 
                  disabled={!tour || isBooked} className='btn btn-outline-danger' 
                  data-bs-toggle="modal" 
                  data-bs-target={`#rm-tour${currentTour.id.substring(0, 5)}`} 
                  style={{ width: '100%' }}>
                    Delete
                </button>
              </div>
              <div className="col col-4 mt-1 px-2">
                <button onClick={handleReset} className='btn btn-outline-secondary' style={{ width: '100%' }}>Reset</button>
              </div>
            </div>
          </div>)
      }

            <div className="modal fade" id={'rm-tour' + currentTour.id.substring(0, 5)} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <p>You are going to delete tour with id {currentTour.id}, all data will be lost</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={() => tour && handleRemove(tour.id)}>Submit</button>
                  </div>
                </div>
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

export default TourForm;
