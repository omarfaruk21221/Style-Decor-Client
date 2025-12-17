# ✨ Style Decor - Premium Interior Design Platform

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://style-decor-client.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)

A sophisticated, high-performance interior design service marketplace. Style Decor connects visionary designers with clients seeking premium home and office aesthetics through a seamless, data-driven experience.

---

## 🌟 Exclusive Features

### 🛠️ Advanced Admin Ecosystem
- **Revenue Monitoring Dashboard**: Real-time financial insights with dynamic charts showing Total Sales, Decorator Costs, and Net Profit.
- **Service Demand Analytics**: Histogram-based visualization of service popularity to drive business decisions.
- **Dynamic User Management**: Role-based access control (RBAC) to manage users, admins, and decorators.
- **Service Orchestration**: Full CRUD capabilities for luxury design packages with high-resolution image hosting.

### 🎨 Decorator Specialized Tools
- **Earnings Dashboard**: Personalized financial summary with monthly growth tracking and unique customer metrics.
- **Interactive Schedule**: Date-specific task management system. View "Today's Tasks" at a glance or browse the complete schedule in a horizontal grid.
- **Service Fulfillment**: Streamlined workflow to accept, track, and complete assigned decoration projects.

### 👤 Premium User Experience
- **Lush UI/UX**: Built with Framer Motion and GSAP for buttery-smooth animations and glassmorphic design.
- **Secure Booking**: Integrated with Stripe for trusted, encrypted payment processing.
- **Personalized Dashboard**: Track booking statuses from "Pending" to "Lush Completion" in real-time.

---

## 🚀 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Foundation** | React 19 (Vite), JavaScript (ES6+) |
| **Design System** | Tailwind CSS v4, DaisyUI v5 (Premium Components) |
| **Animation** | Framer Motion, GSAP |
| **Data Engine** | TanStack React Query v5 (Auto-refetching & Caching) |
| **Security** | Firebase Auth + JWT (JSON Web Tokens) |
| **Visuals** | Recharts (Data Viz), React Icons, Swiper.js |
| **Infrastructure** | Axios (Interceptors), React Hook Form, SweetAlert2 |

---

## 🔧 Installation & Setup

### 1. Clone & Install
```bash
git clone https://github.com/omarfaruk21221/Style-Decor-Client.git
cd style-decor-client
npm install
```

### 2. Environment Configuration
Create a `.env` in the root and populate:
```env
VITE_apiKey=your_firebase_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.appspot.com
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id

VITE_image_host_key=your_imgbb_key
VITE_API_URL=https://your-server-url.vercel.app
```

### 3. Launch Development
```bash
npm run dev
```

---

## 📁 System Architecture
```
src/
├── Pages/
│   ├── Dashbaord/
│   │   ├── AminPages/      # High-level Revenue & Audit tools
│   │   ├── DecoretorPage/  # Earnings & Schedule visualization
│   │   └── UserPages/      # Booking & History
├── Hooks/                  # useAxiosSecure, useAuth, etc.
├── Component/
│   └── Spiners/            # Custom RoundedLoader, LogoLoaders
└── routes/                 # RootRoutes with RBAC Guards
```

---

## 📈 Roadmap & Innovation
- [x] Revenue histograms and monthly earnings tracking.
- [x] Date-specific horizontal schedule grid.
- [x] Stripe Payment gateway integration.
- [ ] AI-powered interior design recommendations (Coming Soon).
- [ ] Live chat between Customer and Decorator.

---

## 🤝 Support & Contribution
Built with ❤️ by the Style Decor Team. For critical issues or feature requests, please open an issue in the repository.

**Style Decor** - *Enhancing your lifestyle, one space at a time.*