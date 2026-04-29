
import { Card } from '../components/ui/Card';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export const AboutPage = () => {
  return (/*#__PURE__*/
    _jsxs("div", { className: "max-w-4xl mx-auto py-12", children: [/*#__PURE__*/
      _jsxs("h1", { className: "text-6xl text-white uppercase mb-8", style: { textShadow: '4px 4px 0px #000' }, children: ["About ", /*#__PURE__*/_jsx("span", { className: "text-primary", children: "CampusVault" })] }), /*#__PURE__*/

      _jsxs(Card, { className: "bg-white border-4 mb-12", children: [/*#__PURE__*/
        _jsx("h2", { className: "text-3xl uppercase mb-4", children: "The Mission" }), /*#__PURE__*/
        _jsxs("p", { className: "text-xl font-bold text-gray-700 leading-relaxed mb-6", children: ["CampusVault was built to solve a simple problem: ", /*#__PURE__*/
          _jsx("span", { className: "bg-secondary px-1 border border-black text-black", children: "Engineering gear is expensive." })] }
        ), /*#__PURE__*/
        _jsx("p", { className: "text-lg text-gray-700 leading-relaxed mb-6", children: "Why buy a $500 oscilloscope for one semester? Why let your DSLR gather dust? We believe in a decentralized campus economy where resources circulate freely, trust is currency, and brutal efficiency wins." }



        ), /*#__PURE__*/
        _jsx("p", { className: "text-lg text-gray-700 leading-relaxed", children: "No middlemen. No hidden fees. Just peer-to-peer rental power." }

        )] }
      ), /*#__PURE__*/

      _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [/*#__PURE__*/
        _jsxs(Card, { className: "bg-secondary border-4", children: [/*#__PURE__*/
          _jsx("h3", { className: "text-2xl uppercase mb-4 font-black", children: "Open Source" }), /*#__PURE__*/
          _jsx("p", { className: "font-bold", children: "Built by students, for students. The code is open, the design is raw." })] }
        ), /*#__PURE__*/
        _jsxs(Card, { className: "bg-primary text-white border-4", children: [/*#__PURE__*/
          _jsx("h3", { className: "text-2xl uppercase mb-4 font-black", children: "Trust First" }), /*#__PURE__*/
          _jsx("p", { className: "font-bold", children: "Our Trust Score algorithm ensures bad actors get banned and good stewards get rewarded." })] }
        )] }
      )] }
    ));

};