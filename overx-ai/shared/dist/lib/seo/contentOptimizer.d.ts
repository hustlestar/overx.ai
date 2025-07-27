interface OptimizationResult {
    score: number;
    suggestions: string[];
    issues: string[];
}
interface KeywordAnalysis {
    density: number;
    occurrences: number;
    prominence: number;
}
export declare class ContentOptimizer {
    analyzeTitle(title: string, targetKeyword?: string): OptimizationResult;
    analyzeMetaDescription(description: string, targetKeyword?: string): OptimizationResult;
    analyzeContent(content: string, targetKeyword: string, secondaryKeywords?: string[]): {
        keywordAnalysis: KeywordAnalysis;
        readability: {
            score: number;
            level: string;
        };
        contentLength: {
            words: number;
            recommendation: string;
        };
        suggestions: string[];
    };
    analyzeHeadings(headings: Array<{
        level: number;
        text: string;
    }>, targetKeyword?: string): OptimizationResult;
    private countKeywordOccurrences;
    private estimateAvgSyllables;
    private getReadabilityLevel;
}
export {};
//# sourceMappingURL=contentOptimizer.d.ts.map