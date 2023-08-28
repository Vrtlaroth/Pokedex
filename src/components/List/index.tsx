import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { Result } from "../../App";
import getIdFromUrl from "../../utils/getIdFromUrl";
import Pagination from "../Pagination";
import usePaginationData from "../../hooks/usePaginationData";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid black;
  margin: 10px;
`;

const ListContainer = styled.div`
  padding: 10px;
  flex: 1;
  overflow: scroll;
  display: absolute;
  :hover {
    cursor: default;
  }
`;

const Item = styled.div<{ isSelected: boolean }>`
  background: ${(props) => (props.isSelected ? "blue" : "transparent")};
`;

const List = ({
  filteredData,
  selectedPokemonId,
  setSelectedPokemonId
}: {
  filteredData: Result[];
  selectedPokemonId: null | string;
  setSelectedPokemonId: Dispatch<SetStateAction<string | null>>;
}) => {
  const handleClick = (url: string) => {
    const id = getIdFromUrl(url);

    setSelectedPokemonId(id);
  };

  const {
    groupsOfOneHundred,
    activePage,
    handleClickArrows,
    handleClickNumber
  } = usePaginationData(filteredData);

  if (groupsOfOneHundred.length === 0) return <Container>no results</Container>;

  return (
    <Container>
      <Pagination
        groupsOfOneHundred={groupsOfOneHundred}
        activePage={activePage}
        handleClickNumber={handleClickNumber}
        handleClickArrows={handleClickArrows}
      />
      <ListContainer>
        {groupsOfOneHundred[activePage].map(
          ({ name, url }: { name: string; url: string }) => {
            const id = getIdFromUrl(url);

            return (
              <Item
                isSelected={selectedPokemonId === id}
                key={name}
                onClick={() => handleClick(url)}
              >
                {name}
              </Item>
            );
          }
        )}
      </ListContainer>
    </Container>
  );
};

export default List;
