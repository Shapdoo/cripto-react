import styled from "@emotion/styled";
import { CryptoData } from "../../models/models.interfaces";

interface ResultProps {
  dataCrypto: CryptoData;
}

const ResultStyled = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-top: 30px;
`;

const Text = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;
  }
`;

const Price = styled.p`
  font-size: 30px;
  span {
    font-weight: 700;
  }
`;

const Image = styled.img`
    display: block;
    width: 100px;
`

const Result = ({ dataCrypto }: ResultProps) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    dataCrypto;

  return (
    <ResultStyled>
      <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen crypto" />
      <div>
        <Price>
          El Precio es de: <span>{PRICE}</span>
        </Price>
        <Text>
          Precio más alto del día: <span>{HIGHDAY}</span>
        </Text>
        <Text>
          Precio más bajo del día: <span>{LOWDAY}</span>
        </Text>
        <Text>
          Variación de las últimas 24 horas: <span>{CHANGEPCT24HOUR}</span>
        </Text>
        <Text>
          Ultima actualización: <span>{LASTUPDATE}</span>
        </Text>
      </div>
    </ResultStyled>
  );
};

export default Result;
