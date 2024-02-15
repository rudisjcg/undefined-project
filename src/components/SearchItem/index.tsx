import styled from "styled-components";
import Input from "../Input";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.4rem;
`;

interface InputProps {
  placeholder?: string;
  values?: string;
  onChange: (e: any) => void;
  onKeyDown?: (e: any) => void;
}

export default function SearchItem({
  placeholder,
  onChange,
  values,
  onKeyDown,
}: InputProps) {
  return (
    <SearchInput
      type="text"
      values={values}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
