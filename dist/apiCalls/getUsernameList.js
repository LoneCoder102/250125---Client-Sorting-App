import * as dotenv from 'dotenv';
dotenv.config();
async function getUserNameList(limit, skip) {
    const baseUrl = process.env.BASE_URL;
    const candidateToken = process.env.CANDIDATE_TOKEN;
    if (!baseUrl || !candidateToken) {
        throw new Error("Error on ENV import");
    }
    const response = await fetch(`${baseUrl}/api/employee-sorter/get-employees?limit=${limit}&skip=${skip}`, {
        headers: {
            "Content-Type": "application/json",
            "candidate-token": candidateToken
        },
        method: "GET"
    });
    if (response.status !== 200) {
        throw new Error("Unsuccessful api request, return code: " + response.status);
    }
    const usernameList = await response.json();
    if (!usernameList?.data) {
        throw new Error("No stations in data list");
    }
    return usernameList;
}
export default getUserNameList;
//# sourceMappingURL=getUsernameList.js.map