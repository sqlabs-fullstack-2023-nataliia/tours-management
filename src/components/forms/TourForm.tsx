import { useState } from 'react'
import { useTourStore } from '../../store/useTourStore'
import { tourService } from '../../config/service-config'
import { useNavigate } from 'react-router-dom'
import { useTourSettingsStore } from '../../store/interfaces/useTourSettingsStore'
import { TourModel } from '../../models/TourModel'
import { auth } from '../../services/firebaseConfig'


const TourForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const tourSettings = useTourSettingsStore((state) => state.settings)
  const tour = useTourStore((state) => state.tour)
  const removeTour = useTourStore((state) => state.deleteTour)
  const addTour = useTourStore((state) => state.addTour)
  const updateTour = useTourStore((state) => state.updateTour)

  const initialTour: TourModel = tour || {
    id: '', 
    uid: auth.currentUser?.uid || '',
    name: '',
    destination: '',
    image: '',
    duration: 0,
    tourItems: [],
    commission: 0,
    
  }
  // deep copy
  const [currentTour, setCurrentTour] = useState<TourModel>(
    tour ? JSON.parse(JSON.stringify(tour)) : { ...initialTour }
  );

  const handleSave = async () => {
    setIsLoading(true)
    if(currentTour.id){
      updateTour(currentTour)
      await tourService.update(currentTour)
    } else {
      const id = await tourService.add(currentTour)
      currentTour.id = id
      addTour(currentTour)
      navigate(`/tours/add-update/${id}`);
    }
    setIsLoading(false)
  }

  const nameHandler = (event: any) => {
    console.log(event.target.value)
    const tourCopy = {...currentTour};
    tourCopy.name = event.target.value;
    setCurrentTour(tourCopy)
  }

  const destinationHandler = (event: any) => {
    const tourCopy = {...currentTour};
    tourCopy.destination = event.target.value;
    setCurrentTour(tourCopy)
  }

  const durationHandler = (event: any) => {
    const tourCopy = {...currentTour};
    tourCopy.duration = +event.target.value;
    setCurrentTour(tourCopy)
  }

  const imageHandler = (event: any) => {
    const tourCopy = {...currentTour};
    tourCopy.name = event.target.files?.[0];
    setCurrentTour(tourCopy)
  }

  const commitionHandler = (event: any) => {
    const tourCopy = {...currentTour};
    tourCopy.commission = +event.target.value;
    setCurrentTour(tourCopy)
  }

  const handleRemove = async (id: string) => {
    setIsLoading(true)
    await tourService.delete(id)
    removeTour(id)
    setIsLoading(false)
  }

  return (
    <div className="col col-lg-5 col-12">
    {
      isLoading 
      ? (<div className='container d-flex justify-content-center'>
        <div className="spinner-border text-secondary" role="status"></div>
        </div>) 
      : (<div className="container">
        <h6 style={{fontWeight: 'bold'}}>Tour</h6>
        <div className="row py-4" style={{background: 'rgb(251, 253, 255)', borderRadius: '15px'}}>
        <div className="col col-3 mt-1">
          <label className="form-label">Name</label>
        </div>
        <div className="col col-9 mb-2">
          <input onChange={nameHandler} type="text" className="form-control" value={currentTour.name}/>
        </div>
        <div className="col col-3 mt-1">
          <label className="form-label">Destination</label>
        </div>
        <div className="col col-9 mb-2">
          <input onChange={destinationHandler} type="text" className="form-control" value={currentTour.destination}/>
        </div>
        <div className="col col-3 mt-1">
          <label className="form-label">Duration</label>
        </div>
        <div className="col col-9 mb-2">
          <input onChange={durationHandler} type="number" className="form-control" min={1} max={15} value={currentTour.duration}/>
        </div>
        <div className="col col-3 mt-1">
          <label className="form-label">Image</label>
        </div>
        <div className="col col-9 mb-2">
          <input onChange={imageHandler} type="file" className="form-control" name={currentTour.image}/>
        </div>
        <div className="col col-3 mt-1">
          <label className="form-label">Commission</label>
        </div>
        <div className="col col-9 mb-2">
          <div className="input-group">
            <select onChange={commitionHandler} className="form-control form-select" aria-label="Default select example" value={currentTour.commission}>
            {
              tourSettings?.commission.map(e => <option value={e} key={e}>{e}</option>)
            }
            </select>
            <span className="input-group-text" id="basic-addon1">%</span>
          </div>
        </div>
        <div className="col col-6 mt-1 px-4">
          <button onClick={handleSave} className={`btn ${!!tour ? 'btn-warning' : 'btn-primary'}`} style={{width: '100%'}}>{!!tour ? 'Update' : 'Save'}</button>
        </div>
        <div className="col col-6 mt-1 px-4">
        <button disabled={!tour} onClick={() => tour && handleRemove(tour.id)} className='btn btn-outline-danger' style={{width: '100%'}}>Delete</button>
        </div>
      </div>
    </div>)
    }
    </div>

  )
}

export default TourForm;

