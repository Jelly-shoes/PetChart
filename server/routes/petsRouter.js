const router = require('express').Router();

const petsController = require('../controllers/petsController');

/**
 * @endpoint : '/pets/'
 * @method : GET
 * @returns -> an array of all pets via JSON
 */
router.get('/', petsController.getPets, (req, res) => {
  const { pets } = res.locals;
  res.json(pets);
});

/**
 * @endpoint : '/pets/'
 * @method : POST
 * @returns -> a single pet object via JSON
 */
router.post('/', petsController.addPet, (req, res) => {
  const { newPet } = res.locals;
  res.json(newPet);
});

/**
 * @endpoint : '/pets/'
 * @method : PUT
 * @returns -> a single pet object via JSON
 */
router.put('/', petsController.adjustPet, (req, res) => {
  console.log('put method fired in petsRouter')
  const { adjPet } = res.locals;
  res.json(adjPet);
});

router.delete('/', petsController.deletePet, (req, res) => {
  // console.log('***res in router.delete is***', res);
  const { petId } = res.locals;
  console.log('delete path fired');
  console.log('id in router delete is', petId);
  res.json(petId);
});

module.exports = router;
