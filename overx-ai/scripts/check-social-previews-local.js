#!/usr/bin/env node

/**
 * Local Social Media Preview Checker
 * Checks built HTML files for proper Open Graph and Twitter Card meta tags
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Sites to check with their build output directories
const SITES = [
  { 
    name: 'Main Site', 
    buildDir: path.join(__dirname, '../sites/main/.next/server/pages'),
    domain: 'https://overx.ai'
  },
  { 
    name: 'Blog Site', 
    buildDir: path.join(__dirname, '../sites/blog/.next/server/pages'),
    domain: 'https://blog.overx.ai'
  },
  { 
    name: 'Converter Site', 
    buildDir: path.join(__dirname, '../sites/converter/.next/server/pages'),
    domain: 'https://rates.overx.ai'
  },
  { 
    name: 'Words Site', 
    buildDir: path.join(__dirname, '../sites/words/.next/server/pages'),
    domain: 'https://words.overx.ai'
  }
];

// Required meta tags for social previews
const REQUIRED_OG_TAGS = [
  'og:title',
  'og:description',
  'og:image',
  'og:url',
  'og:type',
  'og:site_name'
];

const REQUIRED_TWITTER_TAGS = [
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image'
];

const RECOMMENDED_IMAGE_PROPERTIES = [
  'og:image:width',
  'og:image:height',
  'og:image:alt'
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * Find all HTML files in a directory recursively
 */
function findHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and hidden directories
      if (!item.startsWith('.') && item !== 'node_modules') {
        findHtmlFiles(fullPath, files);
      }
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Check meta tags in an HTML file
 */
function checkHtmlFile(filePath, siteName, domain) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  // Generate URL from file path
  const relativePath = path.relative(path.dirname(filePath), filePath)
    .replace(/\.html$/, '')
    .replace(/index$/, '');
  const url = `${domain}${relativePath ? '/' + relativePath : ''}`;
  
  const report = {
    file: filePath,
    url,
    og: {},
    twitter: {},
    missing: {
      og: [],
      twitter: [],
      imageProps: []
    },
    warnings: []
  };
  
  // Check Open Graph tags
  REQUIRED_OG_TAGS.forEach(property => {
    const meta = document.querySelector(`meta[property="${property}"]`);
    if (meta) {
      report.og[property] = meta.getAttribute('content');
    } else {
      report.missing.og.push(property);
    }
  });
  
  // Check Twitter Card tags
  REQUIRED_TWITTER_TAGS.forEach(name => {
    const meta = document.querySelector(`meta[name="${name}"]`);
    if (meta) {
      report.twitter[name] = meta.getAttribute('content');
    } else {
      report.missing.twitter.push(name);
    }
  });
  
  // Check recommended image properties
  if (report.og['og:image']) {
    RECOMMENDED_IMAGE_PROPERTIES.forEach(property => {
      const meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        report.missing.imageProps.push(property);
      } else {
        report.og[property] = meta.getAttribute('content');
      }
    });
  }
  
  // Check for canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    report.canonical = canonical.getAttribute('href');
  } else {
    report.warnings.push('Missing canonical URL');
  }
  
  // Check title tag
  const title = document.querySelector('title');
  if (title) {
    report.title = title.textContent;
  } else {
    report.warnings.push('Missing title tag');
  }
  
  // Check meta description
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    report.description = description.getAttribute('content');
  } else {
    report.warnings.push('Missing meta description');
  }
  
  return report;
}

/**
 * Check all pages for a site
 */
function checkSite(site) {
  console.log(`\n${colors.cyan}Checking ${site.name}${colors.reset}`);
  console.log(`Build directory: ${site.buildDir}`);
  
  if (!fs.existsSync(site.buildDir)) {
    console.log(`${colors.yellow}Build directory not found. Run 'npm run build' for this site first.${colors.reset}`);
    return {
      name: site.name,
      error: 'Build directory not found'
    };
  }
  
  const htmlFiles = findHtmlFiles(site.buildDir);
  console.log(`Found ${htmlFiles.length} HTML files\n`);
  
  const siteResults = {
    name: site.name,
    domain: site.domain,
    total: htmlFiles.length,
    passed: 0,
    failed: 0,
    warnings: 0,
    pages: []
  };
  
  // Check each HTML file
  for (const file of htmlFiles) {
    // Skip API routes and special Next.js pages
    if (file.includes('/_') || file.includes('/api/')) {
      continue;
    }
    
    const pageReport = checkHtmlFile(file, site.name, site.domain);
    siteResults.pages.push(pageReport);
    
    const fileName = path.relative(site.buildDir, file);
    
    const hasAllOG = pageReport.missing.og.length === 0;
    const hasAllTwitter = pageReport.missing.twitter.length === 0;
    const hasImageProps = pageReport.missing.imageProps.length === 0;
    
    if (hasAllOG && hasAllTwitter) {
      siteResults.passed++;
      console.log(`  ${colors.green}✓${colors.reset} ${fileName}`);
      
      if (!hasImageProps && pageReport.missing.imageProps.length > 0) {
        console.log(`    ${colors.yellow}⚠${colors.reset} Missing recommended: ${pageReport.missing.imageProps.join(', ')}`);
        siteResults.warnings++;
      }
    } else {
      siteResults.failed++;
      console.log(`  ${colors.red}✗${colors.reset} ${fileName}`);
      if (pageReport.missing.og.length > 0) {
        console.log(`    Missing OG: ${pageReport.missing.og.join(', ')}`);
      }
      if (pageReport.missing.twitter.length > 0) {
        console.log(`    Missing Twitter: ${pageReport.missing.twitter.join(', ')}`);
      }
    }
    
    if (pageReport.warnings.length > 0) {
      pageReport.warnings.forEach(warning => {
        console.log(`    ${colors.yellow}⚠${colors.reset} ${warning}`);
      });
    }
  }
  
  return siteResults;
}

