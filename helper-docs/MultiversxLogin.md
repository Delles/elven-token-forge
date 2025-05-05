**Standalone Guide: Implementing MultiversX Login in React (Vite + TS)**

**Goal:** Add secure user authentication to your React application using the MultiversX blockchain identity. Users will be able to log in using methods like the xPortal App, Ledger hardware wallet, the MultiversX DeFi Wallet browser extension, or the MultiversX Web Wallet.

**Technology Stack:** React, Vite, TypeScript, `@multiversx/sdk-dapp`.

---

**Phase 1: Project Setup & Dependencies**

1.  **Prerequisites:**
    - Make sure you have Node.js installed (LTS version is recommended).
    - You'll need a package manager like `yarn` or `npm`.
    - Have a working React project set up, ideally using Vite with TypeScript. If starting fresh, you can use:
        ```bash
        # Using yarn
        yarn create vite my-multiversx-app --template react-ts
        cd my-multiversx-app

        # Or using npm
        npm create vite@latest my-multiversx-app -- --template react-ts
        cd my-multiversx-app

        ```
2.  **Install Core MultiversX SDK & Routing Dependencies:**
    In your project's terminal, install the essential MultiversX libraries and a routing library (we'll use `react-router-dom`):
        ```bash
        # Using yarn
        yarn add @multiversx/sdk-core @multiversx/sdk-dapp react-router-dom

        # Or using npm
        npm install @multiversx/sdk-core @multiversx/sdk-dapp react-router-dom

        ```

        - `@multiversx/sdk-core`: Provides fundamental building blocks for interacting with the MultiversX blockchain.
        - `@multiversx/sdk-dapp`: The main library for building decentralized applications (dApps). It includes authentication logic, hooks, pre-built UI components (like login buttons), and state management for blockchain interactions.
        - `react-router-dom`: Handles navigation within your single-page React application, crucial for directing users between login pages and protected areas.
3.  **Install Development Dependencies for Compatibility:**
    The MultiversX SDK uses some features typically found in Node.js environments. You need to provide browser-friendly versions (polyfills) using a Vite plugin. Additionally, running your local development server over HTTPS (SSL) is highly recommended for reliable wallet connections (especially WalletConnect and Web Wallet).
        ```bash
        # Using yarn
        yarn add -D vite-plugin-node-polyfills @vitejs/plugin-basic-ssl

        # Or using npm
        npm install --save-dev vite-plugin-node-polyfills @vitejs/plugin-basic-ssl

        ```

        - `vite-plugin-node-polyfills`: Makes Node.js global variables and modules (like `Buffer`) available in the browser environment during development and build.
        - `@vitejs/plugin-basic-ssl`: Easily enables HTTPS for your Vite development server, creating a self-signed certificate.
4.  **Configure Vite (`vite.config.ts`):**
    You need to tell Vite to use the plugins you just installed. Modify your `vite.config.ts` file:
        ```tsx
        import { defineConfig } from "vite";
        import react from "@vitejs/plugin-react";
        // 1. Import the plugins
        import { nodePolyfills } from "vite-plugin-node-polyfills";
        import basicSsl from "@vitejs/plugin-basic-ssl";

        // <https://vitejs.dev/config/>
        export default defineConfig({
            plugins: [
                react(),
                // 2. Add the nodePolyfills plugin
                // This provides browser equivalents for Node.js core modules
                // often used by crypto libraries within the SDK.
                nodePolyfills({
                    globals: {
                        Buffer: true, // Make Buffer globally available
                        process: true, // Provide a basic process polyfill
                        global: true,  // Provide a global polyfill
                    },
                    // You might uncomment the following if you encounter issues
                    // with specific modules, but start without it.
                    // protocolImports: true,
                }),
                // 3. Add the basicSsl plugin
                // This enables HTTPS for your local dev server (e.g., <https://localhost:5173>)
                // Recommended for reliable WalletConnect/Web Wallet connections.
                basicSsl(),
            ],
            // Optional: If facing build issues with specific large dependencies,
            // you might explore optimizeDeps options, but typically not needed initially.
        });

        ```

        - **Why Polyfills?** Libraries dealing with cryptography often rely on Node.js built-ins like `Buffer`. This plugin bridges that gap for the browser.
        - **Why SSL?** Modern web security practices and some wallet communication protocols (like WalletConnect) work best or exclusively over secure HTTPS connections.

