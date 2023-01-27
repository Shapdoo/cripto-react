import styled from "@emotion/styled";
import { Coin } from "../components/Form/Form";

//Hooks
import { useState } from "react";

const Label = styled.label`
  color: #fff;
  display: block;
  font-family: "lato", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 15px 0;
`;

const Select = styled.select`
  width: 100%;
  font-size: 18px;
  padding: 14px;
  border-radius: 10px;
  border: unset;
`;

interface SelectCoinsState{
  state: string
}


const useSelectCoins = (label: string, options: Array<Coin>) => {
  
  const [state, setState] = useState<SelectCoinsState["state"]>("");

  const SelectCoins = () => (
    <>
      <Label>{label}</Label>
      <Select value={state} onChange={e => setState(e.target.value)}>
        <option value="">Selecciona</option>
        {options.map((coin) => (
          <option key={coin.id} value={coin.id}>{coin.name}</option>
        ))}
      </Select>
    </>
  );

  return [state, SelectCoins];
};

export default useSelectCoins;
