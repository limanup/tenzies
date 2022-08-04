import { BrowserRouter, Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
    return (
        <header>
            <BrowserRouter>
                <Link to="/">
                    <h1>Tenzies Game!</h1>
                </Link>
                <div className="navbar">
                    <nav>
                        <LoginButton />
                    </nav>
                    <nav>
                        <LogoutButton />
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
