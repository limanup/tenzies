import { BrowserRouter, Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <BrowserRouter>
                <Link to="/">
                    <h1>Tenzies Game!</h1>
                </Link>
                <div className="navbar">
                    <nav>
                        <Link to="/register">Register</Link>
                    </nav>
                    <nav>
                        <Link to="/login">Log in</Link>
                    </nav>
                    <nav>
                        <Link to="/leaderboard">Leader board</Link>
                    </nav>
                </div>
            </BrowserRouter>
        </header>
    );
};

export default Navbar;
