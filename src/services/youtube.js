import {API_KEY, api} from '../config/youtube';
import axios from 'axios';

class YoutubeService {
    constructor() {
        this.options = {
            key: API_KEY
        };
    }

    getChannel(params) {
        return axios.get(api.channels, {
            params: {
                ...this.options,
                ...params
            }
        });
    }

    getVideos(params) {
        return axios.get(api.playListItems, {
            params: {
                ...this.options,
                ...params
            }
        });
    }
}

export default YoutubeService;
