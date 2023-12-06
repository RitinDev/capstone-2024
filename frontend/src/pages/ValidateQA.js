import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ValidateQA = () => {
    const [randomQuestion, setRandomQuestion] = useState(null);
    const [randomAnswer, setRandomAnswer] = useState(null);
    const navigate = useNavigate();

    const fetchRandomQuestion = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('http://localhost:5000/api/questions/random',
                { headers: { 'x-auth-token': token } }
            );
            if (response.data && response.data._id) {
                setRandomQuestion(response.data);
                fetchRandomAnswer(response.data._id);  // Fetch associated random answer
            }
        } catch (error) {
            alert('Error fetching a random question!');
        }
    };

    const fetchRandomAnswer = async (questionId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`http://localhost:5000/api/answers/random?questionId=${questionId}`,
                { headers: { 'x-auth-token': token } }
            );
            if (response.data && response.data.content) {
                setRandomAnswer(response.data);
            }
        } catch (error) {
            alert('Error fetching a random answer!');
        }
    };

    const validateQA = async () => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('userID');

        try {
            await axios.post(`http://localhost:5000/api/validate/question/${randomQuestion._id}`, { userID },
                { headers: { 'x-auth-token': token } }
            );

            await axios.post(`http://localhost:5000/api/validate/answer/${randomAnswer._id}`, { userID },
                { headers: { 'x-auth-token': token } }
            );

            alert('Question and answer validated!');
            fetchRandomQuestion();  // Fetch next question-answer pair after validation

        } catch (error) {
            alert('Error validating question/answer!');
        }
    };

    useEffect(() => {
        fetchRandomQuestion();
    }, []);

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="col-md-6">
                <div className="card shadow-lg p-4">
                    <h5 className="card-title text-center mb-4">Validate Question & Answer</h5>
                    <form onSubmit={(e) => e.preventDefault()}>

                        {/* Question Display */}
                        <div className="mb-4 content-container">
                            <strong>Question:</strong>
                            <div className="scrollable-content">
                                {randomQuestion?.content || 'Loading...'}
                            </div>
                        </div>

                        {/* Answer Display */}
                        <div className="mb-4 content-container">
                            <strong>Answer:</strong>
                            <div className="scrollable-content">
                                {randomAnswer?.content || 'Loading...'}
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mt-1"> {/* All buttons in a line */}
                            <button className="btn btn-success" onClick={validateQA}>Validate</button>
                            <button className="btn btn-primary" onClick={fetchRandomQuestion}>Skip</button>
                            <button className="btn btn-light border" onClick={() => navigate('/')}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ValidateQA;
