import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("Database connected"))
        .catch((error) => console.log("Error occurred:", error));
};
