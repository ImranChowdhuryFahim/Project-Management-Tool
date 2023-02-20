/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');

const controller = require('../controllers/board.controller');
const notiController = require('../controllers/notification.controller');

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

/**
 * @swagger
 * /api/workspace/{workspaceKey}/project/{projectKey}/board:
 *   get:
 *     summary: Get Board details
 *     tags: [Board]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: workspaceKey
 *          schema:
 *             type: string
 *          required: true
 *          description: The workspace key
 *        - in: path
 *          name: projectKey
 *          schema:
 *              type: string
 *          required: true
 *          description: The project key
 *     responses:
 *       200:
 *         description: Successfully retrieved board details
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                     type: string
 *               example:
 *                  message: not found
 */
router.route('/api/workspace/:workspaceKey/project/:projectKey/board').get(authenticate, controller.getBoardDetails);
router.route('/api/notification/:userId').get(authenticate, notiController.getNotifications);

module.exports = router;
