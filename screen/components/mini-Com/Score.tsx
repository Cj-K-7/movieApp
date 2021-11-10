import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Vote = styled.Text`
    margin-top: 2px;
    font-size: 14px;
    color: ${props => props.theme.textColor};
    `;

interface VoteProps {
    vote_average : number;
}

const Score:React.FC<VoteProps> = ({vote_average}) => 
    <Vote>
        <Ionicons name='star' color={'#ffc048'} size={15}/>{' '}
        {vote_average > 0 ? `${vote_average}/10` : null}
    </Vote>

export default Score