import React from 'react'
import { redirect, useParams } from 'react-router-dom'

const BookTourPage = () => {
    
    const { tourId } = useParams();
    console.log(tourId)


  return (
    <div className='container d-flex justify-content-center' style={{background: 'red'}}>
      <h1>Book tour page</h1>
    </div>
  )
}

export default BookTourPage
