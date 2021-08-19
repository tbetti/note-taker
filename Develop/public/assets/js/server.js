const router = require('express').Router();
router.use('/notes', require('../../../routes/notes'));

module.exports = router;