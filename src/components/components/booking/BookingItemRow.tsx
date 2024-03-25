import { BookingModel } from "../../../models/BookingModel"

interface Props {
  booking: BookingModel
}
const BookingItemRow = ({booking}: Props) => {

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

  return (
    <div className="container-fluid">
      <div className="row" style={{fontSize: '12px'}}>

        <div className="col col-12 col-lg-8 mb-2" >
        
          <div className="container px-5 pt-3" style={{borderRadius: '15px', background: 'rgb(242, 245, 247)'}}>
          <h6>Customer details</h6>
          {
        booking.customers.map((customer, i) => {
            return <div className="row" key={i} >
                {
                    i === 0 && <hr/>
                }
                <div className="col col-4"><p>First name</p></div>
                <div className="col col-6"><h6>{customer.firstName}</h6></div>
                <div className="col col-4"><p>Last name</p></div>
                <div className="col col-6"><h6>{customer.lastName}</h6></div>
                <div className="col col-4"><p>Email</p></div>
                <div className="col col-6"><h6>{customer.email}</h6></div>
                <div className="col col-4"><p>Passport</p></div>
                <div className="col col-6"><h6>{customer.passportNumber}</h6></div>
                <div className="col col-4"><p>Date of birth</p></div>
                <div className="col col-6"><h6>{customer.dateOfBirth}</h6></div>
                <div className="col col-4"><p>Nationalty</p></div>
                <div className="col col-6"><h6>{customer.nationality}</h6></div>
                <hr/>
            </div>
        })
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
