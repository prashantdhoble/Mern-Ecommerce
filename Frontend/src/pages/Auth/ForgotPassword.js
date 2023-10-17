import React from 'react'
import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from "react-router-dom"


const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer,setAnswer] = useState("")
 

    const navigate = useNavigate();
  

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
           const res = await axios.post("/api/v1/auth/forgot-password", {email, newPassword, answer});
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
        <h1 className='fs-2 p-3'>Forgot password</h1>

        <form onSubmit={handleSubmit}>
            

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
                <input type="text" 
                className="form-control"
                 value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                 placeholder='Enter your favorate sport Name' 
                 id="exampleInputEmail" 
                 required />     
            </div>

            <div className="mb-3">
                <input 
                type="password"    
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                 placeholder='Enter your New Password' 
                 id="exampleInputPassword1"
                 required 
                 />
            </div>
               
           
            <button type="submit" className="btn btn-primary">Reset</button>
        </form>

    </div>
        
        </Layout>
  )
}

export default ForgotPassword