import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params }) {
    const { id } = params;
    
    // Ensure id is a valid chapter number (1-50)
    const chapterNum = parseInt(id, 10);
    if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 50) {
        error(404, 'Chapter not found');
    }

    const paddedId = chapterNum.toString().padStart(2, '0');

    try {
        // Dynamically import the data files
        // Vite requires the path to be somewhat explicit for dynamic imports to work
        const rawModule = await import(`../../../lib/data/raw/chapter_${paddedId}.json`);
        const calmetModule = await import(`../../../lib/data/calmet/calmet_chapter_${paddedId}.json`);

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
