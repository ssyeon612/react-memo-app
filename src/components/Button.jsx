import styled from "styled-components";

const StyledButton = styled.button`
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: ${(props) => props.color || "#11009e"};
    border: 1px solid ${(props) => props.color || "#11009e"};
    background: white;
    display: flex;
    float: ${(props) => (props.$right ? "right" : "left")};
    &:hover {
        color: white;
        background: ${(props) => props.color || "#11009e"};
    }
`;

function Button({ children, ...props }) {
    return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
