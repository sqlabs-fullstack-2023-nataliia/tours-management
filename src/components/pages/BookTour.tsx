import { Link } from 'react-router-dom'
import { useTourStore } from '../../store/useTourStore'

const BookTour = () => {

  const tours = useTourStore((state) => state.tours)

  return (
    <div className="container">
      <div className="row">
        {
          tours.map((tour) => {
            return <div className="col col-lg-4 py-3 d-flex justify-content-center" key={tour.id}>
            <Link to={`${tour.tourItems.length > 0 ? tour.id : ''}`}>
            <div className="card" style={{width: '300px'}}>
              <img src={tour.image} className="card-img-top" style={{width: '100%', height: '45vh'}} alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{tour.name}</h5>
                <p className="card-text">Destination: 
                  <span style={{fontWeight: 'bold'}}>{tour.destination}</span>
                </p>
                <p className="card-text">Duration: {tour.duration}</p>
                <p className="card-text">Starts from: {tour.tourItems.reduce((min, obj) => Math.min(min, obj.price), tour.tourItems[0].price)} $</p>
              </div>
            </div>
            </Link>
          </div>
          })
        }

      </div>
    </div>
  )
}

export default BookTour
