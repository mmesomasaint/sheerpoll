import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        'primary-faded': '#60a5fa',
        'secondary': '#ffffff',
        'secondary-faded': '#f3f4f6',
        'secondary-faded-2': '#e5e7eb',
      },
    },
  },
  plugins: [],
}
export default config
