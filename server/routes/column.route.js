/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');

const controller = require('../controllers/column.controller');

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
 * /api/column/{columnId}:
 *   put:
 *     summary: update column
 *     tags: [Column]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: columnId
 *          schema:
 *             type: string
 *          required: true
 *          description: The column id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateColumn'
 *     responses:
 *       200:
 *         description: Successfully updated column
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
 *                  message: board not found
 * definitions:
 *   updateColumn:
 *     type: object
 *     required:
 *        - title
 *     properties:
 *         title:
 *           type: string
 */

/**
 * @swagger
 * /api/board/{boardId}/column:
 *   post:
 *     summary: create column
 *     tags: [Column]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: boardId
 *          schema:
 *             type: string
 *          required: true
 *          description: The board id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/createColumn'
 *     responses:
 *       201:
 *         description: Successfully created column
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
 *                  message: board not found
 * definitions:
 *   createColumn:
 *     type: object
 *     required:
 *        - title
 *     properties:
 *         title:
 *           type: string
 */

/**
 * @swagger
 * /api/board/{boardId}/column/{columnId}:
 *   delete:
 *     summary: delete column
 *     tags: [Column]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: boardId
 *          schema:
 *             type: string
 *          required: true
 *          description: The board id
 *        - in: path
 *          name: columnId
 *          schema:
 *              type: string
 *          required: true
 *          description: The column id
 *     responses:
 *       200:
 *         description: Successfully deleted column
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
 *                  message: board not found
 */

/**
 * @swagger
 * /api/board/{boardId}/column/{columnId}/move:
 *   put:
 *     summary: move column
 *     tags: [Column]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: boardId
 *          schema:
 *             type: string
 *          required: true
 *          description: The board id
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
 *             $ref: '#/definitions/moveColumn'
 *     responses:
 *       201:
 *         description: Successfully moved column
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
 *                  message: board not found
 * definitions:
 *   moveColumn:
 *     type: object
 *     required:
 *        - fromIndex
 *        - toIndex
 *     properties:
 *         fromIndex:
 *           type: number
 *         toIndex:
 *           type: number
 */

router.route('/api/board/:boardId/column').post(authenticate, validate(validation.columnPayload), controller.createColumn);
router.route('/api/column/:columnId').put(authenticate, validate(validation.columnPayload), controller.updateColumn);
router.route('/api/board/:boardId/column/:columnId').delete(authenticate, controller.deleteColumn);
router.route('/api/board/:boardId/column/:columnId/move').put(authenticate, validate(validation.moveColumnPayload), controller.moveColumn);

module.exports = router;
