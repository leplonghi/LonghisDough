# AI Rules for Dough Lab Pro

This document outlines the technical stack and guidelines for developing the Dough Lab Pro application.

## Tech Stack

*   **React**: The core library for building the user interface.
*   **TypeScript**: Used for type safety and improved code maintainability.
*   **Tailwind CSS**: The primary utility-first CSS framework for all styling.
*   **Vite**: The build tool used for a fast development experience and optimized production builds.
*   **Custom Routing**: The application currently uses a custom state-based system (`activePage`) for navigation between main sections.
*   **shadcn/ui & Radix UI**: A collection of re-usable components, built on Radix UI and styled with Tailwind CSS.
*   **lucide-react**: A library providing a set of beautiful and customizable SVG icons.
*   **html2canvas & jspdf**: Client-side libraries used for generating PDF exports of recipes.
*   **Custom i18n**: A custom implementation for internationalization and translation management.
*   **AdSense**: Integrated for displaying advertisements.

## Library Usage Rules

To maintain consistency and efficiency, please adhere to the following rules when developing:

*   **UI Components**:
    *   **Prioritize shadcn/ui and Radix UI**: Always check if a suitable component exists within the shadcn/ui library first.
    *   **New Components**: If a required component is not available in shadcn/ui or Radix UI, create a new, small, and focused component in `src/components/`.
    *   **No Editing shadcn/ui/Radix**: Do not modify the source files of shadcn/ui or Radix UI components directly. If a change is needed, create a new component that wraps or extends the existing one.
*   **Styling**:
    *   **Tailwind CSS Only**: All styling must be done using Tailwind CSS utility classes. Avoid custom CSS files or inline styles unless absolutely necessary for dynamic values.
    *   **Responsive Design**: Always ensure designs are responsive and work well across various screen sizes.
*   **Icons**:
    *   **lucide-react**: Use icons exclusively from the `lucide-react` library.
*   **Routing**:
    *   The application currently manages navigation using an `activePage` state in `App.tsx`. If more complex routing (e.g., nested routes, URL parameters) is required, `react-router-dom` should be introduced.
*   **State Management**:
    *   **React Hooks**: Utilize React's built-in hooks (`useState`, `useReducer`, `useContext`) for managing component and application state. Keep state management simple and localized where possible.
*   **Internationalization (i18n)**:
    *   **Custom i18n**: Use the existing `TranslationProvider` and `useTranslation` hook from `src/i18n.ts` for all text content that needs to be translated.
*   **PDF Generation**:
    *   **html2canvas & jspdf**: For any PDF export functionality, leverage the `html2canvas` and `jspdf` libraries already integrated into `index.html`.
*   **Dependencies**:
    *   **New Packages**: Before adding any new npm packages, consider if the functionality can be achieved with existing libraries or a small custom implementation. If a new package is essential, ensure it's lightweight and well-maintained.