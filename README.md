# Vanilla-TS-Framework
SNHU Portfolio website for my bachelors in CS

# Uncle Jose's T-Shirt Shop

This project was developed by Jose Martinez as part of the Computer Science Bachelor's program at Southern New Hampshire University (SNHU).

## Project Overview

Uncle Jose's T-Shirt Shop is a simple e-commerce website built with Vanilla JavaScript, HTML, CSS, and TypeScript. It showcases a list of t-shirts, provides an about page, and simulates a shopping cart experience. The site is implemented with a single page application (SPA) structure, using a custom routing solution to navigate between different views.

## Key Features

- **Custom Routing**: A custom routing solution is implemented using the browser's `hashchange` event. This enables navigation between different views without a full page reload, providing a seamless user experience typical of a Single Page Application (SPA).
- **TypeScript**: The project is developed with TypeScript to provide static typing, which improves the development experience through features like autocompletion and compile-time error checking.
- **Modular Structure**: The application is structured in a modular way, with each component and page isolated in its own module. This ensures maintainability and scalability.
- **Fake Store API**: The application uses the Fake Store API to fetch product data, simulating the experience of fetching and displaying data from a real back-end service.

## Project Structure

The main directories in the project are:

- `src`: Contains the TypeScript source code.
  - `components`: Contains reusable UI components such as the header, navbar, and footer.
  - `pages`: Contains the different views of the application (home, about, and cart).
  - `hooks`: Contains the custom router hook.
  - `api`: Contains the service to fetch data from the Fake Store API.
- `public`: Contains static assets such as images.
- `styles`: Contains CSS styles.

## Running the Project

To run the project locally, you can use the Vite development server by running:

```zsh
npm run dev
# OR
pnpm run dev
```
