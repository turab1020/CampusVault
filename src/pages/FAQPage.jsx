import React from 'react'
import Accordion from '../components/ui/Accordion'

const faqs = [
  {
    title: 'How does CampusVault work?',
    content: 'Its simple. FAST students can list gear they no longer need (textbooks, calculators, electronics) for rent or sale. Other students can browse the marketplace and request to buy or rent them safely on campus.'
  },
  {
    title: 'Is it completely safe?',
    content: 'Yes! CampusVault requires a verified university email to register, ensuring you are only dealing with actual peers from your campus.'
  },
  {
    title: 'How are payments handled?',
    content: 'Currently, CampusVault facilitates the connection. Actual payments are handled peer-to-peer via EasyPaisa, SadaPay, or cash during the physical meetup on campus.'
  },
  {
    title: 'Are there any platform fees?',
    content: 'No. The marketplace is 100% free for students to use. We believe in keeping education affordable and accessible.'
  }
]

const FAQPage = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="font-heading text-5xl text-black uppercase tracking-tighter mb-8" style={{ textShadow: '2px 2px 0px #FF6F20' }}>
                Frequently Asked Questions
            </h1>
            <div className="flex flex-col gap-4">
                <Accordion items={faqs} />
            </div>
        </div>
    )
}

export default FAQPage
