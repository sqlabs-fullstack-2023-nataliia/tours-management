import { useEffect, useState } from 'react'
import TourForm from '../forms/TourForm'
import TourItemForm from '../forms/TourItemForm'
import TourItemRow from '../components/TourItemsRow'
import { TourModel } from '../../models/TourModel'
import { tourService } from '../../config/service-config'
import { useParams } from 'react-router-dom'
import { useTourStore } from '../../store/useTourStore'

const AddTour = () => {

  const { tourId } = useParams();
  const [isLoading, setIsLoading] = useState(false)

  const setTour = useTourStore((state) => state.setTour)
  const setTourItems = useTourStore((state) => state.setTourItems)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const tourToUpdate = tourId && (await tourService.get(tourId)).data() as TourModel;
      if (tourToUpdate) {
        setTour(tourToUpdate)
        setTourItems(tourToUpdate.tourItems)
      }
      setIsLoading(false)
    })();
  }, [tourId]);


  return (
    <div className='container mt-4'>
      {
        isLoading ? (
          <div className='container d-flex justify-content-center'>
            <div className="spinner-border text-secondary" role="status"></div>
          </div>
        )
          : (
            <>
              <div className="row">
                <TourForm />
                <TourItemForm />
              </div>
              <div className="row">
                <TourItemRow />
              </div>
              <div className="row my-5">
                <div className="col col-lg-9 col-md-8 col-6"></div>
                <div className="col col-lg-3 col-md-4 col-6">
                </div>
              </div>
            </>
          )
      }
    </div>
  )
}

export default AddTour
