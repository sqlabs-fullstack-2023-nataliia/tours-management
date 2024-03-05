import React, { useState } from 'react'
import { TourModel } from '../../models/TourModel'
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { tourService } from '../../config/service-config';
import TourForm from '../forms/TourForm';

interface Props {
    tour: TourModel
    index: number
    removeTour: (id: string) => void,
    //updateTour: () => void
}
const TourItem = ({tour, index, removeTour}: Props) => {


  const handleUpdate = async () => {

  }



  return (
    <div className="row" >
      <div className="col col-1">{index}</div>
      <div className="col col-2">{tour.name}</div>
      <div className="col col-2">{tour.destination}</div>
      <div className="col col-2">{tour.duration} days</div>
      <div className="col col-2">{tour.commission} days</div>

      <div className="col col-1">
        <button onClick={() => {}} className='btn'><TbPencil/></button>
      </div>
      <div className="col col-1">
        <button className='btn' onClick={() => removeTour(tour.id)}><FaRegTrashAlt/></button>
      </div>
      <div className="col col-1">
        <button className=" btn" type="button" data-bs-toggle="collapse" data-bs-target={`#${tour.id}`} aria-expanded="true" aria-controls={tour.id}><MdOutlineRemoveRedEye/></button>
      </div>
      <div className="accordion" id="accordionExample" >
        <div className="accordion-item" style={{background: 'rgb(242, 245, 247)'}}>
          <div id={tour.id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body" >
             <ul>
             {
                tour.tourItems.map((tourItem, i) => {
                  return <>
                  <li key={tour.id + i}>{tourItem.departureDate} {tourItem.status}</li>
                  </>
                })
              }
             </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

 export default TourItem

// interface Props {
//   tour: TourModel
//   index: number
// }
// const TourItem = ({tour, index}: Props) => {

// return (
//   <div className="row" >
//   <div className="col col-1">{index}</div>
//     <div className="col col-3">{tour.name}</div>
//     <div className="col col-3">{tour.destination}</div>
//     <div className="col col-2">{tour.duration} days</div>
//     <div className="col col-1">
//       <button className='btn'><TbPencil/></button>
//     </div>
//     <div className="col col-1">
//       <button className='btn'><FaRegTrashAlt/></button>
//     </div>
//     <div className="col col-1">
//       <button className=" btn" type="button" data-bs-toggle="collapse" data-bs-target={`#${tour.id}`} aria-expanded="true" aria-controls={tour.id}><MdOutlineRemoveRedEye/></button>
//     </div>
//     <div className="accordion" id="accordionExample" >
//       <div className="accordion-item" style={{background: 'rgb(242, 245, 247)'}}>
//         <div id={tour.id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
//           <div className="accordion-body" >
//             text
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )
// }

// export default TourItem
