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

    // Jésus-Christ in small caps, as Calmet prints it
    formatted = formatted.replace(/J[ée]sus-Christ|J[EÉ]SUS-CHRIST/g, '<span style="font-variant: small-caps">Jésus-Christ</span>');

    // Convert [1] output by calmet.py into clickable superscripts
    formatted = formatted.replace(/\[(\d+)\]/g, '<sup class="footnote-ref"><a href="#fn$1">$1</a></sup>');
    
    return formatted;
}

// Each line break in the commentary starts a paragraph, except inside italics
// (quoted verse), where it stays a line break within the paragraph.
export function paragraphs(text: string): string[] {
    if (!text) return [];
    const out: string[] = [];
    let cur = "";
    let italic = false;
    for (const line of text.split(/[ \t ]*\n[ \t ]*/)) {
        if (cur && !italic) {
            out.push(cur);
            cur = "";
        }
        cur = cur ? cur + "\n" + line : line;
        if ((line.match(/_/g) || []).length % 2) italic = !italic;
    }
    if (cur) out.push(cur);
    return out.filter((p) => p.trim());
}
