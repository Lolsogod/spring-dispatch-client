import './App.css';
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/fakeAuth.hook";
import {AuthContext} from "./context/AuthContext";
import {BrowserRouter as Router} from "react-router-dom"


function App() {
    const {token, login, logout} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider value={{token, login, logout}}>
          <Router>
            <div>
                {routes}
            </div>
          </Router>
        </AuthContext.Provider>
    );
}

export default App;
