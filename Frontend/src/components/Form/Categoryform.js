import React from 'react'

const Categoryform = ({value, setvalue, handlesubmit}) => {
    return (
        <>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <input 
                       type="text" 
                       className="form-control"  
                       placeholder='Enter new Category'
                       value={value}
                       onChange={(e)=>setvalue(e.target.value)}
                       />
                </div>
              
                <button type="submit" className="btn btn-primary">submit</button>
            </form>
        </>
    )
}

export default Categoryform