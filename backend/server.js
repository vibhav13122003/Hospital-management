import app from "./app.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";

// Load environment variables
dotenv.config({ path: "./config/.env" });

const PORT = process.env.PORT || 8000;

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
