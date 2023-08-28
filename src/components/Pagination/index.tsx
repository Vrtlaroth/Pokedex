import styled from "styled-components";
import { GroupsOfOneHundred } from "../../hooks/usePaginationData";
import { Action } from "../../hooks/usePaginationData";

const Container = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
`;

const Item = styled.button<{ isSelected: boolean }>`
  padding: 5px;
  background: ${(props) => (props.isSelected ? "yellow" : "transparent")};
`;

const Pagination = ({
  groupsOfOneHundred,
  activePage,
  handleClickArrows,
  handleClickNumber
}: {
  groupsOfOneHundred: GroupsOfOneHundred;
  activePage: number;
  handleClickArrows: (action: Action) => void;
  handleClickNumber: (page: number) => void;
}) => {
  return (
    <Container>
      <div>
        <button onClick={() => handleClickArrows(0)} type="button">
          {"<<"}
        </button>
        <button onClick={() => handleClickArrows(1)} type="button">
          {"<"}
        </button>
        {groupsOfOneHundred.map((item, i) => {
          return (
            <Item
              onClick={() => handleClickNumber(i)}
              isSelected={i === activePage}
            >
              {i + 1}
            </Item>
          );
        })}
        <button onClick={() => handleClickArrows(2)} type="button">
          {">"}
        </button>
        <button onClick={() => handleClickArrows(3)} type="button">
          {">>"}
        </button>
      </div>
    </Container>
  );
};

export default Pagination;
