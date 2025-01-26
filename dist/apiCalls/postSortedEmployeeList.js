import * as dotenv from 'dotenv';
dotenv.config();
/**
 * API call to submit final list
 * @param list Sorted list of employees with managerId and Name
 * @returns success boolean
 */
async function postSortedEmployeeList(list) {
    const baseUrl = process.env.BASE_URL;
    const candidateToken = process.env.CANDIDATE_TOKEN;
    if (!baseUrl || !candidateToken) {
        throw new Error("Error on ENV import");
    }
    const response = await fetch(`${baseUrl}/api/employee-sorter/test`, {
        headers: {
            "Content-Type": "application/json",
            "candidate-token": candidateToken
        },
        method: "POST",
        body: JSON.stringify(list)
    });
    if (response.status === 200) {
        return false;
    }
    return true;
}
export default postSortedEmployeeList;
//# sourceMappingURL=postSortedEmployeeList.js.map