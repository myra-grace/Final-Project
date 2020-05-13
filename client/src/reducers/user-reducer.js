const initialState = {
    status: 'idle',
    username: null,
    userAvatar: null,
    shareScreen: false,
    video: false,
    mic: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_USER_DATA': {
            return {
                ...state,
                status: 'checking database',
                username: action.username,
                userAvatar: action.userAvatar,
                video: false,
                mic: false,
            };
        }

        case 'RECEIVE_USER_DATA': {
            return {
                ...state,
                status: 'signed-in',
                username: action.username,
                userAvatar: action.userAvatar,
                shareScreen: action.shareScreen,
                video: action.video,
                mic: action.mic,
            };
        }

        case 'RECEIVE_USERNAME': {
            return {
                ...state,
                username: action.username,
            };
        }

        case 'RECEIVE_USER_AVATAR': {
            return {
                ...state,
                userAvatar: action.userAvatar,
            };
        }

        case 'SHARE_SCREEN_TOGGLE': {
            return {
                ...state,
                shareScreen: action.shareScreen
            };
        }

        case 'VIDEO_TOGGLE': {
            return {
                ...state,
                video: action.video
            };
        }

        case 'MIC_TOGGLE': {
            return {
                ...state,
                mic: action.mic
            };
        }

        case 'RECEIVE_USER_DATA_ERROR': {
            return {
                ...state,
                status: 'user data error',
            };
        }
    
        default:
            return state;
    }
}

export default userReducer;