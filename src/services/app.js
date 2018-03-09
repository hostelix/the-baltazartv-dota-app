import YoutubeService from '../services/youtube';
import {username_youtube} from "../config/config";
import {isEmpty} from 'lodash';

class AppService {
    constructor() {
        this.youtubeService = new YoutubeService();
        this.playlists = {};
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

    getVideos(params) {
        if (isEmpty(this.playlists)) {
            return this.getPlaylist().then((playlists) => {

                this.playlists = playlists;
                return this.youtubeService.getVideos({
                    part: "id,snippet,contentDetails",
                    playlistId: playlists.uploads,
                    maxResults: 12,
                    ...params
                });
            });
        }

        return this.youtubeService.getVideos({
            part: "id,snippet,contentDetails",
            playlistId: this.playlists.uploads,
            maxResults: 12,
            ...params
        });
    }
}

export default AppService;
