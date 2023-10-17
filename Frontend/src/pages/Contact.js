import React from 'react'
import Layout from '../components/layout/Layout'
import {MdOutlineMail} from "react-icons/md"
import {BsTelephoneForward} from "react-icons/bs"
import {BiSupport} from "react-icons/bi"

const Contact = () => {
  return (

    <Layout>

      <div class="container mt-5">
        <div class="row">
          <div class="col-sm">
          <img src="https://media.istockphoto.com/id/1311934969/photo/contact-us.jpg?s=612x612&w=0&k=20&c=_vmYyAX0aFi-sHH8eYS-tLLNfs1ZWXnNB8M7_KWwhgg=" class="img-fluid" alt="Responsive image"/>
            
          </div>
          <div class="col-sm mt-5">
            <h1 className='bg-dark p-2 text-white text-center'>Contact us</h1>
            <p className='text-justify mt-2'>
               any query and info about product feel free to call anytime we 24x7 available
            </p>
            <p className='mt-3'>
               <MdOutlineMail/>  www.help@Emartapp.com
            </p>
            <p className='mt-3'>
               <BsTelephoneForward/>  012-23234345
            </p>
            <p className='mt-3'>
               <BiSupport/>  012-23234345
            </p>
          </div>
         
        </div>
      </div>

    </Layout>

  )
}

export default Contact