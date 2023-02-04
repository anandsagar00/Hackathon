import Event from "../models/Events/Events.js";
import bigPromise from "../middlewares/bigPromise.js";
import fs from "fs";

export const newUpload = bigPromise(async (req, res, next) => {
  res.status(200).send({
    success: true,
    message: "Successfully Uploaded to folder",
  });
});

export const readata = bigPromise(async (req, res, next) => {
  let names = [];
  await fs.readFile("test.txt", "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
    names = data.split("\n").map((line) => line.trim());
    console.log(names);
    return res.status(200).json({
      success: true,
      data: names,
      message: "Successfully Sent the details",
    });
  });
});

export const thiefupload =bigPromise(async(req,res)=>{
  res.status(200).send({
    success: true,
    message: "Successfully Uploaded to folder",
  });
})
