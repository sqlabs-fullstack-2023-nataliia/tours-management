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
          <div className="col d-none d-xl-block" style={{color: 'rgb(44, 48, 53)'}}>{item.id}</div>
          <div className="col col-xl-1" style={{color: 'rgb(44, 48, 53)'}}>{item.name}</div>
          <div className="col col-1 d-none d-xl-block" style={{color: 'rgb(44, 48, 53)'}}>
              <img data-bs-toggle="modal" data-bs-target={`#${item.id}`} src={item.image} rel='image' style={{ width: '100%', height: '50px' }}/>
          </div>
          <div className="col col-1 d-none d-xl-block" style={{color: 'rgb(44, 48, 53)'}}>{item.language}</div>
          <div className="col col-1 d-none d-lg-block" style={{color: 'rgb(44, 48, 53)'}}>{item.duration} days</div>
          <div className="col col-xl-1" style={{color: 'rgb(44, 48, 53)'}}>{item.destination}</div>
          <div className="col d-none d-md-block" style={{color: 'rgb(44, 48, 53)'}}>{item.departureDate}</div>
          <div className="col col-1 d-none d-xl-block" style={{color: 'rgb(44, 48, 53)'}}>{item.commission} %</div>
          <div className="col col-xl-1" style={{color: 'rgb(44, 48, 53)'}}>{item.status}</div>
          <div className="col ps-5" style={{color: 'rgb(44, 48, 53)'}}>{item.availability}/{item.totalAvailability}</div>

          <div className="modal fade" id={`${item.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">{item.name}</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="" style={{color: 'rgb(44, 48, 53)'}}>
                    <img src={item.image} rel='image' style={{ width: '100%', height: '300px' }}/>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        })
      }
     
    </div>
  )
}

export default TourItemRow
