import styled from "@emotion/styled";
import { CoinsMostUsed } from "../../models/models.interfaces";

//Components
import ErrorMsg from '../Error/ErrorMsg';

//Hooks
import { useEffect, useState } from "react";
import { monedas } from "../../data/coins";
import useSelectCoins from "../../hooks/useSelectCoins";
import { CoinAndCrypto } from "../../App";


const InputSubmit = styled.input`
  background-color: #9496ff;
  border: none;
  width: 100%;
  padding: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  font-size: 20px;
  border-radius: 15px;
  transition: background-color 0.3s ease;
  margin-top: 15px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;



export interface Coin {
  id: string;
  name: string;
}

export interface FormState {
  cryptos: Array<Coin>;
  error: boolean;
}

interface FormProps{
  setCoins: (coins: CoinAndCrypto) => void
}


const url =
  "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

const Form = ({setCoins}: FormProps) => {

  const [cryptos, setCryptos] = useState<FormState["cryptos"]>([]);
  const [error, setError] = useState<FormState["error"]>(false);
  const [coin, SelectCoins] = useSelectCoins("Elige tu moneda", monedas);
  const [cryptoCoin, SelectCryptoCoin] = useSelectCoins(
    "Elige tu Crypto moneda",
    cryptos
  );

  useEffect(() => {
    
    const fetchAPI = async () => {
      const response = await fetch(url);
      const result = await response.json();
      const cryptos = (await result.Data) as Array<CoinsMostUsed>;

      const arrayCryptos: Array<Coin> = cryptos.map((crypto) => {
        const format: Coin = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };

        return format;
      });

      setCryptos(arrayCryptos);
    };

    fetchAPI();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([coin, cryptoCoin].includes("")) {
      setError(true);
      return;
    }

    setError(false)

    setCoins({
      coin: coin as string,
      cryptoCoin: cryptoCoin as string
    })

    console.log(coin, cryptoCoin)

  };

  return (
    <>
      {error && <ErrorMsg>Invalid input</ErrorMsg>}
      <form onSubmit={handleSubmit}>
        <SelectCoins />
        <SelectCryptoCoin />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Form;
