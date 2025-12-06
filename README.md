# Doodle Blast

A modern, dynamic e-commerce application built with Next.js 15, Sanity CMS, and Stripe.

## 🚀 Features

-   **Modern UI/UX**: Built with Tailwind CSS v4, Framer Motion, and Radix UI for a responsive and animated user experience.
-   **E-commerce Functionality**:
    -   Product browsing by category, brand, and deals.
    -   Detailed product pages with reviews and specifications.
    -   Shopping Cart and Checkout process (integrated with Stripe).
    -   Order history and tracking.
    -   Wishlist/Favorites functionality.
    -   **Automatic Invoicing**: PDF invoice generation for orders.
-   **Content Management**: Fully dynamic content managed via Sanity Studio.
    -   Products, Categories, and Brands.
    -   Blog posts.
    -   Deals and Promotions.
-   **Authentication**: Secure user authentication using Clerk.
-   **AI Integration**: Features powered by Google Generative AI.
-   **Search & Filtering**: Advanced product filtering and search capabilities.
-   **Responsive Design**: Optimized for all devices (Desktop, Tablet, Mobile).

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), `tailwindcss-animate`, `styled-components`
-   **CMS**: [Sanity](https://www.sanity.io/)
-   **Auth**: [Clerk](https://clerk.com/)
-   **Payments**: [Stripe](https://stripe.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **AI**: [Google Generative AI](https://ai.google.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/), React Icons
-   **Utilities**: Dayjs, PDFKit, Nodemailer

## 📦 Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd doodle-blast
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the root directory and add the following variables:

    ```env
    # Sanity
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
    NEXT_PUBLIC_SANITY_DATASET=production
    NEXT_PUBLIC_SANITY_API_VERSION=2025-03-20

    # Clerk Auth
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key

    # Stripe
    STRIPE_SECRET_KEY=your_stripe_secret_key
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    
    # Google AI
    GOOGLE_GENERATIVE_AI_API_KEY=your_api_key

    # Other
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎛️ Sanity Studio

To manage content, access the Sanity Studio at `/studio` (e.g., [http://localhost:3000/studio](http://localhost:3000/studio)).

## 📜 Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm start`: Starts the production server.
-   `npm run lint`: Runs ESLint.
-   `npm run typegen`: Generates TypeScript types from Sanity schemas.

## 📄 License

[MIT](LICENSE)
