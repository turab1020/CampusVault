import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, Star } from 'lucide-react';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProductCard } from '../components/ui/ProductCard';








export const LandingPage = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/listings?limit=3'); // Assuming backend supports limit or just slice
        setFeatured(res.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch featured", err);
      }
    };
    fetchFeatured();
  }, []);

  return (/*#__PURE__*/
    _jsxs("div", { className: "flex flex-col gap-24 py-12", children: [/*#__PURE__*/

      _jsxs("section", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center", children: [/*#__PURE__*/
        _jsxs("div", { className: "flex flex-col gap-8", children: [/*#__PURE__*/
          _jsx(Badge, { variant: "warning", className: "w-fit", children: "Beta Access Live" }), /*#__PURE__*/
          _jsxs("h1", { className: "text-6xl md:text-8xl leading-[0.9] text-white uppercase", style: { textShadow: '4px 4px 0px #000, -2px -2px 0px #E63946' }, children: ["Rent Gear.", /*#__PURE__*/
            _jsx("br", {}), "Build Trust.", /*#__PURE__*/
            _jsx("br", {}), /*#__PURE__*/
            _jsx("span", { className: "text-secondary", children: "No BS." })] }
          ), /*#__PURE__*/
          _jsx("p", { className: "text-xl font-bold text-gray-300 max-w-lg", children: "Peer-to-peer campus marketplace engineered for engineers. Stop buying expensive kit you'll use once." }


          ), /*#__PURE__*/
          _jsxs("div", { className: "flex gap-4", children: [/*#__PURE__*/
            _jsx(Link, { to: "/marketplace", children: /*#__PURE__*/
              _jsxs(Button, { size: "lg", className: "flex items-center gap-2", children: ["Start Renting ", /*#__PURE__*/
                _jsx(ArrowRight, { size: 20 })] }
              ) }
            ), /*#__PURE__*/
            _jsx(Link, { to: "/register", children: /*#__PURE__*/
              _jsx(Button, { variant: "secondary", size: "lg", children: "List Item" }) }
            )] }
          )] }
        ), /*#__PURE__*/

        _jsxs("div", { className: "relative", children: [/*#__PURE__*/

          _jsx("div", { className: "absolute top-0 right-0 w-full h-full bg-primary border-4 border-black translate-x-4 translate-y-4 rounded-brutal" }), /*#__PURE__*/
          _jsx(Card, { className: "relative bg-surface p-0 overflow-hidden min-h-[500px] flex items-center justify-center border-4", children: /*#__PURE__*/
            _jsxs("div", { className: "text-center p-8", children: [/*#__PURE__*/
              _jsx(Star, { className: "w-24 h-24 text-black mx-auto mb-4" }), /*#__PURE__*/
              _jsx("h2", { className: "text-4xl uppercase mb-2", children: "CampusVault" }), /*#__PURE__*/
              _jsx("p", { className: "font-bold text-2xl bg-secondary inline-block px-2 border-2 border-black", children: "EST. 2026" })] }
            ) }

          )] }
        )] }
      ), /*#__PURE__*/


      _jsxs("section", { className: "border-y-4 border-black bg-secondary py-6 -mx-6 overflow-hidden flex whitespace-nowrap", children: [/*#__PURE__*/
        _jsxs("div", { className: "flex gap-12 font-display text-2xl font-black uppercase tracking-widest text-black animate-marquee min-w-max px-6", children: [/*#__PURE__*/
          _jsx("span", { children: "Electronics" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Engineering" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Media" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Computing" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Events" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Textbooks" }), " \u2726", /*#__PURE__*/
          _jsx("span", { children: "Electronics" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Engineering" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Media" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Computing" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Events" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Textbooks" })] }
        ), /*#__PURE__*/
        _jsxs("div", { className: "flex gap-12 font-display text-2xl font-black uppercase tracking-widest text-black animate-marquee min-w-max px-6", "aria-hidden": "true", children: [/*#__PURE__*/
          _jsx("span", { children: "Electronics" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Engineering" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Media" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Computing" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Events" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Textbooks" }), " \u2726", /*#__PURE__*/
          _jsx("span", { children: "Electronics" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Engineering" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Media" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Computing" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Events" }), " \u2726 ", /*#__PURE__*/_jsx("span", { children: "Textbooks" })] }
        )] }
      ), /*#__PURE__*/


      _jsxs("section", { children: [/*#__PURE__*/
        _jsxs("div", { className: "flex justify-between items-end mb-12", children: [/*#__PURE__*/
          _jsx("h2", { className: "text-5xl text-white uppercase", children: "Featured Drops" }), /*#__PURE__*/
          _jsx(Link, { to: "/marketplace", children: /*#__PURE__*/
            _jsx(Button, { variant: "outline", className: "bg-white", children: "View All" }) }
          )] }
        ), /*#__PURE__*/

        _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
          featured.map((item) => /*#__PURE__*/
          _jsx(ProductCard, { item: item }, item.id || item._id)
          ),
          featured.length === 0 && /*#__PURE__*/
          _jsx("div", { className: "col-span-3 text-center text-gray-300 font-bold text-xl border-2 border-dashed border-gray-600 p-12 rounded-brutal", children: "Loading fresh gear..." }

          )] }

        )] }
      )] }
    ));

};