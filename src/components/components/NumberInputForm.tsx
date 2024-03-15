import React, { useState } from 'react'

interface Props {
    name: string,
    items: number[]
    updateFn: (name: string, items: number[]) => void,
}

const DEFAULT_VALUE = 'Select option'

const NumberInputForm = ({name, items, updateFn}: Props) => {

    const [itemToRemove, setItemToRemove] = useState(DEFAULT_VALUE);
    const [itemToAdd, setItemToAdd] = useState('')
    
    const handleAdd = () => {
        if(!items.includes(+itemToAdd) && +itemToAdd !== 0){
            items.push(+itemToAdd)
            const sortedItems = items.sort((a, b) => a - b)
            updateFn(name, sortedItems);
            setItemToAdd('')
        }
    }

    const handleRemove = () => {
        let resItems = items.filter((e: number) => e !== +itemToRemove)
        updateFn(name, resItems);
        setItemToRemove(DEFAULT_VALUE)
    }

  return (
    <div className="col col-lg-4 col-12">
    <div className="container">
        <h6 style={{fontWeight: 'bold'}}>{name}</h6>
        <div className="row py-4" style={{background: 'rgb(251, 253, 255)', borderRadius: '15px'}}>
            <div className="col col-7 mb-2">
                <input onChange={(e) => {setItemToAdd(e.target.value)}} onKeyDown={(e) => {e.preventDefault()}} type="number" className="form-control" value={itemToAdd}/>
            </div>
            <div className="col col-5">
                <button onClick={handleAdd} className={`btn btn-outline-success`} style={{width: '100%'}}>Add</button>
            </div>
            <div className="col col-7 mb-2">
                <div className="input-group">
                    <select onChange={(e) => {setItemToRemove(e.target.value)}} className="form-control form-select" aria-label="Default select example">
                    <option value="" >{itemToRemove}</option>
                    {
                        items.map((e: number) => <option value={e + ''} key={e}>{e + ''}</option>)
                    }
                    </select>
                </div>
            </div>
            <div className="col col-5">
                <button onClick={handleRemove} className={`btn btn-outline-danger`} style={{width: '100%'}}>Delete</button>
            </div>
        </div>
    </div>
  </div>
  )
}

export default NumberInputForm
