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
 *     properties:
 *         title:
 *           type: string
 *         key:
 *           type: string
 *         description:
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
 * /api/workspace/{workspaceKey}/projects:
 *   get:
 *     summary: Get workspace project list
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
 *         description: Retrieved workspace project list
 *         content:
 *           application/json:
 *             example:
 *               message: successfully retrieved
 */

/**
 * @swagger
 * /api/workspace/{workspaceKey}/member:
 *   put:
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
 *             $ref: '#/definitions/AddMemberPayload1'
 *     responses:
 *       200:
 *         description: member added successfully
 *         content:
 *           application/json:
 *             example:
 *               message: member added successfully
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
 * definitions:
 *   AddMemberPayload1:
 *     type: object
 *     required:
 *        - email
 *        - role
 *     properties:
 *         email:
 *           type: string
 *         role:
 *           type: string
 */
router.route('/api/workspace').post(authenticate, validate(validation.workspacePayload), controller.createWorkspace);
router.route('/api/worKspace/:workspaceKey/member').put(authenticate, validate(validation.addMemberPayload), controller.addMember);
router.route('/api/workspace/:workspaceKey').get(authenticate, controller.getWorkspaceDetails);
router.route('/api/workspace/:workspaceKey/projects').get(authenticate, controller.getProjectsList);

module.exports = router;
