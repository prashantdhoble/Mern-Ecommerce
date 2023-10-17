import React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";


const ProductDetails = () => {
  const params = useParams();
 
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // initial details
  useEffect(() => {
    if (params?.slug) getproduct();
  }, [params?.slug]);

  //get products
  const getproduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getsimilarproducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar products
  const getsimilarproducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6 text-center">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top text-center"
            style={{ width: "300px", height: "400px" }}
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className=" text-center">Product Details</h1>
          <h4>Name : {product.name}</h4>
          <h4>Description : {product.description}</h4>
          <h4>Price : $ {product.price}</h4>
          <h4>Category : $ {product.category?.name}</h4>
          <button className="btn btn-secondary ms-1">Add to Cart</button>
        </div>
      </div>

       <hr/>

      <div className="row">
        <h4 className="">Similar products</h4>
        {relatedProducts.length < 1 && (<p>No similar Product found</p>)}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id} style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top text-center"
                style={{ width: "150px", height: "200px" }}
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}</p>
                <p className="card-text">$ {p.price}</p>
               
                <button className="btn btn-secondary ms-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
