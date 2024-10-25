import { CreateRuleRequest, CreateRuleResponse, CombineRulesRequest, CombineRulesResponse, ASTNode, EvaluateRuleRequest, EvaluateRuleResponse } from '../interfaces/interfaces';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createRule = async (ruleString: string): Promise<CreateRuleResponse> => {
    const requestBody: CreateRuleRequest = { rule_string: ruleString };
    const response = await fetch(`${API_BASE_URL}/create_rule`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create rule');
    }

    return await response.json() as CreateRuleResponse;
};

export const combineRules = async (rules: string[], operator: "AND" | "OR"): Promise<CombineRulesResponse> => {
    const requestBody: CombineRulesRequest = { rules, operator };
    const response = await fetch(`${API_BASE_URL}/combine_rules`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to combine rules');
    }

    return await response.json() as CombineRulesResponse;
};
export const evaluateRule = async (ast: ASTNode, data: Record<string, any>): Promise<EvaluateRuleResponse> => {
    const requestBody: EvaluateRuleRequest = { ast, data };
    const response = await fetch(`${API_BASE_URL}/evaluate_rule`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to evaluate rule');
    }

    return await response.json();
};
