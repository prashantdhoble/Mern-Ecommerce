import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import useCategoryHook from '../Hooks/useCategoryHook'

const Categories = () => {
  const categories = useCategoryHook()

  return (
    <Layout>
        <div className="container">
           <div className="row">
            {categories.map((c) =>(
                <div className="col-md-6 mt-5 mb-3 gx-3 gy-3">
                  <button className='btn btn-primary' key={c._id}>
                     <Link className='btn btn-primary' to={`/category/${c.slug}`}>{c.name}</Link>
                  </button>
                </div>
            ))}
           </div>
        </div>
    </Layout>
  )
}

export default Categories