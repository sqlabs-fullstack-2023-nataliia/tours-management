import { useEffect, useState } from 'react'
import TourForm from '../forms/TourForm'
import TourItemForm from '../forms/TourItemForm'
import TourItemRow from '../components/TourItemRow'
import { TourModel } from '../../models/TourModel'
import { tourService } from '../../config/service-config'
import { useParams } from 'react-router-dom'
import { useTourStore } from '../../store/useTourStore'

const AddTour = () => {

    const { tourId } = useParams();
    const [isLoading, setIsLoading] = useState(false)

    const setTour = useTourStore((state) => state.setTour)
    //const tour = useTourStore((state) => state.tour)
    //const tourItems = useTourStore((state) => state.tourItems)
    const setTourItems = useTourStore((state) => state.setTourItems)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const tourToUpdate = tourId && (await tourService.get(tourId)).data() as TourModel;
            if(tourToUpdate){
                setTour(tourToUpdate)
                setTourItems(tourToUpdate.tourItems)
            }
            setIsLoading(false)
        })();
      }, [tourId]);

    // const saveTour = async (tourUpdate: TourModel) => {
    //     setIsLoading(true)
    //     if(tourUpdate.id){
    //         console.log('update')
    //         await tourService.update(tourUpdate)
    //         updateTour(tourUpdate)
    //     } else {
    //         console.log('add')
    //         const id = await tourService.add(tourUpdate)
    //         addTour(tourUpdate)
    //         navigate(`/tours/add-update/${id}`);
    //     }
    //     setIsLoading(false)
    //     setTour({...tourUpdate, tourItems: tourItems})
    // }

    // const removeTour = async (id: string) => {
    //     setIsLoading(true)
    //     await tourService.delete(id)
    //     deleteTour(id)
    //     setTour(null)
    //     //setTourItems([])
    //     setTourItem(null)
    //     setIsLoading(false)
    // }

    // const addTourItem = (tourItemUpdate: TourItemModel) => {
    //     setTourItems((prevTourItems) => [...prevTourItems, tourItemUpdate]);
    // }

    // const updateTourItem = (tourItemUpdate: TourItemModel | null) => {
    //     tourItemUpdate && setTourItems((prevTourItems) => [...prevTourItems.map((e) => e.id === tourItemUpdate.id ? tourItemUpdate : e)]);
    //     setTourItem(null)
    // }

    // const setUpdateTourItem = (tourItem: TourItemModel) => {
    //     setTourItem(tourItem)
    // }

    // const removeTourItem = (id: string) => {
    //     setTourItems((prevTourItems) => [...prevTourItems.filter((e) => e.id !== id && e)]);
    // }

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
                <TourForm/>
                <TourItemForm/>
            </div>
            <div className="row">
                <TourItemRow />
            </div>

            <div className="row my-5">
                <div className="col col-lg-9 col-md-8 col-6"></div>
                <div className="col col-lg-3 col-md-4 col-6">
                    {/* <button onClick={() => tour && saveTour(tour)} disabled={tour === null} className='btn btn-lg btn-primary' style={{width: '100%'}}>Save all changes</button> */}
                </div>
            </div>
          </>
          )
      }
      </div>
    )
}

export default AddTour
