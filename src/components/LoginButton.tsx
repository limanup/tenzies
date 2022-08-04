import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return !isAuthenticated ? (
        <a onClick={() => loginWithRedirect()}>Sign in</a>
    ) : (
        <></>
    );
};

export default LoginButton;
