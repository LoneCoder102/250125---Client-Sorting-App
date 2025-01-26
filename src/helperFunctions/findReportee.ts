import { userRelationEntryType } from "../apiCalls/getUserRelationsList.js"
/**
 * Finds all the reportees for a given managerial userId
 * @param relations allRelations list
 * @param userId manager id that we want reportees of
 * @returns string array of reportee IDs or undefined if not found
 */
function findReporteeIdList (relations: userRelationEntryType[], userId: string): string[] | undefined{
    if(!userId || !relations){
        throw new Error("No employee ID or relationship list passed to findReporteeID")
    }
    const reporteeObj = relations.filter(currentRelation => currentRelation.managerId === userId )

    if(!reporteeObj){
        return undefined
    }

    return reporteeObj.map(currentReportee => currentReportee.reporteeId)
}

export default findReporteeIdList