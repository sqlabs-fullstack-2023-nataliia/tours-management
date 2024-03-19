import { useRef, useState } from 'react'
import { useTourStore } from '../../store/useTourStore'
import { useParams } from 'react-router-dom'
import CustomerForm from '../forms/CustomerForm'
import { CustomerModel } from '../../models/CustomerModel'
import BookingConfirmationComp from './BookingConfirmationComp'
import ConfirmationForm from '../forms/ConfirmationForm'


const BookTourComp = () => {

    const tour = useTourStore((state) => state.tour)
    const tourItem = useTourStore((state) => state.tourItem)
    const { pax } = useParams();
    const [paxCount, setPaxCount] = useState(1)
    const [customers, setCustomers] = useState<CustomerModel[]>([])

    // TODO make another file for js functions
    const getReturningDate = () => {
        if(tourItem?.departureDate){
            let date = new Date(tourItem.departureDate)
            let days = date.getDate()
            days += tour?.duration || 0
            date.setDate(days)
            return date.toISOString().split("T")[0]
        }
    }

    const submitCustomer = (customer: CustomerModel) => {
        setPaxCount(paxCount + 1)
        setCustomers((prevCustomers) => [...prevCustomers, customer]);
        console.log(customer)
    }

  return (
    <div className='container d-flex justify-content-center'>
      <div className="row">
        <div className="col col-lg-8 col-12 px-5 py-3 " style={{background: 'rgb(226, 231, 236)', borderRadius: '15px'}}>
          {
            pax && paxCount <= +pax 
            ? (
                <CustomerForm submitCustomer={submitCustomer} count={paxCount}/>
            ) 
            : (<>
                <BookingConfirmationComp customers={customers}/>
                {/* <ConfirmationForm customers={customers}/> */}
            </>)
          }
        </div>
        <div className={`col col-lg-4 col-12 ${pax && paxCount <= +pax ? 'd-flex' : ''}`} >
            
            <div className="row p-3 mx-1" style={{background: 'white', borderRadius: '15px'}}>
                <div className="col-5 my-2">
                    <h6>Language:</h6>
                </div>
                <div className="col-7 my-2">
                    <h5>{tourItem?.language}</h5>
                </div>
                <div className="col-5 my-2">
                    <h6>Departure:</h6>
                </div>
                <div className="col-7 my-2">
                    <h5>{tourItem?.departureDate}</h5>
                </div>
                <div className="col-5 my-2">
                    <h6>Returning: </h6>
                </div>
                <div className="col-7 my-2">
                    <h5>{getReturningDate()}</h5>
                </div>
                <div className="col-5 my-2">
                    <h6>Pax: </h6>
                </div>
                <div className="col-7 my-2">
                    <h5>{pax}</h5>
                </div>
                <div className="col-5 my-2">
                    <h6>Price: </h6>
                </div>
                <div className="col-7 my-2">
                    <h5>{tourItem?.price} $</h5>
                </div>
                <div className="col-5 my-2">
                    <h6>Total: </h6>
                </div>
                <div className="col-7 my-2">
                    <h5>{(tourItem?.price || 1) * (pax ? +pax : 1)} $</h5>
                </div>
            </div>
            {
                !(pax && paxCount <= +pax)  && <ConfirmationForm customers={customers}/>
            }
            
            </div>
            
        </div>

        
    </div>
  )
}

export default BookTourComp
