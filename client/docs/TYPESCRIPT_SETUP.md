# Enabling TypeScript in Suvidha

The project is currently set up for JavaScript, but Next.js makes it easy to incrementally adopt TypeScript.

## Steps to Enable TypeScript

1.  **Create a `tsconfig.json` file**:
    Running `npm run dev` or `npx next dev` with an empty `tsconfig.json` will automatically configure it.
    ```bash
    touch tsconfig.json
    npm run dev
    ```
    Next.js will detect the file and guide you to install necessary packages.

2.  **Install Dependencies**:
    You will likely need the following type definitions:
    ```bash
    npm install --save-dev typescript @types/react @types/node @types/react-dom
    ```

3.  **Rename Files**:
    You can now rename any `.js` file to `.tsx` (for React components) or `.ts` (for logic) and start using TypeScript features.
    
    *Example*: Rename `client/src/components/ui/SterlingGateKineticNavigation.js` to `SterlingGateKineticNavigation.tsx`.

4.  **Restart Server**:
    Restart your development server to pick up the changes.

## Sterling Gate Component
The `SterlingGateKineticNavigation` component was originally written in TypeScript. If you enable TS, you can revert the file extension to `.tsx` and restore the type definitions (e.g., `useRef<HTMLDivElement>(null)`).
