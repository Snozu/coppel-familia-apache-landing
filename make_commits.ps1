# Script to make multiple commits for project configuration

# 1. Commit Tailwind configuration
git add tailwind.config.js
git commit -m "Add Tailwind CSS configuration"

# 2. Commit CSS styles
git add src/styles/
git commit -m "Add CSS styles with Tailwind directives"

# 3. Commit layout files
git add src/layouts/
git commit -m "Add base layout with Tailwind CSS integration"

# 4. Commit component files
git add src/components/
git commit -m "Add component files for the landing page"

# 5. Commit data files
git add src/data/
git commit -m "Add data models for the landing page"

# 6. Commit Astro configuration
git add astro.config.mjs
git commit -m "Update Astro configuration with Tailwind CSS integration"

# 7. Commit package files
git add package.json package-lock.json
git commit -m "Update dependencies for Tailwind CSS"

# 8. Commit index page
git add src/pages/index.astro
git commit -m "Update index page with component structure"

# Show status after all commits
git status
