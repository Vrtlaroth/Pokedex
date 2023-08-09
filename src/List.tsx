import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { Result } from "./App";

const Container = styled.div`
  flex: 1;
  background: blue;
  overflow: scroll;
  :hover {
    cursor: default;
  }
`;

const Item = styled.div<{ isSelected: boolean }>`
  background: ${(props) => (props.isSelected ? "white" : "transparent")};
`;

const List = ({
  results,
  selectedPokemon,
  setSelectedPokemon,
}: {
  results: Result[];
  selectedPokemon: null | string;
  setSelectedPokemon: Dispatch<SetStateAction<string | null>>;
}) => {
  const handleClick = (url: string) => {
    setSelectedPokemon(url);
  };

  return (
    <Container>
      {results.map(({ name, url }) => {
        return (
          <Item
            isSelected={selectedPokemon === url}
            key={name}
            onClick={() => handleClick(url)}
          >
            {name}
          </Item>
        );
      })}
    </Container>
  );
};

export default List;
