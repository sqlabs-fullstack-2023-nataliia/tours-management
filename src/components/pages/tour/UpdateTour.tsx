import { useEffect, useState } from 'react'
import TourForm from '../../forms/TourForm'
import TourItemsRow from '../../components/tour/TourItemsRow'
import { TourModel } from '../../../models/TourModel'
import { tourService } from '../../../config/service-config'
import { useNavigate, useParams } from 'react-router-dom'
import { useTourStore } from '../../../store/useTourStore'
import { useTourItemStore } from '../../../store/useTourItemStore'
import TourItemForm from '../../forms/TourItemForm'
import NotFoundPage from '../NotFoundPage'

const AddTour = () => {

  const { tourId } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [isTour, setIsTour] = useState(false)
  const navigate = useNavigate()

  const setTour = useTourStore((state) => state.setTour)
  const setTourItems = useTourItemStore((state) => state.setTourItems)

  useEffect(() => {
 
    (async () => {
      setIsLoading(true)
      const tourToUpdate = tourId && (await tourService.get(tourId)).data() as TourModel;
      if (tourToUpdate) {

        setIsTour(true)
        setTour(tourToUpdate)
        setTourItems(tourToUpdate.tourItems)
      } 
      setIsLoading(false)
    })();
  }, [tourId]);

  const handleNewTour = () => {
    setIsTour(false)
    setTour(null)
    setTourItems([])
    navigate('/tours/add')
  }

  return (
    <div className='container mt-4'>
      {
        isLoading ? (
          <div className='container d-flex justify-content-center'>
            <div className="spinner-border text-secondary" role="status"></div>
          </div>
        )
        : (
          <>
            {
              isTour 
              ? (
                <>
                  <div className="row">
                    <TourForm />
                    <TourItemForm />
                  </div>
                  <div className="row">
                    <div className="container my-3">
                      <div className="row">
                        <div className="col col-lg-8 col-6"></div>
                        <div className="col col-lg-4 col-6">
                          <div className="row">
                            <div className="col col-6">
                              <button onClick={handleNewTour} className='btn btn-outline-success' style={{width: '100%'}}>New Tour</button>
                            </div>
                            <div className="col col-6">
                              <button className='btn btn-outline-danger'              
                                data-bs-toggle="modal" 
                                data-bs-target={`#update-tour-exit`} 
                                style={{width: '100%'}}>
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
                  <div className="row my-5">
                    <div className="col col-lg-9 col-md-8 col-6"></div>
                    <div className="col col-lg-3 col-md-4 col-6">
                  </div>
                </div>
              </>
              ) 
              : (<NotFoundPage/>)
            }
          </>
        )
      }
      <div className="modal fade" id={'update-tour-exit'} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
