import React, { useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([])

    // get all products
    const getallproducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product")
            setProducts(data.products)
            console.log(data.products)
        } catch (error) {
            console.log(error)
            toast.error("something error")
        }
    }

    //life cycle method
    useState(() => {
        getallproducts()
    }, [])

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'>All Product List</h1>

                    <div className='d-flex flex-wrap' >
                        {products?.map(p => (
                            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-links'>
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top text-center"
                                        style={{width:"150px", height:"200px"}}
                                        alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <p className="card-text">${p.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Products