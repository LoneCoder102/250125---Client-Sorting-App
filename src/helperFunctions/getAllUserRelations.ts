import getUserRelationList, {userRelationEntryType} from "../apiCalls/getUserRelationsList"

/**
 * Uses pagination to respect request size limit, returns whole array
 * @param querySize Optional, limit for single call
 * @returns Complete Object array of type userRelationEntryType
 */
async function getAllRelations(querySize = 500): Promise<userRelationEntryType[]>{
    const singleEntry = await getUserRelationList(1,0)
    const totalCount = singleEntry.totalCount

    if(!totalCount){
        throw new Error("Entries total not getting returned from API")
    }

    let allUserRelations: userRelationEntryType[] = []

    for(let i = 0; i <= Math.ceil(totalCount/querySize); i++){
        console.log("Completion: ", Math.floor(i / Math.ceil(totalCount/querySize) * 100), "%")
        const curUsernames = await getUserRelationList(querySize, i * querySize)
        allUserRelations.push(...curUsernames.data)

    } 

    return allUserRelations
}

export default getAllRelations