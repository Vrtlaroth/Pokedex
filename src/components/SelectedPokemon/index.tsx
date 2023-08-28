import { useEffect, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import axios from "axios";
import { Result } from "../../App";
import getIdFromUrl from "../../utils/getIdFromUrl";
import { Oval } from "react-loader-spinner";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 10px;
`;

const Name = styled.div``;

const SpinnerContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Data = {
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
};

const SelectedPokemon = ({
  selectedPokemonId,
  filteredData,
  setSelectedPokemonId
}: {
  selectedPokemonId: string | null;
  filteredData: Result[];
  setSelectedPokemonId: Dispatch<SetStateAction<string | null>>;
}) => {
  const [data, setData] = useState<null | Data>(null);

  useEffect(() => {
    if (selectedPokemonId === null) return;

    setData(null);

    const getData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${selectedPokemonId}`
        );

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log("error");
      }
    };

    getData();
  }, [selectedPokemonId]);

  useEffect(() => {
    if (selectedPokemonId === null) return;

    const selectedExistsInData = filteredData.reduce((acc, item) => {
      const itemId = getIdFromUrl(item.url);

      if (selectedPokemonId === itemId) {
        acc = true;
      }

      return acc;
    }, false);

    if (!selectedExistsInData) {
      setSelectedPokemonId(null);
      setData(null);
    }
  }, [filteredData, selectedPokemonId]);

  if (data === null && selectedPokemonId === null) {
    return <Container>please select a Pokemon</Container>;
  }

  return (
    <Container>
      {data === null && (
        <SpinnerContainer>
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </SpinnerContainer>
      )}
      {data !== null && (
        <img
          src={data.sprites.other["official-artwork"].front_default}
          alt="pokemon"
          width="200px"
          height="200px"
        />
      )}
      <Name>{data?.name}</Name>
    </Container>
  );
};

export default SelectedPokemon;
