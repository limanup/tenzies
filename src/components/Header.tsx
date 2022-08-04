import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Link to="/">
                <h1>Tenzies Game!</h1>
            </Link>
            <div className="navbar">
                <nav>
                    <Link to="/leaderboard">Leaderboard</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
