import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { DBConnectContext } from "./context/Context";
import Header from "./components/Header";
import TenziesGame from "./pages/game/TenziesGame";
import Leaderboard from "./pages/leaderboard/Leaderboard";

function App() {
    /**
     * initialize DB connection status to true
     * if no connection detected, will set to false
     * init false -> true will flash 'no connection' in the first second
     *
     */
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
