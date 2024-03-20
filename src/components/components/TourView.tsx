import { useEffect, useState } from 'react'
import { useTourStore } from '../../store/useTourStore'
import { useNavigate } from 'react-router-dom';

const DEFAULT_VALUE = 'Select option'
const DEFAULT_AVAILABILITY = 15;


const TourView = () => {

    const navigate = useNavigate();
    const tour  = useTourStore((state) => state.tour)
    const tourItems = useTourStore((state) => state.tourItems)

    const [language, setLanguage] = useState('');
    const [minPrice, setMinPrice] = useState(0)
    const [languages, setLanguages] = useState<string[]>([])
    const [departure, setDeparture] = useState('');
    const [departures, setDepartures] = useState([...tourItems.map(e => e.departureDate)])
    const [pax, setPax] = useState(1)
    const [maxPax, setMaxPax] = useState<number>(DEFAULT_AVAILABILITY)
    const [price, setPrice] = useState(0)
    const [checkAvailability, setCheckAvailability] = useState(false)
    const [tourItemId, setTourItemId] = useState('')

    useEffect(() => {
        if(tourItems.length !== 0){
            const set = new Set<string>()
            tourItems.forEach((item) => set.add(item.language))
            setLanguages(Array.from(set))
            console.log(tourItems)
            const min = tourItems.reduce((res, tourItem) => tourItem.price < res ? tourItem.price : res, tourItems[0].price);
            setMinPrice(min)
        }
    }, [])

    useEffect(() => {
        if(language){
            const currItems = tourItems.filter((e) => e.language === language)
            setDepartures(currItems.map(e => e.departureDate))
        } else {
            setDepartures(tourItems.map(e => e.departureDate))
        }
        !checkAvailability && setDeparture('')
    }, [language])

    useEffect(() => {
        if(departure){
            const currItem = tourItems.find((e) => e.language === language && e.departureDate === departure)
            if(currItem){
                setMaxPax(currItem.availability)
                setTourItemId(currItem.id)
                setPrice(currItem.price)
            }
        } else {
            setMaxPax(DEFAULT_AVAILABILITY)
        }
    }, [departure])

    const getReturningDate = () => {
        let date = new Date(departure)
        let days = date.getDate()
        days += tour?.duration || 0
        date.setDate(days)
        return date.toISOString().split("T")[0]
    }

    useEffect(() => {
        if(!checkAvailability){
            setLanguage('')
            setDeparture('')
            setPax(1)
        }
    }, [checkAvailability])

  return (
    <div className="row ">
        <div className="col col-12">
            <h1>{tour?.name}</h1>
            <h5>Destination: {tour?.destination}</h5>
        </div>
        <div className="col col-lg-8 col-12">
            <div className='p-2'>
                <img src={tour?.image} style={{width: '100%', height: '400px'}}/>
            </div>
            <p>Tour duration: 
                <span style={{fontWeight: 'bold'}}> {tour?.duration} {tour?.duration || 0 > 1 ? 'days' : 'day'}</span>
            </p>
            <p>Offered in: 
                <span style={{fontWeight: 'bold'}}> {languages.reduce((res, curr) => res + curr + ' ', '')}</span>
            </p>
        </div>
        <div className="col col-lg-4 col-12">
            

        {
            tourItems.length === 0 
            ? (<div className="container my-3 py-3 d-flex justify-content-center" style={{background: 'rgb(197, 35, 14)', borderRadius: '15px'}}>
                <h1 className='pt-2' style={{color: 'white', fontWeight: 'bold'}}>SOLD OUT.</h1>
            </div>)
            : (<>
                {
                    checkAvailability 
                    ? (<>
                        <div className="container my-3 py-5" style={{background: 'rgb(237, 244, 252)', borderRadius: '15px'}}> 
                        <div className="row">
                            <div className="col-5 my-2">
                            <h6>Language:</h6>
                            </div>
                            <div className="col-7 my-2">
                                <h5>{language}</h5>
                            </div>
                            <div className="col-5 my-2">
                                <h6>Departure:</h6>
                            </div>
                            <div className="col-7 my-2">
                                <h5>{departure}</h5>
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
                                <h5>{price} $</h5>
                            </div>
                            <div className="col-5 my-2">
                                <h6>Total: </h6>
                            </div>
                            <div className="col-7 my-2">
                                <h5>{price * pax} $</h5>
                            </div>
                        </div>
                            <div className="d-flex justify-content-center mt-3">
                                <button onClick={() => navigate(`/tours/book/${tour?.id}/${tourItemId}/${pax}`)} className='btn btn-primary mx-3 ' style={{width: '100%'}}>Book now</button>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <button onClick={() => setCheckAvailability(!checkAvailability)} className='btn btn-outline-secondary mx-3 ' style={{width: '100%'}}>Reset</button>
                            </div>
                        </div>
                    </>) 
                    : (<>
                        <div className="container my-3 py-3" style={{background: 'rgb(237, 244, 252)', borderRadius: '15px'}}>  
                            <h3>Starts from: <span style={{fontWeight: 'bold'}}>{minPrice} $</span></h3>
                            <h6 className='mt-3' style={{fontWeight: 'bold'}}>Language</h6>
                            <select onChange={(e) => setLanguage(e.target.value)} className="form-control form-select " aria-label="Default select example">
                                <option value="" >{DEFAULT_VALUE}</option>
                                {
                                    languages.map((e, i) => <option value={e} key={i}>{e}</option>)
                                }
                            </select>
                            <h6 className='mt-3' style={{fontWeight: 'bold'}}>Date</h6>
                            <select disabled={!language} onChange={(e) => setDeparture(e.target.value)} value={departure} className="form-control form-select " aria-label="Default select example">
                                <option value="" >{DEFAULT_VALUE}</option>
                                {
                                    departures.map((e, i) => <option value={e} key={i}>{e}</option>)
                                }
                            </select>
                            <h6 className='mt-3' style={{fontWeight: 'bold'}}>Pax</h6>
                            <div className="d-flex justify-content-center">
                                <button onClick={() => setPax(pax - 1)} disabled={pax <= 1} className='btn btn-outline-danger mx-3 '>-</button>
                                <span className='pt-2' style={{fontWeight: 'bold'}}>{pax}</span>
                                <button onClick={() => setPax(pax + 1)} disabled={pax >= maxPax} className='btn btn-outline-success mx-3 '>+</button>
                            </div>

                            <div className="d-flex justify-content-center mt-5">
                                <button disabled={!departure} onClick={() => setCheckAvailability(!checkAvailability)} className='btn btn-success mx-3 ' style={{width: '100%'}}>Check Availability</button>
                            </div>
                        </div>
                    </>)
                }
            </>
            )
        }
    </div>
</div>
  )
}

export default TourView



