/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');

const controller = require('../controllers/project.controller');

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
 * /api/workspace/{workspaceKey}/project:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
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
 *             $ref: '#/definitions/Project'
 *     responses:
 *       201:
 *         description: The project was successfully created
 *         content:
 *           application/json:
 *             example:
 *               message: successfully created project
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
 *                  message: project already exists
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
 *                  message: could not create the project
 * definitions:
 *   Project:
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
 * /api/workspace/{workspaceKey}/project/{projectKey}:
 *   get:
 *     summary: Get project details
 *     tags: [Project]
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
 *             type: string
 *          required: true
 *          description: The project key
 *     responses:
 *       200:
 *         description: Successfully retrieved project details
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/project/{projectId}/member:
 *   put:
 *     summary: Add member to project
 *     tags: [Project]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: projectId
 *          schema:
 *             type: string
 *          required: true
 *          description: The project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AddMemberPayload'
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
 *   AddMemberPayload:
 *     type: object
 *     required:
 *        - userId
 *        - role
 *     properties:
 *         userId:
 *           type: string
 *         role:
 *           type: string
 */

/**
 * @swagger
 * /api/project/{projectId}:
 *   put:
 *     summary: Update project
 *     tags: [Project]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: projectId
 *          schema:
 *             type: string
 *          required: true
 *          description: The project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateProject'
 *     responses:
 *       200:
 *         description: successfully updated
 *         content:
 *           application/json:
 *             example:
 *               message: successfully updated
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
 *   updateProject:
 *     type: object
 *     required:
 *        - title
 *        - description
 *     properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 */
router.route('/api/workspace/:workspaceKey/project').post(authenticate, validate(validation.projectPayload), controller.createProject);
router.route('/api/workspace/:workspaceKey/project/:projectKey').get(authenticate, controller.getProjectDetails);
router.route('/api/project/:projectId').put(authenticate, validate(validation.updateProject), controller.updateProject);
router.route('/api/project/:projectId/member').put(authenticate, validate(validation.addProjectMemberPayload), controller.addMember);
module.exports = router;
