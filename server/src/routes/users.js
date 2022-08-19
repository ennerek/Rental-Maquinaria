const { Router } = require('express');
const { getUser, postUser, putUser, deleteUser, patchUser } = require('../controllers/users');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();


//router.get('/', getUsers )

router.get('/', validateJWT ,getUser)

router.post('/', postUser)

router.put('/:id', putUser)

router.delete('/:id', deleteUser)

router.patch('/', validateJWT, patchUser)

module.exports = router;

