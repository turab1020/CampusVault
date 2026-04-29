
import { Card } from '../components/ui/Card';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const FAQS = [
{
  q: "How do I rent gear?",
  a: "Browse the marketplace, request a booking dates, and wait for host approval. Once approved, arrange pickup."
},
{
  q: "Is late return penalized?",
  a: "Yes. Your Trust Score will tank. Low trust score = suspended account."
},
{
  q: "What if equipment breaks?",
  a: "You break it, you buy it. Review the Terms of Service for full liability details."
},
{
  q: "How do I get paid?",
  a: "Payments are settled directly between students or via our integrated Stripe portal (coming soon)."
}];


export const FAQPage = () => {
  return (/*#__PURE__*/
    _jsxs("div", { className: "max-w-3xl mx-auto py-12", children: [/*#__PURE__*/
      _jsx("h1", { className: "text-6xl text-white uppercase mb-12 text-center", children: "FAQ" }), /*#__PURE__*/

      _jsx("div", { className: "flex flex-col gap-6", children:
        FAQS.map((faq, idx) => /*#__PURE__*/
        _jsxs(Card, { className: "bg-white border-4", children: [/*#__PURE__*/
          _jsxs("h3", { className: "text-xl font-black uppercase mb-2 text-primary", children: ["Q: ", faq.q] }), /*#__PURE__*/
          _jsxs("p", { className: "text-lg font-bold text-gray-700", children: ["A: ", faq.a] })] }, idx
        )
        ) }
      )] }
    ));

};