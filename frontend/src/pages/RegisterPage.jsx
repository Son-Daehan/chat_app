import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/reducers/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./registerpage.css";

const RegisterPage = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { loading, error, success, userInfo } = useSelector(
		(state) => state.user
	);

	axios.defaults.xsrfCookieName = "csrftoken";
	axios.defaults.xsrfHeaderName = "X-CSRFToken";

	const dispatch = useDispatch();
	const createUser = () => {
		dispatch(signUp({ firstName, lastName, email, password }));
	};

	const navigate = useNavigate();

	useEffect(() => {
		// redirect authenticated user to profile screen
		if (userInfo) {
			navigate("/profile");
		}
		// redirect user to login page if registration was successful
		if (success) {
			navigate("/login");
		}
	}, [navigate, userInfo, success]);

	return (
		<>
			<div className="register-container">
				<div className="register-wrapper">
					<div className="register-inner-wrapper">
						<Form>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter first name"
									onChange={(event) => setFirstName(event.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter last name"
									onChange={(event) => setLastName(event.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									onChange={(event) => setEmail(event.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Enter password"
									onChange={(event) => setPassword(event.target.value)}
								/>
							</Form.Group>

							<Button
								type="submit"
								onClick={createUser}
								className="register-button"
							>
								Submit
							</Button>
						</Form>
						{error && <div>{error}</div>}
						<hr />
						<div className="register-inner-wrapper-bottom">
							<h4>Already have an account?</h4>
							<Link to="/login">
								<h4>Login</h4>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterPage;
