import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddSubCategory() {

  const params = useParams();
  
  //to get main-categories
  const [categories, setCategories] = useState([]);

  //to get and save category-details for update
  const [subCategoryDetails, setSubCategoryDetails] = useState('');

  const formHandler = (event) => {
    event.preventDefault();

    if(event.target._id.value == ''){
      axios.post('http://localhost:1500/api/admin/sub-categories/add', event.target)
        .then( (success) => {
          if(success.data.status == true){
            event.target.reset();
            toast.success(success.data.message);
          } else {
            toast.error(success.data.message);
          }
        }).catch( (error) => {
            toast.error('Something went wrong !!');
        })
    } else{
      axios.put(`http://localhost:1500/api/admin/sub-categories/update/${event.target._id.value}`, event.target)
        .then( (success) => {
          if(success.data.status == true){
            event.target.reset();
            toast.success(success.data.message);
          } else {
            toast.error(success.data.message);
          }
        }).catch( (error) => {
            toast.error('Something went wrong !!');
        })
    }

  }

  useEffect( () => {
    axios.post('http://localhost:1500/api/admin/categories',{
      page : 1,
      limit : 200,
      // status : true,
    })
    .then( (success) => {
      if(success.data.status == true){
        setCategories(success.data.data);
      } else {
        setCategories([]);
      }
      
    }).catch( (error) => {
        toast.error('Something went wrong !!');
    })
  },[]);

  //for update-page to edit details
  useEffect(() => {

    if(params.id != null){
      axios.post(`http://localhost:1500/api/admin/sub-categories/details/${params.id}`)
      .then((result) => {
        if(result.data.status == true){
          setSubCategoryDetails(result.data.data);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong !!');
      })
    }

  },[]);

  return (
    <section className="w-full">
          <Breadcrumb
            path={"Sub Category"}
            path2={ (params.id != null) ? 'Update Sub Category' : "Add Sub Category"}
            slash={"/"}
          /> 
          <div className="w-full min-h-[610px]">
            <div className="max-w-[1020px] mx-auto py-5">
              <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                { (params.id != null) ? 'Update Sub Category' : "Add Sub Category"}
              </h3>
              <form onSubmit={ formHandler } autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
                <input type="hidden" value={ subCategoryDetails._id } name="_id" />
              <div className="mb-5">
                  <label
                    for="base-input"
                    className="block mb-5 text-md font-medium text-gray-900"
                  >
                    Select Category
                  </label>

                  <select
                    id="default"
                    name="parent_Id"
                    className=" border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option value=''>--Select Category--</option>
                    {
                      categories.map((v, i) => {
                        return(
                          <option value={ v._id } 
                            selected = { 
                              (subCategoryDetails.root_Id == v._id)
                              ?
                              'selected'
                              :
                              '' 
                            } 
                          >{ v.name }</option>
                        )
                      })
                    }

                  </select>
                </div>
                <div className="mb-5">
                  <label
                    for="base-input"
                    className="block mb-5 text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={ subCategoryDetails.name }
                    id="base-input"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                    placeholder="Enter Name"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="base-input"
                    className="block mb-5 text-md font-medium text-gray-900"
                  >
                    featured Category
                  </label>

                  <select
                    id="default"
                    name="featured_Categories"
                    className=" border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                      <option value=''>--Select Featured Category--</option>
                      <option value="Yes" selected = { 
                              (subCategoryDetails.featured_Categories == 'Yes')
                              ?
                              'selected'
                              :
                              '' 
                            } 
                            >Yes</option>
                      <option value="No" selected = { 
                              (subCategoryDetails.featured_Categories == 'No')
                              ?
                              'selected'
                              :
                              '' 
                            } 
                            >No</option>
                  </select>
                </div>
                <div className="mb-5">
                  <label
                    for="base-input"
                    className="block mb-5 text-md font-medium text-gray-900"
                  >
                    Image
                  </label>
                  <div className="max-w-full">
                    <label for="file-input" className="sr-only">
                      Choose file
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="file-input"
                      className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  
                      file:bg-gray-50 file:border-0
                      file:me-4
                      file:py-3 file:px-4
                      "
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    for="base-input"
                    className="block mb-5 text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    name="order"
                    defaultValue={ subCategoryDetails.order }
                    id="base-input"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                    placeholder="Order"
                  />
                </div>
                <button
                  type="submit"
                  className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
    </section>
  );
}
