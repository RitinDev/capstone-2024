import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faRandom, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Home.css';
import GlowingText from '../components/GlowingText';

const Home = () => {
    const { logout } = useAuth();

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center">
                <div className="col-md-6 text-center">
                    <GlowingText text="ValidifyGPT" />
                    <p className="subtext fs-5">Select an action below:</p>

                    <Link to="/submit-qa" className="custom-btn mb-3">
                        <FontAwesomeIcon icon={faEdit} size="2x" />
                        <span>Submit Q&A</span>
                    </Link>
                    <Link to="/random-qa" className="custom-btn mb-3">
                        <FontAwesomeIcon icon={faRandom} size="2x" />
                        <span>Random Q&A</span>
                    </Link>
                    <Link to="/validate-qa" className="custom-btn">
                        <FontAwesomeIcon icon={faCheckCircle} size="2x" />
                        <span>Validate Q&A</span>
                    </Link>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

export default Home;
