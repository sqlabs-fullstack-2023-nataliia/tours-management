import { TourModel } from '../../models/TourModel'

// TODO take status from firebase + mb add color picker to settings
const statusColor: { [key: string]: string } = {
    'Pending': '#fff7e6',
    'Available': '#ebfaeb',
    'Fully booked': '#e6f5ff',
    'Canceled': '#ffe6e6',
    'Completed': '#f0f0f5'
  
}

interface Props {
    tours: TourModel[]
}

const TourItemRow = ({tours}: Props) => {

    //const tours = useTourStore((state) => state.tours)
    
  return (
    <div >
    {
        tours.map((tour, index) => {
            return tour.tourItems.map((tourItem, i) => {
                return <div className="row p-2" key={tourItem.id} style={{ background: statusColor[tourItem.status] }}>
                <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>{tour.name}</div>
                <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>
                    <img src={tour.image} rel='image' style={{ width: '100%' }}/>
                </div>
                <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>{tour.destination}</div>
                <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>{tour.duration}</div>
                <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>{tourItem.departureDate}</div>
                <div className="col col-2" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>{tourItem.status}</div>
                <div className="col col-1" style={{fontWeight: 'bold', color: 'rgb(44, 48, 53)'}}>{tourItem.availability}/{tourItem.totalAvailability}</div>
              </div>
            })
        })
    }
    </div>
  )
}

export default TourItemRow
