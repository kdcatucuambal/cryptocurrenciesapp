import React, { Fragment, useState } from "react";
import { Currency } from "../Currency.interfaces";
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

const useCurrency = (
  label: string,
  initState: string,
  currencies: Currency[]
) => {
  const [state, setState] = useState<string>(initState);


  const SelectCurrency = (): JSX.Element => {
    return (
      <Fragment>
        <Label>{label}</Label>
        <Select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setState(e.target.value);
          }}
          value={state}
        >
          <option value="">--Select a currency --</option>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </Select>
      </Fragment>
    );
  };

  //Returns
  const response: [
    string,
    () => JSX.Element,
    React.Dispatch<React.SetStateAction<string>>
  ] = [state, SelectCurrency, setState];
  return response;
};

export default useCurrency;
