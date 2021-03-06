import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { storeInputTele } from '../actions';
//------------------------------------------------------------
//---------------------------------------------------------------------------------
const Telestrations = () => {
    const [wordInput, setWordInput] = useState('');
    const dispatch = useDispatch();

//------------------------------------- WORD -------------------------------------

    const maxCharacters = 15;

    useEffect(() => {
        dispatch(storeInputTele(wordInput));
    }, [wordInput])
        


    const handleInput = (event) => {
        event.preventDefault();
        const userTyped = event.target.value;
        if (wordInput.length >= maxCharacters) return //PREVENT SPACEBAR ALSO
        setWordInput(userTyped);
    }

//------------------------------------- HTML -------------------------------------

    return (
        <Wrapper>
            <img src="https://wallpaperplay.com/walls/full/c/9/b/40687.jpg" style={{width: "450px", height: "450px", objectFit: "cover", border: "1px solid magenta"}}/>
            <form style={{margin: "10px"}}>
                <StyledInput id="userInputTele" type="text" placeholder="Type in a word" autocomplete="nope" value={wordInput} onChange={handleInput}></StyledInput>
            </form>
        </Wrapper>
    )
}

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

const StyledInput = styled.input`
    text-align: center;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #FFD9FE;
    box-shadow: 0 0 10px 10px magenta;
    padding: 10px;
    color: #c4b1ab;
    background-color: transparent;
`;

export default Telestrations;