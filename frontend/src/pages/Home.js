import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faRandom, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center">
                <div className="col-md-6 text-center">
                    <h2 className="home-header">Hello There!</h2>
                    <p className="subtext">Select an action below:</p>
                    
                    <Link to="/submit-qa" className="custom-btn mb-3">
                        <FontAwesomeIcon icon={faEdit} size="2x"/>
                        <span>Submit Q&A</span>
                    </Link>
                    <Link to="/random-qa" className="custom-btn mb-3">
                        <FontAwesomeIcon icon={faRandom} size="2x"/>
                        <span>Random Q&A</span>
                    </Link>
                    <Link to="/validate-qa" className="custom-btn">
                        <FontAwesomeIcon icon={faCheckCircle} size="2x"/>
                        <span>Validate Q&A</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
