import { useEffect, useState } from 'react'
import { tourBookingService } from '../../config/service-config'
import { BookingModel } from '../../models/BookingModel'

import BookingRow from '../components/booking/BookingRow'
import { TourDto } from '../../models/dto/TourDto'
import { TourItemDto } from '../../models/dto/TourItemDto'
import { UserDto } from '../../models/dto/UserDto'

const BookingHistory = () => {

  const [bookings, setBookings] = useState<BookingModel[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = async () => {
    const data = (await tourBookingService.getAll()).request
    if(!data.empty){
      setBookings(
        data.docs.map((doc) => ({
          id: doc.id,
          tour: doc.data().tour as TourDto,
          tourItem: doc.data().tourItem as TourItemDto,
          user: doc.data().user as UserDto,
          customers: doc.data().customers,
          takingDate: doc.data().takingDate,
          paymentStatus: doc.data().paymentStatus
        }))
      )
    }

  }

  useEffect(() => {
    setIsLoading(true)
    loadData();
    setIsLoading(false)
  }, [])

  return (
    <>
    {
      isLoading 
      ? ( <div className='container d-flex justify-content-center mt-5'>
            <div className="spinner-border text-secondary" role="status"></div>
          </div>) 
      : (
        <div className="container-fluid" style={{background: 'white'}}>
        <div className="row py-3 mb-2 px-2">
          <div className="col col-2" style={{color: 'rgb(44, 48, 53)'}}>Booking ID</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Date</div>
          <div className="col col-2" style={{color: 'rgb(44, 48, 53)'}}>Tour ID</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Agent</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Price</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Departure</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Payment</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Payment Status</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Details</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Edit</div>
        </div>
        <div className='' style={{background: 'white'}}>
          <BookingRow bookings={bookings}/>
        </div>
      </div>
      )
    }
    </>
  )
}

export default BookingHistory
