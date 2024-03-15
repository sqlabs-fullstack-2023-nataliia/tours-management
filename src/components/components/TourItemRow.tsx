import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTourStore } from "../../store/useTourStore";

// TODO take status from firebase + mb add color picker to settings
const statusColor: { [key: string]: string } = {
  'pending': '#fff7e6',
  'available': '#ebfaeb',
  'fully booked': '#e6f5ff',
  'canceled': '#ffe6e6',
  'completed': '#f0f0f5'

}

const TourItemRow = () => {

  const removeTourItem = useTourStore((state) => state.deleteTourItem)
  const setTourItem = useTourStore((state) => state.setTourItem)
  const tourItems = useTourStore((state) => state.tourItems)

  return (
    <div className="container" >
    {
      tourItems.length === 0 
      ? (<div className='d-flex justify-content-center ' ><h3>No tour options found</h3></div>) 
      : (<div className="container-fluid" >
        <div className="row py-3 mb-2 px-2">
          <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>#</div>
          <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Departure</div>
          <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Language</div>
          <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Availability</div>
          <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Price</div>
          <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Status</div>
          <div className="col col-2"></div>
        </div>
        <div className='p-4' style={{background: 'white', borderRadius: '15px'}}>
        {
          tourItems.map((tourItem, index) => {
            return <div className="row" key={index} style={{background: statusColor[tourItem.status]}}>
            <div className="col col-1 p-2">{index + 1}</div>
            <div className="col col-2 p-2">{tourItem.departureDate}</div>
            <div className="col col-2 p-2">{tourItem.language}</div>
            <div className="col col-2 p-2">{tourItem.availability}</div>
            <div className="col col-1 p-2">{tourItem.price}</div>
            <div className="col col-2 p-2">{tourItem.status}</div>
              <div className="col col-1 p-2">
                <button onClick={() =>  setTourItem(tourItem)} className='accordion-button pt-2' ><TbPencil/></button>
              </div>
            {
              !!removeTourItem &&
              <div className="col col-1 p-2">
                <button className='accordion-button pt-2' onClick={() => removeTourItem(tourItem.id)}><FaRegTrashAlt/></button>
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
