
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return /*#__PURE__*/_jsx("div", { className: "min-h-screen bg-bg-main flex justify-center items-center text-white font-bold text-2xl", children: "Loading..." });
  if (!user) return /*#__PURE__*/_jsx(Navigate, { to: "/login", replace: true });
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return /*#__PURE__*/_jsx("div", { children: "Loading..." });
  if (!user || user.role !== 'ADMIN') return /*#__PURE__*/_jsx(Navigate, { to: "/dashboard", replace: true });
  return children;
};

function App() {
  return (/*#__PURE__*/
    _jsx(Router, { children: /*#__PURE__*/
      _jsx(AuthProvider, { children: /*#__PURE__*/
        _jsx(Routes, { children: /*#__PURE__*/
          _jsxs(Route, { path: "/", element: /*#__PURE__*/_jsx(Layout, {}), children: [/*#__PURE__*/
            _jsx(Route, { index: true, element: /*#__PURE__*/_jsx(LandingPage, {}) }), /*#__PURE__*/
            _jsx(Route, { path: "marketplace", element: /*#__PURE__*/_jsx(MarketplacePage, {}) }), /*#__PURE__*/
            _jsx(Route, { path: "listings/:id", element: /*#__PURE__*/_jsx(ProductDetailsPage, {}) }), /*#__PURE__*/
            _jsx(Route, { path: "about", element: /*#__PURE__*/_jsx(AboutPage, {}) }), /*#__PURE__*/
            _jsx(Route, { path: "faq", element: /*#__PURE__*/_jsx(FAQPage, {}) }), /*#__PURE__*/
            _jsx(Route, { path: "login", element: /*#__PURE__*/_jsx(LoginPage, {}) }), /*#__PURE__*/
            _jsx(Route, { path: "register", element: /*#__PURE__*/_jsx(RegisterPage, {}) }), /*#__PURE__*/

            _jsx(Route, { path: "dashboard", element: /*#__PURE__*/
              _jsx(ProtectedRoute, { children: /*#__PURE__*/
                _jsx(DashboardPage, {}) }
              ) }
            ), /*#__PURE__*/

            _jsx(Route, { path: "admin", element: /*#__PURE__*/
              _jsx(AdminRoute, { children: /*#__PURE__*/
                _jsx(AdminPage, {}) }
              ) }
            ), /*#__PURE__*/

            _jsx(Route, { path: "*", element: /*#__PURE__*/_jsx("div", { className: "text-white text-center py-20 text-4xl font-display uppercase", children: "404 - Lost in the Vault" }) })] }
          ) }
        ) }
      ) }
    ));

}

export default App;