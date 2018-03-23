import Request from "../utils/request";
import {API_KEY, api} from '../config/youtube';
import {CHANNEL_ID, PLAYLIST_ID, USERNAME_YOUTUBE} from "../config/config";

export async function fetchChannel() {
    return await Request.get(api.channels, {
        params: {
            key: API_KEY,
            part: "contentDetails",
            forUsername: USERNAME_YOUTUBE
        }
    }).then(response => response.data);
}

export async function fetchVideos(params) {
    return await Request.get(api.playListItems, {
        params: {
            part: "id,snippet,contentDetails",
            playlistId: PLAYLIST_ID,
            maxResults: 12,
            ...params
        }
    }).then(response => response.data);
}

export async function searchVideos(params) {
    return await Request.get(api.search, {
        params: {
            part: "id,snippet",
            channelId: CHANNEL_ID,
            maxResults: 12,
            ...params
        }
    }).then(response => response.data);
}

