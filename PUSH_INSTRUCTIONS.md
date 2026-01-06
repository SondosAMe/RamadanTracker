# Push Instructions

Your code is committed locally. To push to GitHub, you need to authenticate.

## Option 1: Personal Access Token (Easiest)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: "Ramadan Tracker"
4. Select scope: **repo** (check the box)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

Then run this command (replace YOUR_TOKEN with your actual token):

```bash
git push -u origin main
```

When prompted:
- Username: `SondosAMe`
- Password: **Paste your token** (not your GitHub password)

## Option 2: GitHub CLI (Alternative)

If you have GitHub CLI installed:

```bash
gh auth login
git push -u origin main
```

## Option 3: GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. File → Add Local Repository
4. Select this folder
5. Click "Publish repository"

## After Pushing

Once pushed, go to your repository settings:
1. Go to: https://github.com/SondosAMe/RamadanTracker/settings/pages
2. Under "Source", select:
   - Branch: `gh-pages` or `main`
   - Folder: `/ (root)`
3. Click "Save"

The GitHub Actions workflow will automatically deploy your app!

Your app will be live at: **https://sondosame.github.io/RamadanTracker/**

