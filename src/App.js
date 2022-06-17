import './App.css';
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {BrowserRouter as Router} from "react-router-dom"


function App() {
    const {login, logout, token, role, userId,email} = useAuth()
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated, role);

    return (
        <AuthContext.Provider value={{token, login, logout, role, userId, email}}>
            {console.log(`Logged in as: ${userId}`)}
          <Router>
            <div>
                {routes}
            </div>
          </Router>
        </AuthContext.Provider>
    );
}

export default App;
