import React, { useState } from 'react';
import { createRule } from '../../services/apiService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { filterAST } from '../../services/utilityService';
import './CreateRuleComponent.scss';

const CreateRuleComponent: React.FC = () => {
    const [ruleString, setRuleString] = useState<string>('');
    const [generatedAST, setGeneratedAST] = useState<any>(null);

    const validateRuleString = (rule: string): boolean => {
        return true; 
    };

    const handleSubmit = async () => {
        if (!ruleString) {
            toast.error('Rule string cannot be empty.');
            return;
        }

        if (!validateRuleString(ruleString)) {
            toast.error('Invalid rule format. Please check your input.');
            return;
        }

        try {
            const result = await createRule(ruleString);
            toast.success('Rule created successfully!');
            const filteredAST = filterAST(result?.rule?.ast);
            setGeneratedAST(filteredAST);
            setRuleString('');
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    };

    return (
        <div className="create-rule-container">
            <h1>Create Rule</h1>
            <div className='section-container'>
                <div className="add-rule-container">
                    <p>
                        The "Create Rule" functionality allows users to define conditional statements. Enter a rule string, and we will generate the AST for the same.
                    </p>
                    <textarea
                        value={ruleString}
                        onChange={(e) => setRuleString(e.target.value)}
                        placeholder="Enter rule string..."
                        rows={5}
                        cols={50}
                    />
                    <div className='btn-container'>
                        <button className="btn-filled" onClick={handleSubmit}>Create Rule</button>
                        <p style={{ margin: 0, padding: 0 }}>
                            <Link to="/combine-rules">Combine Rules</Link>
                        </p>
                    </div>
                </div>

                <div className="ast-container">
                    <h2>Generated AST</h2>
                    {generatedAST ? (
                        <pre>{JSON.stringify(generatedAST, null, 2)}</pre>
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

export default CreateRuleComponent;