**Phase 2: Integrating the MultiversX SDK into Your App**

1.  **Wrap Your Application with `DappProvider`:**
    The `DappProvider` is the root component from the MultiversX SDK. It initializes the SDK, manages the connection state, network configuration, and provides all the necessary context for hooks and components used elsewhere in your app. You should wrap your entire application (or at least the parts that need blockchain interaction) with it. Usually, this is done in `src/main.tsx` or `src/App.tsx`.
        ```tsx
        // src/main.tsx (Example - adapt if your structure differs)
        import React from "react";
        import ReactDOM from "react-dom/client";
        import App from "./App"; // Your main App component
        import "./index.css"; // Your global styles

        // 1. Import DappProvider and environment enum
        import { DappProvider } from "@multiversx/sdk-dapp/wrappers/DappProvider/DappProvider";
        import { EnvironmentsEnum } from "@multiversx/sdk-dapp/types";

        // 2. IMPORTANT: Get your WalletConnect Cloud Project ID
        // Go to: <https://cloud.walletconnect.com/> and create a project.
        // Replace the placeholder below with your actual ID.
        const walletConnectV2ProjectId = "YOUR_WALLETCONNECT_PROJECT_ID"; // <--- REPLACE THIS!

        ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
            <React.StrictMode>
                {/* 3. Wrap your App component */}
                <DappProvider
                    // 4. Set the target environment (devnet, testnet, or mainnet)
                    // Start with devnet for testing.
                    environment={EnvironmentsEnum.devnet}
                    // 5. Provide network configuration, especially the WC Project ID
                    customNetworkConfig={{
                        name: "customConfig", // Optional name
                        apiTimeout: 6000,     // Optional: API request timeout
                        walletConnectV2ProjectId: walletConnectV2ProjectId,
                        // You can add other overrides like:
                        // apiAddress: "...",
                        // proxyAddress: "...",
                    }}
                    // Optional: Add metadata about your dApp for wallet providers
                    // dappConfig={{
                    //   name: "My Awesome React dApp",
                    //   logo: "url/to/your/dapp_logo.png", // Optional logo URL
                    // }}
                >
                    <App />
                </DappProvider>
            </React.StrictMode>
        );

        ```

        - **`environment`**: Choose `devnet` for development, `testnet` for testing with public test infrastructure, or `mainnet` for the live network.
        - **`walletConnectV2ProjectId`**: This is **mandatory** for the xPortal App (WalletConnect) login to work reliably. Get your free ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).
        - **Placement:** `DappProvider` must be an ancestor of any component that uses MultiversX SDK hooks (`useGetLoginInfo`, `useGetAccountInfo`, etc.) or UI components.
