import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTourStore } from '../../../store/useTourStore';
import { tourService } from '../../../config/service-config';
import { TourModel } from '../../../models/TourModel';
import BookTourComp from '../../components/booking/BookTourComp';
import { useRelevantTourItemsStore } from '../../../store/useRelevantTourItemsStore';

const BookTourPage = () => {

  const { tourId } = useParams();
  const { tourItemId } = useParams();
  const navigate = useNavigate()
  const setRelevantTour = useTourStore((state) => state.setTour)
  const setRelevantTourItem = useRelevantTourItemsStore((state) => state.setRelevantTourItem)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const currentTour = tourId && (await tourService.get(tourId)).data() as TourModel;
      if (currentTour) {
        setRelevantTour(currentTour)
        const currTourItem = currentTour.tourItems.find((e: any) => e.id == tourItemId)

        currTourItem && setRelevantTourItem(currTourItem)
      } 
      setIsLoading(false)
    })();
  }, [tourId]);



  return (
    <div className='container d-flex justify-content-center mt-3 py-5' style={{ background: 'white', borderRadius: '15px', maxWidth: '90%' }}>
      {
        isLoading
          ? (<div className='container d-flex justify-content-center '>
            <div className="spinner-border text-secondary" role="status"></div>
          </div>)
          : (
            <BookTourComp />
          )
      }
    </div>
  )
}

export default BookTourPage
