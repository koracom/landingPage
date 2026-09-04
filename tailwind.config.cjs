/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        // Landing KoraCom
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Outfit', 'Helvetica', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Palette KoraCom - systeme visuel dedie a la landing marketing.
        // Volontairement separe des tokens semantiques de l'app.
        kora: {
          ink: '#2A1B12',
          bark: '#4A2E20',
          clay: '#7A4A32',
          copper: '#C08457',
          ember: '#A85E33',
          rust: '#B85042',
          sand: '#F0E0CD',
          cream: '#FAF6EF',
          dune: '#EDE3D5',
          text: '#2E2018',
          muted: '#5A4A3C',
        },
      },
      fontSize: {
        // Typographie fluide : evite les media queries sur le texte.
        eyebrow: ['0.8125rem', { letterSpacing: '0.2em', lineHeight: '1.4' }],
        'display-xl': [
          'clamp(2.5rem, 6.4vw, 4.75rem)',
          { lineHeight: '1.04', letterSpacing: '-0.015em' },
        ],
        'display-lg': [
          'clamp(1.875rem, 4vw, 3.25rem)',
          { lineHeight: '1.08' },
        ],
        'display-md': ['clamp(1.3rem, 2.5vw, 1.875rem)', { lineHeight: '1.14' }],
        'display-sm': ['clamp(1.3rem, 2.2vw, 1.625rem)', { lineHeight: '1.16' }],
        'quote-lg': ['clamp(1.3rem, 2.2vw, 1.6875rem)', { lineHeight: '1.45' }],
        'body-lg': ['clamp(1rem, 1.4vw, 1.1875rem)', { lineHeight: '1.7' }],
      },
      spacing: {
        'section-y': 'clamp(4.5rem, 13vh, 8.125rem)',
        'section-x': 'clamp(1.25rem, 4vw, 1.75rem)',
      },
      maxWidth: {
        shell: '1140px',
        measure: '52ch',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-soft': 'cubic-bezier(0.2, 0.7, 0.2, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'ko-rise': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'ko-cord': {
          from: { strokeDashoffset: '620' },
          to: { strokeDashoffset: '0' },
        },
        'ko-tick': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        'ko-stair': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'ko-rise': 'ko-rise 700ms cubic-bezier(0.2,0.7,0.2,1) both',
        'ko-cord': 'ko-cord 900ms cubic-bezier(0.16,1,0.3,1) both',
        'ko-tick': 'ko-tick 2600ms cubic-bezier(0.16,1,0.3,1) infinite',
        'ko-stair': 'ko-stair 340ms cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
