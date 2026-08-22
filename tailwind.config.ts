import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "background": "#f4f7ff",
        "on-tertiary": "#ffffff",
        "tertiary-fixed": "#6ffbbe",
        "on-primary-fixed-variant": "#3f465c",
        "on-tertiary-container": "#009668",
        "tertiary": "#000000",
        "surface-container-lowest": "#ffffff",
        "on-primary": "#ffffff",
        "secondary-fixed-dim": "#adc6ff",
        "surface-container-low": "#eff4ff",
        "on-surface": "#0b1c30",
        "inverse-on-surface": "#eaf1ff",
        "on-surface-variant": "#45464d",
        "inverse-surface": "#213145",
        "surface-tint": "#565e74",
        "on-secondary-fixed-variant": "#004395",
        "secondary-fixed": "#d8e2ff",
        "on-tertiary-fixed-variant": "#005236",
        "primary-fixed": "#dae2fd",
        "outline-variant": "#c6c6cd",
        "on-error-container": "#93000a",
        "error": "#ba1a1a",
        "secondary-container": "#2170e4",
        "on-tertiary-fixed": "#002113",
        "error-container": "#ffdad6",
        "primary": "#000000",
        "primary-container": "#131b2e",
        "outline": "#76777d",
        "primary-fixed-dim": "#bec6e0",
        "inverse-primary": "#bec6e0",
        "surface-container-highest": "#d3e4fe",
        "tertiary-fixed-dim": "#4edea3",
        "on-secondary-fixed": "#001a42",
        "surface-container-high": "#dce9ff",
        "surface-container": "#e5eeff",
        "secondary": "#0058be",
        "surface-dim": "#cbdbf5",
        "tertiary-container": "#002113",
        "on-error": "#ffffff",
        "surface-bright": "#f8f9ff",
        "on-background": "#0b1c30",
        "surface-variant": "#d3e4fe",
        "on-primary-fixed": "#131b2e",
        "on-secondary": "#ffffff",
        "on-primary-container": "#7c839b",
        "on-secondary-container": "#fefcff",
        "surface": "#f8f9ff"
      },
      borderRadius: {
        "none": "0px",
        "xs": "0px",
        "sm": "0px",
        "DEFAULT": "0px",
        "md": "0px",
        "lg": "0px",
        "xl": "0px",
        "2xl": "0px",
        "3xl": "0px",
        "full": "9999px"
      },
      spacing: {
        "xl": "80px",
        "container-max": "1280px",
        "xs": "4px",
        "lg": "48px",
        "md": "24px",
        "base": "8px",
        "sm": "12px",
        "gutter": "24px"
      },
      fontFamily: {
        "headline-md": ["Newsreader", "serif"],
        "display-xl": ["Newsreader", "serif"],
        "body-lg": ["Inter", "sans-serif"],
        "headline-lg": ["Newsreader", "serif"],
        "label-mono": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"]
      },
      fontSize: {
        "headline-md": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
        "display-xl": ["60px", {"lineHeight": "72px", "letterSpacing": "-0.02em", "fontWeight": "800"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "headline-lg": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "label-mono": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "500"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
};

export default config;