2.  **Set Up Application Routing:**
    Use `react-router-dom` to define the navigation structure. You'll need at least: - A public route for users to log in (e.g., `/login`). - One or more private/protected routes accessible only after login (e.g., `/dashboard`). - A root route (`/`) that checks the login status and redirects appropriately.
        Create a file like `src/routes.tsx`:

        ```tsx
        // src/routes.tsx
        import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
        import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks/account/useGetIsLoggedIn";

        // --- Import Your Page Components ---
        // Assume you have these components created:
        // import LoginPage from './pages/Login';
        // import DashboardPage from './pages/Dashboard';
        // import NotFoundPage from './pages/NotFound'; // Optional
        // Assume you have layout components (optional but good practice):
        // import PublicLayout from './components/layouts/PublicLayout';
        // import ProtectedLayout from './components/layouts/ProtectedLayout';

        // --- Import the AuthGuard (You will create this next) ---
        import { AuthGuard } from "./components/AuthGuard";

        // --- Define Route Names (Best Practice) ---
        export const routeNames = {
            home: "/",
            dashboard: "/dashboard",
            login: "/login",
            // Add other routes as needed
        };

        // --- Helper Root Component for Redirect Logic ---
        const RootRedirect = () => {
            const isLoggedIn = useGetIsLoggedIn(); // Check login status
            // Redirect to dashboard if logged in, otherwise to login page
            return <Navigate to={isLoggedIn ? routeNames.dashboard : routeNames.login} replace />;
        };

        // --- Create Router ---
        export const router = createBrowserRouter([
            {
                path: routeNames.home, // Root path
                element: <RootRedirect />, // Handles initial redirection
            },
            {
                path: routeNames.login, // Login Page (Public)
                element: (
                    // Optional: Wrap with a layout
                    // <PublicLayout>
                        <LoginPage /> // Replace with your actual Login component
                    // </PublicLayout>
                ),
            },
            {
                // Protected Routes Area
                path: "/", // Use a base path or specific paths
                element: (
                    <AuthGuard> {/* This component protects its children */}
                        {/* Optional: Wrap protected pages with a specific layout */}
                        {/* <ProtectedLayout> */}
                            <Outlet /> {/* Renders nested matched routes (like Dashboard) */}
                        {/* </ProtectedLayout> */}
                    </AuthGuard>
                ),
                children: [
                    {
                        path: routeNames.dashboard, // Dashboard Page (Protected)
                        element: <DashboardPage />, // Replace with your actual Dashboard component
                    },
                    // Add other protected routes here
                    // { path: "/settings", element: <SettingsPage /> },
                ],
            },
            // Optional: Catch-all 404 Not Found route
            // {
            //  path: "*",
            //  element: <NotFoundPage />
            // }
        ]);

        // --- Make sure your main App component uses this router ---
        // src/App.tsx
        // import { RouterProvider } from 'react-router-dom';
        // import { router } from './routes';
        //
        // function App() {
        //   return <RouterProvider router={router} />;
        // }
        // export default App;

        ```

        - Replace placeholder components (`LoginPage`, `DashboardPage`, etc.) with your actual components.
        - The `AuthGuard` component (created next) is key to protecting routes.
        - `Outlet` from `react-router-dom` is used to render child routes within a layout or guarded section.

**Phase 3: Implementing Login/Logout Flow**

