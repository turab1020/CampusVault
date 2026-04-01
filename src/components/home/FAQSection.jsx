import React from 'react'
import Accordion from '../ui/Accordion'

const faqData = [
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

const FAQSection = () => {
  return (
    <section className="w-full bg-white border-b-4 border-black py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="font-heading text-4xl md:text-6xl uppercase tracking-tighter text-black mb-12" style={{ textShadow: '4px 4px 0px #FF6F20' }}>
          Frequently Asked
        </h2>
        <Accordion items={faqData} />
      </div>
    </section>
  )
}

export default FAQSection
