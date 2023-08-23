import styled from "styled-components";

const Circles = styled.ul`
    display: inline-flex;
    li {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin-right: 0.5rem;
        &.red {
            background-color: #fb605b;
        }
        &.yellow {
            background-color: #fcbb40;
        }
        &.green {
            background-color: #33c648;
        }
    }
`;

function CircleGroup() {
    return (
        <Circles>
            <li className="red"></li>
            <li className="yellow"></li>
            <li className="green"></li>
        </Circles>
    );
}

export default CircleGroup;
