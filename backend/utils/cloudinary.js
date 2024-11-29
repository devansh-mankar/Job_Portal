import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

cloudinary.uploader.upload(
  "path/to/file.pdf",
  {
    resource_type: "raw", // Ensure raw type for non-image files
  },
  function (error, result) {
    if (error) {
      console.error("Upload error:", error);
    } else {
      console.log("Upload result:", result);
    }
  }
);

export default cloudinary;
