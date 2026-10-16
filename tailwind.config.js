/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'DM Sans', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        'tk-primary': '#0088E0',
        'tk-action': '#0077CC',
        'tk-blue-600': '#2563EB',
        'tk-blue-700': '#1D4ED8',
        'tk-slate-900': '#0F172A',
      },
    },
  },
  plugins: [],
}
