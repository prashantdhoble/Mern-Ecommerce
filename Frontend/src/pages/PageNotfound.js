import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'

const PageNotfound = () => {
  return (

       <Layout>
        <div className='pnf d-flex flex-column justify-content-center align-items-center' style={{width: "100%" , height: "100vh"}}>
           <h1 className='pnf-title'>404 </h1>
           <h2 className='pnf-heading'> 🙄 Oops ! page not Found 🙄</h2>
           <Link to="/" className='pnf-btn'> Go Back</Link>
        </div>
       </Layout>
    
  )
}

export default PageNotfound