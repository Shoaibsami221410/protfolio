# Shoaib Sami - Portfolio

A production-ready, futuristic personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Next.js App Router**: Server and client components optimized for performance.
- **Data-Driven Content**: Manage projects, experience, skills, and profile via simple data files.
- **Dynamic Routing**: Automatic page generation for all projects.
- **Responsive Design**: Tailored experiences across mobile, tablet, and desktop.
- **Futuristic UI**: Dark theme, purple gradients, and elegant animations.
- **Contact Form**: Functional form with Zod validation.

## Content Editing

All content is managed through the `src/lib/data` directory. You do not need to modify UI components to update your information.

### 1. Adding/Editing a Project

Open `src/lib/data/projects.ts` and add a new object to the `projects` array:

```typescript
{
  slug: "my-new-project",
  title: "My New Project",
  shortDescription: "A brief summary...",
  description: "A more detailed explanation...",
  category: "AI / ML",
  year: "2024",
  status: "Completed",
  technologies: ["React", "Python"],
  image: "/projects/my-new-project.webp",
  github: "https://github.com/...",
  liveUrl: "https://...",
  featured: true,
  // Optional details for the dynamic page:
  problem: "The problem it solves...",
  solution: "How it solves it...",
  features: ["Feature 1", "Feature 2"],
}
```

Once added, the project will automatically appear in the Projects section, and a new dynamic page `/projects/my-new-project` will be generated.

### 2. Updating Profile Information

Edit `src/lib/data/profile.ts` to change your name, bio, and about section.

### 3. Updating Experience

Edit `src/lib/data/experience.ts` to add or modify work history and roles.

### 4. Updating Skills & Education

Modify `src/lib/data/skills.ts` and `src/lib/data/education.ts` respectively.

### 5. Changing Social Links

Update `src/lib/data/socials.ts`. You can import other generic icons from `lucide-react` to represent different platforms if needed.

### 6. Replacing Images

Place your project images in the `public/projects/` directory. If an image path specified in `projects.ts` (e.g., `/projects/my-project.webp`) is not found, a clean placeholder will be displayed automatically.

### 7. Configuring the Contact Form

The contact form logic is located in `src/app/actions/contact.ts`.
By default, it simulates network latency. To receive real emails:
1. Create an account on [Resend](https://resend.com)
2. Obtain your API key.
3. Rename `.env.example` to `.env.local` and add your API key:
   `RESEND_API_KEY=re_your_key_here`
4. Uncomment the Resend logic in `src/app/actions/contact.ts` and configure your sender/receiver email addresses.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Log in to Vercel and click "Add New Project".
3. Import your GitHub repository.
4. Add your Environment Variables (e.g., `RESEND_API_KEY`) in the project settings.
5. Click "Deploy".
