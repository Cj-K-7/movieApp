import React from "react";
import styled from "styled-components/native";
import { Movie, TV } from "../../api";
import HorizontalShowcase from "./Hor-Show";

const Container = styled.FlatList`
    flex : 1; 
    `;
const ListContainer = styled.View`
  margin-bottom: 20px;
  margin-top: 20px;
`;
const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-left: 30px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

export const HorSeperator = styled.View`
  width: 20px;
`;

interface HListProps {
    title : string;
    data : Movie[] | TV[];
}
const HorList: React.FC<HListProps> = ({ title, data } ) => (
    <ListContainer>
        <ListTitle>{title}</ListTitle>
        <Container
            data={data}
            keyExtractor={( item )=> item.id+"" }
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 25 }}
            ItemSeparatorComponent={() => <HorSeperator/>}
            renderItem={({ item }) => (
              <HorizontalShowcase
                poster_path={item.poster_path}
                original_title={item.original_title ?? item.original_name}
                vote_average={item.vote_average}
                fullData={item}
              />
            )}
          />
    </ListContainer>
)

export default HorList