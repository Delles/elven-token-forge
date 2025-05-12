import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    ArrowRight,
    Wallet,
    WandSparkles,
    Signature,
    Droplets,
    Coins,
    ShieldCheck,
    LayoutDashboard,
    Rocket,
    Users2,
    Palette,
    Code,
    CheckCircle,
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

    // Scroll to a section by ID
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden ambient-background">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-secondary/20 backdrop-blur-sm z-0"></div>
                    <div className="absolute top-1/3 right-[15%] w-64 h-64 morphing-shape opacity-20"></div>
                    <div
                        className="absolute bottom-1/4 left-[10%] w-72 h-72 rounded-full bg-accent/5 opacity-20 blur-3xl animate-pulse-subtle"
                        style={{ animationDelay: "1.5s" }}
                    ></div>

                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="flex flex-col items-center space-y-10 text-center">
                            <div className="space-y-6 max-w-4xl">
                                <div className="inline-block mb-6">
                                    <div className="highlight-badge">
                                        <span className="flex h-2 w-2 rounded-full bg-accent-aurora-green mr-2 animate-pulse"></span>
                                        BUILT ON MULTIVERSX BLOCKCHAIN
                                    </div>
                                </div>

                                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                                    Launch & Manage Your MultiversX Token.{" "}
                                    <span className="gradient-text">
                                        Effortlessly. Securely.
                                    </span>
                                </h1>
                                <p className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-xl">
                                    Effortlessly create your custom ESDT token,
                                    provide initial xExchange liquidity, manage
                                    token supply, and control roles – all
                                    through our intuitive, wizard-driven
                                    platform. No coding required.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <Button
                                    className="neo-button px-6 py-2.5 text-base rounded-lg ripple-container"
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
                                        <Rocket className="mr-2 h-4 w-4" />
                                        Create Your Token Now
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-border/20 bg-white/10 dark:bg-base-charcoal/20 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-base-charcoal/30 rounded-lg shadow-nm-sm hover:shadow-nm-md transition-all duration-300 text-foreground/90"
                                    onClick={() =>
                                        scrollToSection("how-it-works")
                                    }
                                >
                                    How It Works
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-muted/20 z-0"></div>
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="section-title">
                                Launch Your Token in 3 Simple Steps
                            </h2>
                            <p className="section-subtitle">
                                Our platform streamlines the entire token
                                lifecycle on MultiversX. Here's how easy it is:
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {/* Step 1 */}
                            <div className="neo-card relative group interactive-hover">
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-nm-accent-gradient flex items-center justify-center text-white font-bold shadow-nm-sm">
                                    1
                                </div>
                                <div className="pt-4">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="feature-icon">
                                            <Wallet className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-bold text-xl mb-3">
                                            Connect Securely
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Instantly link your preferred
                                            MultiversX wallet (Maiar App, Web
                                            Wallet, Ledger, xPortal). Your keys
                                            never leave your control.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="neo-card relative group interactive-hover">
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-nm-accent-gradient flex items-center justify-center text-white font-bold shadow-nm-sm">
                                    2
                                </div>
                                <div className="pt-4">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="feature-icon">
                                            <WandSparkles className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-bold text-xl mb-3">
                                            Follow the Wizard
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Our intuitive wizards guide you
                                            step-by-step through token creation,
                                            liquidity setup, or ongoing
                                            management tasks. No technical
                                            jargon.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="neo-card relative group interactive-hover">
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-nm-accent-gradient flex items-center justify-center text-white font-bold shadow-nm-sm">
                                    3
                                </div>
                                <div className="pt-4">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="feature-icon">
                                            <Signature className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-bold text-xl mb-3">
                                            Sign & Go Live
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Review all details, then confirm the
                                            transaction securely in your wallet.
                                            Your token or action is instantly
                                            live on the MultiversX blockchain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-background relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent z-0"></div>
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="section-title">
                                Your Complete MultiversX Token Toolkit
                            </h2>
                            <p className="section-subtitle">
                                From initial concept to ongoing management, our
                                platform provides comprehensive features through
                                simple interfaces
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="neo-panel p-5 data-stream shadow-nm-md hover:shadow-nm-lg transition-shadow duration-300"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-white/10 dark:bg-base-charcoal/20 flex items-center justify-center text-accent shadow-nm-inner-soft group-hover:shadow-nm-sm group-hover:bg-white/20 dark:group-hover:bg-base-charcoal/30 transition-all duration-300 glow-effect">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1 transition-colors">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
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
                <section id="security" className="py-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-muted/20 z-0"></div>
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="frosted-panel max-w-3xl mx-auto backdrop-blur-xl p-8">
                            <div className="text-center mb-10">
                                <div className="w-16 h-16 mx-auto rounded-full bg-white/10 dark:bg-base-charcoal/20 flex items-center justify-center mb-4 shadow-nm-inner-soft">
                                    <ShieldCheck className="text-accent h-7 w-7" />
                                </div>
                                <h2 className="text-3xl font-bold sm:text-4xl">
                                    Unyielding Security, Absolute Control
                                </h2>
                                <p className="mt-4 text-muted-foreground md:text-lg">
                                    We're committed to the highest security
                                    standards, ensuring your interactions are
                                    safe and your assets remain yours
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
                                            <h3 className="font-bold text-lg mb-1">
                                                {point.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
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
                <section
                    id="use-cases"
                    className="py-20 bg-background relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-muted/20 z-0"></div>
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="section-title">
                                Empowering Every MultiversX Vision
                            </h2>
                            <p className="section-subtitle">
                                Whether you're a project founder, community
                                builder, creator, or developer, our platform is
                                designed to help you succeed
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {useCases.map((useCase, index) => (
                                <Card
                                    key={index}
                                    className="neo-card glow-effect interactive-hover"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="rounded-full w-16 h-16 bg-muted/20 dark:bg-muted/10 flex items-center justify-center mb-5 shadow-nm-inner-soft">
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
                        <div className="neo-panel bg-nm-accent-gradient rounded-xl p-10 md:p-16 relative overflow-hidden shadow-nm-lg">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-white/20 dark:bg-base-charcoal/30 flex items-center justify-center mb-6 shadow-nm-inner-soft backdrop-blur-sm">
                                    <Rocket className="h-8 w-8 text-white" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Ready to Bring Your Token to Life on
                                    MultiversX?
                                </h2>
                                <p className="text-white/80 max-w-xl mx-auto mb-8">
                                    Join thousands of innovators building the
                                    future on MultiversX. Connect your wallet
                                    and experience the simplest way to launch
                                    and manage your ESDT tokens. Secure,
                                    intuitive, and powerful.
                                </p>
                                <Button
                                    className="ripple-container bg-white dark:bg-base-charcoal text-accent dark:text-accent px-8 py-3 text-lg rounded-lg shadow-nm-md hover:bg-opacity-90 dark:hover:bg-opacity-90"
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
                                            className="ripple bg-accent/30"
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
                                <p className="text-white/60 text-sm mt-4">
                                    Connect wallet to explore the platform
                                </p>
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
        icon: <WandSparkles className="h-6 w-6" />,
        title: "Effortless Token Creation",
        description:
            "Design and launch your custom ESDT token in minutes using our intuitive step-by-step wizard.",
    },
    {
        icon: <Droplets className="h-6 w-6" />,
        title: "Instant xExchange Liquidity",
        description:
            "Seamlessly provide initial liquidity for your newly created token to the xExchange.",
    },
    {
        icon: <Coins className="h-6 w-6" />,
        title: "Flexible Supply Management",
        description:
            "Easily mint new tokens or burn existing ones directly through the dashboard.",
    },
    {
        icon: <ShieldCheck className="h-6 w-6" />,
        title: "Granular Role Control",
        description:
            "Manage powerful ESDT roles with a clear interface for complete token governance.",
    },
    {
        icon: <LayoutDashboard className="h-6 w-6" />,
        title: "Intuitive Dashboard",
        description:
            "View key token information and access all management functions from one central interface.",
    },
    {
        icon: <Signature className="h-6 w-6" />,
        title: "Transaction Transparency",
        description:
            "Review all transaction details with clear fee estimates before signing in your wallet.",
    },
];

const securityPoints = [
    {
        title: "Non-Custodial Architecture",
        description:
            "You retain full control of your private keys and assets. Our platform never has access to your funds.",
    },
    {
        title: "Direct Wallet-Signed Transactions",
        description:
            "All operations are signed directly by you in your wallet and interact with MultiversX smart contracts.",
    },
    {
        title: "Transparent Operations & Costs",
        description:
            "Clearly review all transaction parameters and estimated costs before confirming any action.",
    },
    {
        title: "Built on MultiversX Security",
        description:
            "Benefit from the robust and secure foundation of the MultiversX blockchain.",
    },
];

const useCases = [
    {
        title: "Project Founders",
        description:
            "Launch your project's token, establish xExchange liquidity, and manage tokenomics to bootstrap your ecosystem.",
        icon: <Rocket className="h-8 w-8 text-accent" />,
    },
    {
        title: "Community Leaders",
        description:
            "Issue tokens to engage your audience, facilitate governance, or distribute rewards to your community.",
        icon: <Users2 className="h-8 w-8 text-accent" />,
    },
    {
        title: "Creators & Brands",
        description:
            "Create fan tokens, loyalty points, or branded digital assets on the MultiversX network.",
        icon: <Palette className="h-8 w-8 text-accent" />,
    },
    {
        title: "Developers",
        description:
            "Rapidly deploy, test, and manage ESDT tokens without boilerplate smart contract work.",
        icon: <Code className="h-8 w-8 text-accent" />,
    },
];

export default Index;
