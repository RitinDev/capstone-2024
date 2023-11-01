import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SubmitQA() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    const handleQuestionAnswerSubmit = async () => {
        const token = localStorage.getItem('token');

        try {
            // Submit the question
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
                    setAnswer(''); // Reset answer field
                    setQuestion(''); // Reset question field
                }
            }
        } catch (error) {
            alert('Error submitting the question or answer!');
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="col-md-6">
                <div className="card shadow-lg p-4"> {/* Added padding and shadow for a better look */}
                    <h5 className="card-title text-center mb-4">Submit Question & Answer</h5>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <input type="text" placeholder="Question" className="form-control" value={question} onChange={(e) => setQuestion(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <input type="text" placeholder="Answer" className="form-control" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        </div>
                        <div className="d-flex justify-content-between"> {/* Updated for a spaced layout */}
                            <button className="btn btn-success" onClick={handleQuestionAnswerSubmit}>Submit</button>
                            <button className="btn btn-light border" onClick={() => navigate('/')}>Back</button> {/* Changed the back button style for contrast */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SubmitQA;