1.  **Create the Login Page Component (e.g., `src/pages/Login.tsx`):**
    This component will display the various MultiversX login buttons provided by the SDK.
        ```tsx
        // src/pages/Login.tsx
        import React from "react";
        import { useNavigate } from "react-router-dom";
        import { routeNames } from "../routes"; // Your defined route names

        // 1. Import Login Button UI Components from the SDK
        import {
            ExtensionLoginButton,
            WebWalletLoginButton, // Recommended for web wallet
            LedgerLoginButton,
            WalletConnectLoginButton,
        } from "@multiversx/sdk-dapp/UI";

        // Optional: Import prop types for better type safety
        import type {
            ExtensionLoginButtonPropsType,
            WebWalletLoginButtonPropsType,
            LedgerLoginButtonPropsType,
            WalletConnectLoginButtonPropsType,
        } from "@multiversx/sdk-dapp/UI";

        // Define a union type for common props (optional but helpful)
        type CommonLoginButtonPropsType =
            | ExtensionLoginButtonPropsType
            | WebWalletLoginButtonPropsType
            | LedgerLoginButtonPropsType
            | WalletConnectLoginButtonPropsType;

        const LoginPage: React.FC = () => {
            const navigate = useNavigate();

            // 2. Define common configuration for all login buttons
            const commonProps: CommonLoginButtonPropsType = {
                // This is the route *within your app* where the user is redirected
                // back to *after* successfully authenticating with their chosen wallet provider
                // (e.g., after scanning QR code in xPortal, confirming in Ledger).
                // The SDK processes the login information on this route.
                // IMPORTANT: Usually set this to your main authenticated route (e.g., dashboard).
                callbackRoute: routeNames.dashboard,

                // Use Native Auth for enhanced security (recommended).
                // This involves a server-signed token exchange.
                // It works client-side initially, but needs backend integration for full benefits.
                nativeAuth: true,

                // Optional: A function that runs *after* the SDK has processed the callbackRoute
                // and successfully established the login state within your application.
                // Use this for final redirects or triggering app-specific logic.
                onLoginRedirect: (callbackRouteUrl, { address }) => {
                    console.log("SDK Login successful for address:", address);
                    // You might not need explicit navigation if callbackRoute is correct,
                    // but it can be useful for complex flows or debugging.
                    navigate(callbackRouteUrl ?? routeNames.dashboard);
                },

                // Optional: Handle errors during the login initiation or callback processing
                // onLoginError: (error, callbackRouteUrl) => {
                //  console.error("Login failed:", error);
                //  // Show an error message to the user
                // }
            };

            return (
                // 3. Structure and style your login page
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '40px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: '50px auto' }}>
                    <h2>Welcome!</h2>
                    <p>Please log in using your MultiversX account:</p>

                    {/* 4. Render the SDK Login Button components */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                        {/* xPortal App (via WalletConnect) */}
                        <WalletConnectLoginButton
                            loginButtonText="Login with xPortal App"
                            {...commonProps} // Apply common configuration
                            // You can add specific props here if needed
                        />

                        {/* Ledger Hardware Wallet */}
                        <LedgerLoginButton
                            loginButtonText="Login with Ledger"
                            {...commonProps}
                        />

                        {/* MultiversX DeFi Wallet Extension */}
                        <ExtensionLoginButton
                            loginButtonText="Login with DeFi Wallet" // Or "Browser Extension"
                            {...commonProps}
                        />

                        {/* MultiversX Web Wallet */}
                        <WebWalletLoginButton
                            loginButtonText="Login with Web Wallet"
                            {...commonProps}
                        />
                    </div>
                </div>
            );
        };

        export default LoginPage; // Make sure to export

        ```

        - **Import Buttons:** Use the pre-built UI components from `@multiversx/sdk-dapp/UI`.
        - **`commonProps` Breakdown:**
            - `callbackRoute`: Crucial. The path within your app where the wallet provider redirects *back*. The SDK listens on this route to finalize the login. Set it to your intended destination after successful login (e.g., the dashboard).
            - `nativeAuth: true`: Strongly recommended for security.
            - `onLoginRedirect`: Your app's code that runs *after* the SDK confirms the login is successful (post-`callbackRoute` processing). Good for final navigation tweaks or setting app state.
        - **Render Buttons:** Place the button components in your JSX and pass the `commonProps`. Customize `loginButtonText` as desired.
2.  **Create an Authentication Guard (`AuthGuard.tsx`):**
    This is a wrapper component that prevents access to certain routes if the user is not logged in.
        ```tsx
        // src/components/AuthGuard.tsx
        import React, { PropsWithChildren } from "react";
        import { Navigate, useLocation } from "react-router-dom";
        import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks/account/useGetIsLoggedIn";
        import { routeNames } from "../routes"; // Your defined route names

        // PropsWithChildren allows the component to accept child elements
        export const AuthGuard = ({ children }: PropsWithChildren) => {
            // 1. Use the SDK hook to check the current login status
            const isLoggedIn = useGetIsLoggedIn();
            // const location = useLocation(); // Optional: Get current location

            // 2. Check if the user is logged IN
            if (isLoggedIn) {
                // If logged in, render the children components (the protected content)
                return <>{children}</>;
            }

            // 3. If NOT logged in, redirect to the login page
            // Optional: You could pass the intended destination via state
            // so the login page can redirect back after successful login.
            // return <Navigate to={routeNames.login} state={{ from: location }} replace />;
            return <Navigate to={routeNames.login} replace />; // Simple redirect to login
        };

        ```

        - **`useGetIsLoggedIn`:** The hook provides a boolean indicating the auth status managed by `DappProvider`.
        - **`<Navigate>`:** The `react-router-dom` component used for declarative redirection. `replace` avoids adding the guarded route to the browser history when redirecting away.
        - **Usage:** As shown in the `src/routes.tsx` example (Step 6), wrap the `element` or the parent route definition of your protected routes with `<AuthGuard>`.
