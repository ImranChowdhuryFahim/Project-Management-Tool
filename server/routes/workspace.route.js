/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');

const controller = require('../controllers/workspace.controller');

const validation = require('../validation/validation');

const { validate } = require('../middleware/validation.middleware');
const { authenticate } = require('../middleware/authentication.middleware');
const { route } = require('./user.route');

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
 * /api/workspace:
 *   post:
 *     summary: Create a new workspace
 *     tags: [Workspace]
 *     security:
 *        - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Workspace'
 *     responses:
 *       201:
 *         description: The workspace was successfully created
 *         content:
 *           application/json:
 *             example:
 *               message: successfully created workspace
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                     type: string
 *               example:
 *                  message: workspace already exists
 *       422:
 *         description: Could not process
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                     type: string
 *               example:
 *                  message: key can't be empty
 *       500:
 *         description: Could not create
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                     type: string
 *               example:
 *                  message: could not create the workspace
 * definitions:
 *   Workspace:
 *     type: object
 *     required:
 *        - title
 *        - key
 *        - owner
 *     properties:
 *         title:
 *           type: string
 *         key:
 *           type: string
 *         description:
 *           type: string
 *         owner:
 *           type: string
 */
/**
 * @swagger
 * /api/workspace/{workspaceKey}:
 *   get:
 *     summary: Get workspace details
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
 *     responses:
 *       200:
 *         description: Retrieved workspace details successfully
 *         content:
 *           application/json:
 *             example:
 *               message: successfully added workspace
 */

/**
 * @swagger
 * /api/workspace/{workspaceKey}/member:
 *   post:
 *     summary: Add member to workspace
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AddMemberPayload'
 *     responses:
 *       200:
 *         description: The workspace was successfully created
 *         content:
 *           application/json:
 *             example:
 *               message: successfully added workspace
 *       404:
 *         description: Could not process
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                     type: string
 *               example:
 *                  message: not found
 * definitions:
 *   AddMemberPayload:
 *     type: object
 *     required:
 *        - userId
 *        - role
 *     properties:
 *         workspaceId:
 *           type: string
 *         userId:
 *           type: string
 *         role:
 *           type: string
 */
router.route('/api/workspace').post(authenticate, validate(validation.workspacePayload), controller.createWorkspace);
router.route('/api/worspace/:workspaceKey/member').post(authenticate, validate(validation.addMemberPayload), controller.addMember);
router.route('/api/workspace/:workspaceKey').get(authenticate, controller.getWorkspaceDetails);

module.exports = router;