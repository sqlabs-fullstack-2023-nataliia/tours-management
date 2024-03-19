import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTourStore } from '../../store/useTourStore';
import { tourService } from '../../config/service-config';
import { TourModel } from '../../models/TourModel';
import BookTourComp from '../components/BookTourComp';

const BookTourPage = () => {
    
    const { tourId } = useParams();
    const { tourItemId } = useParams();
    const setTour = useTourStore((state) => state.setTour)
    const setTourItem = useTourStore((state) => state.setTourItem)

    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        (async () => {
          setIsLoading(true)
          const currentTour = tourId && (await tourService.get(tourId)).data() as TourModel;
          if (currentTour) {
            setTour(currentTour)
            const currTourItem = currentTour.tourItems.find((e: any) => e.id == tourItemId)
            currTourItem && setTourItem(currTourItem)
          }
          setIsLoading(false)
        })();
      }, [tourId]);

      

  return (
    <div className='container d-flex justify-content-center mt-3'>
        {
            isLoading 
            ? ( <div className='container d-flex justify-content-center '>
                    <div className="spinner-border text-secondary" role="status"></div>
                </div>) 
            : (
                <BookTourComp/>
            )
        }
    </div>
  )
}

export default BookTourPage
