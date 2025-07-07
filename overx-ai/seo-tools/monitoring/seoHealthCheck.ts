import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

interface SEOIssue {
  type: 'error' | 'warning' | 'info'
  file: string
  message: string
  line?: number
}

interface SEOHealthReport {
  issues: SEOIssue[]
  stats: {
    totalPages: number
    pagesWithIssues: number
    errorCount: number
    warningCount: number
  }
  timestamp: string
}

export class SEOHealthChecker {
  private issues: SEOIssue[] = []
  private checkedFiles = new Set<string>()

  async checkDirectory(dir: string): Promise<SEOHealthReport> {
    this.issues = []
    this.checkedFiles.clear()

    const files = await glob('**/*.{ts,tsx,js,jsx}', {
      cwd: dir,
      ignore: ['node_modules/**', '**/api/**', '**/*.test.*', '**/*.spec.*']
    })

    for (const file of files) {
      await this.checkFile(path.join(dir, file))
    }

    const stats = {
      totalPages: this.checkedFiles.size,
      pagesWithIssues: new Set(this.issues.map(i => i.file)).size,
      errorCount: this.issues.filter(i => i.type === 'error').length,
      warningCount: this.issues.filter(i => i.type === 'warning').length
    }

    return {
      issues: this.issues,
      stats,
      timestamp: new Date().toISOString()
    }
  }

  private async checkFile(filePath: string): Promise<void> {
    const content = fs.readFileSync(filePath, 'utf-8')
    const fileName = path.basename(filePath)
    
    this.checkedFiles.add(filePath)

    // Check for missing meta tags
    if (this.isPageComponent(content)) {
      this.checkMetaTags(content, filePath)
      this.checkHeadingStructure(content, filePath)
      this.checkImages(content, filePath)
      this.checkLinks(content, filePath)
      this.checkStructuredData(content, filePath)
    }
  }

  private isPageComponent(content: string): boolean {
    return content.includes('export default function') && 
           (content.includes('return (') || content.includes('return <'))
  }

  private checkMetaTags(content: string, file: string): void {
    // Check for BaseSEO component usage
    if (!content.includes('BaseSEO') && !content.includes('Head')) {
      this.addIssue({
        type: 'error',
        file,
        message: 'Missing SEO component (BaseSEO or Head)'
      })
      return
    }

    // Check for title
    if (!content.includes('title=') && !content.includes('<title>')) {
      this.addIssue({
        type: 'error',
        file,
        message: 'Missing page title'
      })
    }

    // Check for description
    if (!content.includes('description=') && !content.includes('name="description"')) {
      this.addIssue({
        type: 'error',
        file,
        message: 'Missing meta description'
      })
    }

    // Check for canonical URL
    if (!content.includes('canonical=') && !content.includes('rel="canonical"')) {
      this.addIssue({
        type: 'warning',
        file,
        message: 'Missing canonical URL'
      })
    }

    // Check for Open Graph tags
    if (!content.includes('openGraph')) {
      this.addIssue({
        type: 'warning',
        file,
        message: 'Missing Open Graph tags'
      })
    }
  }

  private checkHeadingStructure(content: string, file: string): void {
    const h1Matches = content.match(/<h1[^>]*>/gi) || []
    const headingMatches = content.match(/<h[1-6][^>]*>/gi) || []

    if (h1Matches.length === 0) {
      this.addIssue({
        type: 'error',
        file,
        message: 'Missing H1 tag'
      })
    } else if (h1Matches.length > 1) {
      this.addIssue({
        type: 'error',
        file,
        message: `Multiple H1 tags found (${h1Matches.length})`
      })
    }

    // Check for proper heading hierarchy
    const headingLevels = headingMatches.map(h => 
      parseInt(h.match(/<h([1-6])/i)?.[1] || '0')
    ).filter(level => level > 0)

    for (let i = 1; i < headingLevels.length; i++) {
      if (headingLevels[i] > headingLevels[i-1] + 1) {
        this.addIssue({
          type: 'warning',
          file,
          message: `Heading hierarchy issue: H${headingLevels[i-1]} followed by H${headingLevels[i]}`
        })
        break
      }
    }
  }

  private checkImages(content: string, file: string): void {
    // Check for images without alt text
    const imageMatches = content.matchAll(/<(?:img|Image)[^>]*>/gi)
    
    for (const match of imageMatches) {
      const imgTag = match[0]
      if (!imgTag.includes('alt=')) {
        this.addIssue({
          type: 'error',
          file,
          message: 'Image missing alt text',
          line: this.getLineNumber(content, match.index || 0)
        })
      }

      // Check for optimized image component usage
      if (imgTag.includes('<img') && !imgTag.includes('OptimizedImage')) {
        this.addIssue({
          type: 'warning',
          file,
          message: 'Using native img tag instead of OptimizedImage component',
          line: this.getLineNumber(content, match.index || 0)
        })
      }
    }
  }

  private checkLinks(content: string, file: string): void {
    // Check for external links without rel attributes
    const linkMatches = content.matchAll(/<a\s+[^>]*href=["']https?:\/\/[^"']+["'][^>]*>/gi)
    
    for (const match of linkMatches) {
      const linkTag = match[0]
      if (!linkTag.includes('rel=')) {
        this.addIssue({
          type: 'warning',
          file,
          message: 'External link missing rel attribute',
          line: this.getLineNumber(content, match.index || 0)
        })
      }
    }

    // Check for SmartLink usage
    if (content.includes('<Link') && !content.includes('SmartLink')) {
      this.addIssue({
        type: 'info',
        file,
        message: 'Consider using SmartLink component for better SEO tracking'
      })
    }
  }

  private checkStructuredData(content: string, file: string): void {
    if (!content.includes('structuredData') && !content.includes('application/ld+json')) {
      this.addIssue({
        type: 'warning',
        file,
        message: 'Missing structured data (JSON-LD)'
      })
    }
  }

  private getLineNumber(content: string, index: number): number {
    return content.substring(0, index).split('\n').length
  }

  private addIssue(issue: SEOIssue): void {
    this.issues.push(issue)
  }

  generateReport(report: SEOHealthReport): string {
    let output = `SEO Health Check Report\n`
    output += `Generated: ${report.timestamp}\n`
    output += `${'='.repeat(50)}\n\n`

    output += `Summary:\n`
    output += `- Total Pages Checked: ${report.stats.totalPages}\n`
    output += `- Pages with Issues: ${report.stats.pagesWithIssues}\n`
    output += `- Errors: ${report.stats.errorCount}\n`
    output += `- Warnings: ${report.stats.warningCount}\n\n`

    if (report.issues.length === 0) {
      output += `✅ No SEO issues found!\n`
    } else {
      output += `Issues Found:\n`
      output += `${'='.repeat(50)}\n\n`

      const groupedIssues = this.groupIssuesByFile(report.issues)
      
      for (const [file, issues] of Object.entries(groupedIssues)) {
        output += `📄 ${file}\n`
        for (const issue of issues) {
          const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️'
          output += `   ${icon} ${issue.message}`
          if (issue.line) {
            output += ` (line ${issue.line})`
          }
          output += '\n'
        }
        output += '\n'
      }
    }

    return output
  }

  private groupIssuesByFile(issues: SEOIssue[]): Record<string, SEOIssue[]> {
    return issues.reduce((acc, issue) => {
      if (!acc[issue.file]) {
        acc[issue.file] = []
      }
      acc[issue.file].push(issue)
      return acc
    }, {} as Record<string, SEOIssue[]>)
  }
}