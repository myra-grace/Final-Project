import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { Icon } from 'react-icons-kit';
import {xFeather} from 'react-icons-kit/feather/x'
import {x} from 'react-icons-kit/oct/x'
import {androidClose} from 'react-icons-kit/ionicons/androidClose'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {ic_cancel} from 'react-icons-kit/md/ic_cancel'
import {cross} from 'react-icons-kit/icomoon/cross'

import GameRenderer from '../components/GameRendered';
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

const Media = () => {
    let mediaContainerRef = useRef();
    const storage = firebase.storage();
    const storageRoomsRef = storage.ref('rooms');
    const database = firebase.database();
    const usersRef = database.ref('users');
    const roomsRef = database.ref('rooms');
    const roomID = useSelector(state => state.roomReducer.roomID);
    const userID = useSelector(state => state.userReducer.id);
    const sharedFiles = useSelector(state => state.roomReducer.sharedFiles);
    const [myQueuedIDs, setMyQueuedIDs] = useState([]);
    const [itemsInQueueArray, setItemsInQueueArray] = useState([]);
    const [queueIDs, setQueueIDs] = useState([]);
    const [switchMe, setSwitchMe] = useState(false);
    const [title, setTitle] = useState("");


    useEffect(() => {
        roomsRef.child(`${roomID}`).child("queue").on('value', snapshot => {
            console.log('snapshot: ', snapshot);
            console.log('snapshot.val(): ', snapshot.val());
            let valArr = [];
            let keyArr = [];
            snapshot.forEach((item) => {
                valArr.push(item.val());
                keyArr.push(item.key);
            })
            setItemsInQueueArray(valArr);
            setQueueIDs(keyArr);
            if (switchMe === false) {
                setSwitchMe(true);
            }
        });
    }, [switchMe, sharedFiles])


    const handleRemoveMedia = () => {
        let fileID = queueIDs[0];
        storageRoomsRef.child(`${roomID}`).child(`${fileID}`).delete();
        roomsRef.child(`${roomID}`).child("game").remove();
        roomsRef.child(`${roomID}`).child("queue").child(`${fileID}`).remove()
        .then(() => {
            let changedQueueIds = queueIDs.filter(id => {
                return id !== fileID;
            })
            let changedItemsInQueue = itemsInQueueArray.filter(item => {
                return itemsInQueueArray.indexOf(item) !== queueIDs.indexOf(fileID);
            })
            setItemsInQueueArray(changedItemsInQueue);
            setQueueIDs(changedQueueIds);
        })
        setSwitchMe(false);
    }

    let queueArr = [];
    useEffect(() => {
        queueArr = sharedFiles ? sharedFiles : [];
        setMyQueuedIDs(queueArr)
    }, [sharedFiles])

    
    return (
        <Wrapper ref={mediaContainerRef}>
            {itemsInQueueArray.length >= 1 && sharedFiles.includes(queueIDs[0]) ?
            <XButton onClick={handleRemoveMedia}>❌</XButton> : null
            }

            {itemsInQueueArray.length >= 1 && Object.keys(itemsInQueueArray[0])[0] === "game" ?
                <GameRenderer gameTitle={Object.values(itemsInQueueArray[0])[0]} currentMedia={queueIDs[0]} sharedFiles={sharedFiles} /> : null
            }
            
            {itemsInQueueArray.length >= 1 && Object.keys(itemsInQueueArray[0])[0] === "image" ?
            <StyledImage src={itemsInQueueArray[0]["image"]}/> : null
            }

            {itemsInQueueArray.length >= 1 && Object.keys(itemsInQueueArray[0])[0] === "audio" ?
            <figure>
                <figcaption>{title}</figcaption>
                <audio controls preload="auto">
                    <source src={itemsInQueueArray[0]["audio"]} />
                        Your browser does not support the <code>audio</code> element.
                </audio>
            </figure> : null
            }
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const XButton = styled.button`
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    color: #c4b1ab;
    position: absolute;
    top: 2%;
    right: 2%;
    z-index: 5;
`;

export default Media;