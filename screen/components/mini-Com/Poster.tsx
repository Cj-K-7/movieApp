import React from "react";
import styled from "styled-components/native";
import { imgPATH } from "../mini-Com/Utils";

const IMG = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 6px;
    `;

interface PosterProps {
    path : string;
}

const Poster:React.FC<PosterProps> = ({path}) => (
    <IMG source={{uri: imgPATH(path)}} />
)

export default Poster