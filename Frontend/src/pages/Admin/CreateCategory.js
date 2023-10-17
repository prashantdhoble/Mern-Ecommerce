import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryform from '../../components/Form/Categoryform'
import {Modal} from "antd"

const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false)
  const [selected, setSelected]= useState(null)
  const [updateName, setUpdateName]= useState("")

  // handle form
  const handlesubmit = async(e) =>{
    e.preventDefault()
    try{
      const {data} =await axios.post("/api/v1/category/create-category", {name})
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
      toast.error("somthing went wrong in edit category")
    }

  }

  //get all categoruies
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category")
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error)
      toast.error("some thing went wrong in gettting category")
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  //updatecategory
  const handleUpdate=async(e)=>{
    e.preventDefault()
     try{
        const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updateName})
        if(data.success){
          toast.success(`${updateName} is update`)
          setSelected(null)
          setUpdateName("")
          setVisible(false)
          getAllCategory()
        }else{
          toast.error(data.message)
        }
     }catch(error){
       toast.error("Not updating")
     }
  }

  //Delete Category
  const handleDelete=async(pId)=>{
     try{
        const {data} = await axios.delete(`http://localhost:3000/api/v1/category/delete-category/${pId}`)
        if(data.success){
          toast.success(`${name} is deleted`)
          
          setUpdateName("")
          getAllCategory()
        }else{
          toast.error(data.message)
        }
     }catch(error){
       toast.error("Not deleting")
     }
  }



  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className='p-3 w-50'>
               <Categoryform handlesubmit={handlesubmit} value={name} setvalue={setName}/>
            </div>
            <div className='"w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>

                  {categories?.map((c) => (
                    
                      <tr key={c._id}>
                        <td >{c.name}</td>
                        <td >
                           <button 
                              className='btn btn-primary ms-3' 
                              onClick={()=>{
                                setVisible(true); 
                                setUpdateName(c.name);
                                setSelected(c)
                              }}
                              >
                              Edit
                            </button>

                           <button className='btn btn-danger ms-3' onClick={()=>handleDelete(c._id)}>Delete</button>
                        </td>
                      
                      </tr>
                    
                  ))}

                </tbody>
              </table>
            </div>

            <Modal open={visible} onCancel= {() =>setVisible(false)} footer = {null} >
                <Categoryform value={updateName} setvalue={setUpdateName} handlesubmit = {handleUpdate}/>
            </Modal>

          </div>
         

        </div>
      </div>

    </Layout>
  )
}

export default CreateCategory