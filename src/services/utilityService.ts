export const filterAST = (node: any): any => {
    if (!node || typeof node !== 'object') {
        return node;
    }

    const filteredNode: any = { ...node };
    delete filteredNode._id;

    for (const key in filteredNode) {
        if (Array.isArray(filteredNode[key])) {
            filteredNode[key] = filteredNode[key].map(filterAST);
        } else if (typeof filteredNode[key] === 'object') {
            filteredNode[key] = filterAST(filteredNode[key]);
        }
    }

    return filteredNode;
};
