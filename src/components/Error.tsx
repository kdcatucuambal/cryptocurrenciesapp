import styled from "@emotion/styled";

const ErrorMessage = styled.p`
  background-color: #b7322c;
  padding: 1rem;
  color: #fff;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  font-family: "Bebas Neue", cursive;
`;

type Props = {
  message: string;
};

const Error = ({ message }: Props) => {
  return <ErrorMessage>{message}</ErrorMessage>;
};

export default Error;
