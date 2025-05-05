
import type { Config } from "tailwindcss";

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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
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
				elven: {
					DEFAULT: '#6E59A5',
					light: '#9b87f5',
					dark: '#1A1F2C',
					accent: '#D946EF',
					muted: '#E5DEFF',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'glow': {
					'0%, 100%': { filter: 'brightness(100%)' },
					'50%': { filter: 'brightness(120%)' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				'scale-fade-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				'ripple': {
					'0%': { 
						transform: 'scale(0)', 
						opacity: '0.8' 
					},
					'100%': { 
						transform: 'scale(1)', 
						opacity: '0' 
					}
				},
				'morph': {
					'0%, 100%': { 
						borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' 
					},
					'50%': { 
						borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' 
					}
				},
				'ambient-light': {
					'0%, 100%': { 
						'background-position': '0% 0%' 
					},
					'50%': { 
						'background-position': '100% 100%' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'scale-fade-in': 'scale-fade-in 0.3s ease-out',
				'ripple': 'ripple 0.8s cubic-bezier(0, 0.5, 0.5, 1) forwards',
				'morph': 'morph 10s ease-in-out infinite',
				'ambient-light': 'ambient-light 15s ease-in-out infinite'
			},
			backgroundImage: {
				'elven-gradient': 'linear-gradient(to right, #9b87f5, #6E59A5)',
				'elven-gradient-vertical': 'linear-gradient(to bottom, #9b87f5, #6E59A5)',
				'dark-elven-gradient': 'linear-gradient(to right, #1A1F2C, #403E43)',
				'shimmer-gradient': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0) 100%)',
				'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
				'glass-shine': 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%)',
				'neo-material-gradient': 'linear-gradient(135deg, rgba(150, 135, 245, 0.5) 0%, rgba(110, 89, 165, 0.5) 50%, rgba(217, 70, 239, 0.5) 100%)',
				'ambient-gradient': 'radial-gradient(circle at 50% 50%, rgba(155, 135, 245, 0.15), rgba(217, 70, 239, 0.05), rgba(25, 25, 35, 0.0))',
				'frosted-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
				'data-flow': 'linear-gradient(90deg, rgba(155, 135, 245, 0.2) 0%, rgba(217, 70, 239, 0.1) 100%)'
			},
			boxShadow: {
				'neo': '0 10px 30px -10px rgba(0, 0, 0, 0.2), 0 5px 15px -5px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
				'neo-sm': '0 5px 15px -8px rgba(0, 0, 0, 0.15), 0 3px 8px -3px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
				'neo-lg': '0 20px 40px -15px rgba(0, 0, 0, 0.2), 0 10px 20px -10px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
				'neo-inner': 'inset 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(0, 0, 0, 0.03)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
