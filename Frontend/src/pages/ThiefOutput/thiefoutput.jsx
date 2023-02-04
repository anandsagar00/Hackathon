import React from "react";
import Navbar from "../../Components/Navbar";
import axios from "axios"
import {useState,useEffect} from "react"
function ThiefOutput() {
  var images = [];
  const importAll = (r) => {
    return r.keys().reduce((acc, key) => {
      acc.push({ name: key.split("/").pop().split(".")[0], url: r(key) });
      return acc;
    }, []);
  };
  
  const [details,setDetails]=useState([]);
  const shreyas = () =>{
        axios.get("http://localhost:1999/api/upload/readfile").then((res)=>{
            console.log(res.data);
            setDetails(res.data.data);
        }).catch((err) =>{
            console.log(err);
        })
  }

  useEffect(() => {
    shreyas();
  }, []);

  images = importAll(
    require.context("../../Components/imagesThief/", false, /\.(png|jpe?g|svg)$/)
  );
  console.log(images);
  return (
    <div>
      <Navbar />
      <p className="text-[4rem] pt-[2rem] text-red-600">Output Images of Thief With Names</p>
      <div className=" grid grid-cols-3">
        {images
          ? images.map((image, index) => {
              return (
                <div className="grid-cols-3">
                <div className="ml-[5rem] gap-[2rem]">
                  <img
                    className="w-[30rem] rounded-md shadow-2xl mt-[4rem] h-[25rem]"
                    src={image.url}
                  />
                  <p className="pt-[1rem] pr-[3rem] text-2xl">{image.name}</p>
                </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default ThiefOutput;
