import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { RouteType } from './models/RouteType'
import { ROUTES } from './config/route-config'
import Navigator from './components/Navigator'
import { useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, database } from './services/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { UserModel } from './models/UserModel'
import { useUserStore } from './store/useUserStore'
import { useTourStore } from './store/useTourStore'
import { tourService, tourSettingsService } from './config/service-config'
import { useTourSettingsStore } from './store/useTourSettingsStore'
import { TourSettingsModel } from './models/TourSettingsModel'

const App = () => {

  const setCurrentUser = useUserStore((state) => state.setUser)
  const [user, setUser] = useState<UserModel | null>(null);
  const setCurrentTours = useTourStore((state) => state.setTours)
  const setTourSettings = useTourSettingsStore((state) => state.setSettings)
  const [isLoading, setIsLoading] = useState(false)

  const relevantRoutes: RouteType[]
    = useMemo<RouteType[]>(() => getRelevantRoutes(user?.role || 'any'), [user])

  const displayRoutes: RouteType[]
    = useMemo<RouteType[]>(() => getDisplayRoutes(user?.role || 'any'), [user])

  useEffect(() => {
     loadTours()
     loadSettings()
  }, [])

  const loadTours = async () => {
    setIsLoading(true)
    const data = (await tourService.getAll()).request
    if (!data.empty) {
      setCurrentTours(
        data.docs.map((doc) => ({
          id: doc.id,
          uid: doc.data().uid,
          name: doc.data().name,
          destination: doc.data().destination,
          duration: doc.data().duration,
          image: doc.data().image,
          commission: doc.data().commission,
          tourItems: doc.data().tourItems
        }))
      );
    }
    setIsLoading(false)
  }

  const loadSettings = async () => {
    const data = (await tourSettingsService.getAll()).request
    if (!data.empty) {
      setTourSettings((data.docs[0]?.data() as TourSettingsModel) || null);
    }
  }


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("on auth state changed")
      if (user) {
        const accountRef = collection(database, "accounts");
        const q = query(accountRef, where("uid", "==", auth.currentUser?.uid));
        const qSnapShot = await getDocs(q);
        if (!qSnapShot.empty) {
          const currentUser = qSnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))[0] as UserModel
          setUser(currentUser)
          setCurrentUser(currentUser)
        }
      }
    })
  }, [])


  return (
    <BrowserRouter>
    {
      isLoading 
      ? (
        <div className='container d-flex justify-content-center mt-5'>
          <div className="spinner-border text-secondary" role="status"></div>
        </div>
      ) 
      : (
        <>
        <Navigator routes={displayRoutes} />
          <Routes>
            {getRoutes(relevantRoutes)}
          </Routes>
        </>
      )
    }
      
    </BrowserRouter>
  )
}

export default App;

const getRoutes = (routes: RouteType[]) => {
  return routes.map((e) => <Route key={e.path} path={e.path} element={e.element} />)
}

const getRelevantRoutes = (role: string) => {
  return ROUTES.filter(e => e.roles.includes(role) && e.roles.includes(role))
}

const getDisplayRoutes = (role: string) => {
  return ROUTES.filter(e => e.roles.includes(role) && e.displayRole.includes(role))
}