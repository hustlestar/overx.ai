#!/usr/bin/env node

/**
 * Social Media Preview Checker
 * Crawls all sitemaps and checks for proper Open Graph and Twitter Card meta tags
 */

const https = require('https');
const http = require('http');
const { parse } = require('url');
const { JSDOM } = require('jsdom');

// Sites to check
const SITES = [
  { name: 'Main Site', url: 'https://overx.ai', sitemap: 'https://overx.ai/sitemap.xml' },
  { name: 'Blog Site', url: 'https://blog.overx.ai', sitemap: 'https://blog.overx.ai/sitemap.xml' },
  { name: 'Converter Site', url: 'https://rates.overx.ai', sitemap: 'https://rates.overx.ai/sitemap.xml' },
  { name: 'Words Site', url: 'https://words.overx.ai', sitemap: 'https://words.overx.ai/sitemap.xml' }
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

const REQUIRED_IMAGE_PROPERTIES = [
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
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Results storage
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: [],
  warnings: [],
  details: {}
};

/**
 * Fetch content from URL
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, { 
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Checker/1.0)'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${url}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Parse sitemap XML and extract URLs
 */
function parseSitemap(xml) {
  const urls = [];
  const urlMatches = xml.match(/<loc>(.*?)<\/loc>/g);
  
  if (urlMatches) {
    urlMatches.forEach(match => {
      const url = match.replace(/<\/?loc>/g, '');
      urls.push(url);
    });
  }
  
  return urls;
}

/**
 * Check meta tags on a page
 */
async function checkPage(url) {
  try {
    console.log(`  Checking: ${url}`);
    const html = await fetchUrl(url);
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const report = {
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
    
    // Check image properties if og:image exists
    if (report.og['og:image']) {
      REQUIRED_IMAGE_PROPERTIES.forEach(property => {
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
  } catch (error) {
    return {
      url,
      error: error.message
    };
  }
}

/**
 * Check all pages from a sitemap
 */
async function checkSitemap(site) {
  console.log(`\n${colors.cyan}Checking ${site.name}${colors.reset}`);
  console.log(`Sitemap: ${site.sitemap}`);
  
  try {
    // Fetch sitemap
    const sitemapXml = await fetchUrl(site.sitemap);
    const urls = parseSitemap(sitemapXml);
    
    console.log(`Found ${urls.length} URLs in sitemap\n`);
    
    const siteResults = {
      name: site.name,
      url: site.url,
      total: urls.length,
      passed: 0,
      failed: 0,
      warnings: 0,
      pages: []
    };
    
    // Check each page
    for (const url of urls) {
      const pageReport = await checkPage(url);
      siteResults.pages.push(pageReport);
      
      if (pageReport.error) {
        siteResults.failed++;
        console.log(`  ${colors.red}✗${colors.reset} Error: ${pageReport.error}`);
      } else {
        const hasAllOG = pageReport.missing.og.length === 0;
        const hasAllTwitter = pageReport.missing.twitter.length === 0;
        const hasImageProps = pageReport.missing.imageProps.length === 0;
        
        if (hasAllOG && hasAllTwitter) {
          siteResults.passed++;
          console.log(`  ${colors.green}✓${colors.reset} All social tags present`);
          
          if (!hasImageProps) {
            console.log(`    ${colors.yellow}⚠${colors.reset} Missing image properties: ${pageReport.missing.imageProps.join(', ')}`);
            siteResults.warnings++;
          }
        } else {
          siteResults.failed++;
          console.log(`  ${colors.red}✗${colors.reset} Missing tags:`);
          if (pageReport.missing.og.length > 0) {
            console.log(`    OG: ${pageReport.missing.og.join(', ')}`);
          }
          if (pageReport.missing.twitter.length > 0) {
            console.log(`    Twitter: ${pageReport.missing.twitter.join(', ')}`);
          }
        }
        
        if (pageReport.warnings.length > 0) {
          pageReport.warnings.forEach(warning => {
            console.log(`    ${colors.yellow}⚠${colors.reset} ${warning}`);
          });
        }
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return siteResults;
  } catch (error) {
    console.log(`${colors.red}Failed to fetch sitemap: ${error.message}${colors.reset}`);
    return {
      name: site.name,
      url: site.url,
      error: error.message
    };
  }
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
      
      const passRate = ((site.passed / site.total) * 100).toFixed(1);
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
      if (site.pages) {
        site.pages.forEach(page => {
          if (page.missing && (page.missing.og.length > 0 || page.missing.twitter.length > 0)) {
            console.log(`${page.url}:`);
            if (page.missing.og.length > 0) {
              console.log(`  Missing OG: ${page.missing.og.join(', ')}`);
            }
            if (page.missing.twitter.length > 0) {
              console.log(`  Missing Twitter: ${page.missing.twitter.join(', ')}`);
            }
          }
        });
      }
    });
  }
  
  // Save detailed report to JSON
  const reportPath = './social-preview-report.json';
  require('fs').writeFileSync(
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
async function main() {
  console.log(`${colors.cyan}Starting Social Media Preview Check...${colors.reset}`);
  console.log(`Checking ${SITES.length} sites for proper Open Graph and Twitter Card tags\n`);
  
  const allResults = [];
  
  // Check each site
  for (const site of SITES) {
    const siteResults = await checkSitemap(site);
    allResults.push(siteResults);
  }
  
  // Generate report
  const summary = generateReport(allResults);
  
  // Exit with appropriate code
  if (summary.totalFailed > 0) {
    console.log(`\n${colors.red}✗ Some pages are missing social media preview tags${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✓ All pages have proper social media preview tags!${colors.reset}`);
    process.exit(0);
  }
}

// Run the checker
main().catch(error => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});