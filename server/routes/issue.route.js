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
 * /api/workspace/{workspaceKey}/project/{projectKey}/board/column/{columnId}/issue:
 *   post:
 *     summary: create issue
 *     tags: [Issue]
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
 *          name: columnId
 *          schema:
 *              type: string
 *          required: true
 *          description: The column id
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
 *        - title
 *        - description
 *        - priority
 *        - dueDate
 *     properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         priority:
 *           type: string
 *         dueDate:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * /api/workspace/{workspaceKey}/project/{projectKey}/board/issue/{issueKey}:
 *   get:
 *     summary: get issue details
 *     tags: [Issue]
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
 * /api/issue/{issueId}/move:
 *   put:
 *     summary: move issue inside a column
 *     tags: [Issue]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: issueId
 *          schema:
 *             type: string
 *          required: true
 *          description: The issue id
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
 *        - fromIndex
 *        - toIndex
 *     properties:
 *         columnId:
 *           type: string
 *         fromIndex:
 *           type: number
 *         toIndex:
 *           type: number
 */

/**
 * @swagger
 * /api/issue/{issueId}/switch:
 *   put:
 *     summary: move issue across column
 *     tags: [Issue]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: issueId
 *          schema:
 *             type: string
 *          required: true
 *          description: The issue id
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
 *        - fromIndex
 *        - toIndex
 *     properties:
 *         toColumnId:
 *           type: string
 *         fromColumnId:
 *           type: string
 *         fromIndex:
 *           type: number
 *         toIndex:
 *           type: number
 */

/**
 * @swagger
 * /api/issue/{issueId}:
 *   put:
 *     summary: update issue
 *     tags: [Issue]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: issueId
 *          schema:
 *             type: string
 *          required: true
 *          description: The issue id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateIssue'
 *     responses:
 *       200:
 *         description: Successfully updated issue
 * definitions:
 *   updateIssue:
 *     type: object
 *     required:
 *        - title
 *        - description
 *        - dueDate
 *        - isDone
 *        - priority
 *     properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *           format: date
 *         isDone:
 *           type: boolean
 *         priority:
 *           type: string
 */

/**
 * @swagger
 * /api/project/{projectId}/issue/{issueId}/assign-developer:
 *   put:
 *     summary: assign developer
 *     tags: [Issue]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: issueId
 *          schema:
 *             type: string
 *          required: true
 *          description: The issue id
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
 *             $ref: '#/definitions/assignDeveloper'
 *     responses:
 *       200:
 *         description: Successfully added developer
 * definitions:
 *   assignDeveloper:
 *     type: object
 *     required:
 *        - userId
 *     properties:
 *         userId:
 *           type: string
 */

/**
 * @swagger
 * /api/board/{boardId}/column/{columnId}/issue/{issueId}:
 *   delete:
 *     summary: delete issue
 *     tags: [Issue]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: boardId
 *          schema:
 *             type: string
 *          required: true
 *          description: The baord id
 *        - in: path
 *          name: columnId
 *          schema:
 *             type: string
 *          required: true
 *          description: The column id
 *        - in: path
 *          name: issueId
 *          schema:
 *             type: string
 *          required: true
 *          description: The issue id
 *     responses:
 *       200:
 *         description: Successfully deleted issue
 */

router.route('/api/workspace/:workspaceKey/project/:projectKey/board/column/:columnId/issue').post(authenticate, validate(validation.issuePayload), controller.createIssue);
router.route('/api/workspace/:workspaceKey/project/:projectKey/board/issue/:issueKey').get(authenticate, controller.getIssueDetails);
router.route('/api/issue/:issueId/move').put(authenticate, validate(validation.moveIssuePayload), controller.moveIssue);
router.route('/api/issue/:issueId/switch').put(authenticate, validate(validation.switchIssuePayload), controller.switchIssue);
router.route('/api/project/:projectId/issue/:issueId/assign-developer').put(authenticate, validate(validation.assignDeveloperPayload), controller.assignDeveloper);
router.route('/api/issue/:issueId').put(authenticate, validate(validation.updateIssuePayload), controller.updateIssue);
router.route('/api/board/:boardId/column/:columnId/issue/:issueId').delete(authenticate, controller.deleteIssue);
module.exports = router;
