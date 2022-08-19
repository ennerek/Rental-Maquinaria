const { rentalMachinery, getRentedMachineries, makePayment } = require('../controllers/rentalMachinery');
const { validateJWT } = require('../middlewares/validateJWT');

const router = require('express').Router();


router.post('/:machineryID', validateJWT, rentalMachinery)
router.get('/', validateJWT, getRentedMachineries)
router.put('/', validateJWT, makePayment)

module.exports = router;