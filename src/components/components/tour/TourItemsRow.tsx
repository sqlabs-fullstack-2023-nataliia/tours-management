import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTourItemStore } from "../../../store/useTourItemStore";
import { TourItemModel } from "../../../models/TourItemModel";
import { useState } from "react";

// TODO take status from firebase + mb add color picker to settings
const statusColor: { [key: string]: string } = {
  'Pending': '#fff7e6',
  'Available': '#ebfaeb',
  'Fully booked': '#e6f5ff',
  'Canceled': '#ffe6e6',
  'Completed': '#f0f0f5'
}

interface Props {
  tourItemsView?: TourItemModel[],
  viewMode?: boolean
}

const TourItemRow = ({viewMode, tourItemsView}: Props) => {

  const tourItems = useTourItemStore((state) => state.tourItems)
  const setTourItem = useTourItemStore((state) => state.setTourItem)
  const removeTourItem = useTourItemStore((state) => state.deleteTourItem)
  const [curTourItems, setCurTourItems] = useState<TourItemModel[]>(!!tourItemsView ? [...tourItemsView] : [...tourItems])

  return (
    <div className="container" >
      {
        curTourItems.length === 0
          ? (<div className='d-flex justify-content-center ' ><h3>No tour options found</h3></div>)
          : (<div className="container-fluid" >
            <div className="row py-3 mb-2 px-2">
              <div className="col col-lg-2" style={{ fontWeight: 'bold', color: 'rgb(44, 48, 53)' }}>ID</div>
              <div className={`col col-2 d-none d-${!!viewMode ? 'lg' : 'lg'}-block`} style={{ fontWeight: 'bold', color: 'rgb(44, 48, 53)' }}>Departure</div>
              <div className={`col col-xl-${!!viewMode ? '2' : '1'} col-2`} style={{ fontWeight: 'bold', color: 'rgb(44, 48, 53)' }}>Language</div>
              <div className={`col col-lg-2`} style={{ fontWeight: 'bold', color: 'rgb(44, 48, 53)' }}>Status</div>
              <div className={`col col-lg-2`} style={{ fontWeight: 'bold', color: 'rgb(44, 48, 53)' }}>Availability</div>
              <div className={`col d-none d-${!!viewMode ? 'md' : 'xl'}-block`} style={{ fontWeight: 'bold', color: 'rgb(44, 48, 53)' }}>Price</div>
              {!!!viewMode && <div className="col col-lg-2"></div>}
              
            </div>
            <div className='p-4' style={{ background: 'white', borderRadius: '15px' }}>
              {
                curTourItems.map((tourItem, index) => {
                  return <div className="row" key={index} style={{ background: statusColor[tourItem.status] }}>
                    <div className="col col-lg-2 pt-2">{tourItem.id}</div>
                    <div className={`col col-2 pt-2 d-none d-${!!viewMode ? 'lg' : 'lg'}-block`}>{tourItem.departureDate}</div>
                    <div className={`col pt-2 col-xl-${!!viewMode ? '2' : '1'} col-2`}>{tourItem.language}</div>
                    <div className={`col col-lg-2 pt-2`}>{tourItem.status}</div>
                    <div className={`col col-lg-2 pt-2`}>{tourItem.availability}</div>
                    <div className={`col pt-2 d-none d-${!!viewMode ? 'md' : 'xl'}-block`}>{tourItem.price}</div>
                    {
                      !!!viewMode && <>
                      <div className="col col-1 p-2">
                      <button onClick={() => setTourItem(tourItem)} className='accordion-button pt-2' ><TbPencil /></button>
                      </div>
                    {
                      !!removeTourItem &&
                      <div className="col col-1 p-2">
                        <button className='accordion-button pt-2' onClick={() => removeTourItem(tourItem.id)}><FaRegTrashAlt /></button>
                      </div>
                    }
                      </>
                    }
                  </div>
                })
              }
            </div>
          </div>)
      }
    </div>
  )
}

export default TourItemRow
