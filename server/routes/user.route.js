/* eslint-disable max-len */
const express = require('express');

const controller = require('../controllers/user.controller');

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
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             example:
 *               message: successfully registered
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
 *                  message: user already exists
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
 *                  message: email can't be empty
 * definitions:
 *   User:
 *     type: object
 *     required:
 *        - displayName
 *        - email
 *        - password
 *     properties:
 *         displayName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     example:
 *         displayName: Imran Chowdhury
 *         email: imran.cuet.cse17@gmail.com
 *         password: '123456'
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                - email
 *                - password
 *             properties:
 *                email:
 *                   type: string
 *                password:
 *                   type: string
 *             example:
 *               email: u1704107@student.cuet.ac.bd
 *               password: "123456"
 *     responses:
 *       200:
 *         description: Login successfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                    type: string
 *                 token:
 *                    type: string
 *               example:
 *                 message: successfully logged in
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q2MTliY2UxNTA0YmFiZWEyNWMxYzEiLCJpYXQiOjE2NzQ5NzU3MTd9.mXW41zcdbRE79MLPm1rdLxoElLtfcfPTjK6lhWYKMbQ"
 *       401:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                example:
 *                     message: credentials do not match
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                example:
 *                     message: no such user exists
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: get user profile info
 *     tags: [User]
 *     security:
 *        - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved workspaces list
 */
/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: update user profile info
 *     tags: [User]
 *     security:
 *        - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                displayName:
 *                   type: string
 *                avatarLink:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 */

/**
 * @swagger
 * /api/user/workspaces:
 *   get:
 *     summary: get user workspaces list
 *     tags: [User]
 *     security:
 *        - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved workspaces list
 */
/**

/**
 * @swagger
 * /api/user/projects:
 *   get:
 *     summary: get user projects list
 *     tags: [User]
 *     security:
 *        - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved projects list
 */

/**
 * @swagger
 * /api/user/projects/{workspaceKey}:
 *   get:
 *     summary: get user projects list
 *     tags: [User]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: workspaceKey
 *          schema:
 *             type: string
 *          required: true
 *          description: The workspace id
 *     responses:
 *       200:
 *         description: Successfully retrieved projects list
 */
router.route('/api/user/register').post(validate(validation.signUp), controller.register);
router.route('/api/user/login').post(validate(validation.login), controller.login);
router.route('/api/user/profile').get(authenticate, controller.getProfileDetails);
router.route('/api/user/profile').put(authenticate, validate(validation.profilePayload), controller.updateProfile);
router.route('/api/user/workspaces').get(authenticate, controller.getWorkspaces);
router.route('/api/user/projects').get(authenticate, controller.getProjects);
router.route('/api/user/projects/:workspaceKey').get(authenticate, controller.getWorkspaceProjects);
module.exports = router;
