const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building unified Trivia Israel deployment...\n');

// Paths - use resolve to get absolute paths
const websiteDir = path.resolve(__dirname, '..');
const dashboardDir = path.resolve(websiteDir, '..', 'Dashboard');
const buildDir = path.join(websiteDir, 'build');
const dashboardBuildDir = path.join(buildDir, 'dashboard');

console.log('📂 Paths:');
console.log(`   Website: ${websiteDir}`);
console.log(`   Dashboard: ${dashboardDir}\n`);

// Step 1: Build the website
console.log('📦 Building website...');
try {
    execSync('npm run build', {
        cwd: websiteDir,
        stdio: 'inherit',
        env: { ...process.env, CI: 'false' }
    });
    console.log('✅ Website built successfully\n');
} catch (error) {
    console.error('❌ Website build failed');
    process.exit(1);
}

// Step 2: Build the dashboard
console.log('📦 Building dashboard...');
try {
    // Check if dashboard directory exists
    if (!fs.existsSync(dashboardDir)) {
        throw new Error(`Dashboard directory not found: ${dashboardDir}`);
    }

    execSync('npm run build', {
        cwd: dashboardDir,
        stdio: 'inherit',
        env: {
            ...process.env,
            CI: 'false',
            NODE_OPTIONS: '--openssl-legacy-provider'
        }
    });
    console.log('✅ Dashboard built successfully\n');
} catch (error) {
    console.error('❌ Dashboard build failed');
    process.exit(1);
}

// Step 3: Copy dashboard build to website build/dashboard
console.log('📋 Copying dashboard to build/dashboard...');
try {
    const dashboardSource = path.join(dashboardDir, 'build');

    // Ensure dashboard build directory exists
    if (!fs.existsSync(dashboardSource)) {
        throw new Error('Dashboard build directory not found');
    }

    // Remove existing dashboard directory if it exists
    if (fs.existsSync(dashboardBuildDir)) {
        fs.removeSync(dashboardBuildDir);
    }

    // Copy dashboard build
    fs.copySync(dashboardSource, dashboardBuildDir);
    console.log('✅ Dashboard copied successfully\n');
} catch (error) {
    console.error('❌ Failed to copy dashboard:', error.message);
    process.exit(1);
}

// Step 4: Ensure app-ads.txt is in the build root
console.log('📋 Ensuring app-ads.txt is in build root...');
try {
    const appAdsSource = path.join(websiteDir, 'public', 'app-ads.txt');
    const appAdsDest = path.join(buildDir, 'app-ads.txt');

    if (fs.existsSync(appAdsSource)) {
        fs.copySync(appAdsSource, appAdsDest);
        console.log('✅ app-ads.txt copied successfully to build root\n');
    } else {
        console.warn('⚠️ app-ads.txt not found in public directory\n');
    }
} catch (error) {
    console.error('❌ Failed to copy app-ads.txt:', error.message);
    // Not exiting since this might be the first time it's added
}

console.log('🎉 Unified build complete!');
console.log('📁 Build directory structure:');
console.log('   build/');
console.log('   ├── index.html (website)');
console.log('   ├── static/ (website assets)');
console.log('   └── dashboard/');
console.log('       ├── index.html (dashboard)');
console.log('       └── static/ (dashboard assets)\n');
