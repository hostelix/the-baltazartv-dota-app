const YOUTUBE_URL_API = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyD44pLvfIx5i6S_h6LI9dMrxgTUZzE5UjQ";
const api = {
    URLS: {
        playListItems: `${YOUTUBE_URL_API}/playlistItems`,
        search: `${YOUTUBE_URL_API}/search`,
        channels: `${YOUTUBE_URL_API}/channels`
    }
};

export {YOUTUBE_URL_API, API_KEY, api};
