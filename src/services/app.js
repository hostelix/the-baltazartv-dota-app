import YoutubeService from '../services/youtube';
import {username_youtube} from "../config/config";
import {isEmpty} from 'lodash';

class AppService {
    constructor() {
        this.youtubeService = new YoutubeService();
        this.dataChannel = {};
    }

    loadDataChannel() {
        return new Promise((resolve, reject) => {
            this.getDataChannel().then((data) => {
                this.dataChannel = data;
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getDataChannel() {
        return new Promise((resolve, reject) => {
            if (isEmpty(this.dataChannel)) {
                this.youtubeService.getChannel({
                    part: "contentDetails",
                    forUsername: username_youtube
                }).then((response) => {
                    resolve(response.data.items[0]);
                }).catch((err) => {
                    reject(err);
                });
            } else {
                resolve(this.dataChannel);
            }
        });
    }

    getPlaylist(key) {
        return this.dataChannel.contentDetails.relatedPlaylists[key];
    }

    getChannelId() {
        return this.dataChannel.id;
    }

    getVideos(params) {
        return this.loadDataChannel().then(() => {
            return this.youtubeService.getVideos({
                part: "id,snippet,contentDetails",
                playlistId: this.getPlaylist('uploads'),
                maxResults: 12,
                ...params
            });
        });
    }

    search(params) {
        return this.loadDataChannel().then(() => {
            return this.youtubeService.search({
                part: "id,snippet",
                channelId: this.getChannelId(),
                maxResults: 12,
                ...params
            });
        });
    }
}

export default AppService;
