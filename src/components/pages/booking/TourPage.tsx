import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { tourService } from '../../../config/service-config';
import { TourModel } from '../../../models/TourModel';
import TourView from '../../components/booking/TourView';
import { TourItemModel } from '../../../models/TourItemModel';
import { useRelevantToursStore } from '../../../store/useRelevantToursStore';
import { useRelevantTourItemsStore } from '../../../store/useRelevantTourItemsStore';

const TourPage = () => {

    const { tourId } = useParams();
    const setRelevantTour = useRelevantToursStore((state) => state.setRelevantTour)
    const serRelevantTourItems = useRelevantTourItemsStore((state) => state.setRelevantTourItems)

    const [isLoading, setIsLoading] = useState(false)
  
    useEffect(() => {
        (async () => {
          setIsLoading(true)
          const currentTour = tourId && (await tourService.get(tourId)).data() as TourModel;
          if (currentTour) {
            setRelevantTour(currentTour)
            const actualItems = getCurrentTourItems(currentTour.tourItems)
            serRelevantTourItems(actualItems)
          }
          setIsLoading(false)
        })();
    }, [tourId]);

    const getCurrentTourItems = (items: TourItemModel[]) => {
        let res: TourItemModel[] = []
        if(items.length > 0){
            res = items.filter((e) => (new Date().toISOString().split("T")[0] < e.departureDate) && (e.status === 'Available'));
        }
        return res;
    }
    
  return (
    <div className="container-fluid p-3">
        <div className="row">
            <div className="col">
                <div className="container" style={{borderRadius: '15px', background: 'white', width: '100%'}}>
                {
                    isLoading 
                    ? (
                    <div className='container d-flex justify-content-center'>
                        <div className="spinner-border text-secondary" role="status"></div>
                    </div>
                    ) 
                    : (<TourView />)
                }
                </div>
            </div>
        </div>
    </div>
  )
}

export default TourPage
