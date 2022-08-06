import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { DBConnectContext } from "./constants/Constants";
import Header from "./components/Header";
import TenziesGame from "./components/TenziesGame";
import Leaderboard from "./components/Leaderboard";

function App() {
    // check and set database connection status
    const [dbStatus, setDbStatus] = useState(true);

    return (
        <div>
            <DBConnectContext.Provider
                value={{ dbStatus: dbStatus, setDbStatus: setDbStatus }}
            >
                <Header />
                <Routes>
                    <Route path="/" element={<TenziesGame />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
            </DBConnectContext.Provider>
        </div>
    );
}

export default App;
