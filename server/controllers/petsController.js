const petsController = {};
const petQuery = require('../../database/query/petQuery.js');
const db = require('../../database/database');

/**
 * @description gets all Pets from a single user(owner)
 * @requirements : a owner_id(id) stored inside res.locals
 */
petsController.getPets = (req, res, next) => {
  console.log('\n*********** petsController.getPets ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);

  const { passwordMatch, profileMatch } = res.locals;

  if (profileMatch && passwordMatch) {
    // NOTES: id will be retrieved from a user logging in
    const { id } = res.locals.owner;
    db.connect((err, client, release) => {
      client.query(petQuery.getPetsFromOwner, [id])
        .then((petList) => {
          release();
          // successful query
          const newPetList = petList.rows.map((pet) => {
          // switching keys for each pet from snake_case to camelCase
            const {
              pet_id, name, type, gender, spayed, birth_year, vet_id,
            } = pet;
            return {
              id: pet_id, name, type, gender, spayed, birthYear: birth_year, vetID: vet_id,
            };
          });
          res.locals.pets = newPetList;
          return next();
        })
        .catch((petQueryErr) => next(petQueryErr));
    });
  } else {
    return next();
  }
};

/**
 * @description adds a Pet from a single user(owner) to the database
 * (vet_id is optional, owner_id must be required)
 * @requirements : a owner_id stored inside req.body
 * @optionals : a vet_id stored inside req.body
 * @body : { pet: {...} }
 */
petsController.addPet = (req, res, next) => {
  console.log('\n*********** petsController.addPet ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);

  // NOTES: check with frontend to see the structure of how they send a pet data to server
  // eslint-disable-next-line object-curly-newline
  const { name, type, gender, spayed, birthYear, ownerID, vetID } = req.body.pet;
  // const { vetID } = res.locals;

  if (req.body.pet) {
    // if vetID exist then we query normally otherwise we query without the vet_id column added
    const addPet = vetID ? petQuery.addPet : petQuery.addPetWithoutVet;
    const petData = vetID ? [name, type, gender, spayed, birthYear, ownerID, vetID] : [name, type, gender, spayed, birthYear, ownerID];
    
    console.log('req.body.pet in GET petsController is', req.body.pet)
    console.log('petdata in GET petsController is', petData)

    db.connect((err, client, release) => {
      console.log('ERROR: ', err);
      client.query(addPet, petData)
        .then((newPet) => {
          release();
          // successful query
          const {
            pet_id, name, type, gender, spayed, birth_year, owner_id, vet_id,
          } = newPet.rows[0];
          res.locals.newPet = {
            id: pet_id, name, type, gender, spayed, birthYear: birth_year, ownerID: owner_id, vetID: vet_id,
          };
          return next();
        })
        .catch((petQueryErr) => {
          console.log('petERROR: ', petQueryErr);
          next(petQueryErr);
        });
    });
  }
};

petsController.adjustPet = (req, res, next) => {
  console.log('\n*********** petsController.ADJUSTPet ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);
  const { name, type, gender, spayed, birthYear, ownerID } = req.body.pet;
  const petData = [name, type, gender, spayed, birthYear, ownerID];

  console.log('req.body.pet in PUT petsController is', req.body.pet)
  console.log('petdata in PUT petsController is', petData)

  // write query to execute
  const queryStr = `
  UPDATE pets
  SET
  name = '${petData[0]}',
  type = '${petData[1]}',
  gender = '${petData[2]}',
  spayed = '${petData[3]}',
  birth_year = '${petData[4]}',
  owner_id = ${petData[5]}
  WHERE owner_id = ${petData[5]}`;
  // need to include pet_id in WHERE, so we don't update all pets
  // will also need this in order to pass info as reponse back to front

  console.log('querystring in petsController is', queryStr);

  if (req.body.pet) {
    db.connect((err, client, release) => {
      client.query(queryStr)
        .then((adjPet) => {
          release();
          // successful query
          console.log('PUT query was successful', adjPet);
          const {
            pet_id, name, type, gender, spayed, birth_year, owner_id
          } = adjPet.rows[0];

          res.locals.adjPet = {
            id: pet_id, name, type, gender, spayed, birthYear: birth_year, ownerID: owner_id,
          };
          return next();
        })
        .catch((petQueryErr) => {
          console.log('petQUERYERROR: ', petQueryErr);
          next(petQueryErr);
        });
    });
  }
}

/**
 * @description deletes single pet from pets table
 * @requirements : a pet(id) stored inside res.locals
 */

petsController.deletePet = (req, res, next) => {
  console.log('\n*********** petsController.deletePet ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);

  // const { passwordMatch, profileMatch } = res.locals;

  // if (profileMatch && passwordMatch) {
  const { id } = req.body;// res.locals.owner; // update
  console.log('id in delete query', id);
  res.locals.petId = id;
  console.log('res.locals.petId in petsController', id);
  db.connect((err, client, release) => {
    client.query(petQuery.deletePet, [id])
      .then((result) => {
        console.log('result from petsController', result);
        release();
        return next();
      })
      .catch((petDeleteErr) => next(petDeleteErr));
  });
  // }
};

module.exports = petsController;
