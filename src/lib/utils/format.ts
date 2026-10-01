const GREEK_FIX: Record<string, string> = {"р": "ρ", "д": "δ", "с": "ς", "е": "ε", "о": "ο", "у": "υ"};
const STRAY = /\^\{[^}]*\}/g;

export function fixGreek(s: string): string {
    if (!s) return "";
    return s.replace(/[Ͱ-Ͽἀ-῿Ѐ-ӿ]+/g, (match) => {
        let t = match;
        for (const [bad, good] of Object.entries(GREEK_FIX)) {
            t = t.replace(new RegExp(bad, 'g'), good);
        }
        return t;
    });
}

export function balanceItalics(text: string): string {
    if (!text) return "";
    const count = (text.match(/_/g) || []).length;
    return count % 2 !== 0 ? text + "_" : text;
}

export function formatCommentaryText(text: string): string {
    if (!text) return "";
    
    let formatted = text;

    // Remove any remaining stray superscript noise (excluding our HTML tags)
    // Actually our HTML tags use <sup> so they won't match \^\{
    formatted = formatted.replace(STRAY, "");
    
    // Fix greek cyrillic lookalikes
    formatted = fixGreek(formatted);
    
    // Balance italics
    formatted = balanceItalics(formatted);
    
    // Convert _italic_ to <em>italic</em>
    formatted = formatted.replace(/_([^_]+)_/g, '<em>$1</em>');
    
    // Strip any residual underscores that were unmatched
    formatted = formatted.replace(/_/g, '');

    // Convert [1] output by calmet.py into clickable superscripts
    formatted = formatted.replace(/\[(\d+)\]/g, '<sup class="footnote-ref"><a href="#fn$1">$1</a></sup>');
    
    return formatted;
}
