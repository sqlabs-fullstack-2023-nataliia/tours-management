import { useEffect, useState } from 'react'
import { tourBookingService } from '../../config/service-config'
import { BookingModel } from '../../models/BookingModel'
import { BookingItemModel } from '../../models/BookingItemModel'

const BookingHistory = () => {

  const [bookings, setBookings] = useState<BookingModel[]>([])
  const [bookingItems, setBookingItems] = useState<BookingItemModel[]>([])

  const loadData = async () => {
    const data = (await tourBookingService.getAll()).request
    if(!data.empty){
      setBookings(
        data.docs.map((doc) => ({
          id: doc.id,
          tourId: doc.data().tourId,
          tourItemId: doc.data().tourItemId,
          uid: doc.data().uid,
          customers: doc.data().customers
        }))
      )
    }
  }

  const setBookingData = async () => {
    const test = bookings.map((e) => {
      
    })
  }

  useEffect(() => {
    loadData();
    setBookingData()
  })

  return (
    <div className="container-fluid">
    <div className="row py-3 mb-2 px-2">
      <div className="col col-2" style={{color: 'rgb(44, 48, 53)'}}>Booking ID</div>
      <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Date</div>
      <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Tour ID</div>
      <div className="col col-2" style={{color: 'rgb(44, 48, 53)'}}>Agent name</div>
      <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Price</div>
      <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Payment</div>
      <div className="col col-2" style={{color: 'rgb(44, 48, 53)'}}>Payment Status</div>
      <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>details</div>
    </div>
    <div className='p-2' style={{background: 'white'}}>
    {
        // tours.length === 0 
        // ? (<div className='container d-flex justify-content-center'><h2>No Tours Found</h2></div>) 
        // : (
        //   tours.map((e, i) => {
        //     return <TourRow tour={e} index={i + 1} key={e.id}/>
        //   })
        // )
      }
    </div>
  </div>
  )
}

export default BookingHistory
// booking id, tour name, departure, agent name, status

//  bookings.map((e, i) => <li key={i}>{e.id}</li>)