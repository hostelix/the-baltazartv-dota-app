import YoutubeService from '../services/youtube';
import {username_youtube} from "../config/config";

class AppService {
    constructor() {
        this.youtubeService = new YoutubeService();
    }

    getPlaylist() {
        return new Promise((resolve, reject) => {
            this.youtubeService.getChannel({
                part: "contentDetails",
                forUsername: username_youtube
            }).then((response) => {
                resolve(response.data.items[0].contentDetails.relatedPlaylists);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getRecentVideos() {
        return new Promise((resolve, reject) => {
            this.getPlaylist().then((playlists) => {

                this.youtubeService.getVideos({
                    part: "id,snippet,contentDetails",
                    playlistId: playlists.uploads,
                    maxResults: 12
                }).then((response) => {
                    resolve(response);
                });

            }).catch((err) => {
                reject(err);
            });
        });
    }
}

export default AppService;
