import styled from "@emotion/styled";
import image from "./cryptomonedas.png";
import Form from "./components/Form";
import Quote from "./components/Quote";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    height: 6px;
    width: 100px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {

  const [currency, setCurrency] = useState("");
  const [cryptocurrency, setCryptocurrency] = useState("");
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const quoteCrypto = async () => {
      if (currency === "") return;
      //Api consult
      setLoading(true);
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;
      const result = await axios.get(url);
      setResult(result.data.DISPLAY[cryptocurrency][currency]);
      setLoading(false);
    };
    quoteCrypto();
  }, [currency, cryptocurrency]);

  const Component = loading ? <Spinner /> : <Quote result={result} />;

  return (
    <Container>
      <div>
        <Image src={image} alt="Image"></Image>
      </div>
      <div>
        <Heading>Quote Cryptocurrencies Instantly</Heading>
        <Form
          setCurrency={setCurrency}
          setCryptocurrency={setCryptocurrency}
        ></Form>
        {Component}
      </div>
    </Container>
  );
}

export default App;
