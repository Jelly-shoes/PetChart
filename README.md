# PetChart
Sophisticated EMR chart for pet owners seeking veterinarian, shelters & more

Front End Explanations
  - fetch requests in stateful components may not be the best way to send/receive data from server
  - Add pet and update pet functionality needs a serious overhaul
    - May want to make separate savePet and addPet action creators and handle them differently in the reducer
  - Opportunity to component-ize some html in Profile component

Back End Explanations
  - Endpoints are tied to front-end functionality
  - On login, all pertinent data (owner, pet) is submitted to front-end to render
  - Logic to test profile email/password are saved as properties in response obj, need to incorporate cookies for more robust middleware
  - Nested queries due to async db requests
  
<img src="./Image from iOS (1).jpg"/>
