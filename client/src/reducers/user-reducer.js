const initialState = {
    status: 'idle',
    id: null,
    username: null,
    userAvatar: null,
    chatDiv: false,
    shareDiv: false,
    video: false,
    mic: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_USER_DATA': {
            return {
                ...state,
                status: 'checking database',
                id: action.id,
                username: action.username,
                userAvatar: action.userAvatar,
                shareDiv: false,
                video: false,
                mic: false,
            };
        }

        case 'RECEIVE_USER_DATA': {
            return {
                ...state,
                status: 'signed-in',
                id: action.id,
                username: action.username,
                userAvatar: action.userAvatar,
                shareDiv: action.shareScreen,
                video: action.video,
                mic: action.mic,
            };
        }

        case 'RECEIVE_USER_ID': {
            return {
                ...state,
                status: 'signed-in',
                id: action.id,
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

        case 'CHAT_DIV_TOGGLE': {
            return {
                ...state,
                chatDiv: action.chatDiv
            };
        }

        case 'SHARE_DIV_TOGGLE': {
            return {
                ...state,
                shareDiv: action.shareDiv
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

        case 'GAMES_DIV_TOGGLE': {
            return {
                ...state,
                gamesDiv: action.gamesDiv
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