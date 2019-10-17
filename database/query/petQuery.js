const petQuery = {};

petQuery.addPetWithoutVet = 'INSERT INTO pets (name, type, gender, spayed, birth_year, owner_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
petQuery.addPet = 'INSERT INTO pets (name, type, gender, spayed, birth_year, owner_id, vet_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
petQuery.getPetsFromOwner = 'SELECT * FROM pets WHERE owner_id = $1';
petQuery.deletePet = 'DELETE FROM pets WHERE pet_id = $1';
// https://www.w3schools.com/sql/sql_update.asp

module.exports = petQuery;
