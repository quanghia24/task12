# User Management Service (Backend)

## Deployment
The service is currently deployed and running on AWS EC2.
- **Base URL**: `http://3.80.195.84:3000/`

## API Endpoints

### 1. Get Users
Fetches users from the database. Supports optional search by name.
- **URL**: `/users`
- **Method**: `GET`
- **Query Params**: `name` (optional) - partial match on username or email.
- **Response**: `200 OK` with an array of user objects.

### 2. Batch Update Users
Updates multiple user records in a single request.
- **URL**: `/users`
- **Method**: `POST`
- **Body**: Array of user objects (must include `_id`).
- **Response**: `200 OK` on success.

---

## Local setup instructions

### Prerequisites
- Node.js (v14.x)
- Express.js (v4.x)
- MongoDB (v5.x driver)
- TypeScript
- MongoDB account (Atlas cluster)

### 1. Clone & install dependencies
nstall dependencies
```bash
git clone <your-repo-url>
cd task2/t2-2
npm install
```

### 2. Environment configuration
Create a `.env` file in the `task2/t2-2` directory:
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/
MONGODB_NAME=your_db_name
PORT=3000
```

### 3. Run the service
```bash
npm run dev
```
