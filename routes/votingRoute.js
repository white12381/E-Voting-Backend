import express from 'express'; 
import { createDecisionRoom, getMyRooms, getRoomById, SelectCandidate } from '../controller/roomController.js';
import UserMiddleWare from '../middleware/userMiddleWare.js';
const votingRoute = express.Router(); 




/**
 * @swagger
 * /api/voting/select-candidate:
 *   post:
 *     summary: Submit a vote for a candidate
 *     tags:
 *       - Voting
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - title
 *               - fullName
 *               - candidateName
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: "665b1bba6e1d3c001faed308"
 *                 description: Optional. If provided, must be a valid ObjectId.
 *               roomId:
 *                 type: string
 *                 format: uuid
 *                 example: "665b1eaa6e1d3c001faed309"
 *               title:
 *                 type: string
 *                 example: "Presidential Election"
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               candidateName:
 *                 type: string
 *                 example: "Alice Johnson"
 *     responses:
 *       201:
 *         description: Vote submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 roomId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 fullName:
 *                   type: string
 *                 candidateName:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               _id: "666f4e7e431d5a4f8bbd1122"
 *               userId: "665b1bba6e1d3c001faed308"
 *               roomId: "665b1eaa6e1d3c001faed309"
 *               title: "Presidential Election"
 *               fullName: "John Doe"
 *               candidateName: "Alice Johnson"
 *               createdAt: "2025-06-20T12:34:56.000Z"
 *               updatedAt: "2025-06-20T12:34:56.000Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   properties:
 *                     roomId:
 *                       type: string
 *                       example: "Room ID is required"
 *                     title:
 *                       type: string
 *                       example: "Title is required"
 *                     fullName:
 *                       type: string
 *                       example: "FullName is required"
 *                     candidateName:
 *                       type: string
 *                       example: "Candidate name is required"
 *                     userId:
 *                       type: string
 *                       example: "Invalid User ID"
 */
votingRoute.post('/select-candidate', SelectCandidate);


/**
 * @swagger
 * /api/voting/room/{roomId}:
 *   get:
 *     summary: Get a voting room by ID
 *     tags:
 *       - Voting
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: The ID of the voting room to retrieve
 *         schema:
 *           type: string
 *           example: 665b1f43f423a933d70aa021
 *     responses:
 *       200:
 *         description: Voting room found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 contestantName:
 *                   type: array
 *                   items:
 *                     type: string
 *                 deadline:
 *                   type: string
 *                   format: date-time
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               _id: "665b1f43f423a933d70aa021"
 *               userId: "665b1bba6e1d3c001faed308"
 *               title: "Best Developer Award"
 *               contestantName: ["Alice", "Bob"]
 *               deadline: "2025-07-01T23:59:59.000Z"
 *               createdAt: "2025-06-20T11:22:33.456Z"
 *               updatedAt: "2025-06-20T11:22:33.456Z"
 *       400:
 *         description: Room not found or invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Room does not exist"
 */
votingRoute.get('/room/:id', getRoomById);

votingRoute.use(UserMiddleWare)

/**
 * @swagger
 * tags:
 *   - name: Voting 
 *     description: Endpoints for user manage Votes
 */


/**
 * @swagger
 * /api/voting/create-voting:
 *   post:
 *     summary: Create a new voting event
 *     tags:
 *       - Voting
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - contestantName
 *               - deadline
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Best Developer Award"
 *               description:
 *                 type: string
 *                 example: "Annual tech voting event for best dev"
 *               contestantName:
 *                 type: array
 *                 items:
 *                   type: string
 *                 minItems: 2
 *                 maxItems: 5
 *                 example: ["Alice", "Bob", "Charlie"]
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-01T23:59:59.000Z"
 *     responses:
 *       201:
 *         description: Voting event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 contestantName:
 *                   type: array
 *                   items:
 *                     type: string
 *                 deadline:
 *                   type: string
 *                   format: date-time
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               _id: "665b1f43f423a933d70aa021"
 *               title: "Best Developer Award"
 *               description: "Annual tech voting event for best dev"
 *               contestantName: ["Alice", "Bob", "Charlie"]
 *               deadline: "2025-07-01T23:59:59.000Z"
 *               createdAt: "2025-06-20T11:22:33.456Z"
 *               updatedAt: "2025-06-20T11:22:33.456Z"
 *       400:
 *         description: Invalid input or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Title is required"
 *                     contestantName:
 *                       type: string
 *                       example: "Contestants must be between 2 and 5 people"
 *                     deadline:
 *                       type: string
 *                       example: "Deadline must be a future date"
 *             example:
 *               errors:
 *                 title: "Title is required"
 *                 contestantName: "Contestants must be between 2 and 5 people"
 *                 deadline: "Deadline must be a future date"
 */

votingRoute.post('/create-voting', createDecisionRoom);



/**
 * @swagger
 * /api/voting/my-rooms:
 *   get:
 *     summary: Get all voting rooms created by the authenticated user
 *     tags:
 *       - Voting
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of voting rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   title:
 *                     type: string
 *                   contestantName:
 *                     type: array
 *                     items:
 *                       type: string
 *                   deadline:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *             example:
 *               - _id: "665b1f43f423a933d70aa021"
 *                 userId: "665b1bba6e1d3c001faed308"
 *                 title: "Best Developer Award"
 *                 contestantName: ["Alice", "Bob"]
 *                 deadline: "2025-07-01T23:59:59.000Z"
 *                 createdAt: "2025-06-20T11:22:33.456Z"
 *                 updatedAt: "2025-06-20T11:22:33.456Z"
 *       401:
 *         description: Unauthorized – missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       400:
 *         description: Other errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong"
 */

votingRoute.get('/my-rooms', getMyRooms);



export default votingRoute