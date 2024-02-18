import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin: 4px 2px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

export default function Input(props: any) {
  return <StyledInput {...props} />;
}
