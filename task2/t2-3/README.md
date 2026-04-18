# Dashboard (Frontend)

## Deployment
The frontend is currently deployed and accessible via Vercel.
- **Production URL**: `https://www.quanghia.software/`

---

## Local Setup Instructions
### Prerequisites
- Node.js (v14.x)
- React 18
- Vite 4 (Fast Refresh enabled)
- TypeScript

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd task2/t2-3
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `task2/t2-3` directory.
```env
BACKEND_API_URL=http://localhost:3000
```
*For production development, point this to your EC2 instance URL.*

### 3. Run the Dashboard
```bash
npm run dev
```