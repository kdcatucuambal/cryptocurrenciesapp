import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCryptocurrency = (label: string, initState: string, options: any) => {
  const [state, setState] = useState(initState);

  const SelectCryptocurrency = () => {
    return (
      <Fragment>
        <Label>{label}</Label>
        <Select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setState(e.target.value);
          }}
          value={state}
        >
          <option value="">--Select a cryptocurrency --</option>
          {options.map((option: any) => (
            <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>
              {option.CoinInfo.FullName}
            </option>
          ))}
        </Select>
      </Fragment>
    );
  };

  //Returns
  return [state, SelectCryptocurrency, setState];
};

export default useCryptocurrency;
