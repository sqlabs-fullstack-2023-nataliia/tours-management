import { CustomerModel } from "../../models/CustomerModel"

interface Props {
    customers: CustomerModel[]
}

const BookingConfirmationComp = ({customers}: Props) => {
  return (
    <div className="container">
        <h2>Please confirm your booking details</h2>
      {
        customers.map((customer, i) => {
            return <div className="row" key={i}>
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
  )
}

export default BookingConfirmationComp
