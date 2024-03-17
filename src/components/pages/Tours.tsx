import TourRow from '../components/TourRow';
import { useTourStore } from '../../store/useTourStore';

const Tours = () => {

  const tours = useTourStore((state) => state.tours)

  return (
    <div className="container-fluid">
      <div className="row py-3 mb-2 px-2">
        <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>#</div>
        <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Name</div>
        <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Destination</div>
        <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Duration</div>
        <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>Commission</div>
        <div className="col col-3"></div>
      </div>
      <div className='p-2' style={{background: 'white'}}>
      {
          tours.length === 0 
          ? (<div className='container d-flex justify-content-center'><h2>No Tours Found</h2></div>) 
          : (
            tours.map((e, i) => {
              return <TourRow tour={e} index={i + 1} key={e.id}/>
            })
          )
        }
      </div>
    </div>
  )
}

export default Tours

