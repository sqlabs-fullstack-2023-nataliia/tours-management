import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useTourStore } from '../../store/useTourStore';
import { tourService } from '../../config/service-config';
import { TourModel } from '../../models/TourModel';
import TourView from '../components/TourView';
import { TourItemModel } from '../../models/TourItemModel';
import { useTourSettingsStore } from '../../store/interfaces/useTourSettingsStore';

const TourPage = () => {

    const { tourId } = useParams();

    const settings = useTourSettingsStore((state) => state.settings)
    const setTour = useTourStore((state) => state.setTour)
    const setTourItems = useTourStore((state) => state.setTourItems)

    const [isLoading, setIsLoading] = useState(false)
    const [languages, setLanguages] = useState(settings?.languages[0] || '')
    const [minPrice, setMinPrice] = useState(settings?.price[0] || 0)
  
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
            res = items.filter((e) => (new Date().toISOString().split("T")[0] < e.departureDate) && (e.status === 'Available' || 'Fully booked'));
            setActualLanguages(items)
            getMinPrice(res)
        }
        return res;
    }

    const setActualLanguages = (items: TourItemModel[]) => {
        const res = items.reduce((res: string, curr) => !res.split(', ').includes(curr.language) 
            ? (res += curr.language + ', ') 
            : res, '').slice(0, -2)
        res && setLanguages(res)
    }

    const getMinPrice = (items: TourItemModel[]) => {
        let res = settings?.price[0] || 0
        if(items.length > 0){
            res = items.reduce((res, tourItem) => tourItem.price < res ? tourItem.price : res, items[0].price);
        } 
        setMinPrice(res)
    }
    
  return (
    <div className="container m-3 p-3" style={{borderRadius: '15px', background: 'white'}}>
        {
            isLoading 
            ? (
                <div className='container d-flex justify-content-center'>
                    <div className="spinner-border text-secondary" role="status"></div>
                </div>
            ) 
            : (<TourView actualLanguages={languages} minPrice={minPrice}/>)
        }
    </div>
  )
}

export default TourPage
