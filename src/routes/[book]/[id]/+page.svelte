<script lang="ts">
	import { page } from '$app/stores';
	import { formatCommentaryText } from '$lib/utils/format';

	let { data } = $props();

	const chapter = $derived(data.chapter);
	const notes = $derived(data.notes);
	const footnotes = $derived(data.footnotes);

	// Helper to get notes for a specific verse
	function getNotesForVerse(verseNum: number) {
		return notes.filter((n: any) => n.verse === verseNum);
	}
</script>

<svelte:head>
	<title>{chapter.book} - Chapitre {chapter.chapter}</title>
</svelte:head>

<main class="max-w-3xl mx-auto py-12 px-6 prose prose-lg prose-stone">
	<h1 class="text-center font-serif text-4xl mb-2">{chapter.book}</h1>
	<h2 class="text-center font-serif text-2xl mb-8 text-gray-600">Chapitre {chapter.chapter}</h2>

	{#if chapter.chapter_summary}
		<div class="italic text-center mb-12 text-gray-600">
			{@html formatCommentaryText(chapter.chapter_summary)}
		</div>
	{/if}

	<div class="space-y-12">
		{#each chapter.verses as verse}
			<div class="verse-block">
				<!-- Biblical Verse -->
				<div class="font-serif text-xl border-l-4 border-gray-300 pl-4 mb-6">
					<span class="text-gray-400 font-bold mr-2">{verse.verse_number}.</span>
					<span class="text-gray-900">{@html formatCommentaryText(verse.french)}</span>
				</div>

				<!-- Associated Notes -->
				{#each getNotesForVerse(verse.verse_number) as note}
					<div class="commentary-block mt-4 mb-8 text-gray-800 font-serif leading-relaxed">
						
						<!-- Latin Quote & Translation inline -->
						{#if note.latin_lemma || note.lemma}
							<p class="mb-2">
								{#if note.latin_lemma}
									<span class="uppercase tracking-wide">{note.latin_lemma}</span>
								{/if}
								{#if note.latin_lemma && note.lemma}
									<br/>
								{/if}
								{#if note.lemma}
									<em>{note.lemma}</em>
								{/if}
							</p>
						{/if}
						
						<!-- Main Commentary -->
						{#if note.text}
							<!-- calmet.py outputs plain text with HTML-ready formatting, but we might have newlines -->
							{#each note.text.split('\n\n') as paragraph}
								{#if paragraph.trim()}
									<p class="mb-4">
										{@html formatCommentaryText(paragraph)}
									</p>
								{/if}
							{/each}
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<!-- Footnotes Section -->
	{#if footnotes && footnotes.length > 0}
		<hr class="my-12" />
		<div class="footnotes text-sm text-gray-600 font-serif">
			<h3 class="text-lg mb-4 uppercase tracking-wider text-center">Notes</h3>
			<div class="space-y-2">
				{#each footnotes as fn}
					<p id="fn{fn.n}" class="mb-1 leading-relaxed">
						<sup class="mr-2 font-bold">{fn.n}</sup>{@html formatCommentaryText(fn.text)}
					</p>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Pagination Navigation -->
	<div class="mt-16 flex justify-between border-t border-gray-200 pt-8 font-serif">
		{#if chapter.chapter > 1}
			<a href="/{$page.params.book}/{chapter.chapter - 1}" class="text-stone-600 hover:text-stone-900 transition-colors">
				&larr; Chapitre {chapter.chapter - 1}
			</a>
		{:else}
			<span></span>
		{/if}

		<a href="/" class="text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-widest text-sm">
			Index
		</a>

		{#if ($page.params.book === 'genese' && chapter.chapter < 50) || 
			 ($page.params.book === 'exode' && chapter.chapter < 40) || 
			 ($page.params.book === 'levitique' && chapter.chapter < 27) || 
			 ($page.params.book === 'nombres' && chapter.chapter < 36) || 
			 ($page.params.book === 'deuteronome' && chapter.chapter < 34) ||
			 ($page.params.book === 'josue' && chapter.chapter < 24) ||
			 ($page.params.book === 'juges' && chapter.chapter < 21) ||
			 ($page.params.book === 'ruth' && chapter.chapter < 4) ||
			 ($page.params.book === '1-samuel' && chapter.chapter < 31) ||
			 ($page.params.book === '2-samuel' && chapter.chapter < 24) ||
			 ($page.params.book === '1-rois' && chapter.chapter < 22) ||
			 ($page.params.book === '2-rois' && chapter.chapter < 25) ||
			 ($page.params.book === '1-chroniques' && chapter.chapter < 29) ||
			 ($page.params.book === '2-chroniques' && chapter.chapter < 36) ||
			 ($page.params.book === 'esdras' && chapter.chapter < 10) ||
			 ($page.params.book === 'nehemie' && chapter.chapter < 13) ||
			 ($page.params.book === 'tobie' && chapter.chapter < 14) ||
			 ($page.params.book === 'judith' && chapter.chapter < 16)}
			<a href="/{$page.params.book}/{chapter.chapter + 1}" class="text-stone-600 hover:text-stone-900 transition-colors">
				Chapitre {chapter.chapter + 1} &rarr;
			</a>
		{:else}
			<span></span>
		{/if}
	</div>
</main>
