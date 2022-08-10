import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            {/* <Link to="/" onClick={() => (window.location.href = "/")}> */}
            <Link to="/">
                <h1>Tenzies Game!</h1>
            </Link>
            <div className="Header">
                <nav>
                    {/* <Link to="/leaderboard" onClick={() => (window.location.href = "/leaderboard")} > */}
                    <Link to="/leaderboard">
                        <h2>Leaderboard</h2>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
