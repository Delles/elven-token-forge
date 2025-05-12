# Elven Token Forge ✨🪙

**The simplest way to create, launch, and manage ESDT tokens on the MultiversX blockchain.**

[![Status](https://img.shields.io/badge/status-in_development-yellow)](https://github.com/your-username/delles-elven-token-forge)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![Powered by Vite](https://img.shields.io/badge/Powered%20by-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![MultiversX](https://img.shields.io/badge/Blockchain-MultiversX-8C2AFA?logo=multiversx)](https://multiversx.com/)

---

Elven Token Forge is a user-friendly platform designed to empower anyone to effortlessly create and manage custom ESDT (Elven Standard Digital Token) tokens on the MultiversX network. Our wizard-driven interface guides you through every step, from token issuance to providing initial liquidity on xExchange, all without needing to write a single line of code.

**Note:** This project is currently in its early frontend development stages. Core blockchain interactions and wallet connections are mocked for UI/UX development and testing purposes.

## 📜 Table of Contents

-   [About The Project](#about-the-project)
-   [Key Features](#key-features)
-   [Built With](#built-with)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation & Running](#installation--running)
-   [Project Structure](#project-structure)
-   [Roadmap](#roadmap)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

## 🎯 About The Project

The MultiversX blockchain offers powerful capabilities for tokenization, but the process can be daunting for those without deep technical expertise. Elven Token Forge aims to bridge this gap by providing an intuitive, secure, and comprehensive toolkit for:

-   **Effortless Token Creation:** Design your token's properties (name, ticker, supply, decimals, special capabilities) through a simple wizard.
-   **Seamless Liquidity Provision:** Create a trading pair for your token and provide initial liquidity on the MultiversX xExchange.
-   **Intuitive Token Management:** (Future) Manage token supply, roles, and permissions from a central dashboard.

Our philosophy is "Non-Custodial & User-Controlled." All blockchain interactions are designed to be signed directly by you in your connected wallet, ensuring you always maintain full control over your assets.

**(Current Focus: Frontend and UX for wizards and dashboard layout, with dummy data and mocked wallet interactions.)**

## ✨ Key Features (Current & Planned)

-   🧙 **Wizard-Driven Token Issuance:**
    -   Define token name, ticker, initial supply, and decimals.
    -   Configure advanced ESDT properties (e.g., `canFreeze`, `canWipe`, `canMint`, `canBurn`, `canChangeOwner`, `canUpgrade`).
    -   Clear review of details and estimated network fees before submission.
-   💧 **Wizard-Driven Liquidity Provision:**
    -   Select your token and a pairing token (e.g., EGLD, USDC).
    -   Set initial amounts and preview the starting price.
    -   Understand risks associated with liquidity provision.
    -   (Mocked) Deposit tokens and create the liquidity pool on xExchange.
-   🛡️ **Secure Wallet Integration (Mocked):**
    -   Connect via (simulated) MultiversX Browser Extension, Web Wallet, xPortal App, or Ledger.
    -   Dummy address display and connect/disconnect functionality.
-   🖥️ **Token Dashboard (Layout & Mock Data):**
    -   Overview of your created/managed tokens.
    -   Detailed view for selected tokens (information, properties, balance).
    -   (Planned) Actions for token management (mint, burn, role management).
    -   (Planned) Analytics and recent activity.
-   🔐 **Protected Routes:** Ensures certain pages (like token creation/liquidity wizards, dashboard) require a (mocked) "connected" wallet state.
-   🎨 **Modern & Responsive UI:** Built with Tailwind CSS and Shadcn/ui for a clean, accessible, and adaptive experience across devices.
-   🍃 **Neo-Material Design:** A unique visual style blending modern aesthetics with subtle neo-material elements for a premium feel.

## 🛠️ Built With

This project leverages a modern and robust tech stack:

-   **Frontend:**
    -   [React](https://reactjs.org/)
    -   [TypeScript](https://www.typescriptlang.org/)
    -   [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
    -   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
    -   [Shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
-   **Routing:**
    -   [React Router DOM](https://reactrouter.com/)
-   **State Management & Data Fetching:**
    -   [TanStack Query (React Query)](https://tanstack.com/query/latest) - For managing asynchronous data
-   **Form Handling & Validation:**
    -   [React Hook Form](https://react-hook-form.com/)
    -   [Zod](https://zod.dev/) - TypeScript-first schema validation
-   **MultiversX Integration (SDKs):**
    -   `@multiversx/sdk-core`
    -   `@multiversx/sdk-dapp` (for future real wallet integration)
-   **Styling & UI Components:**
    -   Radix UI Primitives (via Shadcn/ui)
    -   Lucide React (Icons)
-   **Linting & Formatting:**
    -   ESLint
    -   TypeScript ESLint

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js (version 18.x or higher recommended) and npm/yarn installed on your system.

-   **Node.js:** [https://nodejs.org/](https://nodejs.org/)
-   **npm** (comes with Node.js) or **yarn:** [https://classic.yarnpkg.com/](https://classic.yarnpkg.com/)

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/delles-elven-token-forge.git
    cd delles-elven-token-forge
    ```
2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Or using yarn:
    ```bash
    yarn dev
    ```
    This will start the Vite development server, typically at `http://localhost:8080`.

### Other Available Scripts

-   **Linting:**
    ```bash
    npm run lint
    ```
-   **Building for production:**
    ```bash
    npm run build
    ```
-   **Previewing the production build:**
    ```bash
    npm run preview
    ```

## 📁 Project Structure

The project follows a standard Vite + React + TypeScript structure:

## 🗺️ Roadmap

As an early-stage project, we have an exciting roadmap ahead:

-   [ ] **Full MultiversX Smart Contract Integration:**
    -   [ ] Implement real token issuance transactions.
    -   [ ] Integrate actual liquidity provision calls to xExchange contracts.
    -   [ ] Enable real token management operations (mint, burn, roles).
-   [ ] **Real Wallet Connection:**
    -   [ ] Integrate `@multiversx/sdk-dapp` for live wallet interactions.
    -   [ ] Support for xPortal App, MultiversX DeFi Wallet (extension), Web Wallet, Ledger.
-   [ ] **Dashboard Enhancements:**
    -   [ ] Fetch and display real-time token data for user's address.
    -   [ ] Implement token analytics charts.
    -   [ ] Show actual transaction history.
-   [ ] **Comprehensive Testing:** Unit, integration, and end-to-end tests.
-   [ ] **UI/UX Refinements:** Continuous improvements based on user feedback.
-   [ ] **Documentation:** Detailed guides for users and developers.
-   [ ] **Deployment:** Make the platform publicly accessible.

See the [open issues](https://github.com/your-username/delles-elven-token-forge/issues) for a full list of proposed features (and known issues).

## 🙌 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE.md` for more information.
