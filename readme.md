# 📦 <project-name>

A Node.js + Express backend API for <brief description here, e.g., "user authentication, voting system, and more">.

---

## 🚀 Features

- JWT-based Authentication
- User Registration and Login
- Password Reset via Email (Nodemailer + EJS)
- Voting System with Contestant Validation
- MongoDB Integration via Mongoose
- Swagger API Documentation

---

## 📁 Folder Structure

project-root/
├── controller/ # Route handlers
├── model/ # Mongoose schemas/models
├── routes/ # API routes
├── services/ # Mail, helpers, etc.
├── view/ # EJS templates for email
├── .env # Environment variables
├── server.js # Entry point
├── README.md
---




## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<project-name>.git
cd <project-name>
npm install

Create a .env file in the root:

PORT=5000
MONGO_URI=mongodb://localhost:27017/inside-success
SECRET=your_jwt_secret
USER=youremail@gmail.com
PASS=your_email_password_or_app_password

npm run dev

Start your server and open:

http://localhost:5000/

🧪 Auth Workflow

    Register: POST /api/user/register

    Login: POST /api/user/login → returns JWT

    Forgot Password: POST /api/user/forgot-password

    Reset Password: PATCH /api/user/:id/change-password?token=...


    🗳️ Voting Workflow

    Create Voting Event: POST /api/voting/create-voting

    Requires: title, contestantName[] (min 2), and future deadline

    Example Request:

{
  "title": "Best Developer",
  "description": "Annual voting for top developer",
  "contestantName": ["Alice", "Bob", "Charlie"],
  "deadline": "2025-07-01T23:59:59.000Z"
}

📬 Forgot Password Email

    Uses EJS templates for styling

    Sends via Gmail SMTP

    Configure Gmail to allow app password (recommended)

await ejs.renderFile(path.join(__dirname, '../view/forgotPassword.ejs'), {
  fullName,
  url,
  temppassword
});

🔐 JWT Usage

Token is returned on successful login:

{
  "user": {
    "_id": "123",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}

Use it in Authorization header:

Authorization: Bearer jwt_token_here

📦 Available Scripts

npm run dev     # Start with nodemon
npm start       # Start without nodemon (for production)

💡 Tech Stack

    Node.js – Runtime

    Express.js – Server framework

    MongoDB + Mongoose – Database & ODM

    JWT – Authentication

    Nodemailer + EJS – Email system

    Swagger (OpenAPI) – API documentation

🌍 Example .env File

PORT=5000
MONGO_URI=mongodb://localhost:27017/inside-success
SECRET=your_jwt_secret_key
USER=your_email@gmail.com
PASS=your_app_password

    ⚠️ Never commit real credentials. Use .env and .gitignore.

🧑‍💻 Author

Usman Olasunkanmi
GitHub: @your-username
📄 License

This project is licensed under the MIT License – free for personal and commercial use.
🙋 Need Help?

Open an issue or contact me via GitHub if you need assistance!



