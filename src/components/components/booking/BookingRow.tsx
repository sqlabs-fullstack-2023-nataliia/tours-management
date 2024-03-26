import { useState } from 'react'
import { BookingModel } from '../../../models/BookingModel'
import { TbPencil } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import BookingItemRow from './BookingItemRow';
import { useBookingStore } from '../../../store/useBookingStore';

// TODO to fix
const statusColor: { [key: string]: string } = {
  'pending': '#fff7e6',
  'approved': '#ebfaeb',
  'canceled': '#ffe6e6',
  'completed': '#f0f0f5'

}

// interface Props {
//   bookings: BookingModel[]
// }
const BookingRow = () => {

  // ???????? no need ?
    const [isLoading, setIsLoading] = useState(false)
    const bookings = useBookingStore((state) => state.bookings)
    //const bookingItems = useBookingItemStore((state) => state.bookingItems)
    
  return (
    <div className="row d-flex justify-content-center" >
    {
      isLoading 
      ? (<div className='container d-flex justify-content-center'>
          <div className="spinner-border text-secondary" role="status"></div>
        </div> ) 
      : (
        bookings.length === 0 
        ? (<div className='container d-flex justify-content-center'><h2>No Bookings Found</h2></div>) 
        : (
          bookings.map((booking, i) => {
            return <div className="row py-1 " key={i} style={{ background: statusColor[booking.paymentStatus] }}>
            <div className="col col-2" style={{fontSize: '12px'}}>{booking.id}</div>
            <div className="col col-1" style={{fontSize: '12px'}}>{booking.takingDate}</div>
            <div className="col col-2" style={{fontSize: '12px'}}>{booking.tourItem?.id}</div>
            <div className="col col-1" style={{fontSize: '12px'}}>{booking.user?.firstName}</div>
            <div className="col col-1" style={{fontSize: '12px'}}>{booking.tourItem?.price}</div>
            <div className="col col-1" style={{fontSize: '12px'}}>{booking.tourItem?.departureDate}</div>
            <div className="col col-1" style={{fontSize: '12px'}}>{(booking.tourItem?.price || 0) * booking.customers.length}</div>
            <div className="col col-1" style={{fontSize: '12px'}}>{booking.paymentStatus}</div>
            
            <div className="col col-1">
              <button onClick={() => {}} className="btn" type="button" data-bs-toggle="collapse" data-bs-target={`#${booking.id}`} aria-expanded="true" aria-controls={booking.id}><MdOutlineRemoveRedEye/></button>
            </div>

            
            <div className="col col-1">
              <Link to={`${booking.id}/${booking.customers.length}`}>
                <button onClick={() => {}} className='btn'> <TbPencil/></button>
              </Link>
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
      )
      }
  </div>
  )
}

export default BookingRow


