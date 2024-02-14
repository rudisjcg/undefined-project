import styled from "styled-components";
import Input from "../Input";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 30px 0 30px;
  font-size: 1.4rem;
`;

interface InputProps {
  placeholder?: string;
  values?: string;
  onChange: (e: any) => void;
}

export default function SearchItem({
  placeholder,
  onChange,
  values,
}: InputProps) {
  return (
    <SearchInput
      type="text"
      values={values}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
