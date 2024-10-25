import React, { useState } from 'react';
import { combineRules } from '../../services/apiService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CombineRuleComponent.scss';
import { filterAST } from '../../services/utilityService';
import { CombineRulesRequest } from '../../interfaces/interfaces'; 

const CombineRulesComponent: React.FC = () => {
    const [ruleStrings, setRuleStrings] = useState<string[]>(['']);
    const [operator, setOperator] = useState<'AND' | 'OR'>('AND');
    const [combinedAST, setCombinedAST] = useState<any>(null);

    const handleAddRule = () => {
        setRuleStrings([...ruleStrings, '']);
    };

    const handleCombineRules = async () => {
        try {
            const filteredRules = ruleStrings.filter(rule => rule.trim() !== '');

            if (filteredRules.length === 0) {
                toast.error('Please enter at least one rule string.');
                return;
            }

            const requestBody: CombineRulesRequest = { rules: filteredRules, operator };
            const combinedRule = await combineRules(requestBody.rules, requestBody.operator);
            const filteredAST = filterAST(combinedRule?.combinedRule?.ast);
            setCombinedAST(filteredAST);
            toast.success('Rules combined successfully!');
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    };

    return (
        <div className="combine-rule-container">
            <h1>Combine Rules</h1>
            <div className='section-container'>
                <div className="add-rule-container">
                    <p>
                        The "Combine Rule" functionality allows users to combine multiple conditional statements. Enter a list of rule strings, and we will generate the combined AST for the same.
                    </p>
                    {ruleStrings.map((rule, index) => (
                        <div key={index} className="rule-input">
                            <input
                                type="text"
                                value={rule}
                                onChange={(e) => {
                                    const newRules = [...ruleStrings];
                                    newRules[index] = e.target.value;
                                    setRuleStrings(newRules);
                                }}
                                placeholder="Enter rule string..."
                            />
                        </div>
                    ))}
                    <div className='btn-container'>
                        <button className="btn-filled" onClick={handleAddRule}>Add Rule</button>
                        <button className='btn-outlined' onClick={handleCombineRules}>Combine Rules</button>
                    </div>
                    <div>
                        <label>
                            Operator:
                            <select value={operator} onChange={(e) => setOperator(e.target.value as 'AND' | 'OR')}>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </select>
                        </label>
                    </div>
                    <p>
                        <Link to="/evaluate-rule">Evaluate Rule</Link>
                    </p>
                </div>

                <div className="ast-container">
                    <h2>Combined AST</h2>
                    {combinedAST ? (
                        <pre>{JSON.stringify(combinedAST, null, 2)}</pre>
                    ) : (
                        <div className="generated-ast-outer">
                            <div className='generated-ast-inner'>
                                AST in JSON will be displayed here
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CombineRulesComponent;
