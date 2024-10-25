export interface OperandValue {
    field: string;
    operator: string;
    value: string | number;
}

export interface ASTNode {
    type: "operator" | "operand";
    left?: ASTNode | null;
    right?: ASTNode | null;
    value?: OperandValue;
}

export interface Rule {
    ruleName: string;
    ast: ASTNode;
}

export interface CreateRuleRequest {
    rule_string: string;
}

export interface CombineRulesRequest {
    rules: string[];
    operator: "AND" | "OR";
}

export interface EvaluateRuleRequest {
    ast: ASTNode;
    data: Record<string, any>;
}

export interface CreateRuleResponse {
    message: string; 
    rule: Rule; 
}

export interface CombineRulesResponse {
    message: string;
    combinedRule: Rule; 
}

export interface EvaluateRuleResponse {
    eligible: boolean;
}