3.  **Implement Logout Functionality:**
    Provide a button or link for users to log out. This typically lives in a navigation bar or user profile menu within protected areas of the app.
        ```tsx
        // Example within a Protected Layout or Navbar component
        import React from "react";
        import { useNavigate } from "react-router-dom";
        import { routeNames } from "../routes"; // Your route names
        // 1. Import the logout utility function
        import { logout } from "@multiversx/sdk-dapp/utils/logout";
        // 2. Import hook to get account info (optional, for display)
        import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account/useGetAccountInfo";

        const Navbar: React.FC = () => {
            const navigate = useNavigate();
            // Optional: Get logged-in user's address to display
            const { address } = useGetAccountInfo();

            // 3. Define the logout handler function
            const handleLogout = async () => {
                // 4. Call the SDK's logout function
                // Provide the route to redirect to *after* logout is complete
                await logout(routeNames.login); // Redirect to login page after logout

                // Note: The logout function handles clearing SDK state.
                // You might add app-specific state cleanup here if needed.

                // Explicit navigation usually not needed as logout handles it,
                // but can be used as a fallback.
                // navigate(routeNames.login);
            };

            return (
                <nav style={{ background: '#eee', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>My Protected App</span>
                    <div>
                        {address && (
                            <span style={{ marginRight: '15px', fontSize: '0.8em' }}>
                               {/* Display truncated address */}
                               {`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
                            </span>
                        )}
                        {/* 5. Add a Logout button */}
                        <button onClick={handleLogout} style={{ padding: '5px 10px' }}>
                            Logout
                        </button>
                    </div>
                </nav>
            );
        };

        export default Navbar;

        ```

        - **`logout()`:** Import and call this utility from `@multiversx/sdk-dapp/utils/logout`. Pass the desired redirect path (usually the login page) as the argument. It handles clearing the SDK's authentication state.
        - **`useGetAccountInfo`:** Useful for displaying the logged-in user's address or other details.

**Phase 4: Refinement & Testing**

1. **Build Protected Content:**
   Create the actual components and features that are protected by the `AuthGuard` (e.g., your `DashboardPage`). Inside these components, you can now securely use other SDK hooks like `useGetAccountInfo()`, `useGetNetworkConfig()`, or functions for signing transactions (`useSignTransactions()`, `useSignMessage()`).
2. **Styling:**
   Apply your application's CSS or styling framework (like Tailwind CSS, Material UI, Bootstrap, etc.) to the `LoginPage`, `Navbar`, layouts, and the login buttons themselves. The SDK's UI buttons are functional but have minimal default styling; you can target them with CSS selectors or pass `className` props for frameworks like Tailwind.
3. **Test Thoroughly:**
    - Run your development server: `yarn dev` or `npm run dev`. Remember to access it via **`https://localhost:PORT`** (where PORT is likely 5173 or similar) because you enabled SSL. Your browser might show a warning about the self-signed certificate – accept it for local development.
    - **Login Methods:** Test _each_ login button (xPortal QR, Ledger, Extension, Web Wallet) to ensure they initiate the correct flow. You'll need the corresponding apps/hardware/extensions installed.
    - **Redirects:** Verify that you are correctly redirected to the `callbackRoute` (e.g., dashboard) after a successful wallet authentication.
    - **Guard:** Try accessing a protected route (e.g., `/dashboard`) directly _without_ logging in. You should be redirected to `/login`.
    - **Session:** After logging in, refresh the page or navigate between protected routes. You should remain logged in.
    - **Logout:** Test the logout button. You should be redirected to the specified logout path (e.g., `/login`), and accessing protected routes should no longer be possible without logging in again.
    - **Console:** Keep your browser's developer console open to check for any errors reported by the SDK or your application.

---

This guide provides the foundational steps for implementing MultiversX authentication. As you build more complex features, refer to the official [MultiversX dApp SDK Documentation](https://docs.multiversx.com/sdk-and-tools/sdk-dapp/) for advanced topics like transaction signing, smart contract interactions, state management hooks, and further configuration options.
