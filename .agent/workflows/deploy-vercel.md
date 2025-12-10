---
description: How to deploy the Style Decor Client to Vercel
---

# Deploying to Vercel

There are two main ways to deploy your Vite React application to Vercel: using the Vercel CLI or connecting your GitHub repository.

## Method 1: Using GitHub Integration (Recommended)

1.  **Push your code to GitHub**:
    Ensure your latest changes, including the new Profile Page and Hero Section, are committed and pushed to your GitHub repository.

2.  **Log in to Vercel**:
    Go to [vercel.com](https://vercel.com) and log in.

3.  **Add New Project**:
    - Click "Add New..." -> "Project".
    - Import your GitHub repository (`style-decor-client` or equivalent).

4.  **Configure Build Settings**:
    - **Framework Preset**: Vercel should automatically detect **Vite**.
    - **Root Directory**: If your app is in the root, leave it as is.
    - **Build Command**: `vite build` (or `npm run build`)
    - **Output Directory**: `dist`
    - **Install Command**: `npm install`

5.  **Environment Variables**:
    If you use Firebase or other environment variables (e.g., `VITE_API_URL`), add them in the "Environment Variables" section.

6.  **Deploy**:
    Click "Deploy". Vercel will build your site and give you a live URL.

## Method 2: Using Vercel CLI

1.  **Install Vercel CLI**:
    Open your terminal and run:
    ```bash
    npm i -g vercel
    ```

2.  **Login**:
    ```bash
    vercel login
    ```
    Follow the instructions to log in via browser.

3.  **Deploy**:
    Run the following command in your project root:
    ```bash
    vercel
    ```
    - Follow the prompts (Select scope, Link to existing project? [No], specific name settings, etc.).
    - Use `./` for the code location if asked.
    - It will auto-detect Vite settings (`npm run build`, `dist`).

4.  **Production Deployment**:
    For a production build (not preview):
    ```bash
    vercel --prod
    ```

## Important Note for Routing

Since this is a Single Page Application (SPA) using `react-router-dom`, you need to ensure Vercel redirects all requests to `index.html`.

1.  Create a file named `vercel.json` in your project root (`f:\Programming-Hero\A11 Style Decor\style-decor-client\vercel.json`).
2.  Add the following content:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This prevents 404 errors when refreshing pages like `/profile` or `/services`.
