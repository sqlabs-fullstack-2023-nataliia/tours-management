import { useState } from 'react'
import { CustomerModel } from '../../models/CustomerModel'
import { useUserStore } from '../../store/useUserStore'
import { useNavigate, useParams } from 'react-router-dom'
import { tourBookingService } from '../../config/service-config'

interface Props {
    customers: CustomerModel[]
}

const ConfirmationForm = ({customers}: Props) => {

    const navigate = useNavigate()
    const { tourId } = useParams()
    const { tourItemId } = useParams()
    const user = useUserStore((state) => state.user)
    const [isLoading, setIsLoading] = useState(false)
    const [booking, setBooking] = useState({
        id: '',
        tourId: tourId,
        tourItemId: tourItemId,
        uid: user?.id,
        customers: customers
    })

    const handlePlaceOrder = async () => {
        setIsLoading(true)
        const res = await tourBookingService.add(booking)
        console.log(res)
        if(res){
            setBooking(prevBooking => ({
                ...prevBooking,
                id: res.id
              }));
        }
        setIsLoading(false)
    }
    
  return (
    <>
    <div className="row p-3 mx-1 mt-3" style={{background: 'white', borderRadius: '15px'}}>
       {
        isLoading 
        ? (
            <div className='container d-flex justify-content-center'>
                <div className="spinner-border text-secondary" role="status"></div>
            </div>
        ) 
        : (
            <>
            {
                user?.role === 'user' && <div>hello agent</div>
            }
            <div className='container d-flex justify-content-center px-2 mt-2'>
                <button onClick={handlePlaceOrder} className='btn btn-outline-success ' style={{width: '100%'}}>Confirm</button>
            </div>
            <div className='container d-flex justify-content-center px-2 mt-2'>
                <button onClick={() => navigate(`/tours/book/${tourId}`)} className='btn btn-outline-danger ' style={{width: '100%'}}>Cancel</button>
            </div></>
        )
       }
    </div>

   
    </>
  )
}

export default ConfirmationForm


