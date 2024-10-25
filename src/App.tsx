import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout/Layout'; 
import CreateRuleComponent from './components/CreateRuleComponent/CreateRuleComponent';
import CombineRulesComponent from './components/CombineRuleComponent/CombineRuleComponent';
import EvaluateRuleComponent from './components/EvaluateRuleComponent/EvaluateRuleComponent';

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <ToastContainer />
                <Routes>
                  <Route path="/" element={<Navigate to="/create-rule" />} />
                  <Route path="/create-rule" element={<CreateRuleComponent />} />
                  <Route path="/combine-rules" element={<CombineRulesComponent />} />
                  <Route path="/evaluate-rule" element={<EvaluateRuleComponent />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
