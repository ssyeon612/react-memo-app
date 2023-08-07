import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Title from "./components/Title";

/* routes */
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
    return (
        <div className="App">
            <div className="container">
                <Title />
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/detail" element={<Detail />}></Route>
                        <Route path="/detail/:id" element={<Detail />}></Route>
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
