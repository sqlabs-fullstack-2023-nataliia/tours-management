import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTourItemStore } from "../../../store/useTourItemStore";
import { TourItemModel } from "../../../models/TourItemModel";

// TODO take status from firebase + mb add color picker to settings
const statusColor: { [key: string]: string } = {
    'Pending': '#fff7e6',
    'Available': '#ebfaeb',
    'Fully booked': '#e6f5ff',
    'Canceled': '#ffe6e6',
    'Completed': '#f0f0f5'
}

interface Props {
    tourItem: TourItemModel,
    viewMode?: boolean
}

const TourItemRow = ({tourItem, viewMode}: Props) => {

    const setTourItem = useTourItemStore((state) => state.setTourItem)
    const removeTourItem = useTourItemStore((state) => state.deleteTourItem)
    
  return (
    <div className="row"  style={{ background: statusColor[tourItem.status] }}>
        <div className="col col-2 pt-2 d-none d-lg-block">{tourItem.id}</div>
        <div className={`col col-2 pt-2 d-none d-lg-block`}>{tourItem.departureDate}</div>
        <div className={`col pt-2 col-xl-1 `}>{tourItem.language}</div>
        <div className={`col d-none d-xl-block pt-2`}>{tourItem.status}</div>
        <div className={`col  pt-2`}>{tourItem.availability}</div>
        <div className={`col pt-2 d-none d-md-block`}>{tourItem.price}</div>
        {
            !viewMode &&
            <>
                <div className="col col-1 p-2">
                    <button onClick={() => setTourItem(tourItem)} 
                        disabled={ new Date(tourItem.departureDate) <= new Date()}
                        style={(new Date(tourItem.departureDate) <= new Date()) ? { border: 'none' } : {}}
                        className='pt-0 btn' >
                            <TbPencil />
                    </button>
                </div>
                <div className="col col-1 p-2">
                    <button 
                        disabled={tourItem.totalAvailability - tourItem.availability !== 0}
                        style={(tourItem.totalAvailability - tourItem.availability !== 0) ? { border: 'none' } : {}}
                        data-bs-toggle="modal" 
                        data-bs-target={`#rm-tour-i${tourItem.id.substring(0, 5)}`} 
                        className='pt-0 btn' 
                        onClick={() => {}}>
                            <FaRegTrashAlt />
                    </button>
                </div>
            </>
        }
                      
        <div className="modal fade" id={'rm-tour-i' + tourItem.id.substring(0, 5)} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <h6>You are going to delete tour with id {tourItem.id}, all data will be lost</h6>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col col-6"></div>
                            <div className="col col-3 pb-3">
                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" style={{width: '100%'}}>Cancel</button>
                            </div>
                            <div className="col col-3 pb-3">
                                <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={() => removeTourItem(tourItem.id)} style={{width: '100%'}}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TourItemRow

