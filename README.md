# Authentication and Authorization Application

This project is a Node.js-based Authentication and Authorization application using MongoDB, Express.js, and JSON Web Tokens (JWT). It includes role-based access control for `Admin`, `Student`, and `Visitor` roles.

## Features
- User Sign-Up
- User Login with JWT generation
- Role-based access control
- Password hashing with bcrypt
- Secure cookies for token storage

---

## Project Structure
```
AuthApp/
├── config/
│   └── dbConnect.js        # Database connection
├── controller/
│   ├── login.js            # Login controller
│   └── signUp.js           # Sign-Up controller
├── middlewares/
│   └── auth.js             # Authentication and Authorization middlewares
├── models/
│   └── User.js             # User schema
├── routes/
│   └── users.js            # User routes
├── index.js                # Main entry point
├── .env                    # Environment variables
└── README.md               # Documentation
```

---

## Installation and Setup

### Prerequisites
1. [Node.js](https://nodejs.org/): Ensure Node.js is installed on your system.
2. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas): Set up a MongoDB Atlas cluster or use a local MongoDB instance.

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd AuthApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```plaintext
   PORT = 4000
   MONGODB_URL = mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database_name>
   JWT_SECRET = <your_jwt_secret>
   ```
   Replace `<username>`, `<password>`, `<cluster>`, `<database_name>`, and `<your_jwt_secret>` with your MongoDB credentials and a secure secret key.

4. Start the server:
   ```bash
   npm run dev
   ```
   The server will start on the port specified in the `.env` file (default: 4000).

---

## API Endpoints

### Public Routes
| Method | Endpoint    | Description          |
|--------|-------------|----------------------|
| POST   | /signUp     | User registration    |
| POST   | /login      | User login and token generation |

### Protected Routes
| Method | Endpoint    | Description                                |
|--------|-------------|--------------------------------------------|
| GET    | /tests      | Testing middleware for authentication      |
| GET    | /student    | Access restricted to `Student` role        |
| GET    | /admin      | Access restricted to `Admin` role          |

---

## Code Details

### Database Connection (`dbConnect.js`)
Establishes a connection to MongoDB using Mongoose. Handles connection errors gracefully.

### User Model (`User.js`)
Defines the schema for user documents with fields for `name`, `email`, `password`, and `role`.

### Authentication (`auth.js` Middleware)
1. **`auth`**: Verifies JWT tokens sent in the request.
2. **`isStudent`**: Grants access to routes restricted to `Student` role.
3. **`isAdmin`**: Grants access to routes restricted to `Admin` role.

### Controllers
1. **`signUp`**: Handles user registration. Hashes passwords using bcrypt before storing them.
2. **`login`**: Authenticates users and generates JWT tokens. Tokens are stored securely as cookies.

---

## Example Usage

### Sign-Up Request
```bash
POST /signUp
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "role": "Student"
}
```
Response:
```json
{
  "success": true,
  "message": "user signup successfull !!"
}
```

### Login Request
```bash
POST /login
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
Response:
```json
{
  "success": true,
  "message": "user loggen in succesfully",
  "token": "<jwt_token>",
  "userNew": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "Student",
    "token": "<jwt_token>"
  }
}
```

### Protected Route Access (Student)
```bash
GET /student
Headers:
{
  "Authorization": "Bearer <jwt_token>"
}
```
Response:
```json
{
  "success": true,
  "message": "welcome to protected route for students"
}
```

---

## Dependencies
- `express`: For handling HTTP requests.
- `mongoose`: For MongoDB connection and schema creation.
- `dotenv`: For environment variable management.
- `bcrypt`: For password hashing.
- `jsonwebtoken`: For JWT creation and verification.
- `cookie-parser`: For parsing cookies.

---

## Notes
- Ensure that `JWT_SECRET` is secure and not shared publicly.
- Use HTTPS in production to secure cookies and data transmission.

---

## Future Enhancements
- Implement refresh tokens for improved token management.
- Add email verification during sign-up.
- Improve error handling and logging.

---

## Contributing

Feel free to submit a pull request or open an issue if you find any bugs or have feature suggestions.
