import './App.css';
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {BrowserRouter as Router} from "react-router-dom"


function App() {
    const {login, logout, userId, token} = useAuth()
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider value={{token, login, logout, userId}}>
          <Router>
            <div>
                {routes}
            </div>
          </Router>
        </AuthContext.Provider>
    );
}

export default App;
