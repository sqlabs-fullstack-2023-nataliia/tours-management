import { useState } from 'react'
import { CustomerModel } from '../../models/CustomerModel'
import { useUserStore } from '../../store/useUserStore'
import { useNavigate, useParams } from 'react-router-dom'
import { tourBookingService } from '../../config/service-config'
import InfoModal from '../modals/InfoModal'
import { BookingModel } from '../../models/BookingModel'
import { useRelevantToursStore } from '../../store/useRelevantToursStore'
import { useRelevantTourItemsStore } from '../../store/useRelevantTourItemsStore'

interface Props {
    customers: CustomerModel[],
    confirmationFn: (booking: BookingModel) => void
}

const options = [
    "Adventure Seekers",
    "Aanderlust Tours",
    "Aaplorers Unlimited",
    "Global Arekking",
    "Discovery Expeditions",
    "Journey Aasters",
    "Voyage Ventures",
    "Roaming Nomads",
    "Wayfarer Adventures",
    "Travel Troupe"
  ];

const CANCEL_COMFIRMATION_MESSAGE = 'Are you sure you want to cancel this booking? All your details will not be saved'

const ConfirmationForm = ({customers, confirmationFn}: Props) => {

    const navigate = useNavigate()
    const { tourId } = useParams()
    // const { tourItemId } = useParams()
    const relevantTour = useRelevantToursStore((state) => state.relevantTour)
    const relevantTourItem = useRelevantTourItemsStore((state) => state.relevantTourItem)
    const user = useUserStore((state) => state.user)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<string[]>([])
    
    // const [booking, setBooking] = useState({
    //     id: '',
    //     tourId: tourId,
    //     tourItemId: tourItemId,
    //     uid: user?.id,
    //     customers: customers
    // })
    const [booking, setBooking] = useState({
        id: '',
        tour: {
            id: relevantTour?.id,
            name: relevantTour?.name,
            destination: relevantTour?.destination,
            duration: relevantTour?.duration,
            image: relevantTour?.image,
            commission: relevantTour?.commission,
        },
        tourItem: {
            id: relevantTourItem?.id,
            departureDate: relevantTourItem?.departureDate,
            language: relevantTourItem?.language,
            price: relevantTourItem?.price,
        },
        user: {
            id: user?.uid,
            firstName: user?.firstName,
            lastName: user?.lastName,
            role: user?.role,
            tourAgency: user?.tourAgency
        },
        customers: customers,
        takingDate: new Date().toISOString().split("T")[0],
        paymentStatus: 'pending'
    })
    const [tAgency, setTAgency] = useState('');
    const [agencyOptions, setAgencyOptions] = useState<string[]>([])

    const handlePlaceOrder = async () => {
        setIsLoading(true)
        const res = await tourBookingService.add(booking)
        confirmationFn(res as BookingModel)
        if(res){
            setBooking(prevBooking => ({
                ...prevBooking,
                id: res.id
              }));
        }
        setIsLoading(false)
    }

    const handleCancel = () => {
        setMessage([CANCEL_COMFIRMATION_MESSAGE])
    }

    const submitCancel = () => {
        navigate(`/tours/book/${tourId}`)
    }

    const handleTAgency = (event: any) => {
        const value = event.target.value;
        setTAgency(value);
    
        const filtered = options.filter(option =>
            option.toLowerCase().startsWith(value.toLowerCase())
          );
        setAgencyOptions(filtered);
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        // TODO
      if(tAgency){
        setIsOpen(false);
      } else {
        setIsOpen(true)
      }

      // onClick={toggleDropdown}
    };

    const handleSerch = (agency: string) => {
        setTAgency(agency)
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
                user?.role !== 'user' 
                && 
                <div className='container d-flex justify-content-center px-2 mt-2'>
                    <div className="dropdown" onInput={toggleDropdown} >
                        <input
                            className="form-control"
                            type="text"
                            value={tAgency}
                            onChange={handleTAgency}
                            placeholder="Search..."
                        />
                        <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                            {
                                agencyOptions.map((e, i) => <li className="dropdown-item" key={i} onClick={() => handleSerch(e)}>{e}</li>)
                            }
                        </ul>
                    </div>
                </div>
            }
            <div className='container d-flex justify-content-center px-2 mt-2'>
                <button onClick={handlePlaceOrder} className='btn btn-outline-success ' style={{width: '100%'}}>Confirm</button>
            </div>
            <div className='container d-flex justify-content-center px-2 mt-2'>
                <button onClick={handleCancel} className='btn btn-outline-danger ' style={{width: '100%'}} data-bs-toggle="modal" data-bs-target="#exampleModal">Cancel</button>
            </div>

            <InfoModal messages={message} submitFn={submitCancel} cancelFn={() => {}} />
            </>
        )
       }
    </div>

   
    </>
  )
}

export default ConfirmationForm


