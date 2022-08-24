# database

# Scenario
We have a platform where psychiatrists can register their patients through a mobile/ web portal. Each psychiatrist belongs to a hospital. We have provided the hospital list on the last page.(predefined list). 

Minimum 5 psychiatrists work in a single hospital. 


# development
- cd database
- npm i 
- npm start


## Functionalities 
- Create a Hospital, Doctor 
- Register a Patient along with IDs and patient details for a hospital
- Fetch all the psychiatrists, their count along with IDs and patient details for a hospital.


## Checks
# When register Patient
- Name
- Address should be at least 10 characters
- Email should be a valid email address
- Phone number should be at least 10 number
- Password must contain one upper character, one lower character and a number. Max length 15 and min length 8
- Upload Patient Photo
- Search by Name ID, Hospital ID And Doctor ID
- Contact should take multiple phone numbers
- Export all patient, hospital and doctor details in JSON


## Technologies
- Express (NodeJS) / Efficient Node js frameworks
- MongoDB Database


## Tools to use
- POSTMAN
- VSCode 