import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import List from "./List";
import SelectedPokemon from "./SelectedPokemon";
import Filters from "./Filters";

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

const Container = styled.div``;

export type Result = { name: string; url: string };

type Data = null | { results: Result[] };

const ListAndSelected = styled.div`
  display: flex;
  background: red;
  height: 100vh;
`;

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Data>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const handleSearchUpdate = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setSearch(target.value);
  };

  const results = useMemo(() => {
    if (data === null) return [];
    if (search === "") return data.results;

    return data.results.filter((result) => result.name.includes(search));
  }, [data, search]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${baseURL}?limit=1281`);

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log("error");
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (data === null) return;
    if (selectedPokemon !== null) return;

    setSelectedPokemon(data.results[0].url);
  }, [data, selectedPokemon]);

  if (data === null) return <div>loading</div>;

  if (data.results.length === 0) return <div>no pokemon</div>;

  return (
    <Container>
      <Filters
        search={search}
        handleSearchUpdate={handleSearchUpdate}
      ></Filters>
      <ListAndSelected>
        <List
          results={results}
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
        />
        <SelectedPokemon selectedPokemon={selectedPokemon} />
      </ListAndSelected>
    </Container>
  );
}

export default App;
