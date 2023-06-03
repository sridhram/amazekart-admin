/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'text-light' : '#000',
        'sec-text-light' : '#878b8f',
        'hover-light' : '#6f6af8',
        'bg-light' : '#f0f0f9',
        'sec-bg-light' : '#fff',
        'icon-light' : '#232b70',
        'box-shadow' : 'rgba(0,0,0,0.1) 0px 4px 6px -1px,rgba(0,0,0,0.06) 0px 2px 4px -1px',
        'card-box-shadow' : 'rgba(50,50,105,0.15) 0px 2px 5px 0px, rgba(0,0,0,0.05) 0px 1px 1px 0px'
      },
    },
  },
  plugins: [],
}
