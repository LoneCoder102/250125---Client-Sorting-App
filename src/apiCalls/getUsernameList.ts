import * as dotenv from 'dotenv'
dotenv.config()

interface userNameEntryType {
    id: string, //cuid
    createdAt: string, //date-time formatted 2023-09-29T12:42:35.080Z
    updatedAt: string, // date-time formatted 2023-09-29T12:42:35.080Z
    name: string, //ie Steven
}

interface getUserNameListReturnType {
    status: number, //return call status (200: successful, 403: no token, 500: unexpected, 501: limit and skip parameter issue)
    count: number, //number record actually returned
    totalCount: number, //total number of records
    data: userNameEntryType[] //Username entry array
}

async function getUserNameList(limit: number, skip: number ): Promise<getUserNameListReturnType>{
    const baseUrl = process.env.BASE_URL
    const candidateToken = process.env.CANDIDATE_TOKEN

    if(!baseUrl || !candidateToken){
        throw new Error("Error on ENV import")
    }

    const response = await fetch(`${baseUrl}/api/employee-sorter/get-employees?limit=${limit}&skip=${skip}`,
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

    const usernameList = await response.json() as getUserNameListReturnType

    if(!usernameList?.data){
        throw new Error("No stations in data list")
    }
    
    return usernameList
    
}

export default getUserNameList
export type { userNameEntryType }