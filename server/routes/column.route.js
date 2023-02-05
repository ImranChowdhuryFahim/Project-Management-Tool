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

router.route('/api/workspace/:workspaceKey/project/:projectKey/board/column/').post(authenticate, validate(validation.columnPayload), controller.createColumn);
router.route('/api/workspace/:workspaceKey/project/:projectKey/board/column/:columnId').put(authenticate, validate(validation.columnPayload), controller.updateColumn);
router.route('/api/workspace/:workspaceKey/project/:projectKey/board/column/:columnId').delete(authenticate, controller.deleteColumn);
router.route('/api/board/column-move').put(authenticate, validate(validation.moveColumnPayload), controller.moveColumn);

module.exports = router;
