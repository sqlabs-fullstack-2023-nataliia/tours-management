import React from 'react'
import { RouteType } from '../models/RouteType'

interface Props {
    routes: RouteType[]
}

const Navigator = ({routes}: Props) => {

    
  return (
    <nav className="navbar bg-dark border-bottom border-body navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">EasyTrip.</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
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
        </div>
    </nav>
  )
}

export default Navigator
