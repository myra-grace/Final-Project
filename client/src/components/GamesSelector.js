import React from 'react';
import styled from 'styled-components';

const GamesSelector = () => {
    // buttons for each game
    //when clicked, send to db
    // rooms/roomID/queue/Date.now()ID + is sent to Redux of who clicked/{game: gameName}
    return (
        <Wrapper>
            <p>GAME SELECTOR COMPONENT</p>
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: orange;

    display: flex;
    align-items: center;
    justify-content: center;
    //scroll thingy
    //overflow thing
`;

export default GamesSelector;