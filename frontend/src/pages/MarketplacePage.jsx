import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Search, ArrowRight } from 'lucide-react';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";












const CATEGORIES = [
"All",
"Electronics",
"Engineering Kits",
"Media Equipment",
"Event Gear",
"Textbooks",
"Computing",
"Presentation Tools"];


export const MarketplacePage = () => {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('/listings');
        setListings(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch listings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    let result = listings;

    if (selectedCategory !== 'All') {
      result = result.filter((l) => l.category === selectedCategory);
    }

    if (search) {
      result = result.filter((l) => l.title.toLowerCase().includes(search.toLowerCase()));
    }

    setFiltered(result);
  }, [search, selectedCategory, listings]);

  return (/*#__PURE__*/
    _jsxs("div", { className: "flex flex-col gap-8", children: [/*#__PURE__*/
      _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center bg-secondary text-black p-8 border-4 border-black shadow-brutal rounded-brutal", children: [/*#__PURE__*/
        _jsxs("div", { children: [/*#__PURE__*/
          _jsx("h1", { className: "text-4xl uppercase mb-2", children: "Marketplace" }), /*#__PURE__*/
          _jsx("p", { className: "font-bold", children: "Find the gear you need." })] }
        ), /*#__PURE__*/
        _jsx("div", { className: "w-full md:w-auto flex flex-col gap-4 mt-6 md:mt-0", children: /*#__PURE__*/
          _jsxs("div", { className: "relative", children: [/*#__PURE__*/
            _jsx(Input, {
              placeholder: "Search gear...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-12 bg-white" }
            ), /*#__PURE__*/
            _jsx(Search, { className: "absolute left-4 top-4 text-gray-500" })] }
          ) }
        )] }
      ), /*#__PURE__*/


      _jsx("div", { className: "flex flex-wrap gap-4 overflow-x-auto pb-4", children:
        CATEGORIES.map((cat) => /*#__PURE__*/
        _jsx("button", {

          onClick: () => setSelectedCategory(cat),
          className: `px-4 py-2 font-bold uppercase border-2 border-black rounded-full transition-all text-black 
                        ${selectedCategory === cat ? 'bg-primary shadow-[2px_2px_0px_0px_#000]' : 'bg-white hover:bg-gray-100'}`, children:

          cat }, cat
        )
        ) }
      ),


      loading ? /*#__PURE__*/
      _jsx("div", { className: "text-center p-20 text-white font-bold text-2xl animate-pulse", children: "Loading Vault Inventory..." }

      ) : /*#__PURE__*/

      _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8", children: [
        filtered.map((item) => /*#__PURE__*/
        _jsx(Link, { to: `/listings/${item.id || item._id}`, children: /*#__PURE__*/
          _jsxs(Card, { hoverEffect: true, className: "h-full flex flex-col p-0 overflow-hidden bg-white border-4 border-black", children: [/*#__PURE__*/
            _jsxs("div", { className: "aspect-square overflow-hidden border-b-4 border-black bg-gray-100 relative group", children: [/*#__PURE__*/
              _jsx("img", {
                src: (() => {
                  const img = item.images[0];
                  if (!img) return 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';
                  if (img.startsWith('http')) return img;
                  // FORCE ABSOLUTE PATH: Extract filename and prepend backend URL
                  const filename = img.split('/').pop();
                  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace('/api', '');
                  return `${baseUrl}/images/${filename}`;
                })(),
                alt: item.title,
                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                onError: (e) => {e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';} }
              ), /*#__PURE__*/
              _jsx(Badge, { variant: item.status === 'ACTIVE' ? 'success' : 'warning', className: "absolute top-4 left-4", children:
                item.status }
              ), /*#__PURE__*/
              _jsx("div", { className: "absolute bottom-4 right-4 bg-white border-2 border-black px-2 font-bold uppercase text-xs", children:
                item.condition }
              )] }
            ), /*#__PURE__*/
            _jsxs("div", { className: "p-4 flex flex-col flex-grow bg-white", children: [/*#__PURE__*/
              _jsx("h3", { className: "text-xl font-display font-bold mb-1 truncate uppercase", children: item.title }), /*#__PURE__*/
              _jsx("p", { className: "text-sm text-gray-500 font-bold mb-4", children: item.category }), /*#__PURE__*/

              _jsxs("div", { className: "mt-auto flex justify-between items-center border-t-2 border-dashed border-gray-300 pt-4", children: [/*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsxs("span", { className: "text-primary font-black text-2xl", children: ["$", item.dailyRate] }), /*#__PURE__*/
                  _jsx("span", { className: "text-xs font-bold text-gray-400", children: "/DAY" })] }
                ), /*#__PURE__*/
                _jsxs(Button, { size: "sm", variant: "secondary", className: "px-4 py-1 whitespace-nowrap min-w-[100px] flex justify-center items-center", children: ["Rent ", /*#__PURE__*/
                  _jsx(ArrowRight, { size: 14, className: "ml-1" })] }
                )] }
              )] }
            )] }
          ) }
        )
        ),
        filtered.length === 0 && /*#__PURE__*/
        _jsx("div", { className: "col-span-full py-20 text-center border-4 border-dashed border-gray-600 rounded-brutal text-gray-400 font-bold text-2xl", children: "No gear found matching your specs." }

        )] }

      )] }

    ));

};