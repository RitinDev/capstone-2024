import { useState } from 'react';
import '../styles/login.css';
import axios from 'axios';
import { useAuth } from '../context/authContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                login();  // IMPORTANT: Mark the user as authenticated
                window.location.href = "/";
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                setError('An error occurred while logging in.');
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-12">
                    <div className="card bg-dark text-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <div className="card-body p-5 d-flex flex-column align-items-center mx-auto w-100">
                            <h2 className="fw-bold mb-4 text-uppercase">Sign In</h2>

                            {error && <div className="alert alert-danger">{error}</div>}

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

                            {/* <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}

                            <button className="btn btn-outline-light mt-2 px-5" type="button" onClick={handleLogin}>
                                Sign In
                            </button>
                            <div className='mt-2'>
                                <p className="mb-0 mt-3">Don't have an account? <a href="/signup" className="text-white-50 fw-bold text-decoration-none">Sign Up</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
