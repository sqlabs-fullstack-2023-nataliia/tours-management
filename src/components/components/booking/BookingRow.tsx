import { useState } from 'react'

const BookingRow = () => {

    const [isLoading, setIsLoading] = useState(false)
    
  //   <div className="row py-3 mb-2 px-2">
  //   <div className="col col-2" style={{color: 'rgb(44, 48, 53)'}}>Booking ID</div>
  //   <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Date</div>
  //   <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Tour ID</div>
  //   <div className="col col-2" style={{color: 'rgb(44, 48, 53)'}}>Agent name</div>
  //   <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Price</div>
  //   <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>Payment</div>
  //   <div className="col col-2" style={{color: 'rgb(44, 48, 53)'}}>Payment Status</div>
  //   <div className="col col-1" style={{color: 'rgb(44, 48, 53)'}}>details</div>
  // </div>
  return (
    <div className="row" >
    {
      isLoading 
      ? (<div className='container d-flex justify-content-center'>
          <div className="spinner-border text-secondary" role="status"></div>
        </div> ) 
      : (<div className="row py-3 mb-2 px-2">
          <div className="col col-2">1</div>
          <div className="col col-1">2</div>
          <div className="col col-1">3</div>
          <div className="col col-2">4</div>
          <div className="col col-1">5</div>
          <div className="col col-1">6</div>
          <div className="col col-2">7</div>
          <div className="col col-1">8</div>

          {/* <div className="col col-1">
            <button onClick={() => {}} className="btn" type="button" data-bs-toggle="collapse" data-bs-target={`#${tour.id}`} aria-expanded="true" aria-controls={tour.id}><MdOutlineRemoveRedEye/></button>
          </div> */}

          {/* <div className="col col-1">
            <Link to={`add-update/${tour.id}`}>
              <button onClick={() => {}} className='btn'> <TbPencil/></button>
            </Link>
          </div>
          <div className="col col-1">
            <button className='btn' onClick={() => removeTour(tour.id)}><FaRegTrashAlt/></button>
          </div>
          <div className="accordion" id="accordionExample" >
            <div className="accordion-item" style={{background: 'rgb(242, 245, 247)'}}>
              <div id={tour.id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body" >
                {
                //  <TourItemRow viewMode={true}/>
                <BookingItemRow/>
                }
                </div>
              </div>
            </div>
          </div> */}
        </div>)
      }
  </div>
  )
}

export default BookingRow
