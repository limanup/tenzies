import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TenziesGame from "./components/TenziesGame";
import Leaderboard from "./components/Leaderboard";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<TenziesGame />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </div>
    );
}

export default App;
