import React from "react";
import Navbar from "../Navbar";
function Output() {
  var images = [];
  const importAll = (r) => {
    return r.keys().reduce((acc, key) => {
      acc.push({ name: key.split("/").pop().split(".")[0], url: r(key) });
      return acc;
    }, []);
  };

  images = importAll(
    require.context("../../Components/Images/", false, /\.(png|jpe?g|svg)$/)
  );
  console.log(images);
  return (
    <div>
      <Navbar />
      <p className="text-[4rem] pt-[2rem] text-red-600">Output Images of Missing Person</p>
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

export default Output;
