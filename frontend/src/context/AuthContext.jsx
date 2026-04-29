import { createContext, useContext, useState, useEffect } from 'react';import { jsx as _jsx } from "react/jsx-runtime";


























const AuthContext = /*#__PURE__*/createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Ideally we hav a /auth/me endpoint to validate token and get user.
          // My backend spec had `GET /auth/me`. Did I implement it?
          // Checking backend Implementation...
          // Routes: `router.post("/auth/register"...)`, `router.post("/auth/login"...)`.
          // I missed `/auth/me` in the routes implementation!
          // I should add it or just persist user in localStorage too for now (less secure but works for prototype).
          // Or I can just trust the token exists and decode it? No, need user data.
          // I will persist user in localStorage for now to avoid modifying backend immediately,
          // OR I can quickly add the valid endpoint if I was working on full stack.
          // Constraint: "Do NOT modify backend."
          // So I MUST rely on what I have.
          // If I store user in localStorage, it might get out of sync.
          // But without /me endpoint, I can't refresh user data easily on reload.
          // Wait, I can decode the token if it has data.
          // TokenPayload has `userId` and `role`. Not full profile.
          // I can fetch user details via `GET /users/:id`?
          // Backend routes: `router.get("/listings"...)`. `router.get("/bookings"...)`.
          // User routes?
          // Start of Phase 2 spec: "GET /users/:id/profile".
          // Implementation routes.ts: Only Auth, Listing, Booking, Admin routes.
          // I missed generic User routes!
          // This is a gap.
          // However, `AdminController` has suspend logic.
          // I will store the user object in localStorage for Phase 3 to proceed without backend changes.
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          console.error("Auth init error", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (/*#__PURE__*/
    _jsx(AuthContext.Provider, { value: { user, token, login, logout, isAuthenticated: !!token, isLoading }, children:
      children }
    ));

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};