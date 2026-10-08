<script lang="ts">
	const books = [
		{ id: 'genese', name: 'Genèse', chapters: 50 },
		{ id: 'exode', name: 'Exode', chapters: 40 },
		{ id: 'levitique', name: 'Lévitique', chapters: 27 },
		{ id: 'nombres', name: 'Nombres', chapters: 36 },
		{ id: 'deuteronome', name: 'Deutéronome', chapters: 34 },
		{ id: 'josue', name: 'Josué', chapters: 24 },
		{ id: 'juges', name: 'Juges', chapters: 21 },
		{ id: 'ruth', name: 'Ruth', chapters: 4 },
		{ id: '1-samuel', name: '1 Samuel', chapters: 31 },
		{ id: '2-samuel', name: '2 Samuel', chapters: 24 },
		{ id: '1-rois', name: '1 Rois', chapters: 22 },
		{ id: '2-rois', name: '2 Rois', chapters: 25 }
	];

	let openBook = $state('genese');
</script>

<svelte:head>
	<title>Dom Calmet - Bible</title>
</svelte:head>

<main class="max-w-4xl mx-auto py-16 px-6">
	<div class="text-center mb-16">
		<h1 class="font-serif text-5xl mb-4 text-stone-900">Dom Calmet</h1>
		<h2 class="font-serif text-3xl text-stone-600">Commentaire Littéral</h2>
	</div>

	<div class="space-y-4 shadow-sm">
		{#each books as book}
			<div class="border border-stone-200 rounded-lg overflow-hidden bg-white">
				<button 
					class="w-full text-left px-6 py-5 bg-stone-50 hover:bg-stone-100 flex justify-between items-center transition-colors font-serif text-2xl text-stone-800 focus:outline-none"
					onclick={() => openBook = openBook === book.id ? null : book.id}
				>
					<span>{book.name}</span>
					<span class="text-sm text-stone-500 font-sans tracking-widest uppercase">
						{openBook === book.id ? 'Fermer' : 'Ouvrir'}
					</span>
				</button>
				
				{#if openBook === book.id}
					<div class="p-6 border-t border-stone-200">
						<div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-center font-serif">
							{#each Array.from({ length: book.chapters }, (_, i) => i + 1) as chapter}
								<a href="/{book.id}/{chapter}" class="block p-3 border border-stone-200 rounded hover:border-stone-400 hover:shadow-sm transition-all text-stone-700 hover:text-stone-900 bg-stone-50/50 hover:bg-white">
									Chapitre {chapter}
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</main>
