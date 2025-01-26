function findManagerId(relations, userId) {
    if (!relations || !userId) {
        throw new Error("No user ID or relations list passed to findManagerId: " + userId + " " + relations.length);
    }
    const relationObj = relations.filter(relation => relation.reporteeId === userId);
    if (!relationObj) {
        return undefined;
    }
    return relationObj.map(currentRelation => currentRelation.managerId);
}
export default findManagerId;
//# sourceMappingURL=findManager.js.map