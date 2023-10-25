import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'rm-pink': '#e89ac7',
        'rm-green': '#97ce4c',
        'rm-brown': '#44281d',
      },
    }
  },
  plugins: [],
}
export default config
