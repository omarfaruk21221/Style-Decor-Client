# Style Decor Client

A modern React application for Style Decor - an interior design and decoration showcase platform.

## 🚀 Features

- **Responsive Design** - Built with React and TailwindCSS for beautiful, mobile-first UI
- **Routing** - Client-side routing with React Router DOM
- **Component-Based** - Modular, reusable component architecture
- **Error Handling** - Comprehensive error pages and error boundaries
- **DaisyUI** - Beautiful pre-built components powered by Tailwind CSS
- **ESLint** - Code quality and consistency checks

## 📋 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: TailwindCSS 4.1.17 + DaisyUI 5.5.8
- **Routing**: React Router DOM 7.10.1
- **Linting**: ESLint 9.39.1

## 📁 Project Structure

```
src/
├── Component/          # Reusable UI components
│   ├── Footer.jsx
│   └── Navbar.jsx
├── Context/            # React Context API
├── Firebase/           # Firebase configuration
├── Hooks/              # Custom React hooks
├── Layouts/            # Layout components
│   ├── RootLayout.jsx
│   └── HomeLayout.jsx
├── Pages/              # Page components
│   ├── HomePage/
│   │   └── HomePage.jsx
│   └── ErrorPage.jsx
├── routes/             # Routing configuration
│   └── RootRoutes.jsx
├── index.css           # Global styles
└── main.jsx            # Application entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🌐 Development

The application runs on `http://localhost:5173` (default Vite port).

### Key Components

- **RootLayout** - Main application layout with Navbar and Footer
- **HomeLayout** - Home page layout with error handling
- **ErrorPage** - 404 and error handling page
- **Navbar** - Navigation component
- **Footer** - Footer component

### Routing

Routes are configured in `src/routes/RootRoutes.jsx`:

- `/` - Home page with error boundary

## 🚀 Deployment

### Vercel Deployment

This project is configured for easy deployment on Vercel:

```bash
# Deploy to Vercel
vercel
```

Configuration is in `vercel.json`:

- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
VITE_API_URL=your_api_url_here
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Styling

The project uses:

- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library built on Tailwind
- **Custom CSS** - Global styles in `index.css`

## 📦 Dependencies

### Main

- react
- react-dom
- react-router-dom
- @tailwindcss/vite
- @tailwindcss/postcss
- tailwindcss
- daisyui

### Dev

- @vitejs/plugin-react
- vite
- eslint
- and other build tools

## 🔧 Configuration Files

- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration
- `vercel.json` - Vercel deployment configuration
- `package.json` - Project dependencies and scripts

## 📄 License

This project is private and part of the Programming Hero A11 course.

## 👤 Author

**Omar Faruk**

- GitHub: [@omarfaruk21221](https://github.com/omarfaruk21221)

---

**Happy Coding! 🎉**
