# Deployment Guide

This guide explains how to deploy rahrt.me to GitHub Pages with a custom domain.

## Prerequisites

- GitHub repository with GitHub Pages enabled
- Custom domain (e.g., `rahrt.me`) with DNS access
- GitHub Actions enabled for the repository

## Step 1: Enable GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to **Pages** in the left sidebar
3. Under **Source**, select **GitHub Actions**
4. Save the settings

**Note:** The workflow will automatically enable GitHub Pages using the `enablement: true` parameter in the `configure-pages` action, so manual configuration may not be necessary.

## Step 2: Configure Custom Domain

### Option A: Using GitHub Pages Settings (Recommended)

1. In repository settings → **Pages**
2. Under **Custom domain**, enter your domain: `rahrt.me`
3. Check **Enforce HTTPS** (recommended)
4. GitHub will create a `CNAME` file automatically

### Option B: Manual CNAME File

If you prefer to manage the CNAME file manually:

1. Create a file named `CNAME` in the `public/` directory:

   ```
   rahrt.me
   ```

2. Commit and push:
   ```bash
   git add public/CNAME
   git commit -m "Add CNAME for custom domain"
   git push
   ```

## Step 3: Configure DNS

Configure your DNS records based on your domain provider:

### For Apex Domain (rahrt.me)

Add the following A records pointing to GitHub Pages IPs:

```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

### For WWW Subdomain (www.rahrt.me)

Add a CNAME record:

```
Type: CNAME
Name: www
Value: janek26.github.io
TTL: 3600
```

**Note:** Replace `janek26` with your GitHub username.

## Step 4: Verify Deployment

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Check the Actions tab to monitor deployment progress
4. Once deployed, visit `https://rahrt.me` (may take a few minutes for DNS propagation)

## Step 5: SSL Certificate

GitHub Pages automatically provisions SSL certificates via Let's Encrypt. After DNS propagation:

1. Go to repository settings → **Pages**
2. Enable **Enforce HTTPS**
3. Wait for the certificate to be issued (usually within 24 hours)

## Troubleshooting

### Site Not Loading

- **DNS Propagation**: Can take up to 48 hours. Check with `dig rahrt.me` or `nslookup rahrt.me`
- **GitHub Actions**: Ensure the workflow completed successfully
- **Custom Domain**: Verify CNAME file exists in the repository

### HTTPS Not Working

- Wait for GitHub to provision the SSL certificate (up to 24 hours)
- Ensure **Enforce HTTPS** is enabled in Pages settings
- Verify DNS records are correct

### Build Failures

- Check GitHub Actions logs for errors
- Ensure all dependencies are in `package.json`
- Verify `bun.lock` is committed

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build the site
bun run build

# The static files are in the `out/` directory
# You can upload these to any static hosting service
```

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions for Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)
