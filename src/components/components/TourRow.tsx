import { useState } from 'react'
import { TourModel } from '../../models/TourModel'
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useTourStore } from '../../store/useTourStore';
import { tourService } from '../../config/service-config';
import TourItemRow from './TourItemsRow';


interface Props {
    tour: TourModel
    index: number
}

const TourRow = ({tour, index}: Props) => {

  const [isLoading, setIsLoading] = useState(false)

  const deleteTour = useTourStore((state) => state.deleteTour)
  const setTourItems = useTourStore((state) => state.setTourItems)
  
  const removeTour = async (id: string) => {
    setIsLoading(true)
    await tourService.delete(id)
    deleteTour(id)
    setIsLoading(false)
  }

  return (
    <div className="row" >
      {
        isLoading 
        ? (<div className='container d-flex justify-content-center'>
            <div className="spinner-border text-secondary" role="status"></div>
          </div> ) 
        : (<>
          <div className="col col-1">{index}</div>
            <div className="col col-2">{tour.name}</div>
            <div className="col col-2">{tour.destination}</div>
            <div className="col col-2">{tour.duration} days</div>
            <div className="col col-2">{tour.commission} %</div>
            <div className="col col-1">
              <button onClick={() => setTourItems(tour.tourItems)} className="btn" type="button" data-bs-toggle="collapse" data-bs-target={`#${tour.id}`} aria-expanded="true" aria-controls={tour.id}><MdOutlineRemoveRedEye/></button>
            </div>
            <div className="col col-1">
              <Link to={`add-update/${tour.id}`}>
                <button onClick={() => {}} className='btn'> <TbPencil/></button>
              </Link>
            </div>
            <div className="col col-1">
              <button className='btn' onClick={() => removeTour(tour.id)}><FaRegTrashAlt/></button>
            </div>
            <div className="accordion" id="accordionExample" >
              <div className="accordion-item" style={{background: 'rgb(242, 245, 247)'}}>
                <div id={tour.id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body" >
                  {
                   <TourItemRow viewMode={true}/>
                  }
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


