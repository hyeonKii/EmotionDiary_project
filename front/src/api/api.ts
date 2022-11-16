import axios from "axios";

const PORT = 3001;
const URL = "http://" + window.location.hostname + ":" + PORT + "/";

type MethodsType = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

export default async function API(endpoint: string[], data = {}) {
    const method = endpoint[0] as MethodsType;
    const address = endpoint[1];

    if (data) {
        return await axios[method](URL + address, data);
    }
    return await axios[method](URL + address);
}
