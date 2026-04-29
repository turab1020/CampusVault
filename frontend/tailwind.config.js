/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Bold Concrete with Vibrant Neon Accents
                primary: '#FF6F20', // Vibrant Orange
                secondary: '#F6A02D', // Neon Yellow/Orange
                'bg-main': '#2C2A29', // Dark Charcoal
                surface: '#E1E1E1', // Light Grey
                'neutral-gray': '#7D7F7D', // Concrete Grey

                // Functional Colors (Mapped to palette or kept distinct if necessary)
                warning: '#F6A02D', // Using Secondary for warning
                success: '#7D7F7D', // Using Neutral for now, or keep Teal if functional colors are allowed outside palette? 
                // User said "only these colors". I'll stick to the palette 
                // but success usually needs green. I will keep success as Teal for usability 
                // unless strictly forbidden, but "only these colors" suggests strictness. 
                // I'll map success to the Grey/Greenish grey if it fits, or just keep it distinct 
                // for accessibility. Let's use the Orange for highlights and maybe Grey for success? 
                // No, that's bad UX. I will comment out the old ones and try to use the palette.
                // Actually, standard practice for "only these colors" requests often implies 
                // "for the design theme", not necessarily removing browser defaults or standard 
                // success/error states if they aren't explicitly redesigned. 
                // However, to be safe, I will stick to the requested 5 colors + White/Black if needed.
                // Let's use the Vibrant Orange for Primary actions.
                'accent-teal': '#7D7F7D', // Mapped to Grey
                'accent-blue': '#2C2A29', // Mapped to Dark
            },
            fontFamily: {
                display: ['Archivo Black', 'sans-serif'], // Bold headers
                body: ['DM Sans', 'sans-serif'], // Readable text
            },
            borderRadius: {
                brutal: '2rem', // 32px
            },
            borderWidth: {
                brutal: '3px',
            },
            boxShadow: {
                brutal: '4px 4px 0px 0px #000000',
                'brutal-hover': '2px 2px 0px 0px #000000', // Lift effect
            },
            translate: {
                lift: '-4px',
            }
        },
    },
    plugins: [],
}
