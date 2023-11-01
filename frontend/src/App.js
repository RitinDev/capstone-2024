import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SubmitQA from './pages/SubmitQA';
import RandomQA from './pages/RandomQA';
import ValidateQA from './pages/ValidateQA';
import PrivateRouteWrapper from './utils/PrivateRoute';
import { AuthProvider } from './context/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateRouteWrapper />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/submit-qa" element={<PrivateRouteWrapper />}>
            <Route index element={<SubmitQA />} />
          </Route>
          <Route path="/random-qa" element={<PrivateRouteWrapper />}>
            <Route index element={<RandomQA />} />
          </Route>
          <Route path="/validate-qa" element={<PrivateRouteWrapper />}>
            <Route index element={<ValidateQA />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
