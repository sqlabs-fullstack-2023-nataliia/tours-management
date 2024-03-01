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

const App = () => {

  const setCurrentUser = useUserStore((state) => state.setUser)
  const [user, setUser] = useState<UserModel | null>(null);
  const relevantRoutes: RouteType[] 
    = useMemo<RouteType[]>(() => getRelevantRoutes(user?.role || "any"), [user])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("on auth state changed")
      if(user){
        const accountRef = collection(database, "accounts");
        const q = query(accountRef, where("uid", "==", auth.currentUser?.uid));
        const qSnapShot = await getDocs(q);
        if(!qSnapShot.empty){
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
      <Navigator routes={relevantRoutes}/>
      <Routes>
        { getRoutes(relevantRoutes) }
      </Routes>
    </BrowserRouter>
  )
}

export default App;

const getRoutes = (routes: RouteType[]) => {
  return routes.map((e) => <Route key={e.path} path={e.path} element={e.element}/>)
}

const getRelevantRoutes = (role: string) => {
  return ROUTES.filter(e => e.roles.includes(role) && e.displayRole.includes(role))
}