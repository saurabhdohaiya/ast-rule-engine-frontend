import React, { useState } from 'react';
import { evaluateRule } from '../../services/apiService';
import { toast } from 'react-toastify';
import './EvaluateRuleComponent.scss';

const EvaluateRuleComponent: React.FC = () => {
    const [ast, setAst] = useState<string>('');
    const [data, setData] = useState<string>('{"a": 7, "b": 5}');
    const [result, setResult] = useState<boolean | null>(null);

    const handleEvaluateRule = async () => {
        try {
            const parsedAst = JSON.parse(ast);
            const parsedData = JSON.parse(data);
            const evaluationResult = await evaluateRule(parsedAst, parsedData);
            setResult(evaluationResult.eligible);
            toast.success('Rule evaluated successfully!');
        } catch (error) {
            if (error instanceof SyntaxError) {
                toast.error('Invalid JSON format. Please check your input.');
            } else {
                toast.error(`Error: ${error}`);
            }
        }
    };

    return (
        <div className="evaluate-rule-container">
            <h1>Evaluate Rule</h1>
            <div className="section-container">
                <div className="input-container">
                    <p>Enter AST tree:</p>
                    <textarea
                        value={ast}
                        onChange={(e) => setAst(e.target.value)}
                        placeholder="Enter AST here..."
                        rows={5}
                        className="input-textarea"
                    />
                    <p>Enter variable's data(JSON):</p>
                    <textarea
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder='Enter data as JSON... \nEg: {"a": 7, "b": 8}'
                        rows={5}
                        className="input-textarea"
                    />
                    <button className="btn-filled" onClick={handleEvaluateRule}>Evaluate Rule</button>
                </div>
                <div className="result-container">
                    <h2>Evaluation Result</h2>
                    {result !== null ? (
                        <div className='result-line'>Result: {result ? 'True' : 'False'}</div>
                    ) : (
                        <div className="generated-ast-outer">
                            <div className='generated-ast-inner'>
                                Result will be displayed here...
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EvaluateRuleComponent;
