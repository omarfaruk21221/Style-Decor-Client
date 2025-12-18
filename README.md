# <p align="center">✨ Style Decor ✨</p>

<p align="center">
  <strong>Premium & Sophisticated Interior Design Marketplace</strong>
</p>

<p align="center">
  <img src=".https://i.ibb.co/fYfgJ66M/Screenshot-2025-12-18-130028.png" alt="Style Decor Banner" width="100%" />
</p>

<p align="center">
  <a href="https://style-decor-client.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <a href="https://github.com/omarfaruk21221/Style-Decor-Client">
    <img src="https://img.shields.io/badge/Frontend-GitHub-blue?style=for-the-badge&logo=github" alt="Frontend Repo" />
  </a>
  <a href="https://github.com/omarfaruk21221/Style-Decor-Server">
    <img src="https://img.shields.io/badge/Backend-GitHub-green?style=for-the-badge&logo=github" alt="Backend Repo" />
  </a>
</p>

---

## 📖 Introduction

**Style Decor** is a visionary marketplace designed to connect luxury interior designers (Decorators) with clients seeking high-end home and office aesthetics. Built with a focus on performance, data-driven insights, and a lush user experience, Style Decor transforms the way interior design projects are managed and delivered.

---

## 💎 Exclusive Role-Based Features

### 👑 Admin Power Suite
- **Comprehensive Analytics**: Real-time monitoring of revenue, profit margins, and service demand using interactive Recharts.
- **Service Orchestration**: Full CRUD control over premium decoration packages with automatic image hosting integration.
- **User Governance**: Advanced Role-Based Access Control (RBAC) to manage the entire ecosystem of clients, admins, and designers.

### 🎨 Decorator Specialized Tools
- **Earnings Hub**: Dynamic financial summaries showing monthly growth, completed projects, and customer acquisition metrics.
- **Smart Schedule**: A date-specific task management system featuring a horizontal grid for easy project navigation.
- **Project Lifecycle**: Streamlined workflow for accepting, managing, and completing assigned decoration tasks.

### 👤 Premium Client Experience
- **Cinematic UI/UX**: Buttery-smooth transitions powered by **Framer Motion** and **GSAP**, featuring a modern glassmorphic design system.
- **Seamless Booking**: Integrated **Stripe** payment gateway for secure, one-click checkout.
- **Live Status Tracking**: Real-time updates on project progress from "Pending" to "Lush Completion".

---

## 🛠️ Technology Stack

| Architecture | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, Vite, JavaScript (ES6+) |
| **Styling** | Tailwind CSS v4, DaisyUI v5 (Glassmorphism & Custom Themes) |
| **Animations** | Framer Motion, GSAP (ScrollTrigger & Timeline) |
| **State & Data** | TanStack React Query v5 (Caching & Syncing), Axios (Interceptors) |
| **Authentication** | Firebase Auth + JWT (Security Interceptors) |
| **Visualization** | Recharts (Financial Histograms), Leaflet (Location Maps) |
| **UI Components** | Swiper.js, SweetAlert2, React Hook Form, React Icons |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/omarfaruk21221/Style-Decor-Client.git

# Enter the directory
cd style-decor-client

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your credentials:
```env
VITE_apiKey=your_firebase_apiKey
VITE_authDomain=your_firebase_authDomain
VITE_projectId=your_firebase_projectId
VITE_storageBucket=your_firebase_storageBucket
VITE_messagingSenderId=your_firebase_messagingSenderId
VITE_appId=your_firebase_appId

VITE_image_host_key=your_imgbb_api_key
VITE_API_URL=http://localhost:5000 # Your server URL
```

### 4. Run Development Server
```bash
npm run dev
```

---

## 📁 Project Architecture
```text
src/
├── Pages/
│   ├── Dashbaord/
│   │   ├── AdminPages/      # Financial Analytics & Management
│   │   ├── DecoratorPage/   # Schedule & Earnings Management
│   │   └── UserPages/       # Bookings & History
├── Components/              # Modular UI (Loaders, Nav, Footers)
├── Hooks/                   # Custom logic (useAxiosSecure, useAuth)
└── Routes/                  # Secured Route Guards (RBAC)
```

---

## 📍 Roadmap
- [x] High-performance Dashboard Analytics.
- [x] Integrated Stripe Payment Gateway.
- [x] Dynamic Schedule Management for Decorators.
- [ ] AI-Powered Room Visualizer (Coming Soon).
- [ ] Real-time Chat System for Client-Decorator interaction.

---

## 🔐 Credentials for Testing
- **Admin Email**: `admin@gmail.com`
- **Password**: `Aa1234`

---

## 🤝 Contribution & Feedback
Developed with passion by the **Style Decor Team**. We welcome contributions and feedback! Feel free to open an issue or submit a pull request.

---

<p align="center">
  <strong>Enhancing your lifestyle, one space at a time.</strong><br>
  © 2024-2025 Style Decor. All rights reserved.
</p>
