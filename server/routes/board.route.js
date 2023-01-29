/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');

const controller = require('../controllers/board.controller');

const validation = require('../validation/validation');

const { validate } = require('../middleware/validation.middleware');
const { authenticate } = require('../middleware/authentication.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/board/{projectId}:
 *   post:
 *     summary: Create a new project
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Project'
 *     parameters:
 *        - in: path
 *          name: projectId
 *          schema:
 *             type: string
 *          required: true
 *          description: The project id
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
 *        - workspaceId
 *     properties:
 *         workspaceId:
 *           type: string
 *         title:
 *           type: string
 *         key:
 *           type: string
 *         description:
 *           type: string
 *         teamLead:
 *           type: string
 */
router.route('/api/board/:projectId').get(authenticate, controller.getBoardDetails);

module.exports = router;
