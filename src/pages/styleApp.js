import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  height: 100vh;
  width: 100%;
  padding: 15px;
  color: ${props => props.theme.fontColor};
`;

export const Form = styled.form`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Input = styled.input`
  font-family: 'Montserrat', sans-serif;
  border: 0;
  border-radius: 16px;
  color: #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  text-align: center;
`;

export const Button = styled.button`
  font-family: 'Montserrat', sans-serif;
  border: 0;
  border-radius: 16px;
  color: #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  text-align: center;
  background-color: hsl(212, 91%, 35%);
  transition: 0.2s ease-in-out;
  min-width: 160px;
  font-size: 1rem;
  font-weight: 500;
  @media screen and (max-width: 420px) {
    flex: 1;
    margin-top: 42px;
  }
`;

export const Main = styled.main`
  margin: 36px 0px;
`;

export const H1 = styled.h1`
  text-align: center;
  margin: 36px 0px;
  font-size: 3.2em;
  line-height: 1.1;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  margin: 72px 0;
`;

export const H2 = styled.h2`
  font-weight: 400;
  margin-bottom: 18px;
`;

export const P = styled.p`
  font-size: 32px;
`;

export const Label = styled.label`
  display: block;
  width: 50px;
  height: 20px;
  position: relative;
  margin-bottom: 60px;
  background: #ebebeb;
  border-radius: 200px;
  box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4),
    inset 0px -5px 15px rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: 0.3s;
  &:after {
    content: '';
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, #ffcc89, #d8860b);
    border-radius: 180px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
  &:active:after {
    width: 40px;
  }
`;

export const InputCheckBox = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;
  &:checked + ${Label} {
    background: #242424;
  }
  &:checked + ${Label}:after {
    left: 50px;
    transform: translateX(-100%);
    background: linear-gradient(180deg, #777, #3a3a3a);
  }
`;

export const ImgSun = styled.img`
  position: absolute;
  width: 15px;
  top: 2px;
  z-index: 1;
  left: 2px;
  fill: #fff;
  transition: 0.3s;
  ${InputCheckBox}:checked {
    fill: #7e7e7e;
  }
`;

export const ImgMoon = styled.img`
  position: absolute;
  width: 15px;
  top: 2px;
  z-index: 1;
  left: 33px;
  fill: #7e7e7e;
  transition: 0.3s;
  ${InputCheckBox}:checked {
    fill: #fff;
  }
`;
