//Hooks
import { useState, useEffect } from "react";
//Styled Components
import styled from "@emotion/styled";
//Assets
import ImageCripto from "./img/imagen-criptos.png";
//Components
import Form, { Coin } from "./components/Form/Form";
import Result from "./components/Result/Result";
import Spinner from "./components/Spinner/Spinner";

import { CryptoData } from "./models/models.interfaces";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 0 auto;
  }
`;

export interface CoinAndCrypto {
  coin: string;
  cryptoCoin: string;
}

export interface AppState {
  coinAndCrypto: CoinAndCrypto;
  dataCrypto: CryptoData | {};
  loading: boolean;
}

function App() {
  const [coinAndCrypto, setCoinAndCrypto] = useState<AppState["coinAndCrypto"]>(
    {
      coin: "",
      cryptoCoin: "",
    }
  );
  const [dataCrypto, setDataCrypto] = useState<AppState["dataCrypto"]>({});
  const [loading, setLoading] = useState(false);

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinAndCrypto.cryptoCoin}&tsyms=${coinAndCrypto.coin}`;

  useEffect(() => {
    if (!Object.values(coinAndCrypto).includes("")) {
      setLoading(true);
      const { coin, cryptoCoin } = coinAndCrypto;
      const getPriceOfCrypto = async () => {
        const fetchPrice = await fetch(url);
        const response = await fetchPrice.json();

        setDataCrypto(response.DISPLAY[cryptoCoin][coin]);
        setLoading(false);
      };

      getPriceOfCrypto();
    }
  }, [coinAndCrypto]);

  const setCoins = (values: CoinAndCrypto) => {
    setCoinAndCrypto(values);
  };

  return (
    <Contenedor>
      <Imagen src={ImageCripto} alt="imagenes-criptocoinAndCrypto" />
      <div>
        <Heading>Cotiza CriptocoinAndCrypto al instante.</Heading>
        <Form setCoins={setCoins} />
        {loading && <Spinner />}
        {(dataCrypto as CryptoData).PRICE && !loading && (
          <Result dataCrypto={dataCrypto as CryptoData} />
        )}
      </div>
    </Contenedor>
  );
}

export default App;
