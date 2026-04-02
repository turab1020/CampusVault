import React from 'react'

const Marquee = () => {
    return (
        <section className="border-y-4 border-black bg-secondary py-6 overflow-hidden flex whitespace-nowrap">
            <div className="flex gap-12 font-heading text-2xl font-black uppercase tracking-widest text-black animate-marquee min-w-max px-6">
                <span>Electronics</span> ✦ <span>Engineering</span> ✦ <span>Media</span> ✦ <span>Computing</span> ✦ <span>Events</span> ✦ <span>Textbooks</span> ✦
                <span>Electronics</span> ✦ <span>Engineering</span> ✦ <span>Media</span> ✦ <span>Computing</span> ✦ <span>Events</span> ✦ <span>Textbooks</span>
            </div>
            <div className="flex gap-12 font-heading text-2xl font-black uppercase tracking-widest text-black animate-marquee min-w-max px-6" aria-hidden="true">
                <span>Electronics</span> ✦ <span>Engineering</span> ✦ <span>Media</span> ✦ <span>Computing</span> ✦ <span>Events</span> ✦ <span>Textbooks</span> ✦
                <span>Electronics</span> ✦ <span>Engineering</span> ✦ <span>Media</span> ✦ <span>Computing</span> ✦ <span>Events</span> ✦ <span>Textbooks</span>
            </div>
        </section>
    )
}

export default Marquee
