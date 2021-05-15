import React from 'react';
import styled from 'styled-components';

const TextMessage = styled.h1`
    color: ${(props) => props.color};
`;

const Message = ({ color, contents }) => {

    return (
        <TextMessage color={color}>{ contents }</TextMessage>
    )
}

export default Message;