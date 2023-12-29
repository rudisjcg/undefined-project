import styled from "styled-components"



const Button = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    
`;

export default function ButtonNav({ children, ...rest }: { children: React.ReactNode }) {
    return <Button {...rest}> {children}</Button>
}