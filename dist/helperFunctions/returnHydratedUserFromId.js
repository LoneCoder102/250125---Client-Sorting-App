/**
 * Hydrates a user with username and manager id given userId
 * @param userId ID of user to hydrate
 * @param allRelations allRelations object list
 * @param allUsernames allUsernames object list
 * @returns hydrated user
 */
function returnHydratedUserFromId(userId, allRelations, allUsernames) {
    if (!userId || !allRelations || !allUsernames) {
        throw new Error("Missing variables in hydrateUserFromId");
    }
    const name = allUsernames.find((usernameEntry) => usernameEntry.id === userId)?.name;
    const managerId = allRelations.find((relationEntry) => relationEntry.reporteeId === userId)?.managerId;
    if (!name) {
        throw new Error("No name found for ID");
    }
    //Edge case for manager
    if (!managerId) {
        return {
            id: userId,
            name,
        };
    }
    return {
        id: userId,
        name,
        managerId,
    };
}
export default returnHydratedUserFromId;
//# sourceMappingURL=returnHydratedUserFromId.js.map