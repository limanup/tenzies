import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { DBConnectContext } from "./constants/Constants";
import Header from "./components/Header";
import TenziesGame from "./components/TenziesGame";
import Leaderboard from "./components/Leaderboard";

function App() {
    const [dbStatus, setDbStatus] = useState(false);

    return (
        <div>
            <Header />
            <DBConnectContext.Provider value={{ dbStatus, setDbStatus }}>
                <Routes>
                    <Route path="/" element={<TenziesGame />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
            </DBConnectContext.Provider>
        </div>
    );
}

export default App;
