import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RandomQA() {
    const [showAnswerForm, setShowAnswerForm] = useState(true);
    const [randomQuestion, setRandomQuestion] = useState(null);
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    const handleQuestionAnswerSubmit = async () => {
        const token = localStorage.getItem('token');

        try {
            const answerResponse = await axios.post(
                'http://localhost:5000/api/answers',
                { content: answer, associatedQuestion: randomQuestion._id },
                { headers: { 'x-auth-token': token } }
            );

            if (answerResponse.data && answerResponse.data._id) {
                alert('Answer submitted successfully!');
                fetchRandomQuestion();
                setAnswer('');
            }
        } catch (error) {
            alert('Error submitting the answer!');
        }
    };

    const fetchRandomQuestion = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('http://localhost:5000/api/questions/random',
                { headers: { 'x-auth-token': token } }
            );

            if (response.data && response.data.content) {
                setRandomQuestion(response.data);
            }
        } catch (error) {
            alert('Error fetching a random question!');
        }
        setShowAnswerForm(true);
    };

    useEffect(() => {
        fetchRandomQuestion();
    }, []);

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="col-md-6">
                <div className="card shadow-sm p-3"> {/* Reduced padding for compactness */}
                    <h5 className="card-title text-center mb-3">Answer a Random Question</h5>
                    {showAnswerForm && randomQuestion && (
                        <>
                            <div className="text-center mb-3"> {/* Centered question text */}
                                <label>Question: {randomQuestion.content}</label>
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder="Your Answer" className="form-control" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                            </div>
                            <div className="d-flex justify-content-between mt-1"> {/* All buttons in a line */}
                                <button className="btn btn-success" onClick={handleQuestionAnswerSubmit}>Submit</button>
                                <button className="btn btn-primary" onClick={fetchRandomQuestion}>New Question</button>
                                <button className="btn btn-light border" onClick={() => navigate('/')}>Back</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RandomQA;
