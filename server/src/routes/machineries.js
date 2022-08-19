const { postMachinery, getMachineries, searchMachineries, deleteMachinery } = require('../controllers/machineries');
const { validateJWT } = require('../middlewares/validateJWT');

const router = require('express').Router();


router.get('/', getMachineries)
router.post('/', validateJWT, postMachinery);
router.get('/:term', searchMachineries);
router.delete('/:machineryID', validateJWT, deleteMachinery);


module.exports = router;