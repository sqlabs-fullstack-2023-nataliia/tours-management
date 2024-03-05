import { useState } from 'react'
import { TourModel } from '../../models/TourModel'
import toursData from '../../config/tours-data-config.json'

interface Props {
  isUpdate: TourModel | null,
  saveTour: (tour: TourModel) => void,
  removeTour: (id: string) => void
}

const TourForm = ({isUpdate, saveTour, removeTour}: Props) => {

  const [name, setName] = useState(isUpdate?.name || '')
  const [destination, setDestination] = useState(isUpdate?.destination || '')
  const [image, setImage] = useState(isUpdate?.image || '')
  const [duration, setDuration] = useState(isUpdate?.duration || 1)
  const [commission, setCommission] = useState(isUpdate?.commission || 5)

  const handleSave = () => {
    saveTour({
      id: isUpdate?.id || '',
      name: name,
      destination: destination,
      image: image,
      duration: duration,
      tourItems: isUpdate?.tourItems || [],
      commission: commission
    })
  }

  return (
    <div className="col col-lg-5 col-12">
    <div className="container">
      <h6 style={{fontWeight: 'bold'}}>Tour</h6>
      <div className="row py-4" style={{background: 'rgb(251, 253, 255)', borderRadius: '15px'}}>
        <div className="col col-3 mt-1">
          <label className="form-label">Name</label>
        </div>
        <div className="col col-9 mb-2">
          <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" value={name}/>
        </div>
        <div className="col col-3 mt-1">
          <label className="form-label">Destination</label>
        </div>
        <div className="col col-9 mb-2">
          <input onChange={(e) => setDestination(e.target.value)} type="text" className="form-control" value={destination}/>
        </div>
        <div className="col col-3 mt-1">
          <label className="form-label">Duration</label>
        </div>
        <div className="col col-9 mb-2">
          <input onChange={(e) => setDuration(+e.target.value)} type="number" className="form-control" min={1} max={15} value={duration}/>
        </div>
        <div className="col col-3 mt-1">
          <label className="form-label">Image</label>
        </div>
        <div className="col col-9 mb-2">
          <input onChange={(e) => setImage(e.target.files?.[0]?.name ?? '')} type="file" className="form-control"/>
        </div>
        <div className="col col-3 mt-1">
          <label className="form-label">Commission</label>
        </div>
        <div className="col col-9 mb-2">
          <div className="input-group">
            <select onChange={(e) => setCommission(+e.target.value)} className="form-control form-select" aria-label="Default select example">
            {
              toursData.commissionOptions.map(e => <option value={e} key={e}>{e}</option>)
            }
            </select>
            <span className="input-group-text" id="basic-addon1">%</span>
          </div>
        </div>
        <div className="col col-6 mt-1 px-4">
          <button onClick={handleSave} className={`btn ${!!isUpdate ? 'btn-warning' : 'btn-primary'}`} style={{width: '100%'}}>{!!isUpdate ? 'Update' : 'Save'}</button>
        </div>
        <div className="col col-6 mt-1 px-4">
        <button disabled={!isUpdate} onClick={() => isUpdate && removeTour(isUpdate.id)} className='btn btn-outline-danger' style={{width: '100%'}}>Delete</button>
        </div>
      </div>
    </div>
  </div>

  )
}

export default TourForm;

