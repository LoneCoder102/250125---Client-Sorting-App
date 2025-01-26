# Dewan Brandt - EPI-USE RESET PROJECT - Employee Sorter

## Instructions
The program is written in typescript and compiles using TSX:
1. Clone: `git clone https://github.com/LoneCoder102/250125---Client-Sorting-App.git`
2. Install dependencies: `npm install`
3. Run typescript directly `npm run dev`

## Notes

Below please see a somewhat report of my thought process and approach to tackling the assigned project.

The project will be done in a manner suitable for end use. I will be using typescript for "type safety" and intelliSense autocomplete. The assumption that the answer to most questions will be more a go ahead to use initiative, I will try and complete this as far as possible with said initiative, even cases where it would be best to double check something. The scope of the app is pretty straightforward, as such I don't think there would be questions warranting technical questions.

### Scope of Work
From reading through the provided document and examining the OpenAPI, the project can be summarized as a database translator. As such the following assumptions are made:
- This is a "one iteration program". It is to be used as a translation layer, ideally once, by a developer. 
- As such, optimization is not at the forefront of the design philosophy. Adaptability, ease of use and inspectability.
- Besides being good practice, it must be well documented so that it can be added to a group of helper functions for future use on other products.

### Steps
Program can be divided into the following steps:
1. Aggregate all data through the pagination
2. Verify data to some extent
3. Parse/Process Data 
4. Reupload Data

### Initial Tests
Calling the endpoints returns the data much as expected, fe things of note:
- 1 more username entry than relation **Does this mean the CEO has no relationship entry? If not who?**
- Record total in response
- With equal relationship entries, there should be entries without reportee's or managerID **Check this**
- What happens when the pagination is called incorrectly? **Would this return error or shortened list**
  - Returns shortened list
  - Outside enquiry returns empty list

### Strategy for building hierarchy
Initially I was thinking of building an object using the manager as the key for the employee and the the reportee as a value on that entry. But this would only work if the company was only 3 layers tall, ie if an employee does not have a reportee or manager, their either on the top or bottom layer, otherwise their in the middle... But what if there are multiple levels? Which is **highly** the case for a company with 3906 employees... So lets try something different. Lets build a list/set of either the top employees (no managers), or the bottom ones (no reportees) and then take it from there, like finding the edges on a puzzle. Find a bases and expand from there.

Also, it would seem most practical to squash the names to the employees while their both in list form.

**Update**: So the relations only have "links" not end pieces, so we need to somehow scan through the employees and find the end pieces
**Update 2**: Made an assumption and am starting to realize its incorrect. Originally I thought that the id field of the relationship entry refers to the user, and then their manager ID and whoever reports to them. I see now that this is wrong, as the relation entries are the links between employees and not a record of their management and reportee... In hindsight this makes way more sense
**Update 3**: Have gotten to the point of being able to process the employees and finding their relations. Upon seeing that, I see that the employee count per managerial level is 5^n, with the levels counting to 6, which I would take as a bug in the code, seeing as how that means each manager has on 5 direct reportees, which seems unreasonable, but given that the employee count matches up, I will take it that this is how the test is set up

### Completion summary
Well definitely not what I was expecting, I thought when reading the title it was going to be a webpage to list and sort employees, but Im happy for this problem. Was not what I was used to.
My code is not efficient at all, but I feel like it is segmented and adaptable to other use cases.

Will clean up a bit now and then upload to gitHub and zip and email

Hope its been interesting :)
