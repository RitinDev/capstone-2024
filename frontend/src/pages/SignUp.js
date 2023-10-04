import { useState } from 'react';
import '../styles/login.css'
import axios from 'axios';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); // To display error messages

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/signup', {
                firstName,
                lastName,
                email,
                password
            });

            if (response.data && response.data.msg === 'User registered') {
                window.location.href = "/login"; // Redirect to login page
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                setError('An error occurred while signing up.');
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-12">
                    <div className="card bg-dark text-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <div className="card-body p-5 d-flex flex-column align-items-center mx-auto w-100">
                            <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                            <p className="text-white-50 mb-4">Please create your account!</p>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="mb-4">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    id="firstName"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    id="lastName"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    className="form-control form-control-lg"
                                    type="email"
                                    id="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button className="btn btn-outline-light mt-4 px-5" type="button" onClick={handleSignup}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
