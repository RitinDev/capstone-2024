import { useState, useEffect } from 'react';
import axios from 'axios';

const ValidateQA = () => {
    const [randomQuestion, setRandomQuestion] = useState(null);
    const [randomAnswer, setRandomAnswer] = useState(null);

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
    };

    const fetchRandomAnswer = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('http://localhost:5000/api/answers/random',
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
        const userId = localStorage.getItem('userId');
        
        try {
            await axios.post(`http://localhost:5000/api/validate/question/${randomQuestion._id}`, { userId },
                { headers: { 'x-auth-token': token } }
            );
            
            await axios.post(`http://localhost:5000/api/validate/answer/${randomAnswer._id}`, { userId },
                { headers: { 'x-auth-token': token } }
            );

            alert('Question and answer validated!');
            fetchRandomQuestion();  // Fetch next question-answer pair after validation
            fetchRandomAnswer();

        } catch (error) {
            alert('Error validating question/answer!');
        }
    };

    useEffect(() => {
        fetchRandomQuestion();
        fetchRandomAnswer();
    }, []);

    return (
        <div className="validate-qa-card">
            <h2>Validate Question & Answer</h2>
            {randomQuestion && <p>{randomQuestion.content}</p>}
            {randomAnswer && <p>{randomAnswer.content}</p>}
            <button onClick={validateQA}>Validate</button>
        </div>
    );
};

export default ValidateQA;
