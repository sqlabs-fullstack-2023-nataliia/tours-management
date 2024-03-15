import React, { useState } from 'react'

interface Props {
    name: string,
    items: string[]
    updateFn: (name: string, items: string[]) => void,
}

const DEFAULT_VALUE = 'Select option'

const TextInputForm = ({name, items, updateFn}: Props) => {

    const [itemToRemove, setItemToRemove] = useState(DEFAULT_VALUE);
    const [itemToAdd, setItemToAdd] = useState('')

    const handleAdd = () => {
        // TODO validation
        let inputStr = itemToAdd.charAt(0).toUpperCase() + itemToAdd.slice(1);
        items.push(inputStr.trim())
        updateFn(name, items);
        setItemToAdd('')
    }

    const handleRemove = () => {
        // TODO validation
        if(itemToRemove && itemToRemove !== DEFAULT_VALUE){
            let resItems = items.filter(e => e !== itemToRemove)
            updateFn(name, resItems);
            setItemToRemove(DEFAULT_VALUE)
        }
    }

  return (
    <div className="col col-lg-4 col-12">
    <div className="container">
        <h6 style={{fontWeight: 'bold'}}>{name}</h6>
        <div className="row py-4" style={{background: 'rgb(251, 253, 255)', borderRadius: '15px'}}>
            <div className="col col-7 mb-2">
                <input onChange={(e) => {setItemToAdd(e.target.value)}} type="text" className="form-control" value={itemToAdd}/>
            </div>
            <div className="col col-5">
                <button onClick={handleAdd} className={`btn btn-outline-success`} style={{width: '100%'}}>Add</button>
            </div>
            <div className="col col-7 mb-2">
                <div className="input-group">
                    <select onChange={(e) => {setItemToRemove(e.target.value)}} className="form-control form-select" aria-label="Default select example">
                    <option value="" >{itemToRemove}</option>
                    {
                        items.map(e => <option value={e} key={e}>{e}</option>)
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

export default TextInputForm
