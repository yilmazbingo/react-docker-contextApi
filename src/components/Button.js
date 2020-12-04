import styled from "styled-components";

export const ButtonContainer = styled.button`
  text-transform: uppercase;
  font-size: 1.4 rem;
  ${"" /* background: transparent; */}
  border: 0.1rem solid black;
  border-color: ${props => (props.cart ? "red" : "black")};
  color: ${props => (props.cart ? "yellow" : "black")};
  border-radius: 2rem;
  padding: 0.2 rem;
  cursor: pointer;
  transition: all 0.5s ease-out;
  &:hover {
    background: ${props => (props.cart ? "blue" : "blue")};
    color: white;
  }
  &:focus {
    outline: none;
  }
`;
