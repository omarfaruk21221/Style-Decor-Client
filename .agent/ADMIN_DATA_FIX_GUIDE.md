# Admin Data সমস্যা সমাধান গাইড

## 🔍 সমস্যা চিহ্নিতকরণ

Admin এর data ঠিকভাবে না আসার কয়েকটি কারণ হতে পারে:

### 1. **Registration সমস্যা**
✅ **Fix করা হয়েছে**: `RegisterPage.jsx` এ `user.name` থেকে `data.name` এ পরিবর্তন করা হয়েছে

**আগের কোড (ভুল):**
```javascript
const userInfo = {
  name: user.name,  // ❌ Firebase user এ name নেই
  email: user.email,
  image: imageUrl,
  uid: user.uid,
};
```

**নতুন কোড (সঠিক):**
```javascript
const userInfo = {
  name: data.name,  // ✅ Form data থেকে name নিচ্ছে
  email: user.email,
  image: imageUrl,
  uid: user.uid,
};
```

### 2. **Backend API সমস্যা**

#### Check করুন:
```javascript
// Backend এ এই endpoint টি আছে কিনা
GET /users/:email
```

**Expected Response:**
```json
{
  "role": "admin" | "user"
}
```

### 3. **Role Verification সমস্যা**

#### useRole Hook চেক করুন:
```javascript
// src/Hooks/useRole.jsx
const { data: role = "user" } = useQuery({
  queryKey: ["user-role", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(`/users/${user.email}`);
    return res.data.role || "user";
  },
});
```

## 🛠️ Debug করার পদ্ধতি

### Step 1: Debug Component ব্যবহার করুন

যেকোনো admin page এ এটি add করুন:

```javascript
import AdminDataDebugger from "../Component/AdminDataDebugger";

const YourAdminPage = () => {
  return (
    <div>
      <AdminDataDebugger /> {/* শুধু development এ দেখাবে */}
      {/* বাকি content */}
    </div>
  );
};
```

### Step 2: Console চেক করুন

Browser console এ এই information গুলো দেখুন:
1. Auth Loading state
2. User Object
3. User Email
4. User UID
5. Role Loading state
6. Current Role
7. Backend User Data
8. All Users (if admin)

### Step 3: Network Tab চেক করুন

1. Browser DevTools খুলুন (F12)
2. Network tab এ যান
3. Filter করুন: `users`
4. দেখুন:
   - Request URL সঠিক কিনা
   - Request Headers এ Authorization token আছে কিনা
   - Response data সঠিক কিনা

## 🔧 সম্ভাব্য সমস্যা ও সমাধান

### সমস্যা 1: User Role "admin" হচ্ছে না

**কারণ:**
- Database এ user এর role "user" হিসেবে save হয়েছে
- Backend থেকে role ঠিকভাবে আসছে না

**সমাধান:**
```javascript
// Backend এ manually একজন user কে admin বানান
db.collection("users").updateOne(
  { email: "your-email@gmail.com" },
  { $set: { role: "admin" } }
);
```

অথবা ManageUsers page থেকে "Make Admin" button ক্লিক করুন।

### সমস্যা 2: Backend API Call Fail হচ্ছে

**কারণ:**
- Backend server চালু নেই
- CORS error
- Firebase token expire হয়ে গেছে

**সমাধান:**
1. Backend server চালু আছে কিনা check করুন
2. Backend এ CORS configure করুন:
```javascript
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true
}));
```

### সমস্যা 3: Firebase Token সমস্যা

**কারণ:**
- Token expire হয়ে গেছে
- Token ঠিকভাবে attach হচ্ছে না

**সমাধান:**
`useAxiosSecure.jsx` এ token refresh করুন:
```javascript
const token = await currentUser.getIdToken(true); // true = force refresh
```

### সমস্যা 4: useRole Hook Data না আসা

**কারণ:**
- User email undefined
- Backend endpoint সঠিক নয়
- Query disabled আছে

**সমাধান:**
```javascript
// useRole.jsx এ console.log add করুন
const { data: role = "user" } = useQuery({
  queryKey: ["user-role", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    console.log("Fetching role for:", user.email); // Debug
    const res = await axiosSecure.get(`/users/${user.email}`);
    console.log("Role response:", res.data); // Debug
    return res.data.role || "user";
  },
});
```

## 📋 Checklist - সব কিছু ঠিক আছে কিনা

### Frontend:
- [ ] User registration এ সঠিক data যাচ্ছে
- [ ] useAuth hook user data দিচ্ছে
- [ ] useRole hook role fetch করছে
- [ ] useAxiosSecure token attach করছে
- [ ] AdminRoutes component role check করছে

### Backend:
- [ ] `/users` POST endpoint কাজ করছে
- [ ] `/users/:email` GET endpoint কাজ করছে
- [ ] `/users/:id/role` PATCH endpoint কাজ করছে
- [ ] `verifyFBToken` middleware কাজ করছে
- [ ] `verifyAdmin` middleware কাজ করছে

### Database:
- [ ] Users collection আছে
- [ ] User document এ role field আছে
- [ ] অন্তত একজন admin user আছে

## 🚀 Quick Fix Steps

### যদি কোনো user admin না হয়:

1. **MongoDB Compass দিয়ে:**
```javascript
// Find your user
db.users.findOne({ email: "your-email@gmail.com" })

// Update to admin
db.users.updateOne(
  { email: "your-email@gmail.com" },
  { $set: { role: "admin" } }
)
```

2. **Backend API দিয়ে:**
```bash
# Postman বা Thunder Client ব্যবহার করুন
PATCH http://localhost:3000/users/USER_ID/role
Headers: Authorization: Bearer YOUR_FIREBASE_TOKEN
Body: { "role": "admin" }
```

3. **Frontend থেকে:**
- একজন existing admin login করুন
- ManageUsers page এ যান
- User খুঁজুন
- "Make Admin" button ক্লিক করুন

## 🔍 Real-time Debugging

### Console এ এই commands run করুন:

```javascript
// 1. Check current user
console.log("User:", auth.currentUser);

// 2. Check token
auth.currentUser.getIdToken().then(token => console.log("Token:", token));

// 3. Check role from localStorage (if cached)
console.log("Cached role:", localStorage.getItem("userRole"));

// 4. Manual API call
fetch("http://localhost:3000/users/your-email@gmail.com", {
  headers: {
    "Authorization": `Bearer ${await auth.currentUser.getIdToken()}`
  }
}).then(r => r.json()).then(console.log);
```

## 📞 যদি এখনও সমস্যা থাকে

1. **AdminDataDebugger component** ব্যবহার করুন
2. Console এর সব log screenshot নিন
3. Network tab এর API calls screenshot নিন
4. Backend logs check করুন
5. Database এ user document দেখুন

## ✅ সমাধান হয়েছে কিনা Test করুন

1. Logout করুন
2. নতুন user register করুন
3. Check করুন database এ name সঠিক আছে কিনা
4. একজন admin দিয়ে login করুন
5. ManageUsers page খুলুন
6. নতুন user কে admin বানান
7. Logout করে নতুন admin দিয়ে login করুন
8. Admin pages access করতে পারছেন কিনা check করুন
