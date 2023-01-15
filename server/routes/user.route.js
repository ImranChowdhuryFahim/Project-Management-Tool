/* eslint-disable max-len */
const express = require('express');

const controller = require('../controllers/user.controller');

const validation = require('../validation/validation');

const { validate } = require('../middleware/validation.middleware');

const router = express.Router();

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
 *               email: imran.cuet.cse17@gmail.com
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
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNjODlmMzhkNTlkNjhlNjNkMzM2ZjUiLCJpYXQiOjE2MjQwMTc0NDl9.gGEg_O-BwmWx3kPj6CXpo9rWH_0bcfESAe5rrTvu9lw"
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
router.route('/api/user/register').post(validate(validation.signUp), controller.register);
router.route('/api/user/login').post(validate(validation.login), controller.login);
router.route('/api/test/usersList').get(controller.getAllUsers);
module.exports = router;
