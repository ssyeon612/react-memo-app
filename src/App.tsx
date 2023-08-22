import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Title from "./components/Title";

/* routes */
import Home from "./routes/Home";
import Detail from "./routes/Detail";

const Wrap = styled.div`
    background-color: #a1c298;
    display: flex;
`;

const Container = styled.div`
    width: 350px;
    height: 500px;
    background-color: #ededed;
    border-radius: 1.5rem;
    margin: auto;
    padding: 1.6rem;
`;

function App() {
    return (
        <Wrap className="App">
            <Container>
                <Title />
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/detail" element={<Detail />}></Route>
                        <Route path="/detail/:id" element={<Detail />}></Route>
                    </Routes>
                </Router>
            </Container>
        </Wrap>
    );
}

export default App;
