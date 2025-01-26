import getAllUsernames from "./helperFunctions/getAllUsernames"
import getAllRelations from "./helperFunctions/getAllUserRelations"
import findReporteeIdList from "./helperFunctions/findReportee"
import returnHydratedUserFromId, {hydratedUserType}  from "./helperFunctions/returnHydratedUserFromId"
import postSortedEmployeeList from "./apiCalls/postSortedEmployeeList"

console.log('Starting employee sorter')

try{
    //Console logs to report that the app is doing something, also works as comments
    console.log('Fetching all users')
    const allUsernames = await getAllUsernames();
    console.log('All username length: ', allUsernames.length)

    console.log('Fetching all relations')
    const allRelations = await getAllRelations();
    console.log('All relations length: ', allRelations.length)

    //Set up a multi level array for storing employees according to hierarchy
    let hierarchy: string[][] = [[]]
    //Find managers (ie not reportee to anyone)
    allUsernames.forEach(currentUsername => {
        const currentUsernameReporteeList = allRelations.filter(relation => relation.reporteeId == currentUsername.id)
        if(currentUsernameReporteeList.length === 0){ 
            console.log("Top manager name is: ", currentUsername.name)
            hierarchy[0].push(currentUsername.id)
        }
    })

    //Start at the top level, find the reportees to that person and add them to the next level down, 
    //keep going down a level until there arent anymore reportees
    let bottomFound = false, i = 0;
    do{
        //Find all employees on the next level down
        let nthLevelReportees = hierarchy[i].flatMap(currentManagerId => {
            const reporteeIdList = findReporteeIdList(allRelations, currentManagerId)
            if(!reporteeIdList){
                throw new Error("Error in finding repoertees")
            }
            return reporteeIdList
        })

        //If there arent reportees to the curreny level of employees, weve found the bottom
        //50 iteration cap for not looping infinitely
        if(nthLevelReportees.length === 0 || i > 50){
            bottomFound = true
            console.log("Bottom level employees found, Company managerial levels: ", i)
        }else{
            
            hierarchy[i+1] = nthLevelReportees
            i++
        }
    }while(!bottomFound)
    
    //quick sanity check, is the sorted amount the same as initial amount, if this throws an error then theres an employee under different managers
    const employeeCountAfterAssignment = hierarchy.reduce((accumulator, currentValue) => accumulator + currentValue.length, 0)

    if(employeeCountAfterAssignment !== allUsernames.length){
        throw new Error("Count after assignment and list do not equate: " + employeeCountAfterAssignment + allUsernames.length )
    }

    //Set up and build return list, order will be by level as were going down the levels and then though the employees, hydrating and adding them
    let returnList: hydratedUserType[] = []

    hierarchy.forEach((currentLevel, levelIndex) => {
        currentLevel.forEach(currentUser => {
            const hydratedUser = returnHydratedUserFromId(currentUser, allRelations, allUsernames)

            if(!hydratedUser){
                throw new Error("Error in hydrating user")
            }

            if(hydratedUser){
                returnList.push(hydratedUser)
            }else{
                console.log("Invalid user, not added")
            }           
        })
        console.log("Hydrating ", Math.ceil(levelIndex / hierarchy.length * 100), "%")
    })

    console.log(returnList[0])
    console.log(returnList[4])
    console.log(returnList[3904])
    console.log(returnList[3905])
    
    //Upload and print to console success status
    const uploadSuccess = await postSortedEmployeeList(returnList)

    if(uploadSuccess){
        console.log("conversion successful")
    }else{
        console.log("Conversion failure")
    }
    
}catch(error){
    console.log('Error has occurred. ', error)
}