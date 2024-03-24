import { useState } from 'react'
import TextInputForm from '../forms/settings/TextInputForm';
import { useTourSettingsStore } from '../../store/useTourSettingsStore';
import { TourSettingsModel } from '../../models/TourSettingsModel';
import NumberInputForm from '../forms/settings/NumberInputForm';
import { tourSettingsService } from '../../config/service-config';
import { auth } from '../../services/firebaseConfig';
import NumberInputLimitForm from '../forms/settings/NumberInputLimitForm';

const Settings = () => {

  // TODO add: max departure, min max duration, destination options, ?default image
    const [isLoading, setIsLoading] = useState(false);
    const settings = useTourSettingsStore((state) => state.settings)
    const setSettings = useTourSettingsStore((state) => state.setSettings)
    const initialSettings: TourSettingsModel = settings || {
        id: '', 
        uid: auth.currentUser?.uid || '',
        languages: [], 
        status: [], 
        availability: [], 
        commission: [], 
        price: []
    }
    
    // deep copy
    const [settingsUpdate, setSettingsUpdate] = useState<TourSettingsModel>(
        settings ? JSON.parse(JSON.stringify(settings)) : { ...initialSettings }
      );

    const updateFn = (name: string, items: string[] | number[]) => {
        setSettingsUpdate((prevSettings) => ({
            ...prevSettings,
            [name]: items,
        }));
    }

    const handleSave = async () => {
        setIsLoading(true)
        if(!settingsUpdate.id){
            const id = await tourSettingsService.add(settingsUpdate)
            settingsUpdate.id = id
        } else {
            await tourSettingsService.update(settingsUpdate)
        }
        setSettings(settingsUpdate)
        setIsLoading(false)
    }

    const handleReset = () => {
        console.log(initialSettings)
        console.log(settings)
        setSettingsUpdate(settings ? { ...settings } : { ...initialSettings })
    }

    const handleExit = () => {
        // TODO navigation
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
        <div className="row pt-3">
            <TextInputForm name='languages' items={settingsUpdate.languages} updateFn={updateFn}/>
            <TextInputForm name='status' items={settingsUpdate.status} updateFn={updateFn}/>
            <NumberInputForm name='availability' items={settingsUpdate.availability} updateFn={updateFn}/>
        </div>

        <div className="row pt-3">


          <NumberInputLimitForm name='price' items={settingsUpdate.price} updateFn={updateFn}/>
          <NumberInputForm name='commission' items={settingsUpdate.commission} updateFn={updateFn}/>
            
            <div className="col col-lg-4 col-12 pt-5">
              <div className="container pb-5">
                <button onClick={handleSave} className='btn btn-outline-primary m-2' style={{width: '100%'}}>Save</button>
                <button onClick={handleReset} className='btn btn-outline-secondary m-2' style={{width: '100%'}}>Reset</button>
                <button onClick={handleExit} className='btn btn-outline-danger m-2' style={{width: '100%'}}>Exit</button>
              </div>
            </div>
        </div>
        </>
        )
    }
    </div>
  )
}

export default Settings
