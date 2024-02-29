import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { RouteType } from './models/RouteType'
import { ROUTES } from './config/route-config'
import Navigator from './components/Navigator'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './services/firebaseConfig'

const App = () => {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null);
      }
    })
  }, [])
  
  return (
    <BrowserRouter>
      <Navigator routes={ROUTES}/>
      <Routes>
        { getRoutes(ROUTES) }
      </Routes>
    </BrowserRouter>
  )
}

export default App

const getRoutes = (routes: RouteType[]) => {
  return routes.map((e) => <Route key={e.path} path={e.path} element={e.element}/>)
}