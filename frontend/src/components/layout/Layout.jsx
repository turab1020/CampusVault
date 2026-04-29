
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { ShoppingBag, User, LogOut, Shield } from 'lucide-react';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (/*#__PURE__*/
    _jsxs("div", { className: "min-h-screen flex flex-col bg-bg-main text-white font-body selection:bg-secondary selection:text-black", children: [/*#__PURE__*/

      _jsx("nav", { className: "border-b-brutal border-black bg-white px-6 py-4 sticky top-0 z-50", children: /*#__PURE__*/
        _jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [/*#__PURE__*/
          _jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [/*#__PURE__*/
            _jsx("div", { className: "w-10 h-10 bg-primary border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000] group-hover:translate-y-[-2px] transition-transform", children: /*#__PURE__*/
              _jsx(ShoppingBag, { className: "text-white w-6 h-6" }) }
            ), /*#__PURE__*/
            _jsxs("span", { className: "font-display font-black text-2xl tracking-tighter text-black uppercase", children: ["Campus", /*#__PURE__*/
              _jsx("span", { className: "text-primary", children: "Vault" })] }
            )] }
          ), /*#__PURE__*/

          _jsxs("div", { className: "flex items-center gap-6", children: [/*#__PURE__*/
            _jsx(Link, { to: "/marketplace", className: "font-bold text-black uppercase hover:text-primary transition-colors", children: "Marketplace" }), /*#__PURE__*/
            _jsx(Link, { to: "/about", className: "font-bold text-black uppercase hover:text-primary transition-colors hidden md:block", children: "About" }),

            user ? /*#__PURE__*/
            _jsxs("div", { className: "flex items-center gap-4", children: [
              user.role === 'ADMIN' && /*#__PURE__*/
              _jsx(Link, { to: "/admin", children: /*#__PURE__*/
                _jsxs(Button, { variant: "ghost", size: "sm", className: "bg-black text-white hover:bg-gray-800 border-2 border-gray-600", children: [/*#__PURE__*/
                  _jsx(Shield, { size: 18, className: "mr-2" }), " Admin"] }
                ) }
              ), /*#__PURE__*/

              _jsx(Link, { to: "/dashboard", children: /*#__PURE__*/
                _jsxs(Button, { variant: "secondary", size: "sm", className: "flex items-center gap-2", children: [/*#__PURE__*/
                  _jsx(User, { size: 18 }), "Dashboard"] }

                ) }
              ), /*#__PURE__*/
              _jsx(Button, { variant: "ghost", size: "sm", onClick: handleLogout, className: "border-2 border-black text-black", children: /*#__PURE__*/
                _jsx(LogOut, { size: 18 }) }
              )] }
            ) : /*#__PURE__*/

            _jsxs("div", { className: "flex items-center gap-4", children: [/*#__PURE__*/
              _jsx(Link, { to: "/login", children: /*#__PURE__*/
                _jsx(Button, { variant: "outline", size: "sm", children: "Login" }) }
              ), /*#__PURE__*/
              _jsx(Link, { to: "/register", children: /*#__PURE__*/
                _jsx(Button, { size: "sm", children: "Join Now" }) }
              )] }
            )] }

          )] }
        ) }
      ), /*#__PURE__*/


      _jsx("main", { className: "flex-grow p-6", children: /*#__PURE__*/
        _jsx("div", { className: "max-w-7xl mx-auto w-full", children: /*#__PURE__*/
          _jsx(Outlet, {}) }
        ) }
      ), /*#__PURE__*/


      _jsxs("footer", { className: "border-t-brutal border-black bg-black text-white py-12 px-6", children: [/*#__PURE__*/
        _jsxs("div", { className: "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8", children: [/*#__PURE__*/
          _jsxs("div", { children: [/*#__PURE__*/
            _jsx("h3", { className: "font-display text-2xl mb-4 text-secondary", children: "CampusVault" }), /*#__PURE__*/
            _jsx("p", { className: "font-bold text-gray-400", children: "The #1 brutalist marketplace for campus gear." })] }
          ), /*#__PURE__*/
          _jsxs("div", { children: [/*#__PURE__*/
            _jsx("h4", { className: "font-display text-lg mb-4 text-primary", children: "Explore" }), /*#__PURE__*/
            _jsxs("ul", { className: "space-y-2 font-bold text-gray-400", children: [/*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "/marketplace", className: "hover:text-white", children: "Marketplace" }) }), /*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "/about", className: "hover:text-white", children: "About" }) }), /*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "/faq", className: "hover:text-white", children: "FAQ" }) })] }
            )] }
          ), /*#__PURE__*/
          _jsxs("div", { children: [/*#__PURE__*/
            _jsx("h4", { className: "font-display text-lg mb-4 text-primary", children: "Legal" }), /*#__PURE__*/
            _jsxs("ul", { className: "space-y-2 font-bold text-gray-400", children: [/*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "#", className: "hover:text-white", children: "Terms of Service" }) }), /*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "#", className: "hover:text-white", children: "Privacy Policy" }) }), /*#__PURE__*/
              _jsx("li", { children: /*#__PURE__*/_jsx(Link, { to: "#", className: "hover:text-white", children: "Trust & Safety" }) })] }
            )] }
          ), /*#__PURE__*/
          _jsxs("div", { children: [/*#__PURE__*/
            _jsx("h4", { className: "font-display text-lg mb-4 text-secondary", children: "Connect" }), /*#__PURE__*/
            _jsxs("div", { className: "flex gap-4", children: [/*#__PURE__*/
              _jsx("div", { className: "w-10 h-10 bg-white border-2 border-black" }), /*#__PURE__*/
              _jsx("div", { className: "w-10 h-10 bg-white border-2 border-black" }), /*#__PURE__*/
              _jsx("div", { className: "w-10 h-10 bg-white border-2 border-black" })] }
            )] }
          )] }
        ), /*#__PURE__*/
        _jsxs("div", { className: "max-w-7xl mx-auto mt-12 pt-8 border-t-2 border-gray-800 text-center font-bold text-gray-500", children: ["\xA9 2026 CampusVault Inc. Engineered with ", /*#__PURE__*/
          _jsx("span", { className: "text-primary", children: "Fury" }), "."] }
        )] }
      )] }
    ));

};