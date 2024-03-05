import React, { useEffect, useState } from 'react'
import TourForm from '../forms/TourForm'
import TourItemForm from '../forms/TourItemForm'
import TourItemRow from '../components/TourItemRow'
import { TourItemModel } from '../../models/TourItemModel'
import { TourModel } from '../../models/TourModel'
import { tourService } from '../../config/service-config'

const AddTour = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [tourItems, setTourItems] = useState<TourItemModel[]>([])
    const [tour, setTour] = useState<TourModel | null>(null);
    const [tourItem, setTourItem] = useState<TourItemModel | null>(null);
 
    const saveTour = async (tourUpdate: TourModel) => {
        // TODO add validation
        let res;
        setIsLoading(true)
        if(tour){
            console.log('update')
            await tourService.update(tourUpdate)
        } else {
            console.log('add')
            res = await tourService.add(tourUpdate)
            tourUpdate.id = res?.id ? res.id : ''; 
        }
        setIsLoading(false)
        setTour({...tourUpdate, tourItems: tourItems})
    }

    const removeTour = async (id: string) => {
        setIsLoading(true)
        await tourService.delete(id)
        setTour(null)
        setTourItems([])
        setTourItem(null)
        setIsLoading(false)
    }

    const addTourItem = (tourItemUpdate: TourItemModel) => {
        // TODO add validation
        // setTour((prevTour) => ({
        //     ...prevTour,
        //     tourItems: [...prevTour.tourItems, tourItemUpdate!],
        // }));
        setTourItems((prevTourItems) => [...prevTourItems, tourItemUpdate]);
    }

    useEffect(() => {
        tour && setTour((prevTour) => ({
            ...prevTour,
            tourItems: tourItems,
          }));
    }, [tourItems])

    const updateTourItem = (tourItemUpdate: TourItemModel | null) => {
        tourItemUpdate && setTourItems((prevTourItems) => [...prevTourItems.map((e) => e.id === tourItemUpdate.id ? tourItemUpdate : e)]);
        // TODO update
        setTourItem(null)
    }

    const setUpdateTourItem = (tourItem: TourItemModel) => {
        // TODO add validation
        setTourItem(tourItem)
    }

    const removeTourItem = (id: string) => {
        setTourItems((prevTourItems) => [...prevTourItems.filter((e) => e.id !== id && e)]);
    }

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
                <TourForm 
                    removeTour={removeTour}
                    saveTour={saveTour} 
                    isUpdate={tour}
                    />
                <TourItemForm 
                    tour={tour}
                    addTourItem={addTourItem}
                    updateTourItem={updateTourItem}
                    isUpdate={tourItem}/>
            </div>
            <div className="row">
                <TourItemRow 
                    tourItems={tourItems} 
                    removeTourItem={removeTourItem} 
                    setUpdateTourItem={setUpdateTourItem}/>
            </div>

            <div className="row my-5">
                <div className="col col-lg-9 col-md-8 col-6"></div>
                <div className="col col-lg-3 col-md-4 col-6">
                    <button onClick={() => tour && saveTour(tour)} disabled={tour === null} className='btn btn-lg btn-primary' style={{width: '100%'}}>Save all changes</button>
                </div>
            </div>
          </>
          )
      }
      </div>
    )
}

export default AddTour
