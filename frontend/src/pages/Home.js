import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext'

function Home() {
    const { logout } = useAuth();
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [showAnswerForm, setShowAnswerForm] = useState(false);
    const [randomQuestion, setRandomQuestion] = useState(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleQuestionAnswerSubmit = async () => {
        const token = localStorage.getItem('token');

        try {
            // First, submit the question
            const questionResponse = await axios.post(
                'http://localhost:5000/api/questions',
                { content: question },
                { headers: { 'x-auth-token': token } }
            );

            if (questionResponse.data && questionResponse.data._id) {
                // Use the returned question's ID to submit the answer
                const answerResponse = await axios.post(
                    'http://localhost:5000/api/answers',
                    { content: answer, associatedQuestion: questionResponse.data._id },
                    { headers: { 'x-auth-token': token } }
                );

                if (answerResponse.data && answerResponse.data._id) {
                    alert('Question and Answer submitted successfully!');
                    setRandomQuestion(null);
                    setAnswer(''); // Reset answer field
                    setQuestion(''); // Reset question field
                }
            }
        } catch (error) {
            alert('Error submitting the question or answer!');
        }
        setShowQuestionForm(false);
        setShowAnswerForm(false);
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

    const handleLogout = () => {
        logout();
        window.location.href = "/login";
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Submit Question & Answer</h5>
                            <button
                                className="btn btn-primary mb-2"
                                onClick={() => {
                                    setShowQuestionForm(!showQuestionForm);
                                    setShowAnswerForm(false);
                                    setRandomQuestion(null);
                                }}
                            >
                                Show Question & Answer Form
                            </button>
                            {showQuestionForm && (
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="mb-2">
                                        <input type="text" placeholder="Question" className="form-control" value={question} onChange={(e) => setQuestion(e.target.value)} />
                                    </div>
                                    <div className="mb-2">
                                        <input type="text" placeholder="Answer" className="form-control" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                                    </div>
                                    <button className="btn btn-success" onClick={handleQuestionAnswerSubmit}>Submit</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Answer a Random Question</h5>
                            <button
                                className="btn btn-primary mb-2"
                                onClick={fetchRandomQuestion}
                            >
                                Fetch Random Question
                            </button>
                            {showAnswerForm && randomQuestion && (
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="mb-2">
                                        <label className="d-block">Question: {randomQuestion.content}</label>
                                    </div>
                                    <div className="mb-2">
                                        <input type="text" placeholder="Your Answer" className="form-control" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                                    </div>
                                    <button className="btn btn-success" onClick={handleQuestionAnswerSubmit}>Submit Answer</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3 d-flex justify-content-center align-items-center">
                    <button
                        className="btn btn-primary mb-2"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
