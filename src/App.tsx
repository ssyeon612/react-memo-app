import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

/* routes */
import Home from "./routes/Home";
import Detail from "./routes/Detail";

import Bg from "./assets/images/bg.jpeg";

const Wrap = styled.div`
    display: flex;
    background: url(${Bg}) no-repeat center;
    background-size: cover;
`;

const Container = styled.div`
    width: 900px;
    height: 650px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 3rem;
    margin: auto;
    padding: 2rem;
`;

function App() {
    return (
        <Wrap className="App">
            <Container>
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