/**
 * Generate final report
 */
function generateReport(allResults) {
  console.log('\n' + '='.repeat(80));
  console.log(`${colors.cyan}SOCIAL MEDIA PREVIEW CHECK REPORT${colors.reset}`);
  console.log('='.repeat(80) + '\n');
  
  let totalPages = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  let totalWarnings = 0;
  
  // Summary by site
  console.log(`${colors.blue}Site Summary:${colors.reset}`);
  allResults.forEach(site => {
    if (site.error) {
      console.log(`\n${site.name}: ${colors.red}ERROR - ${site.error}${colors.reset}`);
    } else {
      totalPages += site.total;
      totalPassed += site.passed;
      totalFailed += site.failed;
      totalWarnings += site.warnings;
      
      const passRate = site.total > 0 ? ((site.passed / site.total) * 100).toFixed(1) : 0;
      const statusColor = site.failed === 0 ? colors.green : colors.red;
      
      console.log(`\n${site.name}:`);
      console.log(`  Total Pages: ${site.total}`);
      console.log(`  ${colors.green}Passed: ${site.passed}${colors.reset}`);
      console.log(`  ${colors.red}Failed: ${site.failed}${colors.reset}`);
      console.log(`  ${colors.yellow}Warnings: ${site.warnings}${colors.reset}`);
      console.log(`  Pass Rate: ${statusColor}${passRate}%${colors.reset}`);
    }
  });
  
  // Overall summary
  console.log('\n' + '-'.repeat(80));
  console.log(`${colors.blue}Overall Summary:${colors.reset}`);
  console.log(`Total Pages Checked: ${totalPages}`);
  console.log(`${colors.green}Total Passed: ${totalPassed}${colors.reset}`);
  console.log(`${colors.red}Total Failed: ${totalFailed}${colors.reset}`);
  console.log(`${colors.yellow}Total Warnings: ${totalWarnings}${colors.reset}`);
  
  const overallPassRate = totalPages > 0 ? ((totalPassed / totalPages) * 100).toFixed(1) : 0;
  const overallColor = totalFailed === 0 ? colors.green : colors.red;
  console.log(`Overall Pass Rate: ${overallColor}${overallPassRate}%${colors.reset}`);
  
  // List failed pages
  if (totalFailed > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log(`${colors.red}Failed Pages (Missing Required Tags):${colors.reset}\n`);
    
    allResults.forEach(site => {
      if (site.pages && !site.error) {
        const failedPages = site.pages.filter(page => 
          page.missing.og.length > 0 || page.missing.twitter.length > 0
        );
        
        if (failedPages.length > 0) {
          console.log(`\n${colors.yellow}${site.name}:${colors.reset}`);
          failedPages.forEach(page => {
            const fileName = path.basename(page.file);
            console.log(`  ${fileName}:`);
            if (page.missing.og.length > 0) {
              console.log(`    Missing OG: ${page.missing.og.join(', ')}`);
            }
            if (page.missing.twitter.length > 0) {
              console.log(`    Missing Twitter: ${page.missing.twitter.join(', ')}`);
            }
          });
        }
      }
    });
  }
  
  // Save detailed report to JSON
  const reportPath = path.join(__dirname, 'social-preview-report.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify(allResults, null, 2)
  );
  console.log(`\n${colors.cyan}Detailed report saved to: ${reportPath}${colors.reset}`);
  
  return {
    totalPages,
    totalPassed,
    totalFailed,
    totalWarnings,
    passRate: overallPassRate
  };
}

/**
 * Main execution
 */
function main() {
  console.log(`${colors.cyan}Starting Local Social Media Preview Check...${colors.reset}`);
  console.log(`Checking ${SITES.length} sites for proper Open Graph and Twitter Card tags\n`);
  
  const allResults = [];
  
  // Check each site
  for (const site of SITES) {
    const siteResults = checkSite(site);
    allResults.push(siteResults);
  }
  
  // Generate report
  const summary = generateReport(allResults);
  
  // Exit with appropriate code
  if (summary.totalFailed > 0) {
    console.log(`\n${colors.red}✗ Some pages are missing social media preview tags${colors.reset}`);
    console.log(`${colors.yellow}Run 'npm run build' for each site, then re-run this script.${colors.reset}`);
    process.exit(1);
  } else if (summary.totalPages === 0) {
    console.log(`\n${colors.yellow}⚠ No pages found. Run 'npm run build' for each site first.${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✓ All pages have proper social media preview tags!${colors.reset}`);
    process.exit(0);
  }
}

// Run the checker
main();