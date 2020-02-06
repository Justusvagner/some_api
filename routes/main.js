const express = require('express');
const router = express.Router();

const { Actions } = require('../controllers');
const actions = new Actions();

router.route('/create-number/:num').post(actions.createNumber.bind(actions));

router.route('/list').get(actions.getList.bind(actions));
router.route('/statistic').get(actions.getStats.bind(actions));
router.route('/download').get(actions.downloadFile.bind(actions));

module.exports = router;
