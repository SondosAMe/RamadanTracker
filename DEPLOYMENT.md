# Deploying Ramadan Tracker to GitHub Pages

This guide will walk you through deploying the Ramadan Tracker app to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Node.js installed (for local testing)

## Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Name your repository (e.g., `ramadan-tracker` or `RamadanTracker`)
4. Choose **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### 2. Initialize Git and Push Code

Open your terminal/command prompt in the project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Ramadan Tracker PWA"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Deploy from a branch**
   - Branch: **gh-pages** (or **main** if you prefer)
   - Folder: **/ (root)**
5. Click **Save**

### 4. Update Vite Config for Your Repository Name

If your repository is NOT named `RamadanTracker`, you need to update the base path:

1. Open `vite.config.js`
2. Find the `base:` line
3. If your repo is `ramadan-tracker`, change it to:
   ```javascript
   base: '/ramadan-tracker/'
   ```
   Or if it's a user/organization page (username.github.io), use:
   ```javascript
   base: '/'
   ```

### 5. Trigger GitHub Actions Deployment

The GitHub Actions workflow will automatically deploy when you push to the `main` branch. 

**Option A: Automatic (Recommended)**
- Just push any new commit to `main` branch
- The workflow will automatically build and deploy

**Option B: Manual Trigger**
1. Go to your repository on GitHub
2. Click on **Actions** tab
3. Select **"Deploy to GitHub Pages"** workflow
4. Click **"Run workflow"** → **"Run workflow"**

### 6. Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You'll see the workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Once done, you'll see a green checkmark ✓

### 7. Access Your Deployed App

Your app will be available at:
- **Project page**: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
- **User page**: `https://YOUR_USERNAME.github.io/` (if using username.github.io repo)

## Troubleshooting

### Build Fails
- Check the **Actions** tab for error messages
- Make sure all dependencies are in `package.json`
- Verify Node.js version in workflow (currently set to 20)

### 404 Errors on Routes
- Make sure the `base` path in `vite.config.js` matches your repository name
- Check that `public/404.html` exists (it should redirect to index.html)

### App Not Loading
- Clear browser cache
- Check browser console for errors
- Verify the build completed successfully in Actions

### Update Deployment
Simply push new changes to the `main` branch:
```bash
git add .
git commit -m "Your update message"
git push
```

The workflow will automatically rebuild and redeploy.

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain:
   ```
   yourdomain.com
   ```

2. Update your DNS settings to point to GitHub Pages
3. In GitHub Pages settings, add your custom domain

## Notes

- The app uses localStorage, so data is stored in the user's browser
- The PWA will work offline after first visit
- Prayer times are fetched from Aladhan API (requires internet)
- All data is stored locally - no backend needed!

