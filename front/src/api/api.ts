import axios from "axios";

const PORT = 3002;
const URL = "http://" + window.location.hostname + ":" + PORT + "/api/";

type MethodTypes = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

export default async function api(endpoint: string[], data?: object) {
    const method = endpoint[0] as MethodTypes;
    const address = endpoint[1];

    if (data) {
        return await axios[method](URL + address, data);
    }
    return await axios[method](URL + address);
}
