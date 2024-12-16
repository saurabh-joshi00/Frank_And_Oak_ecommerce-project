import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import Breadcrumb from "../../common/Breadcrumb";
import Footer from "../../common/Footer";
import { ChromePicker } from "react-color";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function AddColor() {

  //Color Picker Code Start
  const [color, setColor] = useState("#ffffff");

  const [finalColor, setFinalColor] = useState("");

  // Handle color changes while sliding
  const handleChange = (newColor) => {
    setColor(newColor.hex);
  };

  // Set the color only when selection is complete
  const handleChangeComplete = (newColor) => {
    setFinalColor(newColor.hex); 
  };

  //Color Picker Code End


  const params = useParams();

  const [colorDetails, setColorDetails] = useState('');

  const colorHandler = (event) => {
    event.preventDefault();

    if(event.target._id.value == ''){
      axios.post('http://localhost:1500/api/admin/colors/add', event.target)
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
      axios.put(`http://localhost:1500/api/admin/colors/update/${event.target._id.value}`, event.target)
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

  useEffect(() => {

    if(params.id != null){
      axios.post(`http://localhost:1500/api/admin/colors/details/${params.id}`)
      .then((result) => {
        if(result.data.status == true){
          setColorDetails(result.data.data);
          setColor(result.data.data.code || "#ffffff");
          setFinalColor(result.data.data.code || "#ffffff");
        }
      })
      .catch((error) => {
        toast.error('Something went wrong !!');
      })
    }

  },[]);

  return (
    <>
    <Breadcrumb 
    path={"Colors"} 
    path2={ (params.id != null) ? 'Update Color' : "Add Color"} 
    slash={"/"} 
    />
          <div className="w-full min-h-[610px]">
            <div className="max-w-[1020px] mx-auto py-5">
              <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">
              { (params.id != null) ? 'Update Color' : "Add Color"}
              </h3>
              <form onSubmit={ colorHandler } className="p-3 border border-t-0 rounded-b-md border-slate-400" autoComplete="off">
              <input type="hidden" name="_id" value={ colorDetails._id } />
                <div className="mb-5">
                  <label
                    for="base-input"
                    className="block mb-5 text-md font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={ colorDetails.name }
                    id="base-input"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                    placeholder="Name"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="base-input"
                    className="block mb-8 text-md font-medium text-gray-900"
                  >
                    Color Picker
                  </label>
                  <ChromePicker color={color} onChange={handleChange} onChangeComplete={handleChangeComplete} />
                  <br />
                </div>

                <div className="mb-5">
                  <label
                    for="base-input"
                    className="block mb-5 text-md font-medium text-gray-900"
                  >
                    Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={ finalColor }
                    readOnly
                    defaultValue={ colorDetails.code }
                    id="base-input"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 uppercase "
                    placeholder="Code"
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
          </>
  );
}
