const { postGetMembers } = require('./../controllers/retrieveController');
const router = require('express').Router();

router.post('/get-members', postGetMembers);

module.exports = router;