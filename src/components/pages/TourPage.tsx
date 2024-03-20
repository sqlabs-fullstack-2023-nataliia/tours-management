import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useTourStore } from '../../store/useTourStore';
import { tourService } from '../../config/service-config';
import { TourModel } from '../../models/TourModel';
import TourView from '../components/TourView';
import { TourItemModel } from '../../models/TourItemModel';

const TourPage = () => {

    const { tourId } = useParams();
    const setTour = useTourStore((state) => state.setTour)
    const setTourItems = useTourStore((state) => state.setTourItems)

    const [isLoading, setIsLoading] = useState(false)
  
    useEffect(() => {
      (async () => {
        setIsLoading(true)
        const currentTour = tourId && (await tourService.get(tourId)).data() as TourModel;
        if (currentTour) {
          setTour(currentTour)
          const actualItems = getCurrentTourItems(currentTour.tourItems)
          setTourItems(actualItems)
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
