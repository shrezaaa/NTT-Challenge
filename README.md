# Blog Platform – Frontend Challenge

This project is an implementation of the **Frontend Challenge – Blog Platform** using **Angular 18** inside an **Nx monorepo**.  
It integrates with the **RealWorld API** for article data and demonstrates best practices in architecture, state management, styling, and testing.

---

## Tech Stack

- **[Nx](https://nx.dev/)** – Monorepo management  
- **[Angular 18](https://angular.dev/)** – Frontend framework  
- **[TailwindCSS](https://tailwindcss.com/)** – Utility-first CSS framework  
- **[Angular Material](https://material.angular.io/)** – UI component library  
- **RxJS** – Reactive programming  
- **Jasmine & Karma** – Unit testing  
- **Angular Service Worker** – PWA support  
- **Docker** – Containerized builds  

---

## Features

- **Articles List Page**
  - Responsive grid with TailwindCSS + Angular Material cards  
  - Displays articles with title, description, author, and tags  

- **Article Detail Page**
  - Full article content with description, body, and tags  
  - Author details displayed with avatar and bio  
  - Comments section with list of comments  
  - Clean responsive layout with Material + Tailwind  

- **Architecture**
  - Modular structure with **services, types (interfaces), and components**  
  - `ArticleService` handles API calls for list, details, and comments  
  - Unit tests for both **services** and **components**  

- **Progressive Web App (PWA)**
  - Added service worker configuration with Angular's `provideServiceWorker`  
  - Caches API calls for offline usage  
  - Provides fallback when offline  

- **Docker**
  - Dockerfile included for production builds with Nginx  
  - Supports deployment-ready container  

---

## Project Structure (relevant parts)

```
apps/
  challenge-app/
    src/
      app/
        components/
          articles-list/
          article-detail/
        services/
          article.service.ts
        types/
          article.type.ts
    ngsw-config.json
```

---

## Testing

- **Service tests** → Ensure `ArticleService` calls correct API endpoints  
- **Component tests** → Verify rendering of articles, detail view, and comments  

Run tests:

```bash
nx test challenge-app
```

---

## Setup & Run

### 1. Install dependencies
```bash
pnpm install
```

### 2. Run the app in dev mode
```bash
nx serve challenge-app
```

The app will be available at `http://localhost:4200`.

### 3. Build for production
```bash
nx build challenge-app --configuration=production
```

### 4. Run the production build locally
Instead of Docker, you can use [angular-http-server](https://www.npmjs.com/package/angular-http-server):

```bash
npx angular-http-server --path ./dist/apps/challenge-app/browser --port 4200
```

The app will be served at `http://localhost:4200` with service worker enabled.

---

## Decisions & Trade-offs

- **Nx Monorepo**  
  Chosen for scalability and modularity. It allows separation of concerns between apps and libs, enforces boundaries, and supports incremental builds.

- **TailwindCSS + Angular Material**  
  Combined both:  
  - Tailwind → quick utility-based responsive design.  
  - Angular Material → consistent UI components (cards, buttons, icons).  
  This provides both **flexibility** and **consistency**.

- **State Management**  
  Kept lightweight with **RxJS services** (instead of NgRx) since the app scope is limited to articles/comments. This reduces boilerplate while maintaining reactivity.  
  In a larger project, NgRx or Signals could be introduced.

- **API Limitations**  
  The public RealWorld API only has a few articles and limited write support. To still demonstrate pagination, trackBy, and lazy loading, the structure is in place even though the dataset is small.

- **Testing**  
  Focused on service isolation (ensuring API endpoints are correct) and component rendering (articles + comments). Used Angular testing utilities with mocks instead of hitting real API endpoints to ensure tests are deterministic.

- **PWA**  
  Added service worker support to cache static assets and article API requests. Provides offline fallback and improves performance.  

- **Docker**  
  Production Dockerfile included. Uses multi-stage build with Node and Nginx for a minimal, optimized image.  

---

## Notes

- Write operations (create/edit/delete) are **optional** in the challenge and may not work with the public API; the app focuses on **reading data (list, detail, comments)**.  
- Styling combines **Angular Material** (cards, icons, layout) with **TailwindCSS** (responsive grid, utility classes).  

---

## License

This project was created for the **Next Top Tech Frontend Challenge** and is provided as-is for evaluation purposes.
