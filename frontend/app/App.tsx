import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
// import Signup from "~/WebPages/SignUp";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/signup"element={<Signup />}/>*/}
        </Routes>
    );
}

export default App;
