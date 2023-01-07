import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/reducers/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./loginpage.css";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { userInfo } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const loginUser = (event) => {
		event.preventDefault();
		console.log(username, password);
		const data = {
			username: username,
			password: password,
		};
		dispatch(signIn(data));
	};

	const navigate = useNavigate();

	useEffect(() => {
		// redirect authenticated user to profile screen
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	return (
		<div className="login-container">
			<div className="login-wrapper">
				<div>
					<h1>chat application</h1>
					<h5>
						Connect with your colleagues and associates from different
						organizations.
					</h5>
				</div>
				<div className="login-inner-wrapper">
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter username"
								onChange={(event) => setUsername(event.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={(event) => setPassword(event.target.value)}
							/>
						</Form.Group>

						<Button type="submit" onClick={loginUser} className="login-button">
							Submit
						</Button>
					</Form>
					<hr />
					<div className="login-inner-wrapper-bottom">
						<Link to="/register">
							<h4>Create a new account!</h4>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
