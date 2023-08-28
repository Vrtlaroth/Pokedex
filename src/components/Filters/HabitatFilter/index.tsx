import styled from "styled-components";
import { SelectedHabitats } from "../../../App";
import { Dispatch, SetStateAction } from "react";

const Button = styled.button<{ active: boolean }>`
  margin-bottom: 10px;
  background: ${(props) => (props.active ? "orange" : "white")};
`;

const HabitatFilter = ({
  name,
  property,
  selectedHabitats,
  setSelectedHabitats
}: {
  name: string;
  property: string;
  selectedHabitats: SelectedHabitats;
  setSelectedHabitats: Dispatch<SetStateAction<SelectedHabitats>>;
}) => {
  const handleClickButton = () => {
    setSelectedHabitats((prev) => {
      return {
        ...prev,
        [property]: !prev[property]
      };
    });
  };

  return (
    <Button active={selectedHabitats[property]} onClick={handleClickButton}>
      {name}
    </Button>
  );
};

export default HabitatFilter;
