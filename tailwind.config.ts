import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        "main": "url(./main.jpeg)",
        "onboarding" : "url(./onboarding.jpeg)",
        "chat": "url(./chat.svg)"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],  
  daisyui: {
   
  },
}
export default config
