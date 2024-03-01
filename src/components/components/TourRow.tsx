import React from 'react'
import { TourModel } from '../../models/TourModel'
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

interface Props {
    tour: TourModel
    index: number
}
const TourItem = ({tour, index}: Props) => {

  return (
    <div className="row" >
      <div className="col col-1">{index}</div>
      <div className="col col-3">{tour.name}</div>
      <div className="col col-2">{tour.destination}</div>
      <div className="col col-2">{tour.duration} days</div>
      <div className="col col-1">
        <button className='btn'><TbPencil/></button>
      </div>
      <div className="col col-1">
        <button className='btn'><FaRegTrashAlt/></button>
      </div>
      <div className="col col-1">
        <button className=" btn" type="button" data-bs-toggle="collapse" data-bs-target={`#${tour.id}`} aria-expanded="true" aria-controls={tour.id}><MdOutlineRemoveRedEye/></button>
      </div>
      <div className="col col-1">
        <button className='btn'><IoMdAdd/></button>
      </div>
      <div className="accordion" id="accordionExample" >
        <div className="accordion-item" style={{background: 'rgb(242, 245, 247)'}}>
          <div id={tour.id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body" >
              text
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
