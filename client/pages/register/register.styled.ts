import styled from 'styled-components';

export const Root = styled.div`
  max-width: 1350px;
  width: 100%;
  position: relative;
  height: 800px;
  background: linear-gradient(
    to right,
    rgba(229, 229, 229, 1) 0%,
    rgba(228, 244, 247, 1) 35%,
    rgba(207, 227, 231, 1) 58%,
    rgba(181, 240, 252, 1) 100%
  );
  z-index: 1;
  box-shadow: 0 10px 15px 0 rgb(175 175 175 / 75%);
  display: flex;
  justify-content: space-between;
`;

export const Form = styled.div`
  flex-basis: 50%;
  flex-grow: 1;
  padding: 100px 100px 100px 100px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

export const Text = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

export const RootForm = styled.form``;
