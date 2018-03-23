import {fetchVideos} from "../services/youtube";

export default {
    namespace: 'video',

    state: {
        data: [],
        loading: false,
        hasMore: false,
        nextPageToken: "",
        nextPageTokenSearch: "",
    },

    effects: {
        * fetchInit(_, {call, put}) {

            yield put({
                type: 'loadingOn'
            });

            const response = yield call(fetchVideos, {maxResults: 8}); //no-lone-blocks

            yield  put({
                type: 'save',
                payload: response
            });

            yield put({
                type: 'loadingOff'
            });
        },
        * fetchMore(_, {call, put, select}) {
            yield put({
                type: 'loadingOn'
            });

            const nextPageToken = yield select(state => state.video.nextPageToken);

            const response = yield call(fetchVideos, {maxResults: 8, pageToken: nextPageToken});

            yield  put({
                type: 'save',
                payload: response
            });

            yield put({
                type: 'loadingOff'
            });
        },
    },

    reducers: {
        'save'(state, action) {
            const {payload} = action;

            return {
                ...state,
                data: state.data.concat(payload.items),
                nextPageToken: payload.nextPageToken,
                hasMore: true
            }
        },
        'loadingOn'(state) {
            return {...state, loading: true};
        },
        'loadingOff'(state) {
            return {...state, loading: false};
        }
    },
};
