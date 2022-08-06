import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { DBConnectContext } from "./constants/Constants";
import Header from "./components/Header";
import TenziesGame from "./components/TenziesGame";
import Leaderboard from "./components/Leaderboard";

function App() {
    // check and set database connection status
    const [dbStatus, setDbStatus] = useState(true);

    const [time, setTime] = useState(Date.now());

    return (
        <div>
            <DBConnectContext.Provider
                value={{ dbStatus: dbStatus, setDbStatus: setDbStatus }}
            >
                <Header onClickHomePage={() => setTime(Date.now())} />
                <Routes>
                    <Route path="/" element={<TenziesGame timeNow={time} />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
            </DBConnectContext.Provider>
        </div>
    );
}

export default App;
