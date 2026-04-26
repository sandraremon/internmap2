import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Dashboard from "~/FrontendWebpages/Dashboard";
// import Signup from "~/WebPages/SignUp";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/*<Route path="/signup"element={<Signup />}/>*/}
        </Routes>
    );
}

export default App;
