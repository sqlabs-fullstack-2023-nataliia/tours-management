import { useEffect, useState } from 'react'
import { useTourStore } from '../../store/useTourStore'
import { useTourSettingsStore } from '../../store/interfaces/useTourSettingsStore'

interface Props {
    actualLanguages: string,
    minPrice: number
}

const DEFAULT_VALUE = 'Select option'
const DEFAULT_AVAILABILITY = 15;


const TourView = ({actualLanguages, minPrice}: Props) => {

    const tour  = useTourStore((state) => state.tour)
    const tourItems = useTourStore((state) => state.tourItems)

    const [language, setLanguage] = useState('');
    //const [languages, setLanguages] = useState([...tourItems.map(e => e.language)]);
    const [departure, setDeparture] = useState('');
    const [departures, setDepartures] = useState([...tourItems.map(e => e.departureDate)])
    const [pax, setPax] = useState(1)
    const [maxPax, setMaxPax] = useState<number>(DEFAULT_AVAILABILITY)

    useEffect(() => {
        if(language){
            const currItems = tourItems.filter((e) => e.language === language)
            setDepartures(currItems.map(e => e.departureDate))
        } else {
            setDepartures(tourItems.map(e => e.departureDate))
        }
        setDeparture('')
    }, [language])

    useEffect(() => {
        if(departure){
            const currItems = tourItems.filter((e) => e.language === language && e.departureDate === departure)
            setMaxPax(currItems[0].availability)
        } else {
            setMaxPax(DEFAULT_AVAILABILITY)
        }
    }, [departure])

  return (
    <div className="row">
        <div className="col col-12">
            <h1>{tour?.name}</h1>
            <h5>Destination: {tour?.destination}</h5>
        </div>
        <div className="col col-lg-8 col-12">
            <div className='p-2'>
                <img src={tour?.image} style={{width: '100%', maxHeight: '80vh'}}/>
            </div>
            <p>Tour duration: 
                <span style={{fontWeight: 'bold'}}> {tour?.duration} {tour?.duration || 0 > 1 ? 'days' : 'day'}</span>
            </p>
            <p>Offered in: 
                <span style={{fontWeight: 'bold'}}> {actualLanguages}</span>
            </p>
        </div>
        <div className="col col-lg-4 col-12">
            

        {
            tourItems.length === 0 
            ? (<div className="container my-3 py-3 d-flex justify-content-center" style={{background: 'rgb(197, 35, 14)', borderRadius: '15px'}}>
                <h1 className='pt-2' style={{color: 'white', fontWeight: 'bold'}}>SOLD OUT.</h1>
            </div>)
            : (<div className="container my-3 py-3" style={{background: 'rgb(237, 244, 252)', borderRadius: '15px'}}>

                <h2>Starts from: <span style={{fontWeight: 'bold'}}>{minPrice} $</span></h2>

                <h6 className='mt-3' style={{fontWeight: 'bold'}}>Language</h6>
                <select onChange={(e) => setLanguage(e.target.value)} className="form-control form-select " aria-label="Default select example">
                <option value="" >{DEFAULT_VALUE}</option>
                    {
                        tourItems.map(e => e.language).map((e, i) => <option value={e} key={i}>{e}</option>)
                    }
                </select>

                <h6 className='mt-3' style={{fontWeight: 'bold'}}>Date</h6>
                <select onChange={(e) => setDeparture(e.target.value)} value={departure} className="form-control form-select " aria-label="Default select example">
                    <option value="" >{DEFAULT_VALUE}</option>
                    {
                        departures.map((e, i) => <option value={e} key={i}>{e}</option>)
                    }
                </select>

                <h6 className='mt-3' style={{fontWeight: 'bold'}}>Pax</h6>
                <div className="d-flex justify-content-center">
                    <button onClick={() => setPax(pax - 1)} disabled={pax <= 1} className='btn btn-outline-danger mx-3 '>-</button>
                    <span className='pt-2' style={{fontWeight: 'bold'}}>{pax}</span>
                    <button onClick={() => setPax(pax + 1)} disabled={pax >= maxPax} className='btn btn-outline-success mx-3 ' >+</button>
                </div>

                <div className="d-flex justify-content-center mt-5">
                    <button onClick={() => {}} className='btn btn-success mx-3 ' style={{width: '100%'}}>Check Availability</button>
                </div>

    </div>
            )
        }
                </div>

</div>
  )
}

export default TourView
