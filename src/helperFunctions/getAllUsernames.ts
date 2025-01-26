import getUserNameList, { userNameEntryType } from "../apiCalls/getUsernameList";

/**
 * Uses pagination to respect request size limit, returns whole array
 * @param querySize Optional, limit for single call
 * @returns Complete Object array of type userNameEntryType
 */
async function getAllUsernames(querySize = 500): Promise<userNameEntryType[]>{
    const singleEntry = await getUserNameList(1,0)
    const totalCount = singleEntry.totalCount

    if(!totalCount){
        throw new Error("Entries total not getting returned from API")
    }

    let allUsernames: userNameEntryType[] = []

    for(let i = 0; i <= Math.ceil(totalCount/querySize); i++){
        console.log("Completion ", Math.floor(i / Math.ceil(totalCount/querySize) * 100), "%")
        const curUsernames = await getUserNameList(querySize, i * querySize)
        allUsernames.push(...curUsernames.data)

    } 

    return allUsernames
}

export default getAllUsernames