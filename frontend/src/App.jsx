import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/account/login" element={<LoginPage />} />
					<Route path="/account/register" element={<RegisterPage />} />
					<Route path="/account/profile" element={<ProfilePage />} />
					<Route path="/chat" element={<ChatPage />} />
					<Route path="/chat/:room" element={<ChatRoomPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
