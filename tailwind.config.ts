import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = { // Usamos uma constante 'config' para clareza
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: { // TODO: ESTE É O BLOCO EXTEND PRINCIPAL
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                },
                'fintech-blue': {
                    DEFAULT: '#1A247E',
                    light: '#2D4DE0',
                },
                'fintech-yellow': {
                    DEFAULT: '#FFD700',
                    light: '#FFFACD',
                },
                // Adicione as cores de design aqui:
                'fintech-bg-dark': '#261B9C',
                'fintech-primary-blue': '#1A247E',
                'fintech-accent-blue': '#2D4DE0',
                'fintech-light-blue': '#4A90E2',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: { // TODO: Keyframes devem estar AQUI
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'fadeInUp': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'pulse-slow': {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
                    '50%': { transform: 'scale(1.05)', opacity: '1' },
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '25%': { transform: 'translateY(-10px)' },
                    '50%': { transform: 'translateY(0)' },
                    '75%': { transform: 'translateY(10px)' },
                },
            },
            animation: { // TODO: Animações devem estar AQUI
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fadeInUp': 'fadeInUp 1s ease-out',
                'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
                'bounce-slow': 'bounce-slow 4s infinite ease-in-out',
            },
            fontFamily: { // TODO: Fontes devem estar AQUI
                sans: ['Inter', 'sans-serif'],
                heading: ['Madimi One', 'sans-serif'],
                body: ['Arima', 'sans-serif'],
            },
        } // Fim do 'extend'
    }, // Fim do 'theme'
    plugins: [tailwindcssAnimate],
} satisfies Config;

export default config; // Exporta a configuração