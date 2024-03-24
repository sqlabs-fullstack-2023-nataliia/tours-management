import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomerForm from '../../forms/CustomerForm'
import { CustomerModel } from '../../../models/CustomerModel'
import BookingConfirmationComp from './BookingConfirmationComp'
import ConfirmationForm from '../../forms/ConfirmationForm'
import { BookingModel } from '../../../models/BookingModel'
import { tourService } from '../../../config/service-config'
import { TourModel } from '../../../models/TourModel'
import { useRelevantToursStore } from '../../../store/useRelevantToursStore'
import { useRelevantTourItemsStore } from '../../../store/useRelevantTourItemsStore'

const BOOKING_CONFIRMATION_MESSAGE = 'Your order was successfully placed. Your booking confirmation number is: '

const BookTourComp = () => {

    const relevantTour = useRelevantToursStore((state) => state.relevantTour)
    const relevantTourItem = useRelevantTourItemsStore((state) => state.relevantTourItem)
    const navigate = useNavigate()
    const { pax } = useParams();
    const [paxCount, setPaxCount] = useState(1)
    const [customers, setCustomers] = useState<CustomerModel[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [bookingId, setBookingId] = useState<null | string>(null)

    // TODO make another file for js functions
    const getReturningDate = () => {
        if (relevantTourItem?.departureDate) {
            let date = new Date(relevantTourItem.departureDate)
            let days = date.getDate()
            days += relevantTour?.duration || 0
            date.setDate(days)
            return date.toISOString().split("T")[0]
        }
    }

    const submitCustomer = (customer: CustomerModel) => {
        setPaxCount(paxCount + 1)
        setCustomers((prevCustomers) => [...prevCustomers, customer]);
    }

    const confirmationFn = async(booking: BookingModel) => {
        setModalOpen(true)
        setBookingId(booking.id)
        setMessage(BOOKING_CONFIRMATION_MESSAGE + booking.id)
        if(relevantTourItem && pax && relevantTour){
            const newAvailability = relevantTourItem?.availability - +pax;
            const tourItemCopy = { ...relevantTourItem }
            tourItemCopy.availability = newAvailability
            const currTour = (await tourService.get(relevantTour?.id)).data() as TourModel 
            const updatedTourItems = currTour.tourItems.map((e: any) => {
                if(e.id === relevantTourItem.id){
                    e.availability = newAvailability
                }
                return e;
            })
            
            await tourService.update({ ...relevantTour, tourItems: updatedTourItems })
        }
    }

    return (
        <div className='container d-flex justify-content-center' >
            <div className="row">
                <div className="col col-lg-8 col-12 px-3 py-3 " style={{ background: 'rgb(237, 244, 252)', borderRadius: '15px' }}>
                    {
                        pax && paxCount <= +pax
                            ? (
                                <CustomerForm submitCustomer={submitCustomer} count={paxCount} />
                            )
                            : (<>
                                <BookingConfirmationComp customers={customers} />
                            </>)
                    }
                </div>
                <div className={`col col-lg-4 col-12 ${pax && paxCount <= +pax ? 'd-flex' : ''}`} >

                    <div className="row p-2 mx-1" style={{ background: 'rgb(237, 244, 252)', borderRadius: '15px' }}>
                        <div className="col-5 my-2">
                            <h6>Language:</h6>
                        </div>
                        <div className="col-7 my-2">
                            <h5>{relevantTourItem?.language}</h5>
                        </div>
                        <div className="col-5 my-2">
                            <h6>Departure:</h6>
                        </div>
                        <div className="col-7 my-2">
                            <h5>{relevantTourItem?.departureDate}</h5>
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
                            <h5>{relevantTourItem?.price} $</h5>
                        </div>
                        <div className="col-5 my-2">
                            <h6>Total: </h6>
                        </div>
                        <div className="col-7 my-2">
                            <h5>{(relevantTourItem?.price || 1) * (pax ? +pax : 1)} $</h5>
                        </div>
                    </div>
                    {
                        !(pax && paxCount <= +pax) && !bookingId && <ConfirmationForm customers={customers} confirmationFn={confirmationFn}/>
                    }
                    {
                        bookingId && <div className="row p-3 mx-1 mt-3" style={{background: 'white', borderRadius: '15px'}}>
                            <button onClick={() => navigate('/tours/book')} className='btn btn-outline-danger'>Close</button>
                        </div>
                    }
                </div>


            </div>
            {modalOpen && (
                <div className="modal fade show" tabIndex={-1} style={{ display: 'block' }} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" onClick={() => setModalOpen(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {message}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default BookTourComp
