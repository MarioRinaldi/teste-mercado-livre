const express = require('express');
const router = express.Router();
const { cors, getItem, getItems, error405 } = require('../controllers/items')


router.use(cors);
router.get('/', error405);
router.get('/api/', error405);
router.get('/api/items/', getItems);
router.get('/api/items/:id', getItem);

module.exports = router;
