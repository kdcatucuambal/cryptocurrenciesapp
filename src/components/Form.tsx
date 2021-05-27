import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useCurrency from "../hooks/useCurrency";
import { Currency } from "../Currency.interfaces";
import useCryptocurrency from "../hooks/useCryptocurrency";
import axios from "axios";

const Button = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

interface Props {
  setCurrency(currency: string): void;
  setCryptocurrency(cryptocurrency: string): void;
}

const Form = ({ setCurrency, setCryptocurrency }: Props) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState<boolean>(false);

  const currencies: Currency[] = [
    { code: "USD", name: "United States Dollar" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "Pound Sterling" },
  ];

  const [state, Select, setState] = useCurrency(
    "Select your currency",
    "",
    currencies
  );

  const [cryptocurrency, SelectCryptocurrency] = useCryptocurrency(
    "Select a cryptocurrency",
    "",
    cryptos
  );
  const SelectCryptocurrencyElement: any = SelectCryptocurrency;

  useEffect(() => {
    const consultApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const result = await axios.get(url);
      setCryptos(result.data.Data);
    };
    consultApi();
  }, []);
  const quoteCurrency = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validate fields
    if (state === "" || cryptocurrency === "") {
      setError(true);
      return;
    }
    //TO main
    setError(false);
    const crypto: any = cryptocurrency;
    setCurrency(state);
    setCryptocurrency(crypto);
  };

  return (
    <form onSubmit={quoteCurrency}>
      {error ? <Error message="All the fields are required!" /> : null}
      <Select />
      <SelectCryptocurrencyElement />
      <Button type="submit" value="Calculate"></Button>
    </form>
  );
};

export default Form;
