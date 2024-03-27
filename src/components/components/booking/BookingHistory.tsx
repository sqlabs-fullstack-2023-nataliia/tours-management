import { useEffect, useState } from 'react'
import BookingRow from './BookingRow'
import { useBookingStore } from '../../../store/useBookingStore'
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { BookingModel } from '../../../models/BookingModel';

const STRING_TYPE = 'string'
const NUMBER_TYPE = 'number'
const DESCENDING_ORDER  = 'descending'
const ASCENDING_ORDER = 'ascending'
const MIN_DATE_VALUE = '2023-12-31'
const MAX_DATE_VALUE = new Date(`${new Date().getFullYear() + 2}-12-31`).toISOString().split("T")[0]


const BookingHistory = () => {

    const bookings = useBookingStore((state) => state.bookings)

    const [curBookings, setCurBookings] = useState<BookingModel[]>([])
    const [bookingId, setBookingId] = useState('')
    const [tourId, setTourId] = useState('')
    const [takingDate, setTakingDate] = useState('')
    const [days, setDays] = useState('')
    const [tourDate, setTourDate] = useState('')
    const [tourDays, setTourDays] = useState('')
    const [priceFrom, setPriceFrom] = useState('')
    const [priceTo, setPriceTo] = useState('')
    const [agentName, setAgentName] = useState('')
    const [commission, setCommition] = useState(0)


    useEffect(() => {
        setCurBookings([...bookings])
        calculateCommission(bookings)
    }, [bookings])

    const handleFilters = () => {
        let currentBookings: BookingModel[] = [...bookings]
        if(bookingId) currentBookings = currentBookings.filter(e => e.id.includes(bookingId.trim()))
        if(tourId) currentBookings = currentBookings.filter(e => e.tourItem?.id.includes(tourId.trim()))
        if(priceFrom) currentBookings = currentBookings.filter(e => (e.tourItem?.price || 0) >= (+priceFrom))
        if(priceTo) currentBookings = currentBookings.filter(e => (e.tourItem?.price || 0) <= (+priceTo))
        if(agentName) currentBookings = currentBookings.filter(e => e.user?.firstName.toLocaleLowerCase().includes(agentName.trim().toLocaleLowerCase()))
        if(takingDate) currentBookings = currentBookings.filter(e => new Date(e.takingDate) >= new Date(takingDate))
        if(days && takingDate) {
          const dateInput = new Date(takingDate)
          const toDate = new Date(dateInput.getFullYear(), dateInput.getMonth() , dateInput.getDate() + +days).toISOString().split("T")[0];
          currentBookings = currentBookings.filter(e => new Date(e.takingDate) <= new Date(toDate));
        }
        if(tourDate) currentBookings = currentBookings.filter(e => new Date(e.tourItem?.departureDate || '') >= new Date(tourDate))
        if(days && tourDate) {
          const dateInput = new Date(tourDate)
          const toDate = new Date(dateInput.getFullYear(), dateInput.getMonth() , dateInput.getDate() + +days).toISOString().split("T")[0];
          currentBookings = currentBookings.filter(e => new Date(e.tourItem?.departureDate || '') <= new Date(toDate));
        }
        setCurBookings([...currentBookings])
        calculateCommission(currentBookings)
      }
  
      const handleResetFilters = () => {
        setBookingId('')
        setTourId('')
        setTakingDate('')
        setDays('')
        setTourDate('')
        setTourDays('')
        setPriceFrom('')
        setPriceTo('')
        setAgentName('')
        setCurBookings([...bookings])
        calculateCommission(bookings)
      }
      
      const handleSort = (filter: string, type: string, order: string) => {
        const sortedBookings = type === 'string' 
          ? [...curBookings].sort((a: any, b: any) => order === ASCENDING_ORDER ? a[filter].localeCompare(b[filter]) : b[filter].localeCompare(a[filter])) 
          : [...curBookings].sort((a: any, b: any) => order === ASCENDING_ORDER ? +a[filter] - +b[filter] : +b[filter] - +a[filter]);
          
        setCurBookings(sortedBookings)
      }

      const handleInnerSort = (filter: string[], type: string, order: string) => {
        const sortedBookings = type === 'string' 
          ? [...curBookings].sort((a: any, b: any) => order === ASCENDING_ORDER 
                ? a[filter[0]][filter[1]].localeCompare(b[filter[0]][filter[1]]) 
                : b[filter[0]][filter[1]].localeCompare(a[filter[0]][filter[1]]) ) 
          : [...curBookings].sort((a: any, b: any) => order === ASCENDING_ORDER 
                ? +a[filter[0]][filter[1]] - +b[filter[0]][filter[1]] 
                : +b[filter[0]][filter[1]] - +a[filter[0]][filter[1]]);
          
        setCurBookings(sortedBookings)
      }

      const handlePaymentSort = (order: string) => {
        const sortedBookings = [...curBookings].sort((a, b) => order === ASCENDING_ORDER 
            ? (a.tourItem?.price || 0 * a.customers.length) - (b.tourItem?.price || 0 * b.customers.length) 
            : (b.tourItem?.price || 0 * b.customers.length) - (a.tourItem?.price || 0 * a.customers.length))
        setCurBookings(sortedBookings)
      }

      const handlePaxSort = (order: string) => {
        const sortedBookings = [...curBookings].sort((a, b) => order === ASCENDING_ORDER 
            ? a.customers.length - b.customers.length 
            : b.customers.length - a.customers.length)
        setCurBookings(sortedBookings)
      }
      
      const calculateCommission = (items: BookingModel[]) => {
        const result = items.reduce((res, curr) => res += (((curr.customers.length) * (curr.tourItem?.price || 0)) * (curr.tour?.commission || 0)) / 100  , 0)
        setCommition(result)
      }

    
  return (
    <div className="container-fluid" >
        
        <div className="container-fluid my-4 py-2" style={{background: 'white', borderRadius: '15px'}}>
      <div className="row mx-2 px-1">
          <div className="col col-lg-9 col-md-6 col-12">
            <h2 style={{color: 'rgb(44, 48, 53)'}}>BOOKINGS</h2>
          </div>
          <div className='col col-lg-3 col-md-6 col-12 mb-1'>
            <div className='row'>
            <div className="col col-6 ">
                <label className="form-label" style={{ fontWeight: 'bold' }}>Booking ID</label>
            </div>
            <div className="col col-6">
                <input onChange={(e) => setBookingId(e.target.value)} type="text" className="form-control" value={bookingId} />
            </div>
            </div>
          </div>
          <div className="col col-lg-9 col-md-6 col-12 mb-1">
          </div>
          <div className='col col-lg-3 col-md-6 col-12' >
            <div className="row">
            <div className="col col-6 ">
                <label className="form-label" style={{ fontWeight: 'bold' }}>Tour ID</label>
            </div>
            <div className="col col-6">
                <input onChange={(e) => setTourId(e.target.value)} type="text" className="form-control" value={tourId} />
            </div>
            </div>
          </div>
        </div>
        <div className="row m-2 p-1">
          <div className="col col-md-6 col-12">
            <div className="row">
                <div className="col col-lg-3  col-md-4 col-12 mb-2 mb-lg-0">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>Taken date</label>
                </div>
                <div className="col  col-lg-4  col-md-8 col-12 mb-2 mb-lg-0">
                <input
                    onKeyDown={(e) => { e.preventDefault() }}
                    onChange={(e) => setTakingDate(e.target.value)}
                    min={MIN_DATE_VALUE}
                    max={MAX_DATE_VALUE}
                    type="date"
                    className="form-control"
                    value={takingDate} />
                </div>
                <div className="col col-lg-1  col-md-4 col-12 mb-2 mb-lg-0">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>Days</label>
                </div>
                <div className="col col-lg-4  col-md-8 col-12 mb-2 mb-lg-0">
                    <input onChange={(e) => setDays(e.target.value)} type="text" className="form-control" value={days} /> 
                </div>
            </div>
          </div>
          <div className="col col-lg-1 col-md-2 col-12 mb-2 mb-lg-0">
            <label className="form-label" style={{ fontWeight: 'bold' }}>From $</label>
          </div>
          <div className="col col-lg-2 col-md-4 col-12 mb-2 mb-lg-0">
            <input onChange={(e) => setPriceFrom(e.target.value)} type="text" className="form-control" value={priceFrom} />
          </div>
          <div className="col col-lg-1 col-md-2 col-12 mb-2 mb-lg-0">
            <label className="form-label" style={{ fontWeight: 'bold' }}>To $</label>
          </div>
          <div className="col col-lg-2 col-md-4 col-12 mb-2 mb-lg-0">
          <input onChange={(e) => setPriceTo(e.target.value)} type="text" className="form-control" value={priceTo} />
          </div>
        </div>
        <div className="row m-2 p-1" >
        <div className="col col-md-6 col-12">
            <div className="row">
                <div className="col col-lg-3  col-md-4 col-12 mb-2 mb-lg-0">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>Tour date</label>
                </div>
                <div className="col  col-lg-4  col-md-8 col-12 mb-2 mb-lg-0">
                <input
                    onKeyDown={(e) => { e.preventDefault() }}
                    onChange={(e) => setTourDate(e.target.value)}
                    min={MIN_DATE_VALUE}
                    max={MAX_DATE_VALUE}
                    type="date"
                    className="form-control"
                    value={tourDate} />
                </div>
                <div className="col col-lg-1  col-md-4 col-12 mb-2 mb-lg-0">
                    <label className="form-label" style={{ fontWeight: 'bold' }}>Days</label>
                </div>
                <div className="col col-lg-4  col-md-8 col-12 mb-2 mb-lg-0">
                    <input onChange={(e) => setTourDays(e.target.value)} type="text" className="form-control" value={tourDays} /> 
                </div>
            </div>
          </div>
          <div className="col col-lg-1 col-md-2 col-12 mb-2 mb-lg-0">
            <label className="form-label" style={{ fontWeight: 'bold' }}>Agent</label>
          </div>
          <div className="col col-lg-2 col-md-4 col-12 mb-2 mb-lg-0">
            <input onChange={(e) => setAgentName(e.target.value)} type="text" className="form-control" value={agentName} />
          </div>
          <div className="col col-lg-3">
            <div className="row">
              <div className="col col-lg-6">
                <button onClick={handleFilters} className='btn btn-primary p-1 mx-2' style={{width: '100%'}}>Search</button>
              </div>
              <div className="col col-lg-6">
                <button onClick={handleResetFilters} className='btn btn-outline-secondary p-1 mx-2' style={{width: '100%'}}>Reset</button>
              </div>
            </div>
          </div>
          <div className="col col-12 pt-4">
            <p>Total commission: 
              <label className="form-label" style={{ fontWeight: 'bold' }}>
                  &nbsp;&nbsp;{commission} $
              </label>
            </p>
          </div> 
        </div>
      </div>

    <div className="row py-3 mb-2 px-3 " >
      <div className="col d-none col-xl-2 d-xl-block" style={{color: 'rgb(44, 48, 53)', fontWeight: 'bold'}}>
        Booking ID
        <br/>
        <button onClick={() => handleSort('id', STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleSort('id', STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col d-none d-md-block" style={{color: 'rgb(44, 48, 53)', fontWeight: 'bold'}}>
        Date
        <br/>
        <button onClick={() => handleSort('takingDate', STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleSort('takingDate', STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col col-xs-2 d-none d-md-block" style={{color: 'rgb(44, 48, 53)', fontWeight: 'bold'}}>
        Tour ID
        <br/>
        <button onClick={() => handleInnerSort(['tourItem', 'id'], NUMBER_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleInnerSort(['tourItem', 'id'], NUMBER_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col col-xl-1 col-md-2" style={{color: 'rgb(44, 48, 53)', fontWeight: 'bold'}}>
        Agent
        <br/>
        <button onClick={() => handleInnerSort(['user', 'firstName'], STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleInnerSort(['user', 'firstName'], STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col col-md-1" style={{color: 'rgb(44, 48, 53)', fontWeight: 'bold'}}>
        Price
        <br/>
        <button onClick={() => handleInnerSort(['tourItem', 'price'], NUMBER_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleInnerSort(['tourItem', 'price'], NUMBER_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col d-none d-md-block" style={{color: 'rgb(44, 48, 53)', fontWeight: 'bold'}}>
        Departure
        <br/>
        <button onClick={() => handleInnerSort(['tourItem', 'departureDate'], STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleInnerSort(['tourItem', 'departureDate'], STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col col-lg-1 d-none d-lg-block" style={{color: 'rgb(44, 48, 53)', fontWeight: 'bold'}}>
        Pax
      <br/>
        <button onClick={() => handlePaxSort(ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handlePaxSort(DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col col-md-1" style={{color: 'rgb(44, 48, 53)', fontWeight: 'bold'}}>
        Payment
        <br/>
        <button onClick={() => handlePaymentSort(ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handlePaymentSort(DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col col-md-1 d-none d-md-block" style={{color: 'rgb(44, 48, 53)', fontWeight: 'bold'}}>
        Status
        <br/>
        <button onClick={() => handleSort('paymentStatus', STRING_TYPE, ASCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundUp/></button>
        <button onClick={() => handleSort('paymentStatus', STRING_TYPE, DESCENDING_ORDER)} className='btn p-0'><IoIosArrowRoundDown/></button>
      </div>
      <div className="col col-md-1" style={{color: 'rgb(44, 48, 53)', fontWeight: 'bold'}}>
        Details
      </div>
    </div>
    <div className=' py-4 px-3' style={{background: 'white', borderRadius: '15px'}}>
      <BookingRow bookings={curBookings}/>
    </div>
  </div>
  )
}

export default BookingHistory
