import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
    flex : 1; 
    justify-content: center;
    align-items : center;
    background-color : ${(props)=>props.theme.mainBgColor};
    `;
const Title = styled.Text`
    color : ${(props)=>props.theme.textColor};
    `;

const TV = () =>{

    return (
        <Container>
            <Title> TV </Title>
        </Container>
    )
    
}

export default TV