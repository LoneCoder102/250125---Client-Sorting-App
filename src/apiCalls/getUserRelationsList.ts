import * as dotenv from 'dotenv'
dotenv.config()

interface userRelationEntryType {
    id: string, //cuid
    createdAt: string, //date-time formatted 2023-09-29T12:42:35.080Z
    updatedAt: string, // date-time formatted 2023-09-29T12:42:35.080Z
    managerId: string, //cuid
    reporteeId: string //cuid
}

interface getUserRelationListReturnType {
    status: number, //return call status (200: successful, 403: no token, 500: unexpected, 501: limit and skip parameter issue)
    count: number, //number record actually returned
    totalCount: number, //total number of records
    data: userRelationEntryType[] //Username entry array
}

async function getUserRelationList(limit: number, skip: number ): Promise<getUserRelationListReturnType>{
    const baseUrl = process.env.BASE_URL
    const candidateToken = process.env.CANDIDATE_TOKEN

    if(!baseUrl || !candidateToken){
        throw new Error("Error on ENV import")
    }

    const response = await fetch(`${baseUrl}/api/employee-sorter/get-reporting-relationship?limit=${limit}&skip=${skip}`,
        {
            headers: {
                "Content-Type": "application/json",
                "candidate-token": candidateToken
            },
            method: "GET"
        }
    )

    if(response.status !== 200){
        throw new Error("Unsuccessful api request, return code: " + response.status);
    }

    const usernameList = await response.json() as getUserRelationListReturnType

    if(!usernameList?.data){
        throw new Error("No stations in data list")
    }

    return usernameList
}

export default getUserRelationList
export type {userRelationEntryType}