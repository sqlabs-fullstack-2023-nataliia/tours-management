import { useEffect, useState } from 'react'
import { tourBookingService } from '../../config/service-config'
import { TourDto } from '../../models/dto/TourDto'
import { TourItemDto } from '../../models/dto/TourItemDto'
import { UserDto } from '../../models/dto/UserDto'
import { useBookingStore } from '../../store/useBookingStore'
import BookingHistory from '../components/booking/BookingHistory'
import { useUserStore } from '../../store/useUserStore'

const BookingHistoryPage = () => {

  const setBookings = useBookingStore((state) => state.setBookings)
  const user = useUserStore((state) => state.user)
  const [isLoading, setIsLoading] = useState(false)

  const loadData = async () => {
    const data = (await tourBookingService.getAll()).request
    if(!data.empty){
      const allBookings = data.docs.map((doc) => ({
        id: doc.id,
        tour: doc.data().tour as TourDto,
        tourItem: doc.data().tourItem as TourItemDto,
        user: doc.data().user as UserDto,
        customers: doc.data().customers,
        takingDate: doc.data().takingDate,
        paymentStatus: doc.data().paymentStatus
      }))
      if(user?.role === 'admin'){
        setBookings(allBookings)
      } else {
        const filteredBookings = allBookings.filter(e => e.user.tourAgency === user?.tourAgency)
        setBookings(filteredBookings)
      }
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
        <BookingHistory/>
      )
    }
    </>
  )
}

export default BookingHistoryPage;
