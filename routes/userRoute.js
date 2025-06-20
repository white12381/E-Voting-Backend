// routes/user.js
import express from 'express';
import { changePassword, deleteUserAccount, forgotPassword, getUser, getUserByEmail, login, register } from '../controller/userController.js';
const userRoute = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Endpoints for user authentication
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: olasdjk@gmail.com
 *               password:
 *                 type: string
 *                 example: WaleDecole123#
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     tempPassword:
 *                       type: string
 *                       nullable: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     __v:
 *                       type: integer
 *                 token:
 *                   type: string
 *             example:
 *               user:
 *                 _id: "6854c4a135e16041fdac7a1b"
 *                 fullName: "John Doe"
 *                 email: "olasdjk@gmail.com"
 *                 phoneNumber: "+2349023892382"
 *                 tempPassword: null
 *                 createdAt: "2025-06-20T02:17:05.416Z"
 *                 updatedAt: "2025-06-20T02:17:05.416Z"
 *                 __v: 0
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTRjNGExMzVlMTYwNDFmZGFjN2ExYiIsImlhdCI6MTc1MDM4NTgyNSwiZXhwIjoxNzUwNjQ1MDI1fQ.F-Co3cWAglcwmLAYSvGGzIN9d4FBnPGox3yVlHYTJJo"
 *       400:
 *         description: Bad request (e.g. missing email or password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "email is required"
 *       401:
 *         description: Unauthorized (invalid credentials)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email or password"
 */

userRoute.post('/login', login);



/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "olasdjk@gmail.com"
 *               phoneNumber:
 *                 type: string
 *                 example: "+2349023892382"
 *               password:
 *                 type: string
 *                 example: "WaleDecole123#"
 *               confirmPassword:
 *                 type: string
 *                 example: "WaleDecole123#"
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     tempPassword:
 *                       type: string
 *                       nullable: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     __v:
 *                       type: integer
 *                 token:
 *                   type: string
 *             example:
 *               user:
 *                 _id: "6854c4a135e16041fdac7a1b"
 *                 fullName: "John Doe"
 *                 email: "olasdjk@gmail.com"
 *                 phoneNumber: "+2349023892382"
 *                 tempPassword: null
 *                 createdAt: "2025-06-20T02:17:05.416Z"
 *                 updatedAt: "2025-06-20T02:17:05.416Z"
 *                 __v: 0
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTRjNGExMzVlMTYwNDFmZGFjN2ExYiIsImlhdCI6MTc1MDM4NTgyNSwiZXhwIjoxNzUwNjQ1MDI1fQ.F-Co3cWAglcwmLAYSvGGzIN9d4FBnPGox3yVlHYTJJo"
 *       400:
 *         description: Bad request (e.g. missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "email is already in use"
 *       401:
 *         description: Unauthorized (invalid request)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid registration details"
 */

userRoute.post('/register', register);


/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *         example: 6854c4a135e16041fdac7a1b
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 tempPassword:
 *                   type: string
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 __v:
 *                   type: integer
 *             example:
 *               _id: "6854c4a135e16041fdac7a1b"
 *               fullName: "John Doe"
 *               email: "olasdjk@gmail.com"
 *               phoneNumber: "+2349023892382"
 *               tempPassword: null
 *               createdAt: "2025-06-20T02:17:05.416Z"
 *               updatedAt: "2025-06-20T02:17:05.416Z"
 *               __v: 0
 *       400:
 *         description: Invalid or missing ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User ID is required"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
userRoute.get('/:id', getUser)


/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete user account by ID
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *         example: 6854c4a135e16041fdac7a1b
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User account deleted"
 *                 deletedUser:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     __v:
 *                       type: integer
 *             example:
 *               message: "User account deleted"
 *               deletedUser:
 *                 _id: "6854c4a135e16041fdac7a1b"
 *                 fullName: "John Doe"
 *                 email: "olasdjk@gmail.com"
 *                 phoneNumber: "+2349023892382"
 *                 createdAt: "2025-06-20T02:17:05.416Z"
 *                 updatedAt: "2025-06-20T02:17:05.416Z"
 *                 __v: 0
 *       400:
 *         description: Invalid request or missing user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid user ID"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
userRoute.delete('/:id', deleteUserAccount)

/**
 * @swagger
 * /api/user/{id}/change-password:
 *   patch:
 *     summary: Change user password
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose password is to be changed
 *         schema:
 *           type: string
 *         example: 6854c4a135e16041fdac7a1b
 *       - in: query
 *         name: token
 *         required: true
 *         description: Password reset token
 *         schema:
 *           type: string
 *         example: abcd1234resettoken
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - password
 *               - confirmPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: sdhjsdh#
 *               newPassword:
 *                 type: string
 *                 example: WaleDecole123#
 *               confirmPassword:
 *                 type: string
 *                 example: WaleDecole123#
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *       400:
 *         description: Invalid request (e.g., token expired, mismatched passwords)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or expired token"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */

userRoute.patch('/:id/change-password', changePassword)

/**
 * @swagger
 * /api/user/email/{email}:
 *   get:
 *     summary: Get user by email address
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email address of the user
 *         schema:
 *           type: string
 *         example: olasdjk@gmail.com
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 tempPassword:
 *                   type: string
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 __v:
 *                   type: integer
 *             example:
 *               _id: "6854c4a135e16041fdac7a1b"
 *               fullName: "John Doe"
 *               email: "olasdjk@gmail.com"
 *               phoneNumber: "+2349023892382"
 *               tempPassword: null
 *               createdAt: "2025-06-20T02:17:05.416Z"
 *               updatedAt: "2025-06-20T02:17:05.416Z"
 *               __v: 0
 *       400:
 *         description: Bad request (invalid or missing email)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email format"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
userRoute.get('/email/:email', getUserByEmail);


/**
 * @swagger
 * /api/user/forgot-password:
 *   post:
 *     summary: Request password reset link via email
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - url
 *             properties:
 *               email:
 *                 type: string
 *                 example: olasdjk@gmail.com
 *               url:
 *                 type: string
 *                 description: The frontend reset password URL with token placeholder
 *                 example: https://example.com/reset-password
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: Please check your mail to continue
 *       400:
 *         description: Bad request or email service error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Network error/unavailable
 */
userRoute.post('/forgot-password', forgotPassword);
export default userRoute;
