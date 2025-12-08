
## 🛠️ Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Firebase project (for authentication)

### Installation
ash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint## 🌐 Development

The application runs on `http://localhost:5173` (default Vite port).

### Key Features Implementation

#### Authentication
- **Firebase Auth** - Email/password and Google authentication
- **Auth Context** - Global authentication state management
- **Protected Routes** - Route guards for authenticated pages
- **Session Persistence** - Automatic login state restoration

#### Theme Management
- **Theme Context** - Global theme state management
- **System Preference** - Automatic theme detection
- **LocalStorage** - Theme preference persistence
- **Smooth Transitions** - Animated theme switching

#### Form Handling
- **React Hook Form** - Efficient form validation and handling
- **Form Validation** - Client-side validation rules
- **Error Messages** - User-friendly validation feedback

#### Animations
- **Framer Motion** - Page transitions and component animations
- **GSAP** - Advanced animation capabilities
- **Service Cards** - Animated service card interactions

## 🗺️ Routes

### Public Routes
- `/` - Home page
- `/services` - Services showcase
- `/about` - About page
- `/contact` - Contact page
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/auth/forgot-password` - Password recovery

### Protected Routes (Requires Authentication)
- `/dashboard` - User dashboard
- `/dashboard/profile` - User profile
- `/dashboard/wishlist` - Wishlist (Coming Soon)
- `/dashboard/settings` - Settings (Coming Soon)
- `/profile` - Profile page (alternative route)

### Error Routes
- `*` - 404 Not Found page
- Error boundaries for route errors

## 🚀 Deployment

### Vercel Deployment

This project is configured for easy deployment on Vercel:

# Deploy to Vercel
vercelConfiguration is in `vercel.json`:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite

### Environment Variables

Create a `.env.local` file for environment-specific variables:

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Styling

The project uses:
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library built on Tailwind
- **Custom CSS** - Global styles in `index.css`
- **Theme System** - Dark/Light mode with DaisyUI themes

## 🔧 Configuration Files

- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration
- `vercel.json` - Vercel deployment configuration
- `package.json` - Project dependencies and scripts
- `firebase.config.js` - Firebase configuration

## 🔑 Key Components

### Authentication Components
- **AuthProvider** - Authentication context provider
- **AuthNav** - Navigation for authenticated users
- **GoogleSignIn** - Google authentication button
- **UserMenu** - User dropdown menu

### Layout Components
- **RootLayout** - Main application layout with Navbar and Footer
- **AuthLayout** - Authentication pages layout
- **DashboardLayout** - Dashboard layout with sidebar

### UI Components
- **ThemeToggle** - Dark/Light theme switcher
- **ErrorBoundary** - Error boundary wrapper
- **Loaders** - Custom loading components
- **ServiceCard** - Animated service card component

## 📦 Dependencies

### Main Dependencies
- `react` & `react-dom` - React framework
- `react-router-dom` - Routing
- `firebase` - Authentication and backend services
- `react-hook-form` - Form handling
- `framer-motion` - Animations
- `gsap` - Animation library
- `react-toastify` - Toast notifications
- `sweetalert2` - Alert dialogs
- `react-icons` - Icon library
- `tailwindcss` & `daisyui` - Styling

### Dev Dependencies
- `@vitejs/plugin-react` - Vite React plugin
- `vite` - Build tool
- `eslint` - Linting
- `@types/react` & `@types/react-dom` - TypeScript types

## 🎯 Features in Detail

### Authentication Flow
1. User can register with email/password or Google
2. Login state is persisted across page refreshes
3. Protected routes require authentication
4. User profile can be updated
5. Password recovery available

### Theme System
1. Detects system preference on first visit
2. Saves preference to localStorage
3. Smooth transitions between themes
4. Theme persists across sessions

### Service Display
1. Services loaded from JSON data
2. Animated service cards
3. Responsive grid layout
4. Loading states during data fetch

### Error Handling
1. Error boundaries catch React errors
2. 404 page for unknown routes
3. Error page for route errors
4. Toast notifications for user feedback

## 📄 License

This project is private and part of the Programming Hero A11 course.

## 👤 Author

**Omar Faruk**
- GitHub: [@omarfaruk21221](https://github.com/omarfaruk21221)

---

**Happy Coding! 🎉**