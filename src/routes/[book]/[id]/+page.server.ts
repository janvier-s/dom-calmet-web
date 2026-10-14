import { error } from '@sveltejs/kit';

export const prerender = true;

// Every exported chapter, so the prerenderer builds them all and not only the ones it
// reaches by following links (the home page lists one book's chapters at a time).
const chapterFiles = import.meta.glob('../../../lib/data/calmet/*/calmet_chapter_*.json');

export function entries() {
    return Object.keys(chapterFiles).map((path) => {
        const [, book, num] = path.match(/calmet\/([^/]+)\/calmet_chapter_(\d+)\.json$/)!;
        return { book, id: String(parseInt(num, 10)) };
    });
}

export async function load({ params }) {
    const { id, book } = params;
    
    const chapterNum = parseInt(id, 10);
    if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 50) {
        error(404, 'Chapter not found');
    }

    const paddedId = chapterNum.toString().padStart(2, '0');

    try {
        const rawModule = await import(`../../../lib/data/raw/${book}/chapter_${paddedId}.json`);
        const calmetModule = await import(`../../../lib/data/calmet/${book}/calmet_chapter_${paddedId}.json`);

        const rawChapterData = rawModule.default;
        const calmetData = calmetModule.default;

        return {
            chapter: {
                book: rawChapterData.book,
                chapter: rawChapterData.chapter,
                chapter_summary: rawChapterData.chapter_summary,
                verses: rawChapterData.verses
            },
            notes: calmetData.notes,
            footnotes: calmetData.footnotes
        };
    } catch (e) {
        console.error(e);
        error(404, 'Data not found');
    }
}
