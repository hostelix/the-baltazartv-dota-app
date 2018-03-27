import {fetchVideos, searchVideos} from "../services/youtube";
import * as _ from 'lodash';

const MODE_SEARCH = 'search';
const MODE_FETCH = 'fetch';

export default {
    namespace: 'video',

    state: {
        data: [],
        loading: false,
        hasMore: true,
        nextPageToken: "",
        mode: MODE_FETCH,
        query: ''
    },

    effects: {
        * fetch(_, {call, put}) {

            yield put({type: 'loadingOn'});
            yield put({type: 'clearData'});
            yield put({type: 'switchMode', payload: MODE_FETCH});

            const response = yield call(fetchVideos, {maxResults: 8});

            yield put({type: 'save', payload: response});
            yield put({type: 'loadingOff'});
        },
        * search(action, {call, put, select}) {

            yield put({type: 'loadingOn'});
            yield put({type: 'clearData'});
            yield put({type: 'switchMode', payload: MODE_SEARCH});

            const {payload} = action;

            const response = yield call(searchVideos, {maxResults: 8, q: payload.query});

            yield put({type: 'save', payload: {...response, query: payload.query}});
            yield put({type: 'loadingOff'});
        },
        * loadMore(_, {call, put, select}) {

            yield put({type: 'loadingOn'});

            const {mode, nextPageToken, query} = yield select(state => state.video);

            let response = {};

            switch (mode) {
                case MODE_FETCH: {
                    response = yield call(fetchVideos, {maxResults: 8, pageToken: nextPageToken});
                    break;
                }

                case MODE_SEARCH: {
                    response = yield call(searchVideos, {maxResults: 8, pageToken: nextPageToken, q: query});
                    break;
                }

                default: {
                    response = yield call(fetchVideos, {maxResults: 8, pageToken: nextPageToken});
                }
            }

            yield put({type: 'save', payload: response});
            yield put({type: 'loadingOff'});
        },
    },

    reducers: {
        'save'(state, action) {
            const {payload} = action;
            const {items, nextPageToken, query} = payload;
            let more = true;

            if (!_.has(payload, "nextPageToken")) {
                more = false;
            }

            return {
                ...state,
                data: state.data.concat(items),
                nextPageToken: nextPageToken,
                query: query,
                hasMore: more
            }
        },
        'clearData'(state) {
            return {...state, data: []}
        },
        'loadingOn'(state) {
            return {...state, loading: true};
        },
        'loadingOff'(state) {
            return {...state, loading: false};
        },
        'switchMode'(state, action) {
            const {payload} = action;
            return {...state, mode: payload};
        }
    },
};
