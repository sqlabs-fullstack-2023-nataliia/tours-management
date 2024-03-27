import { MdOutlineRemoveRedEye } from "react-icons/md";
import BookingItemRow from './BookingItemRow';
import { BookingModel } from "../../../models/BookingModel";

// TODO to fix
const statusColor: { [key: string]: string } = {
  'pending': '#fff7e6',
  'approved': '#ebfaeb',
  'canceled': '#ffe6e6',
  'completed': '#f0f0f5'

}

interface Props {
  bookings: BookingModel[]
}

const BookingRow = ({bookings}: Props) => {
    
  return (
    <div className="row d-flex justify-content-center " >
    {
           bookings.length === 0 
           ? (<div className='container d-flex justify-content-center'><h2>No Bookings Found</h2></div>) 
           : (
             bookings.map((booking, i) => {
               return <div className="row py-1 " key={i} style={{ background: statusColor[booking.paymentStatus] }} >
               <div className="col col-xl-2 d-flex d-none d-xl-block" style={{overflow: 'hidden'}}>{booking.id}</div>
               <div className="col d-none d-md-block" >{booking.takingDate}</div>
               <div className="col col-xs-2 d-none d-md-block" >{booking.tourItem?.id}</div>
               <div className="col col-md-2 col-xl-1" >{booking.user?.firstName}</div>
               <div className="col col-md-1" >{booking.tourItem?.price}</div>
               <div className="col d-none d-md-block" >{booking.tourItem?.departureDate}</div>
               <div className="col col-lg-1 d-none d-lg-block" >{booking.customers.length}</div>
               <div className="col col-md-1" >{(booking.tourItem?.price || 0) * booking.customers.length}</div>
               <div className="col col-md-1 d-none d-md-block" >{booking.paymentStatus}</div>
               <div className="col col-md-1">
                 <button onClick={() => {}} className="btn" type="button" data-bs-toggle="collapse" data-bs-target={`#${booking.id}`} aria-expanded="true" aria-controls={booking.id}><MdOutlineRemoveRedEye/></button>
               </div>
   
               <div className="accordion" id="accordionExample" >
                 <div className="accordion-item" style={{background: 'white', borderRadius: '12px'}}>
                   <div id={booking.id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                     <div className="accordion-body" >
                     {
                     <BookingItemRow booking={booking}/>
                     }
                     </div>
                   </div>
                 </div>
               </div>
   
   
             </div>
             })
           )
      }
  </div>
  )
}

export default BookingRow


