import axios from "axios";

const PORT = 3001;
const URL = "http://" + window.location.hostname + ":" + PORT + "/";

type requestMethods = ["get" | "post" | "put" | "delete", ""?];

export default async function api(endpoint: requestMethods, data = {}) {
    if (data) {
        return await axios[endpoint[0]](URL + endpoint[1], data);
    }
    return await axios[endpoint[0]](URL + endpoint[1]);
}
