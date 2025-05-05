import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
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
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                elven: {
                    DEFAULT: "#6E59A5",
                    light: "#9b87f5",
                    dark: "#1A1F2C",
                    accent: "#D946EF",
                    muted: "#E5DEFF",
                },
                "base-charcoal": "#1a1f2c",
                "base-space-blue": "#1c2541",
                "base-grey": "#3a3f58",
                "base-off-white": "#f8f9fa",
                "accent-aurora-green": "#6EEB83",
                "accent-aurora-pink": "#e45abf",
                "accent-glow-cyan": "#34d3e8",
                "accent-cool-silver": "#c0c0c0",
                "accent-subtle-gold": "#d4af37",
                "accent-amethyst": "#9966cc",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    '"Noto Sans"',
                    "sans-serif",
                ],
            },
            fontSize: {
                xs: "0.6rem",
                sm: "0.8rem",
                base: "1rem",
                lg: "1.125rem",
                xl: "1.25rem",
                "2xl": "1.5rem",
                "3xl": "2rem",
                "4xl": "2.66rem",
                "5xl": "3.55rem",
            },
            lineHeight: {
                tight: "1.2",
                snug: "1.375",
                normal: "1.5",
                relaxed: "1.625",
                loose: "2",
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "pulse-subtle": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.8" },
                },
                glow: {
                    "0%, 100%": { filter: "brightness(100%)" },
                    "50%": { filter: "brightness(120%)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "scale-fade-in": {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                ripple: {
                    "0%": {
                        transform: "scale(0)",
                        opacity: "0.8",
                    },
                    "100%": {
                        transform: "scale(1)",
                        opacity: "0",
                    },
                },
                morph: {
                    "0%, 100%": {
                        borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
                    },
                    "50%": {
                        borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%",
                    },
                },
                "ambient-light": {
                    "0%, 100%": {
                        "background-position": "0% 0%",
                    },
                    "50%": {
                        "background-position": "100% 100%",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                float: "float 6s ease-in-out infinite",
                "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
                glow: "glow 2s ease-in-out infinite",
                shimmer: "shimmer 2s linear infinite",
                "scale-fade-in": "scale-fade-in 0.3s ease-out",
                ripple: "ripple 0.8s cubic-bezier(0, 0.5, 0.5, 1) forwards",
                morph: "morph 10s ease-in-out infinite",
                "ambient-light": "ambient-light 15s ease-in-out infinite",
            },
            backgroundImage: {
                "shimmer-gradient":
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0) 100%)",
                "glass-gradient":
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                "glass-shine":
                    "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%)",
                "neo-material-gradient":
                    "linear-gradient(135deg, var(--color-accent-amethyst) 0%, var(--color-accent-glow-cyan) 100%)",
                "nm-accent-gradient":
                    "linear-gradient(135deg, #9966cc 0%, #34d3e8 100%)",
                "ambient-gradient":
                    "radial-gradient(circle at 50% 50%, rgba(153, 102, 204, 0.15), rgba(52, 211, 232, 0.05), transparent)",
                "frosted-glass":
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))",
                "data-flow":
                    "linear-gradient(90deg, rgba(153, 102, 204, 0.2) 0%, rgba(52, 211, 232, 0.1) 100%)",
            },
            boxShadow: {
                neo: "0 10px 30px -10px rgba(0, 0, 0, 0.2), 0 5px 15px -5px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
                "neo-sm":
                    "0 5px 15px -8px rgba(0, 0, 0, 0.15), 0 3px 8px -3px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
                "neo-lg":
                    "0 20px 40px -15px rgba(0, 0, 0, 0.2), 0 10px 20px -10px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
                "neo-inner":
                    "inset 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(0, 0, 0, 0.03)",
                "nm-sm":
                    "0 2px 5px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1)",
                "nm-md":
                    "0 5px 15px rgba(0, 0, 0, 0.18), 0 3px 6px rgba(0, 0, 0, 0.12)",
                "nm-lg":
                    "0 10px 25px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.15)",
                "nm-xl":
                    "0 20px 40px rgba(0, 0, 0, 0.22), 0 15px 20px rgba(0, 0, 0, 0.18)",
                "nm-inner-soft": "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
            },
        },
    },
    plugins: [tailwindcssAnimate],
} satisfies Config;
