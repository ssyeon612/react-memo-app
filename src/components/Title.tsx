import styles from "./Title.module.css";
import styled from "styled-components";

const Header = styled.div`
    margin-bottom: 1.5rem;
    h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.3rem;
    }
`;

const Title = () => {
    return (
        <Header>
            <h3>Note</h3>
            <p>Take your notes</p>
        </Header>
    );
};
export default Title;
