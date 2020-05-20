import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';
import { Icon } from 'react-icons-kit';
import {ic_send} from 'react-icons-kit/md/ic_send'
import MessageBubble from "./ChatMessage";


const useKey = (key, cb) => {
    const callbackRef = useRef(cb);

    useEffect(() => {
        callbackRef.current = cb;
    });

    useEffect(() => {
        const keyHandler = (event) => {
            if (event.code === key) {
                callbackRef.current(event);
            }
        }
        document.addEventListener("keypress", keyHandler);
        return () => document.removeEventListener("keypress", keyHandler);
    }, [key]);
}

const Chat = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const [message, setMessage] = useState('');
    const [receive, setReceive] = useState([]);
    const username = useSelector(state => state.userReducer.username);
    const userID = useSelector(state => state.userReducer.id);
    const roomID = useSelector(state => state.roomReducer.roomID);
    let userInput = document.getElementById('userInput');

    const maxCharacters = 120;
    let characters = 0;

    const scrollToBottom = () => {
        const scrollerDiv = document.getElementById("scroller");
        scrollerDiv.scrollTop = scrollerDiv.scrollHeight * 2;
    }

    useEffect(() => {
        scrollToBottom();
    }, [message])

    const handleInput = (event) => {
        event.preventDefault();
        const userTyped = event.target.value;
        if (characters > maxCharacters) {
            return
        } else {
            setMessage(userTyped);
            characters += 1;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const currentDate = Date.now();
        if (message !== '' && roomID  !== null) {
            roomsRef.child(`${roomID}`).child("chat").child(`${currentDate}`).child(`${username}`).set(userInput.value);
        setMessage('');
        characters = 0;
        } else {
            return;
        }
    }

    const handleReceiveMessages = (message) => {
        setReceive(receive.concat(message));
    };

    useEffect(() => {
        let messages = {};
        let messageArray = [];
        const chatLimiter = () => {
            if (messageArray.length > 20) {
                messageArray.shift();
            }
            //count how many messages in "chat"
            //if >20, remove oldest(smallest #)
            // roomsRef.child(`${roomID}`).child("chat").child(`smallest#`).remove(); WORKED FIX TO REMOVE THE 1ST OF 20
            //else return
            }
        roomsRef.child(`${roomID}`).child("chat").on('child_added', snapshot => {
            messages = snapshot.val();
            messageArray.push(messages);
            chatLimiter();
            handleReceiveMessages(messageArray);
            scrollToBottom();
        });
    }, [])

    // roomsRef.child(`${roomID}`).child("chat").on('value', handleRecieveMessages);

    // useKey("Enter", handleSubmit);
    // handleRecieveMessages();


    return (
        <Wrapper>
            <StyledForm method="post" action="form">
                <StyledInput id="userInput" type="text" placeholder="Message" autocomplete="nope" value={message} onChange={handleInput}></StyledInput>
                <StyledButton onClick={handleSubmit}><Icon style={{color: '#c4b1ab'}} size="20" icon={ic_send} /></StyledButton>
            </StyledForm>
            <div style={{maxHeight: "95%"}}>
            <StyledDiv id="scroller">
                {receive.map((bubble, key) => {
                return (
                    <div key={key} style={{display: "flex", flexDirection: "column", overflowAnchor: "auto", borderBottom: "1px solid transparent"}}>
                        <MessageBubble username={Object.keys(bubble)} message={Object.values(bubble)}/>
                    </div>
                );
            })}
            </StyledDiv>
            </div>
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100%;
    height: 95%;
    padding: 10px;
    display: flex;
    flex-direction: column-reverse;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const StyledDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    overflow-anchor: none;
    
    &::-webkit-scrollbar {
        width: 0;
        display: none;
    }
`;

const StyledInput = styled.input`
    width: 85%;
    border-radius: 4px 0 0 4px;
    border: 1px solid magenta;
    padding: 10px;
    color: #c4b1ab;
    background-color: transparent;
`;

const StyledButton = styled.button`
    width: 15%;
    border: none;
    border-radius: 0 4px 4px 0;
    background-color: magenta;
`;

export default Chat;