import { useState } from 'react'
import { CustomerModel } from '../../models/CustomerModel'
import { useParams } from 'react-router-dom'


const initialCustomer = {
    firstName: '',
    lastName: '',
    email: '',
    passportNumber: '',
    dateOfBirth: '',
    nationality: ''
}

const MIN_BIRTH_DATE_VALUE = '1935-01-01'
const MAX_BIRTH_DATE_VALUE = new Date(`${new Date().getFullYear() - 18}-01-01`).toISOString().split("T")[0]

interface Props {
    submitCustomer: (customer: CustomerModel) => void
    count: number
}

const CustomerForm = ({submitCustomer, count}: Props) => {

    const { pax } = useParams();

    const [customer, setCustomer] = useState(initialCustomer)

    const firstNameHandler = (event: any) => {
        const value = event.target.value
        // TODO alow spaces
        if(value.length < 30 && /^[a-zA-Z]+$/.test(value)){
            const customerCopy = { ...customer };
            customerCopy.firstName = value;
            setCustomer(customerCopy)
        }
    }

    const lastNameHandler = (event: any) => {
        const value = event.target.value
        // TODO alow spaces
        if(value.length < 30 && /^[a-zA-Z]+$/.test(value)){
            const customerCopy = { ...customer };
            customerCopy.lastName = value;
            setCustomer(customerCopy)
        }
    }

    const emailHandler = (event: any) => {
        const value = event.target.value
        const customerCopy = { ...customer };
        customerCopy.email = value;
        setCustomer(customerCopy)
    }

    const passportNumberHandler = (event: any) => {
        const value = event.target.value
        if(value.length < 15 && /^[a-zA-Z0-9]+$/.test(value)){
            const customerCopy = { ...customer };
            customerCopy.passportNumber = value;
            setCustomer(customerCopy)
        }
    }

    const dateOfBirthHandler = (event: any) => {
        // TODO - not empty
        const value = event.target.value
        const customerCopy = { ...customer };
        customerCopy.dateOfBirth = value;
        setCustomer(customerCopy)
    }

    const nationalityHandler = (event: any) => {
        // TODO alow spaces
        const value = event.target.value
        if(value.length < 30 && /^[a-zA-Z]+$/.test(value)){
            const customerCopy = { ...customer };
            customerCopy.nationality = value;
            setCustomer(customerCopy)
        }
    }

    const submitFn = () => {
        if(/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(customer.email)){
            submitCustomer(customer)
        } else {
            // TODO tostify
            const customerCopy = { ...customer };
            customerCopy.email = '';
            setCustomer(customerCopy)
        }
    }

  return (
    <div className="container">
    <div className="row">
        <h2>Plese fill details for {`${count}/${pax}`} peron</h2>
        <div className="col col-lg-4 col-12 my-1">
            <label className="form-label" style={{fontWeight: 'bold'}}>First name</label>
        </div>
        <div className="col col-lg-8 col-12 my-1">
            <input onChange={firstNameHandler} type="text" className="form-control" value={customer.firstName} />
        </div>
        <div className="col col-lg-4 col-12 my-1">
            <label className="form-label" style={{fontWeight: 'bold'}}>Last name</label>
        </div>
        <div className="col col-lg-8 col-12 my-1">
            <input onChange={lastNameHandler} type="text" className="form-control" value={customer.lastName} />
        </div>
        <div className="col col-lg-4 col-12 my-1">
            <label className="form-label" style={{fontWeight: 'bold'}}>Email</label>
        </div>
        <div className="col col-lg-8 col-12 my-1">
            <input onChange={emailHandler} type="text" className="form-control" value={customer.email} />
        </div>
        <div className="col col-lg-4 col-12 my-1">
            <label className="form-label" style={{fontWeight: 'bold'}}>Passport number</label>
        </div>
        <div className="col col-lg-8 col-12 my-1">
            <input onChange={passportNumberHandler} type="text" className="form-control" value={customer.passportNumber} />
        </div>
        <div className="col col-lg-4 col-12 my-1">
            <label className="form-label" style={{fontWeight: 'bold'}}>Nationality</label>
        </div>
        <div className="col col-lg-8 col-12 my-1">
            <input onChange={nationalityHandler} type="text" className="form-control" value={customer.nationality} />
        </div>
        <div className="col col-lg-4 col-12 my-1">
            <label className="form-label" style={{fontWeight: 'bold'}}>Date of birth</label>
        </div>
        <div className="col col-lg-8 col-12 my-1">
            <input 
                onKeyDown={(e) => {e.preventDefault()}} 
                onChange={dateOfBirthHandler} 
                min={MIN_BIRTH_DATE_VALUE}
                max={MAX_BIRTH_DATE_VALUE} 
                type="date" 
                className="form-control"
                value={customer.dateOfBirth} />
        </div>
        <div className="col col-lg-8 col-12 my-1">
        </div>
        <div className="col col-lg-4 col-12 my-1 mt-3">
            <button onClick={submitFn} className='btn btn-outline-primary' style={{width: '100%'}}>Submit</button>
        </div>
    </div>
</div>
  )
}

export default CustomerForm
