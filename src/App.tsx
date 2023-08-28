import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import List from "./components/List";
import SelectedPokemon from "./components/SelectedPokemon";
import Filters from "./components/Filters";
import "./styles.css";

const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const habitatBaseURL = "https://pokeapi.co/api/v2/pokemon-habitat/";

export type SelectedHabitats = {
  [key: string]: boolean;
};

const InitialSelectedHabitats: SelectedHabitats = {
  cave: false,
  forest: false,
  grassland: false,
  mountain: false,
  rare: false,
  roughTerrain: false,
  sea: false,
  urban: false,
  watersEdge: false
};

export type Result = { name: string; url: string };

export type AllPokmonData = { results: Result[] };

export type HabitatData = { pokemon_species: Result[] };

const Container = styled.div`
  height: 100%;
`;

const ListAndSelectedContainer = styled.div`
  display: flex;
  height: 500px;
`;

function App() {
  const [search, setSearch] = useState("");
  const [allPokmonData, setAllPokemonData] = useState<AllPokmonData | null>(
    null
  );
  const [caveData, setCaveData] = useState<HabitatData | null>(null);
  const [forestData, setForestData] = useState<HabitatData | null>(null);
  const [grasslandData, setGrasslandData] = useState<HabitatData | null>(null);
  const [mountainData, setMountainData] = useState<HabitatData | null>(null);
  const [rareData, setRareData] = useState<HabitatData | null>(null);
  const [roughTerrainData, setRoughTerrainData] = useState<HabitatData | null>(
    null
  );
  const [seaData, setSeaData] = useState<HabitatData | null>(null);
  const [urbanData, setUrbanData] = useState<HabitatData | null>(null);
  const [watersEdgeData, setWatersEdgeData] = useState<HabitatData | null>(
    null
  );
  const [selectedHabitats, setSelectedHabitats] = useState<SelectedHabitats>(
    InitialSelectedHabitats
  );
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(
    null
  );

  const handleSearchUpdate = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setSearch(target.value);
  };

  const getSorted = (data: Result[]) => {
    return data.sort((a, b) => a.name.localeCompare(b.name));
  };

  const filteredData = useMemo(() => {
    const data: Result[] = [];

    const habitatIsSelected = Object.values(selectedHabitats).reduce(
      (acc, selected) => {
        if (selected === true) {
          acc = true;
        }

        return acc;
      },
      false
    );

    if (!habitatIsSelected) {
      if (allPokmonData?.results) {
        data.push(...allPokmonData.results);
      }
    } else {
      if (selectedHabitats.cave && caveData?.pokemon_species) {
        data.push(...caveData.pokemon_species);
      }

      if (selectedHabitats.forest && forestData?.pokemon_species) {
        data.push(...forestData.pokemon_species);
      }

      if (selectedHabitats.grassland && grasslandData?.pokemon_species) {
        data.push(...grasslandData.pokemon_species);
      }

      if (selectedHabitats.mountain && mountainData?.pokemon_species) {
        data.push(...mountainData.pokemon_species);
      }

      if (selectedHabitats.rare && rareData?.pokemon_species) {
        data.push(...rareData.pokemon_species);
      }

      if (selectedHabitats.roughTerrain && roughTerrainData?.pokemon_species) {
        data.push(...roughTerrainData.pokemon_species);
      }

      if (selectedHabitats.sea && seaData?.pokemon_species) {
        data.push(...seaData.pokemon_species);
      }

      if (selectedHabitats.urban && urbanData?.pokemon_species) {
        data.push(...urbanData.pokemon_species);
      }

      if (selectedHabitats.watersEdge && watersEdgeData?.pokemon_species) {
        data.push(...watersEdgeData.pokemon_species);
      }
    }

    if (search === "") {
      return getSorted(data);
    } else {
      const filtered = data.filter((result) => result.name.includes(search));

      return getSorted(filtered);
    }
  }, [
    allPokmonData,
    search,
    selectedHabitats,
    caveData,
    forestData,
    grasslandData,
    mountainData,
    rareData,
    roughTerrainData,
    seaData,
    urbanData,
    watersEdgeData
  ]);

  useEffect(() => {
    const getData = async (url: string, updater: (arg0: any) => void) => {
      try {
        const response = await axios.get(url);

        if (response.status === 200) {
          updater(response.data);
        }
      } catch (error) {
        console.log("error");
      }
    };

    getData(`${baseURL}?limit=1281`, setAllPokemonData);
    getData(`${habitatBaseURL}1`, setCaveData);
    getData(`${habitatBaseURL}2`, setForestData);
    getData(`${habitatBaseURL}3`, setGrasslandData);
    getData(`${habitatBaseURL}4`, setMountainData);
    getData(`${habitatBaseURL}5`, setRareData);
    getData(`${habitatBaseURL}6`, setRoughTerrainData);
    getData(`${habitatBaseURL}7`, setSeaData);
    getData(`${habitatBaseURL}8`, setUrbanData);
    getData(`${habitatBaseURL}9`, setWatersEdgeData);
  }, []);

  if (filteredData === null) return <div>loading</div>;

  return (
    <Container>
      <Filters
        search={search}
        selectedHabitats={selectedHabitats}
        setSelectedHabitats={setSelectedHabitats}
        handleSearchUpdate={handleSearchUpdate}
      ></Filters>
      <ListAndSelectedContainer>
        <List
          filteredData={filteredData}
          selectedPokemonId={selectedPokemonId}
          setSelectedPokemonId={setSelectedPokemonId}
        />
        <SelectedPokemon
          selectedPokemonId={selectedPokemonId}
          filteredData={filteredData}
          setSelectedPokemonId={setSelectedPokemonId}
        />
      </ListAndSelectedContainer>
    </Container>
  );
}

export default App;
