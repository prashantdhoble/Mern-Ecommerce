import React from 'react'
import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Register = () => {
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] =useState("")
    const [answer,setAnswer] = useState("")
    const navigate = useNavigate()

    // form function
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
           const res = await axios.post("/api/v1/auth/register", {name, email, password, phone, address, answer});
           if(res && res.data.success){
              toast.success(res.data.message)
              navigate("/login")
           }else{
              toast.error(res.data.message)
           }
        }catch(error){
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <Layout>
            <div className="register d-flex flex-column  align-items-center mt-2" style={{ height: "100vh" }}>
                <h1 className='fs-2 p-3'>Register Page</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                       <input 
                       type="text" 
                       className="form-control" 
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       placeholder='Enter Your Name' 
                       id="exampleInputName"   
                       required  />
                    </div>

                    <div className="mb-3">
                        <input type="email" 
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                         placeholder='Enter your Email' 
                         id="exampleInputEmail" 
                         required />     
                    </div>

                    <div className="mb-3">
                        <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                         placeholder='Enter your Password' 
                         id="exampleInputPassword1"
                         required 
                         />
                    </div>

                    <div className="mb-3"> 
                        <input 
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} 
                        className="form-control" 
                        placeholder='Enter your phone' 
                        id="exampleInputPhone" 
                        required />     
                    </div>
                    
                    <div className="mb-3">                    
                        <input 
                        type="text"
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control" 
                        placeholder='Enter your Address' 
                        id="exampleInputAddress" 
                        required />     
                    </div>
                    
                    <div className="mb-3">                    
                        <input 
                        type="text"
                        value={answer} 
                        onChange={(e) => setAnswer(e.target.value)}
                        className="form-control" 
                        placeholder='What is Your best place' 
                        id="exampleInputAddress" 
                        required />     
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register