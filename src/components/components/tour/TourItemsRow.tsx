import { useTourItemStore } from "../../../store/useTourItemStore";
import { TourItemModel } from "../../../models/TourItemModel";
import { useEffect, useState } from "react";
import TourItemRow from "./TourItemRow";
import { tourService } from "../../../config/service-config";
import { useTourStore } from "../../../store/useTourStore";

interface Props {
  currItems?: TourItemModel[]
}

const TourItemsRow = ({currItems}: Props) => {

  const tourItems = useTourItemStore((state) => state.tourItems)
  const tour = useTourStore((state) => state.tour)
  const setTour = useTourStore((state) => state.setTour)
  const updateTour = useTourStore((state) => state.updateTour)

  const [curTourItems, setCurTourItems] = useState<TourItemModel[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setCurTourItems(currItems || tourItems)
  }, [tourItems, currItems])

  useEffect(() => {
    !!!currItems && updateCurrentTour()
  }, [tourItems])

  const updateCurrentTour = async () => {
    setIsLoading(true)
    if (tour) {
      updateTour({ ...tour, tourItems: tourItems });
      setTour({ ...tour, tourItems: tourItems })
      await tourService.update({ ...tour, tourItems: tourItems })
    }
    setIsLoading(false)
  }

  return (
    <div className="container" >
      {
        isLoading 
        ? (<div className='container d-flex justify-content-center mt-5' >
            <div className="spinner-border text-secondary" role="status"></div>
          </div>) 
        : (<>
        {
        curTourItems.length === 0
          ? (<div className='d-flex justify-content-center ' ><h3>No tour options found</h3></div>)
          : (<div className="container-fluid" >
            <div className="row py-3 mb-2 p-4">
              <div className="col col-lg-2 d-none d-lg-block" style={{ fontWeight: 'bold', color: 'rgb(44, 48, 53)' }}>ID</div>
              <div className={`col col-2 d-none d-lg-block`} style={{ fontWeight: 'bold', color: 'rgb(44, 48, 53)' }}>Departure</div>
              <div className={`col col-xl-1 `} style={{ fontWeight: 'bold', color: 'rgb(44, 48, 53)' }}>Language</div>
              <div className={`col d-none d-xl-block`} style={{ fontWeight: 'bold', color: 'rgb(44, 48, 53)' }}>Status</div>
              <div className={`col `} style={{ fontWeight: 'bold', color: 'rgb(44, 48, 53)' }}>Availability</div>
              <div className={`col d-none d-md-block`} style={{ fontWeight: 'bold', color: 'rgb(44, 48, 53)' }}>Price</div>
              {
                !!!currItems && <div className="col col-2"></div>
              }
            </div>
            <div className='p-4' style={{ background: 'white', borderRadius: '15px' }}>
              {
                curTourItems.map((tourItem, index) => {
                  return <TourItemRow tourItem={tourItem} key={index} viewMode={!!currItems}/>
                })
              }
            </div>
          </div>)
        }
        </>)
      }
    </div>
  )
}

export default TourItemsRow
