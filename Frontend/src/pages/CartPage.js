import Layout from "../components/layout/Layout";
import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authCo";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

   // total price
   const totalPrice =() =>{
    try{
        let total =0
         cart?.map((item) =>{
            total = total + item.price;
         });
         return total.toLocaleString("en-US", {
            style:'currency',
            currency:"USD"
         })
    }catch(error){
        console.log(error)
    }
   }

  // delete items
  const removeCartItems = (pid) =>{
    try{
       let myCart = [...cart]
       let index = myCart.findIndex(item => item._id === pid)
       myCart.splice(index, 1)
       setCart(myCart)
       localStorage.setItem("cart", JSON.stringify(myCart))
    }catch(error){
        console.log(error)
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `you have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please Login to checkout"
                  }`
                : "your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row card flex-row mb-2">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top text-center"
                    style={{ width: "150px", height: "200px" }}
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8">
                   <p>{p.name}</p>
                   <p>{p.description}</p>
                   <p>Price: ${p.price}</p>
                   <button className="btn btn-danger" onClick={() => removeCartItems(p._id)} > Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
             <h2 className="">Cart summary</h2>
             <p>Total | Checkout | payment</p>
             <hr/>
             <h4>Total : {totalPrice()} </h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
