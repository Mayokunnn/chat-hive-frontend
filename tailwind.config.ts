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
        "onboarding" : "url(./bg-onboarding/svg)",
        "chat": "url(./chat.svg)"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],  
  daisyui: {
    themes: [
      {'light': {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        ...require("daisyui/src/theming/themes")["light"],
        primary: "#FFE6C9",
        secondary: "#7F265B",
        accent: "#525252",
        neutral: "#fffaf5"
      }},
      {'dark': {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        ...require("daisyui/src/theming/themes")["dark"],
        primary: "#FFE6C9",
        secondary: "#7F265B",
        accent: "#525252",
        // neutral: "#fffaf5"
      }},

    ]
  },
}
export default config
