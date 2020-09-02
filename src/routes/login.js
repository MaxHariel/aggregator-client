import fetch from "node-fetch";
import { json } from "body-parser";

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
},

export async function post(req, res) {
    try {
        const { email, password } = req.body;

        const result = await fetch("http://127.0.0.1:3333/authenticate", {
            method: "POST",
            headers,
            body: JSON.stringify({ email, password })
        })

        const parsed = await result.json();
        if (typeof parsed.error !== "undefined") {
            throw new Error(parsed.error);
        }

        req.session.token = parsed.token;
        res.end(JSON.stringify({ token: parsed.token }))
    } catch (error) {
        res.end(JSON.stringify({ error: error.message }))
    }
}