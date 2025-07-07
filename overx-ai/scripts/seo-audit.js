const { SEOHealthChecker } = require('../seo-tools/monitoring/seoHealthCheck')
const path = require('path')
const fs = require('fs')

async function runSEOAudit() {
  console.log('🔍 Running SEO health check...\n')

  const checker = new SEOHealthChecker()
  
  // Check main site
  console.log('Checking main site...')
  const mainReport = await checker.checkDirectory(
    path.join(__dirname, '../sites/main/src')
  )
  
  // Check blog site
  console.log('Checking blog site...')
  const blogReport = await checker.checkDirectory(
    path.join(__dirname, '../sites/blog/src')
  )

  // Generate combined report
  const combinedReport = {
    issues: [...mainReport.issues, ...blogReport.issues],
    stats: {
      totalPages: mainReport.stats.totalPages + blogReport.stats.totalPages,
      pagesWithIssues: mainReport.stats.pagesWithIssues + blogReport.stats.pagesWithIssues,
      errorCount: mainReport.stats.errorCount + blogReport.stats.errorCount,
      warningCount: mainReport.stats.warningCount + blogReport.stats.warningCount
    },
    timestamp: new Date().toISOString()
  }

  const reportText = checker.generateReport(combinedReport)
  console.log(reportText)

  // Save report to file
  const reportDir = path.join(__dirname, '../seo-reports')
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true })
  }

  const reportPath = path.join(
    reportDir, 
    `seo-report-${new Date().toISOString().split('T')[0]}.txt`
  )
  fs.writeFileSync(reportPath, reportText)
  console.log(`\n📄 Report saved to: ${reportPath}`)

  // Exit with error code if critical issues found
  if (combinedReport.stats.errorCount > 0) {
    console.error('\n❌ SEO audit failed with errors!')
    process.exit(1)
  } else if (combinedReport.stats.warningCount > 0) {
    console.warn('\n⚠️  SEO audit completed with warnings')
  } else {
    console.log('\n✅ SEO audit passed!')
  }
}

runSEOAudit().catch(console.error)