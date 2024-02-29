import React from 'react'
import { RouteType } from '../models/RouteType'
import { BASKET_PATH } from '../config/route-config'
import { SlBasket } from "react-icons/sl";
import { useUserStore } from '../store/useUserStore';
import { IoMdNotificationsOutline } from "react-icons/io";

interface Props {
    routes: RouteType[]
}

const Navigator = ({routes}: Props) => {

    const user = useUserStore((state) => state.user)

    
  return (
    <nav className="navbar bg-dark border-bottom border-body navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">EasyTrip.</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="col col-11">
                <ul className="navbar-nav">
                    {
                        routes.map(r => {
                            return <li className="nav-item" key={r.path}>
                            <a className="nav-link active" aria-current="page" href={r.path}>{r.label}</a>
                        </li>
                        })
                    }
                   
                </ul>
                </div>

                <div className="col col-1">
                <ul className="navbar-nav">
                {
                    user && user.role === 'user' && <li className="nav-item" key={BASKET_PATH} style={{alignItems: 'right'}}>
                        <a className="nav-link active" aria-current="page" href={BASKET_PATH}><SlBasket size={25}/></a>
                    </li>
                }
                {
                    user && <li className="nav-item" style={{alignItems: 'right'}}>
                        <a className="nav-link active" aria-current="page" href={BASKET_PATH}><IoMdNotificationsOutline size={25}/></a>
                </li>
                }
                </ul>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navigator
