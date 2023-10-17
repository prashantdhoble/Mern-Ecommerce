import {Routes, Route} from "react-router-dom"
import HomeaPage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import PageNotfound from './pages/PageNotfound'
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Dashboard from "./pages/user/Dashboard"
import Private from "./components/Routes/Private"
import ForgotPassword from "./pages/Auth/ForgotPassword"
import AdminRoute from "./components/Routes/AdminRoute"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import CreateCategory from "./pages/Admin/CreateCategory"
import CreateProduct from "./pages/Admin/CreateProduct"
import Products from "./pages/Admin/Products"
import Users from "./pages/Admin/Users"
import Orders from "./pages/user/Orders"
import Profile from "./pages/user/Profile"
import UpdateProduct from "./pages/Admin/UpdateProduct"
import Search from "./components/Search"
import ProductDetails from "./pages/ProductDetails"
import Categories from "./pages/Categories"
import CategoryProduct from "./pages/CategoryProduct"
import CartPage from "./pages/CartPage"

function App() { 
  return(
   <>
     <Routes>
        <Route path="/" element={<HomeaPage/>}/>
        <Route path="/product/:slug" element={<ProductDetails/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/category/:slug" element={<CategoryProduct/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/policy" element={<Policy/>}/>
        <Route path="*" element={<PageNotfound/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        
        {/*Protected path creating */}
        
        <Route path="/dashboard" element={<Private/>}>
             <Route path="user" element={<Dashboard/>}/>
             <Route path="user/orders" element={<Orders/>}/>
             <Route path="user/profile" element={<Profile/>}/>
        </Route>

        <Route path="/dashboard" element={<AdminRoute/>}>
             <Route path="admin" element={<AdminDashboard/>}/>
             <Route path="admin/create-category" element={<CreateCategory/>}/>
             <Route path="admin/create-product" element={<CreateProduct/>}/>  
             <Route path="admin/products" element={<Products/>}/>  
             <Route path="admin/product/:slug" element={<UpdateProduct/>}/>  
             <Route path="admin/users" element={<Users/>}/>
        </Route>
        
     </Routes>
   </>
  );
}

export default App;
