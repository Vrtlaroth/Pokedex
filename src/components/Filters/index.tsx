import styled from "styled-components";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import HabitatFilter from "./HabitatFilter";
import { SelectedHabitats } from "../../App";

const HabitatFiltersData = [
  {
    name: "Cave",
    property: "cave"
  },
  {
    name: "Forest",
    property: "forest"
  },
  {
    name: "Grass",
    property: "grassland"
  },
  {
    name: "Mountain",
    property: "mountain"
  },
  {
    name: "Rare",
    property: "rare"
  },
  {
    name: "Rough Terrain",
    property: "roughTerrain"
  },
  {
    name: "Sea",
    property: "sea"
  },
  {
    name: "Urban",
    property: "urban"
  },
  {
    name: "Water's Edge",
    property: "watersEdge"
  }
];

const Container = styled.div`
  padding: 10px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 300px;
`;

const HabitatFiltersContainer = styled.div`
  display: flex;
`;

function Filters({
  search,
  selectedHabitats,
  setSelectedHabitats,
  handleSearchUpdate
}: {
  search: string | number | readonly string[] | undefined;
  selectedHabitats: SelectedHabitats;
  setSelectedHabitats: Dispatch<SetStateAction<SelectedHabitats>>;
  handleSearchUpdate: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <Container>
      <HabitatFiltersContainer>
        {HabitatFiltersData.map(({ name, property }) => {
          return (
            <HabitatFilter
              key={name}
              name={name}
              property={property}
              selectedHabitats={selectedHabitats}
              setSelectedHabitats={setSelectedHabitats}
            />
          );
        })}
      </HabitatFiltersContainer>
      <Input value={search} onChange={handleSearchUpdate} />
    </Container>
  );
}
export default Filters;
