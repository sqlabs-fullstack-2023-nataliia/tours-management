import { useEffect, useState } from 'react'
import { TourModel } from '../../../models/TourModel'
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useTourStore } from '../../../store/useTourStore';
import { tourService } from '../../../config/service-config';
import TourItemsRow from './TourItemsRow';
import { useTourItemStore } from '../../../store/useTourItemStore';
import tourData from '../../../config/tours-data-config.json'


interface Props {
    tour: TourModel
}

const TourRow = ({tour}: Props) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  const deleteTour = useTourStore((state) => state.deleteTour)
  const setTourItems = useTourItemStore((state) => state.setTourItems)
  
  useEffect(() => {
    setIsBooked(() => isTourBooked())
  }, [])

  const removeTour = async (id: string) => {
    setIsLoading(true)
    await tourService.delete(id)
    deleteTour(id)
    setIsLoading(false)
  }

  const isTourBooked = () => {
    return tour.tourItems.reduce((res, cur) => res += cur.totalAvailability - cur.availability, 0) !== 0
  }

  return (
    <div className="row">
      {
        isLoading 
        ? (<div className='container d-flex justify-content-center'>
            <div className="spinner-border text-secondary" role="status"></div>
          </div> ) 
        : (<>
          <div className="col col-3 d-none d-lg-block">{tour.id}</div>
            <div className="col col-xl-1">{tour.name}</div>
            <div className="col col-xl-1">{tour.destination}</div>
            <div className="col col-xl-1 d-none d-sm-block">{tour.duration} days</div>
            <div className="col col-xl-1">{tour.commission} %</div>
            <div className="col col-xl-1 d-none d-xl-block">{tour.tourItems.length}</div>
            <div className='col col-lg-1 d-none d-md-block' >
              <button type="button" className="btn" data-bs-toggle="modal" data-bs-target={`#${tour.id.substring(0, 5)}`}>
                <FaRegImage/>
              </button>
            </div>
            <div className="col col-lg-1 d-none d-md-block">
              <button 
                onClick={() => setTourItems(tour.tourItems)} 
                className="btn" type="button" data-bs-toggle="collapse" 
                data-bs-target={`#${tour.id}`} aria-expanded="true" 
                aria-controls={tour.id}>
                  <MdOutlineRemoveRedEye/>
              </button>
            </div>
            <div className="col col-lg-1 ">
              <Link to={`add-update/${tour.id}`}>
                <button onClick={() => {}} className='btn'> <TbPencil/></button>
              </Link>
            </div>
            <div className="col col-lg-1">
              <button 
                disabled={isBooked}
                style={isBooked ? { border: 'none' } : {}}
                type="button" className="btn" data-bs-toggle="modal" 
                data-bs-target={`#rm${tour.id.substring(0, 5)}`} >
                  <FaRegTrashAlt/>
              </button>
            </div>
            <div className="accordion" id="accordionExample" >
              <div className="accordion-item" style={{background: 'rgb(242, 245, 247)', borderRadius: '15px'}}>
                <div id={tour.id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body" >
                  {
                   <TourItemsRow viewMode={true} tourItemsView={tour.tourItems}/>
                  }
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" id={tour.id.substring(0, 5)} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{tour.name}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="" style={{color: 'rgb(44, 48, 53)'}}>
                      <img src={tour.image || tourData.noImageFile} rel='image' style={{ width: '100%', height: '300px' }}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" id={'rm' + tour.id.substring(0, 5)} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <h6>You are going to delete tour with id {tour.id}, all data will be lost</h6>
                  </div>
                  <div className="container">
                    <div className="row pb-2">
                    <div className="col col-6"></div>
                      <div className="col col-3">
                      <button type="button" 
                        className="btn btn-outline-secondary" data-bs-dismiss="modal" 
                        style={{width: '100%'}}>
                          Close
                      </button>
                      </div>
                      <div className="col col-3">
                      <button type="button" 
                        className="btn btn-outline-primary" data-bs-dismiss="modal" 
                        onClick={() => removeTour(tour.id)} style={{width: '100%'}}>
                          Submit
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </>)
        }
         

    </div>
  )
}

 export default TourRow


