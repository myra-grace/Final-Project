export const chatWindow = () => ({
    type: 'CHAT_WINDOW',
});

//---------------------------------- USER ----------------------------------

export const requestUserData = (id, user, video, mic) => ({
    type: 'REQUEST_USER_DATA',
    id,
    user,
    video,
    mic,
})

export const receiveUserData = (id, username, video, mic) => ({
    type: 'RECEIVE_USER_DATA',
    id: id,
    user: username,
    video,
    mic,
})

export const receiveUserId = (id) => ({
    type: 'RECEIVE_USER_ID',
    id
})


export const receiveUsername = (username) => ({
    type: 'RECEIVE_USERNAME',
    username
})

export const receiveUserAvatar = (userAvatar) => ({
    type: 'RECEIVE_USER_AVATAR',
    userAvatar
})

export const shareScreenToggle = (shareScreen) => ({
    type: 'SHARE_SCREEN_TOGGLE',
    shareScreen
})

export const videoToggle = (video) => ({
    type: 'VIDEO_TOGGLE',
    video
})

export const micToggle = (mic) => ({
    type: 'MIC_TOGGLE',
    mic
})

export const receiveUserDataError = () => ({
    type: 'RECEIVE_USER_DATA_ERROR',
})

//---------------------------------- ROOM ----------------------------------

export const createRoom = () => ({
    type: 'CREATE_ROOM',
})

export const joinRoom = () => ({
    type: 'JOIN_ROOM',
})

export const receiveRoomId = (roomID) => ({
    type: 'RECEIVE_ROOM_ID',
    roomID: roomID
})

export const receiveUserToRoom = (user) => ({
    type: 'RECEIVE_USER_TO_ROOM',
    user: user
})

export const roomGameSelection = (game) => ({
    type: 'ROOM_GAME_SELECTION',
    game,
})

export const exitRoom = (roomID) => ({
    type: 'EXIT_ROOM',
    roomID,
})

export const requestRoomData = (roomID) => ({
    type: 'REQUEST_ROOM_DATA',
    roomID,
})

export const receiveRoomData = (roomID) => ({
    type: 'RECEIVE_ROOM_DATA',
    roomID,
})

export const receiveRoomDataError = () => ({
    type: 'RECEIVE_ROOM_DATA_ERROR',
})
