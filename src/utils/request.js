import axios from 'axios';
import {API_KEY} from "../config/youtube";

/* Set API KEY app youtube */

const Request = axios.create({
    params: {
        key: API_KEY
    }
});

export default Request;
