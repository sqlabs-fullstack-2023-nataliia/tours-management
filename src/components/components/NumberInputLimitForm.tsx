import { useState } from 'react'

interface Props {
    name: string,
    items: number[],
    updateFn: (name: string, items: number[]) => void,
}

const NumberInputLimitForm = ({name, items, updateFn}: Props) => {

    const [minPrice, setMinPrice] = useState(items[0] || 0);
    const [maxPrice, setMaxPrice] = useState(items[1] || 0);
    const [priceStep, setPriceStep] = useState(items[2] || 0);

    const handleUpdate = () => {
        if(minPrice !== 0 && maxPrice !== 0 && priceStep !== 0 && minPrice < maxPrice){
        items[0] = minPrice
        items[1] = maxPrice
        items[2] = priceStep
        updateFn(name, items);
        } else {
            handleReset()
        }
    }
    const handleReset = () => {
        setMinPrice(items[0] || 0)
        setMaxPrice(items[1] || 0)
        setPriceStep(items[2] || 0)
    }
    
  return (
    <div className="col col-lg-4 col-12">
    <div className="container">
        <h6 style={{fontWeight: 'bold'}}>Price</h6>
        <div className="row py-4" style={{background: 'rgb(251, 253, 255)', borderRadius: '15px'}}>
            <div className="col col-5 mt-1">
                <label className="form-label">Min price</label>
            </div>
            <div className="col col-7 mb-2">
                <input onChange={(e) => {setMinPrice(+e.target.value)}} onKeyDown={(e) => {e.preventDefault()}} type="number" className="form-control" min={500} max={3500} value={minPrice} step={50}/>
            </div>
            <div className="col col-5 mt-1">
                <label className="form-label">Max price</label>
            </div>
            <div className="col col-7 mb-2">
                <input onChange={(e) => {setMaxPrice(+e.target.value)}} onKeyDown={(e) => {e.preventDefault()}} type="number" className="form-control" min={550} max={10000} value={maxPrice} step={50}/>
            </div>
            <div className="col col-5 mt-1">
                <label className="form-label">Step</label>
            </div>
            <div className="col col-7 mb-2">
                <input onChange={(e) => {setPriceStep(+e.target.value)}} onKeyDown={(e) => {e.preventDefault()}} type="number" className="form-control" min={20} max={1000} value={priceStep} step={10}/>
            </div>
           
            <div className="col col-6 mt-1 px-4">
                <button onClick={handleReset} className={`btn btn-outline-secondary`} style={{width: '100%'}}>Reset</button>
            </div>
            <div className="col col-6 mt-1 px-4">
                <button onClick={handleUpdate} className={`btn btn-outline-primary`} style={{width: '100%'}}>Update</button>
            </div>
        </div>

    </div>
  </div>
  )
}

export default NumberInputLimitForm
