import axios from "axios";

const API_URL = "http://localhost:5000/api";

async function postJson(url, req) {
    try {

        console.log(req);
        const headers = {
            'Content-Type': 'application/json',
        }

        const res = await axios.post(
            API_URL + url, req, {
                headers: headers
            }
        );

        return res;

    } catch (error) {
        return error.response;
    }
}

async function getParam(url, req) {

    try {
        const res = await axios.get(API_URL + url, {
            params: req
        });

        return res;

    } catch (error) {
        return error.response;
    }
}


export {
    postJson,
    getParam
}