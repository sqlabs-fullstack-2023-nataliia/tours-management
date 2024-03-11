import { useState } from "react"
import { TourItemModel } from "../../models/TourItemModel"
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";

interface Props{
  tourItems: TourItemModel[],
  setUpdateTourItem?: (tourItem: TourItemModel) => void,
  removeTourItem?: (index: string) => void,
}

const statusColor = {
  'pending': 'yellow',
  'available': 'green',
  'fully booked': 'blue',
  'canceled': 'red',
  'complited': 'gray'

}

const TourItemRow = ({tourItems, setUpdateTourItem, removeTourItem}: Props) => {

  return (
    <div className="container">
    {
      tourItems.length === 0 
      ? (<div className='d-flex justify-content-center ' ><h3>No tour options found</h3></div>) 
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
            return <div className="row" key={index} style={{background: statusColor[tour.status]}}>
            <div className="col col-1 p-2">{index + 1}</div>
            <div className="col col-2 p-2">{tour.departureDate}</div>
            <div className="col col-2 p-2">{tour.language}</div>
            <div className="col col-2 p-2">{tour.availability}</div>
            <div className="col col-1 p-2">{tour.price}</div>
            <div className="col col-2 p-2">{tour.status}</div>
            {
              !!setUpdateTourItem &&
              <div className="col col-1 p-2">
                <button onClick={() =>  setUpdateTourItem(tour)} className='accordion-button pt-2' ><TbPencil/></button>
              </div>
            }
            {
              !!removeTourItem &&
              <div className="col col-1 p-2">
                <button className='accordion-button pt-2' onClick={() => removeTourItem(tour.id)}><FaRegTrashAlt/></button>
              </div>
            }
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
