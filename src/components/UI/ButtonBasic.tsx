import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: any) => void;
  color?: string;
  disabled?: boolean;
}

const ButtonStyleBasic = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all 300ms ease;
  background-color: ${(props) => props.color};

  &:hover {
    filter: drop-shadow(0 0 0.1rem #c2c2c2);
  }

  &:disabled {
    background-color: #c2c2c2;
    cursor: not-allowed;
  }
`;

export default function BasicButton({
  children,
  onClick,
  color,
  disabled,
}: ButtonProps) {
  return (
    <ButtonStyleBasic onClick={onClick} color={color} disabled={disabled}>
      {children}
    </ButtonStyleBasic>
  );
}
