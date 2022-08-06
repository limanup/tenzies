import { Link } from "react-router-dom";

const Header = ({
    onClickHomePage,
}: {
    onClickHomePage: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
    return (
        <header>
            <Link to="/" onClick={onClickHomePage}>
                <h1>Tenzies Game!</h1>
            </Link>
            <div className="Header">
                <nav>
                    <Link to="/leaderboard">
                        <h2>Leaderboard</h2>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
