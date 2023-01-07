import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import axios from "axios";
// import HomePage2 from "./pages/HomePage2";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="" element={<HomePage />} />
					{/* <Route path="/homepage" element={<HomePage2 />} /> */}
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
