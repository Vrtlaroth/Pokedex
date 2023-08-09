import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  flex: 1;
  background: green;
`;

const Name = styled.div`
  color: whitesmoke;
  text-decoration: underline;
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
  selectedPokemon
}: {
  selectedPokemon: string | null;
}) => {
  const [data, setData] = useState<null | Data>(null);

  useEffect(() => {
    if (selectedPokemon === null) return;

    const getData = async () => {
      try {
        const response = await axios.get(selectedPokemon);

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log("error");
      }
    };

    getData();
  }, [selectedPokemon]);

  if (data === null) return <Container>no data</Container>;

  return (
    <Container>
      <img
        src={data.sprites.other["official-artwork"].front_default}
        alt="pokemon"
        width="200px"
      />
      <Name>{data.name}</Name>
    </Container>
  );
};

export default SelectedPokemon;
