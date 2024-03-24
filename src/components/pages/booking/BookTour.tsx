import { useNavigate } from 'react-router-dom'
import { useTourStore } from '../../../store/useTourStore'

const BookTour = () => {

  const tours = useTourStore((state) => state.tours)
  const navigator = useNavigate();

  return (
    <div className="container">
      <div className="row">
        {
          tours.map((tour) => {
            return <div onClick={() => navigator(`${tour.tourItems.length > 0 ? tour.id : ''}`)} className="col col-lg-4 col-xl-3 py-3 d-flex justify-content-center" key={tour.id}>
              <div className="card" style={{ width: '300px', borderRadius: '25px' }}>
                <img src={tour.image} className="card-img-top" style={{ width: '100%', height: '45vh', borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }} alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{tour.name}</h5>
                  <p className="card-text">Destination:
                    <span style={{ fontWeight: 'bold' }}>{tour.destination}</span>
                  </p>
                  <p className="card-text">Duration: {tour.duration}</p>
                  <p className="card-text">Starts from: {tour.tourItems.reduce((min, obj) => Math.min(min, obj.price), tour.tourItems[0].price)} $</p>
                </div>
              </div>
            </div>
          })
        }

      </div>
    </div>
  )
}

export default BookTour
