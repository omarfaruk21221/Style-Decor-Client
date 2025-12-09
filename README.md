# Style Decor - Interior Design Service Platform

A modern, full-featured interior design service platform built with React, Firebase, and Tailwind CSS.

## 🚀 Features

### User Features
- User authentication (Email/Password & Google Sign-in)
- Browse decoration services
- Book services
- View booking history
- Manage profile

### Admin Features
- User management (view, promote to admin, delete)
- Service management (create, update, delete)
- Booking management
- Dashboard analytics

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + DaisyUI
- **Authentication**: Firebase Auth
- **State Management**: TanStack React Query
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Notifications**: React Toastify + SweetAlert2
- **HTTP Client**: Axios
- **Image Upload**: imgBB API

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project
- imgBB API key
- Backend server running

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd style-decor-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your actual values
```

### 4. Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.appspot.com
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id

# Image Upload
VITE_image_host_key=your_imgbb_api_key

# Backend API
VITE_API_URL=http://localhost:3000
```

#### Getting Firebase Credentials:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Go to Project Settings > General
4. Scroll to "Your apps" section
5. Click on Web app (</>)
6. Copy the configuration values

#### Getting imgBB API Key:
1. Go to [imgBB API](https://api.imgbb.com/)
2. Sign up or login
3. Go to "Get API Key"
4. Copy your API key

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will start at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
style-decor-client/
├── public/              # Static assets
├── src/
│   ├── Component/       # Reusable components
│   ├── contexts/        # React contexts (Auth)
│   ├── Hooks/          # Custom hooks
│   ├── Layouts/        # Layout components
│   ├── Pages/          # Page components
│   │   ├── AuthPages/  # Login, Register, Forgot Password
│   │   ├── Dashbaord/  # Dashboard pages
│   │   │   ├── AminPages/   # Admin-only pages
│   │   │   └── UserPages/   # User pages
│   │   └── ...
│   ├── routes/         # Route configuration
│   ├── main.jsx        # App entry point
│   └── index.css       # Global styles
├── .env.example        # Environment variables template
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔐 Admin Setup

### Creating the First Admin User

1. Register a new user through the application
2. Connect to your MongoDB database
3. Find the user document and update the role:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Admin Routes
- `/dashboard/manage-users` - User management
- `/dashboard/manage-service` - Service management
- `/dashboard/manage-bookings` - Booking management
- `/dashboard/add-service` - Create new service

## 🔒 Security Features

- Firebase Authentication
- Protected routes (Private & Admin)
- JWT token verification
- Role-based access control
- Secure API calls with Axios interceptors

## 📦 Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "firebase": "^11.1.0",
  "@tanstack/react-query": "^5.62.11",
  "axios": "^1.7.9",
  "tailwindcss": "^3.4.17",
  "daisyui": "^4.12.22"
}
```

## 🎨 Styling

This project uses:
- **Tailwind CSS** for utility-first styling
- **DaisyUI** for pre-built components
- **Custom CSS** for specific designs
- **Responsive design** for all screen sizes

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure backend server is running
- Check `VITE_API_URL` in `.env`
- Verify CORS is configured on backend

### Firebase Authentication Issues
- Verify Firebase credentials in `.env`
- Check Firebase project settings
- Ensure authentication methods are enabled

### Image Upload Issues
- Verify imgBB API key
- Check image size (max 5MB)
- Ensure image format is supported

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Support

For issues and questions:
1. Check the documentation in `.agent/` folder
2. Review error logs in browser console
3. Verify environment variables
4. Ensure backend server is running

## 📄 License

This project is private and confidential.

## 🙏 Acknowledgments

- React Team
- Firebase Team
- Tailwind CSS Team
- DaisyUI Team