# Error Handling & Security Improvements

## Summary
Fixed comprehensive error handling for authentication, authorization, and API requests based on the backend Firebase verification structure.

## Changes Made

### 1. **useAxiosSecure Hook** (`src/Hooks/useAxiosSecure.jsx`)
**Fixed Issues:**
- ✅ Corrected navigation path from `/signin` to `/login`
- ✅ Added proper error handling with try-catch blocks
- ✅ Implemented toast notifications for user feedback
- ✅ Added fresh token retrieval with `getIdToken(true)`
- ✅ Handles both `massage` and `message` from backend (typo in backend)
- ✅ Added specific error handling for 404 and 500+ errors
- ✅ Proper async/await in response interceptor

**Key Features:**
- Automatically attaches Firebase Bearer token to all requests
- Handles 401/403 errors by signing out and redirecting to login
- Shows user-friendly error messages
- Matches backend's `verifyFBToken` middleware expectations

### 2. **useRole Hook** (`src/Hooks/useRole.jsx`)
**Fixed Issues:**
- ✅ Added comprehensive error handling in queryFn
- ✅ Returns default 'user' role on API failure
- ✅ Added retry logic (2 retries)
- ✅ Implemented caching with staleTime and gcTime
- ✅ Returns error and refetch function for manual control
- ✅ Removed console.log statements

**Key Features:**
- Fetches user role from `/users/:email` endpoint
- Caches role for 5 minutes to reduce API calls
- Gracefully handles errors by defaulting to 'user' role
- Matches backend's user role structure

### 3. **AdminRoutes Component** (`src/routes/AdminRoutes.jsx`)
**Fixed Issues:**
- ✅ Added proper redirect with `<Navigate>` instead of text
- ✅ Checks both authentication and admin role
- ✅ Shows toast notifications for unauthorized access
- ✅ Redirects to `/login` if not authenticated
- ✅ Redirects to `/` if not admin
- ✅ Shows loader during verification

**Key Features:**
- Protects admin-only routes
- Provides clear feedback to users
- Matches backend's `verifyAdmin` middleware logic

### 4. **Route Protection** (`src/routes/RootRoutes.jsx`)
**Fixed Issues:**
- ✅ Wrapped admin routes with `<AdminRoutes>` component
- ✅ Protected `manage-users` and `manage-service` routes
- ✅ Maintains existing `<PrivetRoutes>` for authenticated routes

**Protected Admin Routes:**
- `/dashboard/manage-users` - User management (admin only)
- `/dashboard/manage-service` - Service management (admin only)

## Backend Integration

The frontend now properly integrates with the backend's security structure:

### Backend Middleware Flow:
1. **verifyFBToken** - Verifies Firebase JWT token
   - Checks `Authorization` header
   - Validates token with Firebase Admin SDK
   - Attaches `req.decode_email` for downstream use

2. **verifyAdmin** - Verifies admin role
   - Uses `req.decode_email` from verifyFBToken
   - Queries user collection for role
   - Returns 403 if not admin

### Frontend Implementation:
1. **useAxiosSecure** - Attaches Firebase token to requests
2. **useRole** - Fetches and caches user role
3. **AdminRoutes** - Client-side route protection
4. **Backend verification** - Server-side security (double protection)

## Error Handling Flow

### Authentication Errors (401/403):
```
API Error → useAxiosSecure interceptor → Sign out user → Toast notification → Redirect to /login
```

### Role Verification:
```
User login → useRole fetches role → Cache for 5 min → AdminRoutes checks role → Allow/Deny access
```

### API Errors:
```
Request → Token attached → Backend verification → Success/Error → Toast notification
```

## Testing Checklist

- [ ] Login with regular user account
- [ ] Try accessing `/dashboard/manage-users` (should redirect)
- [ ] Login with admin account
- [ ] Access `/dashboard/manage-users` (should work)
- [ ] Test expired token (wait or manually expire)
- [ ] Test network errors
- [ ] Test role caching (check network tab)

## Security Notes

✅ **Double Protection**: Both client-side (AdminRoutes) and server-side (verifyAdmin) checks
✅ **Token Refresh**: Fresh tokens on each request
✅ **Error Handling**: Graceful degradation with user feedback
✅ **Role Caching**: Reduces API calls while maintaining security
✅ **Proper Redirects**: Users always know why they can't access something

## Next Steps

1. Update backend to fix typo: `massage` → `message`
2. Consider adding role-based UI (hide admin menu for non-admins)
3. Add loading states in components using `roleLoading`
4. Implement refresh token strategy for long sessions
