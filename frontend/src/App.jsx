import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { useState } from "react";
import ChatPage from "./pages/ChatPage";
import ChatRoomPage from "./pages/ChatRoomPage";

function App() {
	const [authenticated, setAuthenticated] = useState(false);
	const [user, setUser] = useState({});

	// useEffect(() => {
	// 	const checkSession = async () => {
	// 		axios.get("/api/check_session").then((response) => {
	// 			setUser(response.data);
	// 			if (response.data === "Unauthorized") {
	// 				// console.log('not working')
	// 				setAuthenticated(false);
	// 			} else {
	// 				// console.log('working')
	// 				setAuthenticated(true);
	// 			}
	// 		});
	// 	};

	// 	checkSession();
	// }, []);

	return (
		<div className="App">
			<Router>
				<Navbar />
				{/* <Navbar authenticated={authenticated} /> */}
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/account/login" element={<LoginPage />} />
					<Route path="/account/register" element={<RegisterPage />} />
					<Route path="/account/profile" element={<ProfilePage />} />
					<Route path="/chat" element={<ChatPage />} />
					<Route path="/chat/:room" element={<ChatRoomPage user={user} />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
