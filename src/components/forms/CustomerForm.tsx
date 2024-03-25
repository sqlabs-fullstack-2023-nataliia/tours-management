import { useState } from 'react'
import { CustomerModel } from '../../models/CustomerModel'
import { useParams } from 'react-router-dom'
import InfoModal from '../modals/InfoModal'


const initialCustomer = {
    id: Date.now().toLocaleString(),
    firstName: '',
    lastName: '',
    email: '',
    passportNumber: '',
    dateOfBirth: '',
    nationality: ''
}

const MIN_BIRTH_DATE_VALUE = '1935-12-31'
const MAX_BIRTH_DATE_VALUE = new Date(`${new Date().getFullYear() - 18}-12-31`).toISOString().split("T")[0]
const EMAIL_NOT_VALID = 'email not valid'
const BIRTH_DATE_NOT_VALID = 'birth date field is required'
const FIRST_NAME_NOT_VALID = 'first name field is required'
const LAST_NAME_NOT_VALID = 'last name field is required'
const PASSPORT_NOT_VALID = 'passport number field is required'
const NATIONALITY_NOT_VALID = 'nationality field is required'
const CUSTOMER_ADDED_MESSAGE = 'Customer was successfuly added'
const WRONG_INPUT = 'Wrong input!'



interface Props {
    submitCustomer: (customer: CustomerModel) => void
    count: number,
    // customerUpdate?: CustomerModel

}

const CustomerForm = ({ submitCustomer, count }: Props) => {

    const { pax } = useParams();

    const [customer, setCustomer] = useState(initialCustomer)
    const [messages, setMessages] = useState([WRONG_INPUT])
    const [isInputValid, setIsInputValid] = useState(false)

    const firstNameHandler = (event: any) => {
        const value = event.target.value
        if (value.length < 30 && /^[a-zA-Z -]+$/.test(value)) {
            const customerCopy = { ...customer };
            customerCopy.firstName = value;
            setCustomer(customerCopy)
        }
    }

    const lastNameHandler = (event: any) => {
        const value = event.target.value
        if (value.length < 30 && /^[a-zA-Z -]+$/.test(value)) {
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
        if (value.length < 15 && /^[a-zA-Z0-9]+$/.test(value)) {
            const customerCopy = { ...customer };
            customerCopy.passportNumber = value;
            setCustomer(customerCopy)
        }
    }

    const dateOfBirthHandler = (event: any) => {
        const value = event.target.value
        const customerCopy = { ...customer };
        customerCopy.dateOfBirth = value;
        setCustomer(customerCopy)
    }

    const nationalityHandler = (event: any) => {
        const value = event.target.value
        if (value.length < 30 && /^[a-zA-Z -]+$/.test(value)) {
            const customerCopy = { ...customer };
            customerCopy.nationality = value;
            setCustomer(customerCopy)
        }
    }

    const submitFn = () => {
        if (validateInput()) {
            setIsInputValid(true)
            setMessages([CUSTOMER_ADDED_MESSAGE])
        } 
    }

    const addCustomer = () => {
        setMessages([WRONG_INPUT])
        setIsInputValid(false)
        //!!submitCustomer && 
        submitCustomer(customer)
        setCustomer(initialCustomer)
    }

    const cancelFn = () => {
        setMessages([WRONG_INPUT])
        setIsInputValid(false)
    }

    const validateInput = () => {
        let res = true;
        let message = []
        if (!(/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(customer.email))) {
            message.push(EMAIL_NOT_VALID)
            res = false
            const customerCopy = { ...customer };
            customerCopy.email = '';
            setCustomer(customerCopy)
        }
        if (!customer.dateOfBirth) {
            message.push(BIRTH_DATE_NOT_VALID)
            res = false
        } if (!customer.firstName) {
            message.push(FIRST_NAME_NOT_VALID)
            res = false
        } if (!customer.lastName) {
            message.push(LAST_NAME_NOT_VALID)
            res = false
        } if (!customer.passportNumber) {
            message.push(PASSPORT_NOT_VALID)
            res = false
        } if (!customer.nationality) {
            message.push(NATIONALITY_NOT_VALID)
            res = false
        }
        res ? setMessages([CUSTOMER_ADDED_MESSAGE]) : setMessages([...messages, ...message])

        return res
    }

    return (

        <div className="container">

            <div className="row">
                <h2>Plese fill details for {`${count}/${pax}`} peron</h2>
                <div className="col col-lg-4 col-12 my-1">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>First name</label>
                </div>
                <div className="col col-lg-8 col-12 my-1">
                    <input onChange={firstNameHandler} type="text" className="form-control" value={customer.firstName} />
                </div>
                <div className="col col-lg-4 col-12 my-1">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>Last name</label>
                </div>
                <div className="col col-lg-8 col-12 my-1">
                    <input onChange={lastNameHandler} type="text" className="form-control" value={customer.lastName} />
                </div>
                <div className="col col-lg-4 col-12 my-1">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>Email</label>
                </div>
                <div className="col col-lg-8 col-12 my-1">
                    <input onChange={emailHandler} type="text" className="form-control" value={customer.email} />
                </div>
                <div className="col col-lg-4 col-12 my-1">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>Passport number</label>
                </div>
                <div className="col col-lg-8 col-12 my-1">
                    <input onChange={passportNumberHandler} type="text" className="form-control" value={customer.passportNumber} />
                </div>
                <div className="col col-lg-4 col-12 my-1">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>Nationality</label>
                </div>
                <div className="col col-lg-8 col-12 my-1">
                    <input onChange={nationalityHandler} type="text" className="form-control" value={customer.nationality} />
                </div>
                <div className="col col-lg-4 col-12 my-1">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>Date of birth</label>
                </div>
                <div className="col col-lg-8 col-12 my-1">
                    <input
                        onKeyDown={(e) => { e.preventDefault() }}
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
                    <button onClick={submitFn} className='btn btn-outline-primary' style={{ width: '100%' }} data-bs-toggle="modal" data-bs-target="#exampleModal">Submit</button>
                </div>

                <InfoModal messages={messages} submitFn={isInputValid ? addCustomer : null} cancelFn={cancelFn} />

            </div>
        </div>
    )
}

export default CustomerForm
