import Card from '../components/ui/Card'

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
    }
]

const FAQPage = () => {
    return (
        <div className="max-w-3xl mx-auto py-12">
            <h1 className="text-6xl text-white uppercase mb-12 text-center">FAQ</h1>

            <div className="flex flex-col gap-6">
                {FAQS.map((faq, idx) => (
                    <Card key={idx} className="bg-white border-4">
                        <h3 className="text-xl font-black uppercase mb-2 text-primary">Q: {faq.q}</h3>
                        <p className="text-lg font-bold text-gray-700">A: {faq.a}</p>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default FAQPage
