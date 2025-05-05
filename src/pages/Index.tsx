import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    ArrowRight,
    Wallet,
    WandSparkles,
    Signature,
    Plus,
    Droplets,
    ArrowsUpFromLine,
    ShieldCheck,
    Coins,
    Rocket,
    Users2,
    Palette,
    Code,
    CheckCircle,
    Lock,
} from "lucide-react";

const Index = () => {
    const navigate = useNavigate();
    const [rippleElements, setRippleElements] = useState<
        Array<{ left: number; top: number; id: number }>
    >([]);
    const [rippleCount, setRippleCount] = useState(0);

    // Function to create ripple effect
    const createRipple = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();

        // Calculate position relative to the button
        const left = e.clientX - rect.left;
        const top = e.clientY - rect.top;

        // Add new ripple
        const newRipple = {
            left,
            top,
            id: rippleCount,
        };

        setRippleElements([...rippleElements, newRipple]);
        setRippleCount(rippleCount + 1);

        // Remove ripple after animation completes
        setTimeout(() => {
            setRippleElements((current) =>
                current.filter((ripple) => ripple.id !== newRipple.id)
            );
        }, 800);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <NavBar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden ambient-background">
                    <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary/30 z-0"></div>

                    {/* Decorative Neo-Material elements */}
                    <div className="absolute top-1/3 right-[15%] w-72 h-72 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-gradient-to-br from-accent-amethyst/10 to-accent-glow-cyan/10 opacity-30 animate-morph blur-xl"></div>
                    <div
                        className="absolute bottom-1/3 left-[10%] w-80 h-80 rounded-full bg-accent-aurora-pink/5 opacity-20 blur-3xl animate-pulse-subtle"
                        style={{ animationDelay: "1.5s" }}
                    ></div>

                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="flex flex-col items-center space-y-10 text-center">
                            <div className="space-y-6 max-w-4xl">
                                <div className="inline-block mb-6">
                                    <div className="inline-flex items-center rounded-full border border-white/10 dark:border-white/5 bg-white/50 dark:bg-base-grey/20 backdrop-blur-md px-3 py-1 text-sm font-medium text-foreground/80 shadow-nm-inner-soft">
                                        <span className="flex h-2 w-2 rounded-full bg-accent-aurora-green mr-2 animate-pulse"></span>
                                        Built on MultiversX Blockchain
                                    </div>
                                </div>

                                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                                    MultiversX Tokens,{" "}
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-amethyst to-accent-glow-cyan font-bold">
                                        Made Simple & Secure
                                    </span>
                                </h1>
                                <p className="mx-auto max-w-[800px] text-foreground/80 text-lg md:text-xl">
                                    Effortlessly create your ESDT token, provide
                                    xExchange liquidity, manage supply, and
                                    control roles – all through intuitive
                                    wizards. No coding required.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <Button
                                    className="neo-button px-6 py-2.5 text-base rounded-lg shadow-nm-md group relative overflow-hidden"
                                    size="lg"
                                    onClick={(e) => {
                                        createRipple(e);
                                        navigate("/dashboard");
                                    }}
                                >
                                    {/* Ripple container and effects */}
                                    {rippleElements.map((ripple) => (
                                        <span
                                            key={ripple.id}
                                            className="ripple"
                                            style={{
                                                left: ripple.left,
                                                top: ripple.top,
                                            }}
                                        />
                                    ))}

                                    <span className="relative flex items-center z-10">
                                        Connect Wallet & Create Token
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-border/50 bg-base-off-white/10 dark:bg-base-charcoal/20 backdrop-blur-sm hover:bg-base-off-white/20 dark:hover:bg-base-charcoal/30 rounded-lg shadow-nm-sm hover:shadow-nm-md transition-all duration-300 text-foreground/90"
                                    onClick={() => {
                                        const howItWorks =
                                            document.getElementById(
                                                "how-it-works"
                                            );
                                        howItWorks?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }}
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base-grey/5 to-base-grey/10 z-0"></div>
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="section-title text-foreground">
                                Get Your Token Live in Minutes
                            </h2>
                            <p className="section-subtitle text-foreground/80">
                                Follow our simple process to create, deploy and
                                manage your tokens on the MultiversX blockchain
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {/* Step 1 */}
                            <div className="relative group bg-card/80 dark:bg-card/60 backdrop-blur-lg rounded-xl p-6 border border-white/10 dark:border-white/5 shadow-nm-md hover:shadow-nm-lg transition-shadow duration-300 interactive-hover">
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-accent-amethyst to-accent-glow-cyan flex items-center justify-center text-white font-bold shadow-nm-sm">
                                    1
                                </div>
                                <div className="pt-4">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-full bg-base-off-white/10 dark:bg-base-charcoal/20 flex items-center justify-center mb-6 shadow-nm-inner-soft group-hover:shadow-nm-sm group-hover:bg-base-off-white/20 dark:group-hover:bg-base-charcoal/30 transition-all duration-300">
                                            <Wallet className="text-accent-amethyst h-7 w-7" />
                                        </div>
                                        <h3 className="font-bold text-xl mb-3 text-foreground">
                                            Connect Securely
                                        </h3>
                                        <p className="text-foreground/80">
                                            Link your preferred MultiversX
                                            wallet (Maiar App, Web Wallet,
                                            Ledger, Extension) in seconds.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative group bg-card/80 dark:bg-card/60 backdrop-blur-lg rounded-xl p-6 border border-white/10 dark:border-white/5 shadow-nm-md hover:shadow-nm-lg transition-shadow duration-300 interactive-hover">
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-accent-amethyst to-accent-glow-cyan flex items-center justify-center text-white font-bold shadow-nm-sm">
                                    2
                                </div>
                                <div className="pt-4">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-full bg-base-off-white/10 dark:bg-base-charcoal/20 flex items-center justify-center mb-6 shadow-nm-inner-soft group-hover:shadow-nm-sm group-hover:bg-base-off-white/20 dark:group-hover:bg-base-charcoal/30 transition-all duration-300">
                                            <WandSparkles className="text-accent-amethyst h-7 w-7" />
                                        </div>
                                        <h3 className="font-bold text-xl mb-3 text-foreground">
                                            Follow the Wizard
                                        </h3>
                                        <p className="text-foreground/80">
                                            Step-by-step guidance walks you
                                            through token creation, liquidity
                                            provision, or management tasks.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative group bg-card/80 dark:bg-card/60 backdrop-blur-lg rounded-xl p-6 border border-white/10 dark:border-white/5 shadow-nm-md hover:shadow-nm-lg transition-shadow duration-300 interactive-hover">
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-accent-amethyst to-accent-glow-cyan flex items-center justify-center text-white font-bold shadow-nm-sm">
                                    3
                                </div>
                                <div className="pt-4">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-full bg-base-off-white/10 dark:bg-base-charcoal/20 flex items-center justify-center mb-6 shadow-nm-inner-soft group-hover:shadow-nm-sm group-hover:bg-base-off-white/20 dark:group-hover:bg-base-charcoal/30 transition-all duration-300">
                                            <Signature className="text-accent-amethyst h-7 w-7" />
                                        </div>
                                        <h3 className="font-bold text-xl mb-3 text-foreground">
                                            Sign & Deploy
                                        </h3>
                                        <p className="text-foreground/80">
                                            Confirm the transaction securely in
                                            your wallet to execute your action
                                            on the MultiversX blockchain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-background relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-base-grey/5 to-transparent z-0"></div>
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="section-title text-foreground">
                                Your Complete MultiversX Token Toolkit
                            </h2>
                            <p className="section-subtitle text-foreground/80">
                                Everything you need to create and manage tokens
                                on the MultiversX blockchain
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group bg-card/80 dark:bg-card/60 backdrop-blur-lg rounded-xl p-5 border border-white/10 dark:border-white/5 shadow-nm-md hover:shadow-nm-lg transition-shadow duration-300 data-stream"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 flex items-center justify-center text-accent-amethyst shadow-nm-inner-soft group-hover:shadow-nm-sm group-hover:bg-base-off-white/20 dark:group-hover:bg-base-charcoal/30 transition-all duration-300 glow-effect">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1 text-foreground transition-colors">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-foreground/80">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Security Section */}
                <section className="py-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base-grey/5 to-base-grey/10 z-0"></div>
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="max-w-3xl mx-auto bg-card/80 dark:bg-card/60 backdrop-blur-xl rounded-xl p-8 border border-white/10 dark:border-white/5 shadow-nm-lg">
                            <div className="text-center mb-10">
                                <div className="w-16 h-16 mx-auto rounded-full bg-base-off-white/10 dark:bg-base-charcoal/20 flex items-center justify-center mb-4 shadow-nm-inner-soft">
                                    <Lock className="text-accent-amethyst h-7 w-7" />
                                </div>
                                <h2 className="text-3xl font-bold sm:text-4xl text-foreground">
                                    Security is Paramount
                                </h2>
                                <p className="mt-4 text-foreground/80 md:text-lg">
                                    Your tokens deserve the highest level of
                                    protection
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                                {securityPoints.map((point, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-4"
                                    >
                                        <div className="mt-1 bg-gradient-to-br from-accent-aurora-green to-accent-glow-cyan p-1.5 rounded-full flex items-center justify-center shadow-nm-sm">
                                            <CheckCircle className="text-base-charcoal h-4 w-4" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1 text-foreground">
                                                {point.title}
                                            </h3>
                                            <p className="text-foreground/80 text-sm">
                                                {point.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="py-20 bg-background relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-muted/20 z-0"></div>
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="section-title">
                                Built for MultiversX Innovators
                            </h2>
                            <p className="section-subtitle">
                                Empowering different types of users to succeed
                                on the MultiversX blockchain
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {useCases.map((useCase, index) => (
                                <Card
                                    key={index}
                                    className="neo-card border-border/20 hover:border-elven-muted/30 glow-effect interactive-hover"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="rounded-full w-16 h-16 bg-elven-muted/20 dark:bg-elven-muted/10 flex items-center justify-center mb-5 group-hover:bg-elven-muted/30 dark:group-hover:bg-elven-muted/20 shadow-neo-inner group-hover:shadow-neo-sm transition-all duration-300">
                                            {useCase.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3">
                                            {useCase.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {useCase.description}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20">
                    <div className="container px-4 md:px-6">
                        <div className="bg-gradient-to-r from-accent-amethyst/80 to-accent-glow-cyan/80 rounded-xl p-10 md:p-16 relative overflow-hidden shadow-nm-lg">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-white/20 dark:bg-base-charcoal/30 flex items-center justify-center mb-6 shadow-nm-inner-soft backdrop-blur-sm">
                                    <Rocket className="h-8 w-8 text-white" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Ready to Launch Your Token?
                                </h2>
                                <p className="text-white/80 max-w-xl mx-auto mb-8">
                                    Join the growing MultiversX ecosystem.
                                    Connect your wallet and start building today
                                    with our secure and easy-to-use platform.
                                </p>
                                <Button
                                    className="neo-button px-8 py-3 text-lg rounded-lg shadow-nm-md group relative overflow-hidden bg-white dark:bg-base-charcoal text-accent-amethyst dark:text-accent-glow-cyan hover:bg-opacity-90 dark:hover:bg-opacity-90"
                                    size="lg"
                                    onClick={(e) => {
                                        createRipple(e);
                                        navigate("/dashboard");
                                    }}
                                >
                                    {/* Ripple */}
                                    {rippleElements.map((ripple) => (
                                        <span
                                            key={ripple.id}
                                            className="ripple bg-accent-amethyst/30"
                                            style={{
                                                left: ripple.left,
                                                top: ripple.top,
                                            }}
                                        />
                                    ))}
                                    <span className="relative flex items-center z-10">
                                        Get Started Now
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

const features = [
    {
        icon: <WandSparkles className="h-6 w-6 text-accent-amethyst" />,
        title: "Effortless Token Creation",
        description:
            "Generate MultiversX ESDT tokens in minutes using our intuitive step-by-step wizard.",
    },
    {
        icon: <Plus className="h-6 w-6 text-accent-amethyst" />,
        title: "Easy Supply Management",
        description:
            "Mint new tokens or burn existing ones directly through the dashboard.",
    },
    {
        icon: <Droplets className="h-6 w-6 text-accent-amethyst" />,
        title: "Provide xExchange Liquidity",
        description:
            "Seamlessly add liquidity for your newly created token to the xExchange.",
    },
    {
        icon: <ArrowsUpFromLine className="h-6 w-6 text-accent-amethyst" />,
        title: "Upgrade Token Properties",
        description:
            "Modify your token's characteristics after issuance if properties allow.",
    },
    {
        icon: <ShieldCheck className="h-6 w-6 text-accent-amethyst" />,
        title: "Role-Based Access Control",
        description:
            "Assign and manage special roles (e.g., minting, freezing) for your token.",
    },
    {
        icon: <Coins className="h-6 w-6 text-accent-amethyst" />,
        title: "Token Operations",
        description:
            "Execute common token actions like transfers, freezing, and wiping.",
    },
];

const securityPoints = [
    {
        title: "Non-Custodial",
        description: "You always remain in full control of your private keys.",
    },
    {
        title: "Direct Blockchain Interaction",
        description:
            "Transactions are sent directly from your wallet to the MultiversX network.",
    },
    {
        title: "Transparent Process",
        description:
            "Clearly review all transaction details before signing in your wallet.",
    },
    {
        title: "Standard Compliant",
        description:
            "Utilizes official MultiversX tooling and smart contracts.",
    },
];

const useCases = [
    {
        title: "Project Founders",
        description:
            "Launch your project's token and seed initial xExchange liquidity swiftly to bootstrap your ecosystem.",
        icon: <Rocket className="h-8 w-8 text-accent-amethyst" />,
    },
    {
        title: "Community Leaders",
        description:
            "Issue and manage tokens to engage your audience, distribute rewards, or govern community decisions.",
        icon: <Users2 className="h-8 w-8 text-accent-amethyst" />,
    },
    {
        title: "Creators & Brands",
        description:
            "Easily create fan tokens, loyalty points, or branded digital assets on the MultiversX network.",
        icon: <Palette className="h-8 w-8 text-accent-amethyst" />,
    },
    {
        title: "Developers",
        description:
            "Rapidly deploy, manage, and experiment with ESDT tokens without writing or deploying boilerplate smart contracts.",
        icon: <Code className="h-8 w-8 text-accent-amethyst" />,
    },
];

export default Index;
