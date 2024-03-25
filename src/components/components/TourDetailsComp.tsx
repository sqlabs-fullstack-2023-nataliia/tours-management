import React from 'react'

interface Props {
    duration: number,
    departure: string,
    language: string,
    price: number,
    pax: number,
}

// to use or to delete
const TourDetailsComp = ({duration, departure, language, price, pax}: Props) => {

        // TODO make another file for js functions
        const getReturningDate = () => {
            if (departure) {
                let date = new Date(departure)
                let days = date.getDate()
                days += duration 
                date.setDate(days)
                return date.toISOString().split("T")[0]
            }
        }

  return (
    <div className="row p-2 mx-1" style={{ background: 'rgb(237, 244, 252)', borderRadius: '15px' }}>
    <div className="col-5 my-2">
        <h6>Language:</h6>
    </div>
    <div className="col-7 my-2">
        <h5>{language}</h5>
    </div>
    <div className="col-5 my-2">
        <h6>Departure:</h6>
    </div>
    <div className="col-7 my-2">
        <h5>{departure}</h5>
    </div>
    <div className="col-5 my-2">
        <h6>Returning: </h6>
    </div>
    <div className="col-7 my-2">
        <h5>{getReturningDate()}</h5>
    </div>
    <div className="col-5 my-2">
        <h6>Pax: </h6>
    </div>
    <div className="col-7 my-2">
        <h5>{pax}</h5>
    </div>
    <div className="col-5 my-2">
        <h6>Price: </h6>
    </div>
    <div className="col-7 my-2">
        <h5>{price} $</h5>
    </div>
    <div className="col-5 my-2">
        <h6>Total: </h6>
    </div>
    <div className="col-7 my-2">
        <h5>{price * pax} $</h5>
    </div>
</div>
  )
}

export default TourDetailsComp
