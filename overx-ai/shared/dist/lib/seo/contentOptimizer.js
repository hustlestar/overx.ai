"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentOptimizer = void 0;
class ContentOptimizer {
    analyzeTitle(title, targetKeyword) {
        const suggestions = [];
        const issues = [];
        let score = 100;
        // Length check
        if (title.length > 60) {
            issues.push(`Title is ${title.length} characters (recommended: 50-60)`);
            score -= 10;
        }
        else if (title.length < 30) {
            issues.push(`Title is too short (${title.length} characters)`);
            score -= 15;
        }
        // Keyword presence
        if (targetKeyword && !title.toLowerCase().includes(targetKeyword.toLowerCase())) {
            issues.push('Target keyword not found in title');
            score -= 20;
        }
        // Power words check
        const powerWords = ['best', 'guide', 'how to', 'tips', 'ultimate', 'complete'];
        const hasPowerWord = powerWords.some(word => title.toLowerCase().includes(word.toLowerCase()));
        if (!hasPowerWord) {
            suggestions.push('Consider adding power words like "Best", "Guide", or "How to"');
        }
        // Number check
        const hasNumber = /\d/.test(title);
        if (!hasNumber) {
            suggestions.push('Consider adding numbers (e.g., "5 Tips", "2024 Guide")');
        }
        return { score: Math.max(0, score), suggestions, issues };
    }
    analyzeMetaDescription(description, targetKeyword) {
        const suggestions = [];
        const issues = [];
        let score = 100;
        // Length check
        if (description.length > 160) {
            issues.push(`Description is ${description.length} characters (recommended: 150-160)`);
            score -= 10;
        }
        else if (description.length < 120) {
            issues.push(`Description is too short (${description.length} characters)`);
            score -= 15;
        }
        // Keyword presence
        if (targetKeyword && !description.toLowerCase().includes(targetKeyword.toLowerCase())) {
            issues.push('Target keyword not found in meta description');
            score -= 15;
        }
        // Call to action check
        const ctaWords = ['learn', 'discover', 'find out', 'get', 'read'];
        const hasCTA = ctaWords.some(word => description.toLowerCase().includes(word.toLowerCase()));
        if (!hasCTA) {
            suggestions.push('Add a call-to-action like "Learn more" or "Discover how"');
        }
        // Duplicate content check
        const words = description.toLowerCase().split(' ');
        const uniqueWords = new Set(words);
        if (words.length > 10 && uniqueWords.size / words.length < 0.7) {
            issues.push('Too many repeated words');
            score -= 10;
        }
        return { score: Math.max(0, score), suggestions, issues };
    }
    analyzeContent(content, targetKeyword, secondaryKeywords = []) {
        const words = content.toLowerCase().split(/\s+/).filter(w => w.length > 0);
        const keywordOccurrences = this.countKeywordOccurrences(content, targetKeyword);
        // Keyword density
        const density = (keywordOccurrences / words.length) * 100;
        // Keyword prominence (position in content)
        const firstOccurrence = content.toLowerCase().indexOf(targetKeyword.toLowerCase());
        const prominence = firstOccurrence === -1 ? 0 : 100 - (firstOccurrence / content.length * 100);
        // Readability score (simplified Flesch Reading Ease)
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const avgWordsPerSentence = words.length / sentences.length;
        const avgSyllablesPerWord = this.estimateAvgSyllables(words);
        const fleschScore = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
        // Content length recommendation
        let lengthRecommendation = '';
        if (words.length < 300) {
            lengthRecommendation = 'Too short for SEO. Aim for at least 300 words.';
        }
        else if (words.length < 600) {
            lengthRecommendation = 'Good for short content. Consider expanding to 600+ words for better SEO.';
        }
        else if (words.length < 1500) {
            lengthRecommendation = 'Good length for standard content.';
        }
        else {
            lengthRecommendation = 'Excellent length for comprehensive content.';
        }
        // Suggestions
        const suggestions = [];
        if (density < 0.5) {
            suggestions.push('Keyword density is too low. Use the keyword more naturally.');
        }
        else if (density > 2.5) {
            suggestions.push('Keyword density is too high. Reduce keyword stuffing.');
        }
        if (prominence < 50) {
            suggestions.push('Use the target keyword earlier in the content.');
        }
        if (avgWordsPerSentence > 25) {
            suggestions.push('Sentences are too long. Break them up for better readability.');
        }
        // Check secondary keywords
        const missingSecondary = secondaryKeywords.filter(kw => !content.toLowerCase().includes(kw.toLowerCase()));
        if (missingSecondary.length > 0) {
            suggestions.push(`Include these related keywords: ${missingSecondary.join(', ')}`);
        }
        return {
            keywordAnalysis: {
                density,
                occurrences: keywordOccurrences,
                prominence
            },
            readability: {
                score: Math.round(fleschScore),
                level: this.getReadabilityLevel(fleschScore)
            },
            contentLength: {
                words: words.length,
                recommendation: lengthRecommendation
            },
            suggestions
        };
    }
    analyzeHeadings(headings, targetKeyword) {
        const suggestions = [];
        const issues = [];
        let score = 100;
        // Check H1 presence
        const h1Count = headings.filter(h => h.level === 1).length;
        if (h1Count === 0) {
            issues.push('Missing H1 tag');
            score -= 20;
        }
        else if (h1Count > 1) {
            issues.push(`Multiple H1 tags found (${h1Count}). Use only one H1 per page.`);
            score -= 15;
        }
        // Check hierarchy
        let previousLevel = 0;
        for (const heading of headings) {
            if (heading.level > previousLevel + 1 && previousLevel !== 0) {
                issues.push(`Heading hierarchy issue: H${previousLevel} followed by H${heading.level}`);
                score -= 5;
            }
            previousLevel = heading.level;
        }
        // Check keyword in headings
        if (targetKeyword) {
            const headingsWithKeyword = headings.filter(h => h.text.toLowerCase().includes(targetKeyword.toLowerCase()));
            if (headingsWithKeyword.length === 0) {
                suggestions.push('Include target keyword in at least one heading');
                score -= 10;
            }
        }
        // Check heading length
        headings.forEach(heading => {
            if (heading.text.length > 70) {
                suggestions.push(`H${heading.level} "${heading.text.substring(0, 30)}..." is too long`);
            }
        });
        return { score: Math.max(0, score), suggestions, issues };
    }
    countKeywordOccurrences(content, keyword) {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = content.match(regex);
        return matches ? matches.length : 0;
    }
    estimateAvgSyllables(words) {
        // Simplified syllable counting
        const totalSyllables = words.reduce((sum, word) => {
            const vowelCount = (word.match(/[aeiouAEIOU]/g) || []).length;
            return sum + Math.max(1, vowelCount);
        }, 0);
        return totalSyllables / words.length;
    }
    getReadabilityLevel(score) {
        if (score >= 90)
            return 'Very Easy';
        if (score >= 80)
            return 'Easy';
        if (score >= 70)
            return 'Fairly Easy';
        if (score >= 60)
            return 'Standard';
        if (score >= 50)
            return 'Fairly Difficult';
        if (score >= 30)
            return 'Difficult';
        return 'Very Difficult';
    }
}
exports.ContentOptimizer = ContentOptimizer;
