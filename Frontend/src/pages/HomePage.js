import React from 'react'
import { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import Prices from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'

const HomePage = () => {

  // this function is get from Context/authco.js 
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useCart()

 


  //get all categoruies
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category")
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategory()
    getTotal()
  }, [])


  //get all PRoducts
  const getallproducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

 

   //get total count
   const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count")
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
   if(page === 1) return 
   loadMore()
  }, [page])

   // load More 
   const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  //Filter by Ctegory
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getallproducts()

  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio])

  //get filterd Product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>

      <div className="row mt-3">
        <div className="col-md-3">

          <h5 className='text-center'>Filter by Category</h5>
          <div className="d-flex flex-column align-items-center justify-content-center">
            {categories?.map(c => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/*Price filter */}
          <h5 className='text-center mt-4'>Filter by price</h5>
          <div className="d-flex flex-column align-items-center ">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column align-items-center ">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              <button className='btn btn-danger' onClick={() => window.location.reload()}>Reset Filter</button>
            </Radio.Group>
          </div>

        </div>
        <div className="col-md-9">

          <h1 className='text-center'>All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map(p => (

              <div className="card m-2" key={p._id} style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top text-center"
                  style={{ width: "150px", height: "200px" }}
                  alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">$ {p.price}</p>
                  <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`) }>More Details</button>
                  <button className='btn btn-secondary ms-1' 
                        onClick={() =>{
                          setCart([...cart, p ]);
                          localStorage.setItem("cart", JSON.stringify([...cart, p]))
                          toast.success("Items added to cart")
                        }}>
                        Add to Cart
                  </button>
                </div>
              </div>

            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)
                }}>
                {loading ? "Loading...." : "LoadMore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage