/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');

const controller = require('../controllers/issue.controller');

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
 * /api/workspace/{workspaceKey}/project/{projectKey}/board/issue:
 *   post:
 *     summary: create issue
 *     tags: [Workspace]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Issue'
 *     responses:
 *       201:
 *         description: Successfully created issue
 *       404:
 *         description: Conflict
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
router.route('/api/workspace/:workspaceKey/project/:projectKey/board/issue').post(authenticate, validate(validation.issuePayload), controller.createIssue);

module.exports = router;
