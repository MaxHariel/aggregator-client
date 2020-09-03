import fetch from "node-fetch";
import multer from 'multer';
const upload = multer();
const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
}



export async function post(req, res) {
    try {
        // const { subject } = req.body;
        console.log(req)
    } catch (error) {

    }
}