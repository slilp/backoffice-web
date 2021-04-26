import axios from "axios";

const API_URL = process.env.SERVICE_URL || "http://localhost:5000/api";

async function postJson(url, req) {
    try {

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
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

async function postFromData(url, req) {
    try {

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'
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

async function putJson(url, req) {
    try {

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        const res = await axios.put(
            API_URL + url, req, {
                headers: headers
            }
        );

        return res;

    } catch (error) {
        return error.response;
    }
}

async function deleteAxios(url, req) {

    try {
        const res = await axios.delete(API_URL + url, {
            params: req
        });

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
    getParam,
    putJson,
    deleteAxios,
    postFromData
}