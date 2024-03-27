import TourForm from '../forms/TourForm'
import TourItemForm from '../forms/TourItemForm'
import TourItemsRow from '../components/tour/TourItemsRow'
import { useNavigate } from 'react-router-dom'

const AddTour = () => {

    const navigate = useNavigate()

  return (
    <div className='container mt-4'>
        <div className="row">
            <TourForm />
            <TourItemForm />
        </div>
        <div className="row">
            <div className="container my-3">
                <div className="row">
                    <div className="col col-lg-10 col-8"></div>
                    <div className="col col-lg-2 col-4">
                        <div className="row">
                            <div className="col col-12">
                                <button                   
                                    data-bs-toggle="modal" 
                                    data-bs-target={`#add-tour-exit`} 
                                    className='btn btn-outline-danger' style={{width: '100%'}}>
                                        Exit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <TourItemsRow />
        </div>
        <div className="modal fade" id={'add-tour-exit'} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <h6>Are you sure you want to exit? All data will be lost.</h6>
                    </div>
                    <div className="container pb-3">
                        <div className="row">
                            <div className="col col-6"></div>
                            <div className="col col-3">
                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" style={{width: '100%'}}>Cancel</button>
                            </div>
                            <div className="col col-3">
                                <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={() => navigate('/')} style={{width: '100%'}}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
  )
}

export default AddTour
