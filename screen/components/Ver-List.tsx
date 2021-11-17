import React from "react";
import styled from "styled-components/native";
import Vertical_Showcase from "./Ver-Show";

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

export const VerSeperator = styled.View`
  height: 20px;
`;

interface VListProps {
    title : string;
    data : any[];
}
const VerList: React.FC<VListProps> = ({ title, data } ) => (
    <ListContainer>
        <ListTitle>{title}</ListTitle>
        <Container
            data={data}
            keyExtractor={( item )=> item.id+"" }
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 25 }}
            ItemSeparatorComponent={() => <VerSeperator/>}
            renderItem={({ item }) => (
              <Vertical_Showcase
                poster_path={item.poster_path}
                original_title={item.original_title ?? item.original_name}
                vote_average={item.vote_average}
                release_date={item.release_date}
                overview={item.overview}
              />
            )}
          />
    </ListContainer>
)

export default VerList