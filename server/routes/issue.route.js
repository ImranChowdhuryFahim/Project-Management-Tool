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
 *             $ref: '#/definitions/createIssue'
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
 * definitions:
 *   createIssue:
 *     type: object
 *     required:
 *        - columnId
 *        - title
 *        - description
 *        - dueDate
 *     properties:
 *         columnId:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: datetime
 */

/**
 * @swagger
 * /api/workspace/{workspaceKey}/project/{projectKey}/board/issue/{issueKey}:
 *   get:
 *     summary: get issue details
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
 *        - in: path
 *          name: issueKey
 *          schema:
 *              type: string
 *          required: true
 *     responses:
 *       201:
 *         description: Successfully retrieved issue details
 *       404:
 *         description: not found
 */

/**
 * @swagger
 * /api/issue/move:
 *   put:
 *     summary: move issue inside a column
 *     tags: [Issue]
 *     security:
 *        - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/IssueMove'
 *     responses:
 *       200:
 *         description: Successfully moved issue
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
 * definitions:
 *   IssueMove:
 *     type: object
 *     required:
 *        - columnId
 *        - issueId
 *        - fromIndex
 *        - toIndex
 *     properties:
 *         columnId:
 *           type: string
 *         issueId:
 *           type: string
 *         fromIndex:
 *           type: number
 *         toIndex:
 *           type: number
 */

/**
 * @swagger
 * /api/issue/switch:
 *   put:
 *     summary: move issue across column
 *     tags: [Issue]
 *     security:
 *        - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/IssueSwitch'
 *     responses:
 *       200:
 *         description: Successfully switched issue
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
 * definitions:
 *   IssueSwitch:
 *     type: object
 *     required:
 *        - toColumnId
 *        - fromColumnId
 *        - issueId
 *        - fromIndex
 *        - toIndex
 *     properties:
 *         toColumnId:
 *           type: string
 *         fromColumnId:
 *           type: string
 *         issueId:
 *           type: string
 *         fromIndex:
 *           type: number
 *         toIndex:
 *           type: number
 */
router.route('/api/workspace/:workspaceKey/project/:projectKey/board/issue').post(authenticate, validate(validation.issuePayload), controller.createIssue);
router.route('/api/workspace/:workspaceKey/project/:projectKey/board/issue/:issueKey').get(authenticate, controller.getIssueDetails);
router.route('/api/issue/move').put(authenticate, validate(validation.moveIssuePayload), controller.moveIssue);
router.route('/api/issue/switch').put(authenticate, validate(validation.switchIssuePayload), controller.switchIssue);
router.route('/api/issue').put(authenticate, controller.updateIssue);
module.exports = router;
