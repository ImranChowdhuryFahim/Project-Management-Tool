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

router.route('/api/workspace/:workspaceKey/project').post(authenticate, validate(validation.projectPayload), controller.createProject);
module.exports = router;
