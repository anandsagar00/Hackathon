import React from "react";
import { useState, useEffect } from "react";
import { notification } from "antd";
import background from "../../images/upload.jpg";
import { ROUTES } from "../../routes/Routerconfig";
import { useNavigate } from "react-router-dom";
import image1 from "../../images/123.webp";
import jwt_decode from "jwt-decode";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar";
const Dashboard = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, desc) => {
    api[type]({
      message: `${message}`,
      description: `${desc}`,
    });
  };

  {
    /* let token=localStorage.getItem("token");
    var decodedHeader = jwt_decode(token, { header: true });
console.log(decodedHeader);
var isExpired=false;
var dateNow = new Date();

if(decodedHeader.exp < dateNow.getTime())
    isExpired = true;

console.log(isExpired); */
  }

  const logout = () => {
    localStorage.removeItem("noty");
    localStorage.removeItem("uid");
    navigate(ROUTES.Home);
  };

  let noty = localStorage.getItem("noty");
  useEffect(() => {
    if (!noty) {
      openNotificationWithIcon("success", "Login", "Successfully Logged In");
    }
    noty = true;
    localStorage.setItem("noty", true);
  }, []);

  return (
    <div className="back">
      {contextHolder}
      <Navbar />
      <button
        class="button-30 text-black ml-[99rem] mt-[4rem] justify-end"
        role="button"
        onClick={() => logout()}
      >
        Log Out
      </button>

      <div className="text-white"><p className="pt-[1rem] font-serif text-[4rem]"> -- Welcome to Dashboard --</p></div>

      <div className="flex justify-center mt-[3rem]">
        <div class="flex items-center justify-center">
          <div class="rounded-lg shadow-lg bg-white max-w-md">
            <a href="#!">
              <img class="rounded-t-lg h-[18rem] w-[29rem]" src={image1} alt="" />
            </a>
            <div class="p-6">
              <h5 class="text-gray-900 text-3xl font-semibold mb-2">
                Lost Person Detection
              </h5>
              <p class="text-gray-700 text-lg mb-4">
                Make AI Model to work on identifying lost person details.
              </p>
              <button
                class="button-30 w-[10rem] text-lg mt-[1rem]"
                role="button"
                onClick={() => navigate(ROUTES.Missing)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-center ml-[6rem]">
          <div class="rounded-lg shadow-lg bg-white max-h-[90rem] max-w-md">
            <a href="#!">
              <img class="rounded-t-lg h-[18rem] w-[29rem]" src={background} alt="" />
            </a>    
            <div class="p-6">
              <h5 class="text-gray-900 text-3xl font-semibold mb-2">
                Thief Detection
              </h5>
              <p class="text-gray-700 text-lg mb-4">
                Make AI Model to work on identifying required thief details.
              </p>
              <button
                class="button-30 w-[10rem] mt-[1rem]"
                role="button"
                onClick={() => navigate(ROUTES.Missing)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[14.3rem]"></div>
    </div>
  );
};
export default Dashboard;
