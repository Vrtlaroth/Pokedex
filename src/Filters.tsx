import styled from "styled-components";
import { ChangeEventHandler } from "react";

const Input = styled.input`
  background: purple;
  width: 100%;
`;

function Filters({
  search,
  handleSearchUpdate
}: {
  search: string | number | readonly string[] | undefined;
  handleSearchUpdate: ChangeEventHandler<HTMLInputElement>;
}) {
  return <Input value={search} onChange={handleSearchUpdate} />;
}
export default Filters;
