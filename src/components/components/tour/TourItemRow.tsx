import { TourItemView } from '../../../models/TourItemView'

// TODO take status from firebase + mb add color picker to settings
const statusColor: { [key: string]: string } = {
    'Pending': '#fff7e6',
    'Available': '#ebfaeb',
    'Fully booked': '#e6f5ff',
    'Canceled': '#ffe6e6',
    'Completed': '#f0f0f5'
  
}

interface Props {
    tourItemsView: TourItemView[]
}

const TourItemRow = ({tourItemsView}: Props) => {
    
  return (
    <div >
      {
        tourItemsView.map((item, index) => {
          return <div className="row p-2" key={item.id} style={{ background: statusColor[item.status] }}>
          <div className="col col-2" style={{color: 'rgb(44, 48, 53)'}}>{item.id}</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>{item.name}</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>
              <img src={item.image} rel='image' style={{ width: '100%', height: '50px' }}/>
          </div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>{item.language}</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>{item.duration}</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>{item.destination}</div>
          <div className="col col-2" style={{color: 'rgb(44, 48, 53)'}}>{item.departureDate}</div>
          <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>{item.status}</div>
          <div className="col col-2 ps-5" style={{color: 'rgb(44, 48, 53)'}}>{item.availability}/{item.totalAvailability}</div>

        </div>
        })
      }
    </div>
  )
}

export default TourItemRow
