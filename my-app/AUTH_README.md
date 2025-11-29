# Authentication Setup Guide

This app uses **Clerk** for authentication with a feature flag that allows you to disable auth entirely.

## Quick Start

### Option 1: Run WITHOUT Authentication (Default)

The app is configured to run without auth by default. Just start the dev server:

```bash
npm run dev
```

When auth is disabled:
- All users are assigned a reserved user ID: `guest-user-000`
- No sign-in required
- API calls include `X-User-Id: guest-user-000` header

### Option 2: Enable Clerk Authentication

1. **Create a Clerk account** at [https://dashboard.clerk.com](https://dashboard.clerk.com)

2. **Create a new application** in the Clerk dashboard

3. **Copy your Publishable Key** from the Clerk dashboard

4. **Update your `.env` file**:
   ```env
   VITE_AUTH_ENABLED=true
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   VITE_RESERVED_USER_ID=guest-user-000
   ```

5. **Start the dev server**:
   ```bash
   npm run dev
   ```

6. **Configure Clerk settings** (optional):
   - In your Clerk dashboard, go to "User & Authentication"
   - Enable desired authentication methods (Email, Google, GitHub, etc.)
   - Customize the sign-in/sign-up experience

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_AUTH_ENABLED` | Yes | Set to `"true"` to enable Clerk auth, `"false"` to disable |
| `VITE_CLERK_PUBLISHABLE_KEY` | Only if auth enabled | Your Clerk publishable key |
| `VITE_RESERVED_USER_ID` | No | User ID used when auth is disabled (default: `guest-user-000`) |

## How It Works

### With Auth Disabled (`VITE_AUTH_ENABLED=false`)
- Users can access all routes without signing in
- `userId` is set to `VITE_RESERVED_USER_ID`
- API calls include `X-User-Id` header with the reserved user ID
- No auth tokens are sent to the backend

### With Auth Enabled (`VITE_AUTH_ENABLED=true`)
- Users must sign in to access protected routes
- Unauthenticated users are redirected to `/sign-in`
- API calls include `Authorization: Bearer <token>` header
- Clerk manages user sessions and tokens

## Protected Routes

All main routes are protected:
- `/` - Home (dashboard)
- `/cases/create` - Create new case
- `/cases/:id/results` - Case results
- `/playground` - Playground

When auth is enabled, users are redirected to `/sign-in` if not authenticated.

## API Integration

All API hooks automatically include authentication:

```typescript
// When auth is enabled:
headers: {
  "Authorization": "Bearer <clerk-token>"
}

// When auth is disabled:
headers: {
  "X-User-Id": "guest-user-000"
}
```

The following hooks are auth-aware:
- `useCaseList()` - Fetch cases
- `useCreateCase()` - Create new case
- `useDeleteCase()` - Delete case

## Backend Requirements

Your backend API should:

1. **When receiving `Authorization` header** (auth enabled):
   - Verify the Clerk JWT token
   - Extract user ID from the token
   - Associate data with the authenticated user

2. **When receiving `X-User-Id` header** (auth disabled):
   - Use the provided user ID for all operations
   - No token verification needed

### Verifying Clerk Tokens (Node.js/Express example)

```javascript
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Protect routes with Clerk
app.get('/trials', ClerkExpressRequireAuth(), (req, res) => {
  const userId = req.auth.userId;
  // Use userId to filter data
});
```

## User Button

The navigation bar shows:
- **Clerk UserButton** when auth is enabled (includes sign out, profile, etc.)
- **User icon** when auth is disabled (static placeholder)

## Toggling Between Auth Modes

To switch between auth enabled/disabled:

1. Update `.env`:
   ```env
   VITE_AUTH_ENABLED=false  # or true
   ```

2. Restart the dev server (Vite needs to reload env vars)

## Files Modified for Auth

- `src/App.tsx` - Clerk provider setup
- `src/contexts/AuthContext.tsx` - Auth context with fallback logic
- `src/components/ProtectedRoute.tsx` - Route protection
- `src/components/SignIn.tsx` - Sign-in page
- `src/components/SignUp.tsx` - Sign-up page
- `src/components/Home.tsx` - User button integration
- `src/hooks/useCreateCase.ts` - Auth headers
- `src/hooks/useDeleteCase.ts` - Auth headers
- `src/hooks/useCaseList.ts` - Auth headers
- `src/api/*.ts` - Accept custom headers

## Troubleshooting

### "Configuration Error" message
- Make sure `VITE_CLERK_PUBLISHABLE_KEY` is set when `VITE_AUTH_ENABLED=true`
- Check that the key starts with `pk_test_` or `pk_live_`

### Can't sign in
- Verify your Clerk publishable key is correct
- Check Clerk dashboard for authentication settings
- Make sure you have at least one sign-in method enabled

### API calls failing
- When auth is enabled, ensure your backend verifies Clerk tokens
- When auth is disabled, ensure your backend accepts `X-User-Id` header

## Production Deployment

1. **Set environment variables** in your hosting platform
2. **Use production Clerk key** (starts with `pk_live_`)
3. **Update Clerk allowed origins** in dashboard to include your production domain
4. **Consider keeping auth enabled** in production for security

## Security Notes

- The reserved user ID (`guest-user-000`) should only be used in development
- In production, consider always enabling auth
- Never commit `.env` file to version control
- Rotate Clerk keys if accidentally exposed
