import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { BookingModel } from '../../models/BookingModel';
import { tourBookingService } from '../../config/service-config';

const BookingForm = () => {

    const { bookingId } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [curBooking, setCurBooking] = useState<BookingModel | null>(null)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const bookingToUpdate = bookingId && (await tourBookingService.get(bookingId)).data() as BookingModel;
            if (bookingToUpdate) {
                setCurBooking(bookingToUpdate)
            }
            setIsLoading(false)
          })();
    }, [])


  return (
    <div className='container'>
      {
        isLoading 
        ? (<div className='container d-flex justify-content-center'>
            <div className="spinner-border text-secondary" role="status"></div>
          </div> ) 
        : (<div>
            {/* {
                curBooking?.customers.map((customer, i) => {
                    return <CustomerForm customerUpdate={customer} count={i + 1} key={i}/>
                })
            } */}
        </div>)
      }
    </div>
  )
}

export default BookingForm
