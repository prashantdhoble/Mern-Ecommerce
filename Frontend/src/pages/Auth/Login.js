import React from 'react'
import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate, useLocation} from "react-router-dom"
import { useAuth } from '../../context/authCo';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
           const res = await axios.post("/api/v1/auth/login", {email, password});
           if(res && res.data.success){
              toast.success(res.data.message)

              setAuth({
                //create a copy of auth (user:null token:"")
                ...auth,
                //and than fetch and check the authentication from backend
                user: res.data.user,
                token: res.data.token
              })
              localStorage.setItem("auth", JSON.stringify(res.data))

              navigate(location.state || "/")
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
        <div className="register d-flex flex-column  align-items-center mt-2" style={{ height: "100vh"}}>
        <h1 className='fs-2 p-3'>Login Page</h1>

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
                <input 
                type="password"    
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 placeholder='Enter your Password' 
                 id="exampleInputPassword1"
                 required 
                 />
            </div>
               
            <div className="mb-3">
            <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>

    </div>
        
        </Layout>
    )
}

export default Login