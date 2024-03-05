import { useState } from "react"
import { TourItemModel } from "../../models/TourItemModel"
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";

interface Props{
  tourItems: TourItemModel[],
  setUpdateTourItem: (tourItem: TourItemModel) => void,
  removeTourItem: (index: string) => void,
}

const TourItemRow = ({tourItems, setUpdateTourItem, removeTourItem}: Props) => {

  return (
    <div className="container">
    {
      tourItems.length === 0 
      ? (<div className='d-flex justify-content-center mt-4' style={{background: 'rgb(251, 253, 255)', borderRadius: '15px'}}><h3>No tour options found</h3></div>) 
      : (<div className="container-fluid">
        <div className="row py-3 mb-2 px-2">
          <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>#</div>
          <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Departure</div>
          <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Language</div>
          <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Availability</div>
          <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Price</div>
          <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Status</div>
          <div className="col col-2"></div>
        </div>
        <div className='p-2' style={{background: 'white'}}>
        {
          tourItems.map((tour, index) => {
            return <div className="row" key={index}>
            <div className="col col-1">{index + 1}</div>
            <div className="col col-2">{tour.departureDate}</div>
            <div className="col col-2">{tour.language}</div>
            <div className="col col-2">{tour.availability}</div>
            <div className="col col-1">{tour.price}</div>
            <div className="col col-2">{tour.status}</div>
            <div className="col col-1">
              <button onClick={() =>  setUpdateTourItem(tour)} className='btn'><TbPencil/></button>
            </div>
            <div className="col col-1">
              <button className='btn' onClick={() => removeTourItem(tour.id)}><FaRegTrashAlt/></button>
            </div>
            {/* <div className="col col-1">
              <button className=" btn" type="button" data-bs-toggle="collapse" data-bs-target={`#${tour.id}`} aria-expanded="true" aria-controls={tour.id}><MdOutlineRemoveRedEye/></button>
            </div> */}
            {/* <div className="col col-1">
              <button onClick={() => setIsAdd(!isAdd)} className='btn' type="button" data-bs-toggle="collapse" data-bs-target={`#${tour.id}`} aria-expanded="true" aria-controls={tour.id}><IoMdAdd/></button>
            </div> */}

            {/* <div className="accordion" id="accordionExample" >
              <div className="accordion-item" style={{background: 'rgb(242, 245, 247)'}}>
                <div id={tour.id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body" >
                    test
                  </div>
                </div>
              </div>
            </div> */}


          </div>
          })
        }
        </div>
      </div>)
    }
  </div>
  )
}

export default TourItemRow
