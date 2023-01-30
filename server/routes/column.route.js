/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');

const controller = require('../controllers/column.controller');

const validation = require('../validation/validation');

const { validate } = require('../middleware/validation.middleware');
const { authenticate } = require('../middleware/authentication.middleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      ApiKeyAuth:
 *         type: apiKey
 *         in: header
 *         name: auth-token
 */

router.route('/api/column').post(authenticate, validate(validation.issuePayload), controller.createColumn);
router.route('/api/column').put(authenticate, controller.updateColumn);
router.route('/api/column/:columnId').delete(authenticate, controller.deleteColumn);

module.exports = router;
