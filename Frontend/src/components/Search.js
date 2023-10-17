import React from "react";
import Layout from "./layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [value, setvalue] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search result</h1>
          <h6>
            {value?.result.length < 1
              ? "No Products Found"
              : `Found ${value?.result.length}`}
          </h6>

          <div className="d-flex flex-wrap mt-4">
          {value?.result.map(p => (

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
                <button className='btn btn-primary ms-1'>More Details</button>
                <button className='btn btn-secondary ms-1'>Add to Cart</button>
              </div>
            </div>

          ))}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
