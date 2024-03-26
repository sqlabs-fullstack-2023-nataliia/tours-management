import { BookingModel } from "../../../models/BookingModel"
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { useEffect, useState } from "react";
import { CustomerModel } from "../../../models/CustomerModel";
import CustomerForm from "../../forms/CustomerForm";
import { tourBookingService } from "../../../config/service-config";
import { useBookingStore } from "../../../store/useBookingStore";

interface Props {
  booking: BookingModel
}

const EDIT_OPERSTION = 'edit'
const ADD_OPERATION = 'add'

const BookingItemRow = ({booking}: Props) => {

  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [operation, setOperation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [customer, setCustomer] = useState<CustomerModel | null>(null)
  const [isBookingComplited, setIsBookingComplited] = useState(false);

  const updateBookings = useBookingStore((state) => state.updateBooking)

  useEffect(() => {
      setIsBookingComplited(new Date(booking.tourItem?.departureDate || '') <= new Date())
  }, [])

  // TODO make another file for js functions
  const getReturningDate = () => {
    if (booking.tourItem?.departureDate) {
      let date = new Date(booking.tourItem.departureDate)
      let days = date.getDate()
      days += booking.tour?.duration || 0
      date.setDate(days)
      return date.toISOString().split("T")[0]
    }
  }

  const handleEdit = (customer: CustomerModel) => {
    setOperation(EDIT_OPERSTION)
    setCustomer(customer)
    setShowCustomerForm(true)
  }

  const handleDelete = async (customerToDelete: CustomerModel) => {
    await updateBooking(customerToDelete)
  }

  const handleAdd = () => {
    setOperation(ADD_OPERATION)
    setShowCustomerForm(true)
  }

  const submitCustomer = async(customerUpdate: CustomerModel | null) => {
    if(customerUpdate){
      await updateBooking(customerUpdate)
    }
    setOperation('')
    setCustomer(null)
    setShowCustomerForm(false)
  }

  const updateBooking = async (customerUpdate: CustomerModel) => {
    let updatedCustomers: CustomerModel[] = [];
    switch(operation){
      case EDIT_OPERSTION: updatedCustomers = booking.customers.map((e) => e.id === customerUpdate.id ? customerUpdate : e);
        break;
      case ADD_OPERATION: updatedCustomers = [...booking.customers, customerUpdate]; 
        break;
      default: updatedCustomers = booking.customers.filter((e) => e.id !== customerUpdate.id); 
        break;
    }
    const updatedBooking: BookingModel = { 
      ...booking,
      customers: updatedCustomers 
    };
    updateBookings(updatedBooking)
    setIsLoading(true)
    await tourBookingService.update(updatedBooking)
    setOperation('')
    setIsLoading(false)

  }

  return (
    <div className="container-fluid">
      <div className="row" style={{fontSize: '12px'}}>

        <div className="col col-12 col-lg-8 mb-2" >
        
          <div className="container px-5 pt-3" style={{borderRadius: '15px', background: 'rgb(242, 245, 247)'}}>
          <h6>Customer details</h6>
          {
            showCustomerForm 
            ? (<>
              {
                isLoading 
                ? ( <div className='container d-flex justify-content-center mt-5'>
                      <div className="spinner-border text-secondary" role="status"></div>
                    </div>) 
                : (<CustomerForm submitCustomer={submitCustomer} customerUpdate={customer}/>)
              }
            </>) 
            : (<>
                      {
          booking.customers.map((cust, i) => {
            return <div className="row" key={i} >
                {
                    i === 0 && <hr/>
                }
                <div className="col col-4"><p>First name</p></div>
                <div className="col col-5"><h6>{cust.firstName}</h6></div>
                {
                  !isBookingComplited 
                  ? (<>
                      <div className="col col-1">
                        <button onClick={handleAdd} className="btn">
                          <MdOutlinePersonAddAlt/>
                        </button>
                      </div>
                      <div className="col col-1">
                        <button onClick={() => handleEdit(cust)} className="btn">
                          <TbPencil/>
                        </button>
                      </div>
                      <div className="col col-1">
                        <button  className="btn" data-bs-toggle="modal" data-bs-target={`#${i + cust.dateOfBirth}`}>
                        <FaRegTrashAlt/>
                      </button>
                    </div>
                  </>) 
                  : (<div className="col col-3"></div>)
                }

                <div className="col col-4"><p>Last name</p></div>
                <div className="col col-6"><h6>{cust.lastName}</h6></div>
                <div className="col col-4"><p>Email</p></div>
                <div className="col col-6"><h6>{cust.email}</h6></div>
                <div className="col col-4"><p>Passport</p></div>
                <div className="col col-6"><h6>{cust.passportNumber}</h6></div>
                <div className="col col-4"><p>Date of birth</p></div>
                <div className="col col-6"><h6>{cust.dateOfBirth}</h6></div>
                <div className="col col-4"><p>Nationalty</p></div>
                <div className="col col-6"><h6>{cust.nationality}</h6></div>
                <hr/>

                <>
                  <div className="modal fade" id={i + cust.dateOfBirth} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-body">
                          <h6>
                            {`You going to remove customer with name: ${cust.firstName} ${cust.lastName} from booking with id: ${booking.id}`}
                          </h6>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button onClick={() => handleDelete(cust)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>


            </div>
          })
          }
            </>)
          }

          </div>
        </div>
        <div className="col col-12 col-lg-4 mb-2" style={{background: 'rgb(237, 244, 252)', borderRadius: '15px'}}>
          <div className="row p-2 mx-1">
            <h6 className="px-2 pt-2">Tour details</h6>
            <hr/>
            <div className="col-5 ">
              <p>Language:</p>
            </div>
            <div className="col-7 ">
              <h5>{booking.tourItem?.language}</h5>
            </div>
            <div className="col-5 ">
              <p>Departure:</p>
            </div>
            <div className="col-7 ">
              <h5>{booking.tourItem?.departureDate}</h5>
            </div>
            <div className="col-5 ">
              <p>Returning: </p>
            </div>
            <div className="col-7 ">
              <h5>{getReturningDate()}</h5>
            </div>
            <div className="col-5 ">
              <p>Pax: </p>
            </div>
            <div className="col-7 ">
              <h5>{booking.customers.length}</h5>
            </div>
            <div className="col-5 ">
              <p>Price: </p>
            </div>
            <div className="col-7 ">
              <h5>{booking.tourItem?.price} $</h5>
            </div>
            <div className="col-5 ">
              <p>Total: </p>
            </div>
            <div className="col-7 ">
              <h5>{(booking.tourItem?.price || 1) * booking.customers.length} $</h5>
            </div>
          </div>
        </div>
        <div className="col col-12 col-lg-8" >
          <div className="container px-5 pt-3" style={{borderRadius: '15px', background: 'rgb(242, 245, 247)'}}>
            <div className="row">
            <h6>Booking status </h6>
            <hr/>
            <div className="col col-5 ">
              <p>Booking taking date: </p>
            </div>
            <div className="col col-7 ">
              <h5>{booking.takingDate}</h5>
            </div>
            <div className="col col-5 ">
              <p>Payment status: </p>
            </div>
            <div className="col col-7 ">
              <h5>{booking.paymentStatus}</h5>
            </div>
            </div>
          </div>
        </div>
        <div className="col col-12 col-lg-4" >
          <div className="row p-2 " style={{borderRadius: '15px', background: 'rgb(237, 244, 252)'}}>
            <h6>Commission details</h6>
            <hr/>
            <div className="col col-5 ">
              <p>Total payment: </p>
            </div>
            <div className="col col-7 ">
              <h5>{(booking.tourItem?.price || 1) * booking.customers.length} $</h5>
            </div>
            <div className="col col-5 ">
              <p>Commission: </p>
            </div>
            <div className="col col-7 ">
              <h5>{(((booking.tourItem?.price || 1) * booking.customers.length) * (booking.tour?.commission || 1)) / 100 } $</h5>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BookingItemRow
