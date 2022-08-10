import { useContext } from "react";
import { GameContext } from "../../context/Context";

const ShowLiveResult = () => {
    const { rollCount, totalTimeUsed } = useContext(GameContext);
    return (
        <div className="game-stats">
            <label># of rolls : {rollCount}</label>
            <label>Timer (seconds): {totalTimeUsed}</label>
        </div>
    );
};

export default ShowLiveResult;
