import { useEffect, useState } from 'react'
import { CustomerModel } from '../../models/CustomerModel'
import { useParams } from 'react-router-dom'
import InfoModal from '../modals/InfoModal'


const initialCustomer = {
    id: '',
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
const CUSTOMER_UPDATED_MESSAGE = 'Customer was successfuly updated'
const WRONG_INPUT = 'Wrong input!'



interface Props {
    submitCustomer: (customer: CustomerModel | null) => void
    count?: number,
    customerUpdate?: CustomerModel | null
}

const CustomerForm = ({ submitCustomer, count, customerUpdate }: Props) => {

    const { pax } = useParams();

    const [customer, setCustomer] = useState(customerUpdate || initialCustomer)
    const [messages, setMessages] = useState([WRONG_INPUT])
    const [isInputValid, setIsInputValid] = useState(false)


    const firstNameHandler = (event: any) => {
        const value = event.target.value
        if (value.length < 30 && /^[a-zA-Z -]*$/.test(value)) {
            const customerCopy = { ...customer };
            customerCopy.firstName = value;
            setCustomer(customerCopy)
        }
    }

    const lastNameHandler = (event: any) => {
        const value = event.target.value
        if (value.length < 30 && /^[a-zA-Z -]*$/.test(value)) {
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
        if (value.length < 15 && /^[a-zA-Z0-9]*$/.test(value)) {
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
        if (value.length < 30 && /^[a-zA-Z -]*$/.test(value)) {
            const customerCopy = { ...customer };
            customerCopy.nationality = value;
            setCustomer(customerCopy)
        }
    }

    const submitFn = () => {
        if (validateInput()) {
            if(!!!customerUpdate){
                const customerCopy = { ...customer };
                customerCopy.id = Date.now().toString(),
                setCustomer(customerCopy)
            }
            setIsInputValid(true)
            setMessages(!!customerUpdate ? [CUSTOMER_UPDATED_MESSAGE]:  [CUSTOMER_ADDED_MESSAGE])
        } 
    }

    const resetEdit = () => {
        setCustomer(customerUpdate || initialCustomer)
        setMessages([WRONG_INPUT])
        setIsInputValid(false)
    }

    const cancelEdit = () => {
        setMessages([WRONG_INPUT])
        setIsInputValid(false)
        submitCustomer(null)
        setCustomer(initialCustomer)
    }

    const addCustomer = () => {
        setMessages([WRONG_INPUT])
        setIsInputValid(false)
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
                <h2>Plese fill details for {count && `${count}/${pax}`} peron</h2>
                <div className="col col-lg-4 col-12 my-1">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>
                        <span style={{color: 'red'}}>*</span>
                        First name
                    </label>
                </div>
                <div className="col col-lg-8 col-12 my-1">
                    <input onChange={firstNameHandler} type="text" className="form-control" value={customer.firstName} />
                </div>
                <div className="col col-lg-4 col-12 my-1">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>
                        <span style={{color: 'red'}}>*</span>
                        Last name
                    </label>
                </div>
                <div className="col col-lg-8 col-12 my-1">
                    <input onChange={lastNameHandler} type="text" className="form-control" value={customer.lastName} />
                </div>
                <div className="col col-lg-4 col-12 my-1">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>
                        <span style={{color: 'red'}}>*</span>
                        Email
                    </label>
                </div>
                <div className="col col-lg-8 col-12 my-1">
                    <input onChange={emailHandler} type="text" className="form-control" value={customer.email} />
                </div>
                <div className="col col-lg-4 col-12 my-1">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>
                        <span style={{color: 'red'}}>*</span>
                        Passport number
                    </label>
                </div>
                <div className="col col-lg-8 col-12 my-1">
                    <input onChange={passportNumberHandler} type="text" className="form-control" value={customer.passportNumber} />
                </div>
                <div className="col col-lg-4 col-12 my-1">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>
                        <span style={{color: 'red'}}>*</span>
                        Nationality
                    </label>
                </div>
                <div className="col col-lg-8 col-12 my-1">
                    <input onChange={nationalityHandler} type="text" className="form-control" value={customer.nationality} />
                </div>
                <div className="col col-lg-4 col-12 my-1">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>
                        <span style={{color: 'red'}}>*</span>
                        Date of birth
                    </label>
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
                {
                    customerUpdate === null || !!customerUpdate
                    ? (
                        <>
                        <div className="col col-lg-4 col-12 my-1 mt-3">
                            <button onClick={resetEdit} className='btn btn-outline-secondary' style={{ width: '100%' }}>Reset</button>
                        </div>
                        <div className="col col-lg-4 col-12 my-1 mt-3">
                            <button onClick={cancelEdit} className='btn btn-outline-danger' style={{ width: '100%' }}>Cancel</button>
                        </div></>
                    ) 
                    : (  <div className="col col-lg-8 col-12 my-1 mt-3"></div>)
                }
                <div className="col col-lg-4 col-12 my-1 mt-3">
                    <button onClick={submitFn} className='btn btn-outline-primary' style={{ width: '100%' }} data-bs-toggle="modal" data-bs-target="#exampleModal">Submit</button>
                </div>

                <InfoModal messages={messages} submitFn={isInputValid ? addCustomer : null} cancelFn={cancelFn} />

            </div>
        </div>
    )
}

export default CustomerForm
