import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ChevronDown } from 'lucide-react'

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border-4 border-black rounded-brutal mb-4 overflow-hidden shadow-brutal bg-white transition-all">
    <button 
      className="w-full flex justify-between items-center p-6 bg-surface hover:bg-secondary focus:bg-secondary transition-colors text-black outline-none"
      onClick={onClick}
    >
      <h3 className="font-heading text-lg md:text-xl uppercase text-left pr-4">{title}</h3>
      <ChevronDown className={`transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} size={28} strokeWidth={3} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 border-t-4 border-black' : 'max-h-0'}`}>
      <div className="p-6 bg-white text-black font-sans text-base font-bold leading-relaxed">
        {content}
      </div>
    </div>
  </div>
)

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="w-full max-w-4xl mx-auto">
      {items.map((item, index) => (
        <AccordionItem 
          key={index} 
          title={item.title} 
          content={item.content} 
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

Accordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
}

export default Accordion
