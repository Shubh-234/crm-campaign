function buildQuery(conditions, logic) {
    const queryConditions = conditions.map(condition => {
        switch (condition.field) {
            case 'totalSpending':
                return { totalSpending: { [getOperator(condition.operator)]: condition.value } };
            case 'visitCount':
                return { visitCount: { [getOperator(condition.operator)]: condition.value } };
            case 'lastVisitInMonths':
                const dateThreshold = new Date();
                dateThreshold.setMonth(dateThreshold.getMonth() - condition.value);
                return { lastVisitDate: { [getOperator(condition.operator)]: dateThreshold } };
            default:
                return {};
        }
    });

    // Use AND or OR logic for query conditions
    return logic === 'AND' ? { $and: queryConditions } : { $or: queryConditions };
}

function getOperator(op) {
    switch (op) {
        case '>': return '$gt';
        case '>=': return '$gte';
        case '<': return '$lt';
        case '<=': return '$lte';
        case '==': return '$eq';
        case '!=': return '$ne';
        default: return '$eq';
    }
}

module.exports = { buildQuery };
