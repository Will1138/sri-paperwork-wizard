# Deployment Guide - SRI Pte Ltd Transaction Paperwork Wizard

## Current Setup
- **App URL**: https://merry-buttercream-fab6a9.netlify.app/
- **Local Repo**: Git repository initialized
- **File**: `index.html` (78 KB, self-contained React SPA)

## Deployment Options (Choose One)

### Option 1: GitHub + Netlify (Recommended - Fastest)
Best for frequent updates and automated deployments.

**Steps:**
1. Create a GitHub account (if you don't have one) at https://github.com
2. Create a new public repository (e.g., "sri-paperwork-wizard")
3. Push your local repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/sri-paperwork-wizard.git
   git branch -M main
   git push -u origin main
   ```
4. In Netlify Dashboard:
   - Go to Site Settings → Connected Repositories
   - Connect your GitHub repository
   - Netlify will auto-deploy on every push

**Workflow after setup:**
```bash
# Make changes to index.html
# Then:
git add index.html
git commit -m "Fix: description of changes"
git push
# → Automatically deployed in ~1 minute
```

### Option 2: Netlify CLI (Fast, Local Control)
Good if you prefer command-line deployment.

**Setup:**
```bash
npm install -g netlify-cli
netlify login
netlify link  # Link to your existing site
```

**Deploy:**
```bash
netlify deploy --prod
```

### Option 3: Manual Drag & Drop (Slowest)
If you just want to update once:
1. Go to https://app.netlify.com
2. Find your site (merry-buttercream-fab6a9)
3. Drag and drop `index.html` in the deployment area

## Testing Workflow

**Local Testing (before deploying):**
```bash
# Simple Python server
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

**After Deployment:**
1. Test form filling with sample data
2. Download the filled .docx
3. Check in Word for:
   - ✓ No bold/underline on non-filled template text
   - ✓ No trailing underscores
   - ✓ Proper alignment
   - ✓ Letterhead not covered

## Recent Fixes
- **Fix 1**: Bold/underline no longer bleeds to prefix/suffix text
- **Fix 2**: Trailing underscores removed from both prefix and suffix
- Line 636: `rawPrefix.replace(/_+\s*$/, '')`
- Line 637: `rawSuffix.replace(/^_+\s*/, '')`
- Line 667: Suffix uses `<w:rPr></w:rPr>` (empty formatting)

## Troubleshooting

**If deployment fails:**
- Check Git status: `git status`
- View recent commits: `git log --oneline`
- Verify index.html syntax: Open in browser locally first

**If formatting issues persist:**
- Check the Word document XML for stray formatting tags
- Verify the regex patterns are matching the correct underscores
- Test with a simple HDB form first before complex agreements
