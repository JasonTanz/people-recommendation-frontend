import * as Screens from "./screens";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { VPRoutes } from "./hoc/VPRotues";
function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<VPRoutes component={Screens.LandingScreen} />}
                />
                <Route
                    path="/user"
                    element={
                        <VPRoutes component={Screens.UserScreen} isProtected />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
