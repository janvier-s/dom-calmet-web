<script lang="ts">
	const genesisChapters = Array.from({ length: 50 }, (_, i) => i + 1);
	const exodusChapters = Array.from({ length: 40 }, (_, i) => i + 1);
	const leviticusChapters = Array.from({ length: 27 }, (_, i) => i + 1);
	const numbersChapters = Array.from({ length: 36 }, (_, i) => i + 1);
	const deuteronomyChapters = Array.from({ length: 34 }, (_, i) => i + 1);
</script>

<svelte:head>
	<title>Dom Calmet - Bible</title>
</svelte:head>

<main class="max-w-4xl mx-auto py-16 px-6">
	<div class="text-center mb-16">
		<h1 class="font-serif text-5xl mb-4 text-stone-900">Dom Calmet</h1>
		<h2 class="font-serif text-3xl text-stone-600">Commentaire Littéral</h2>
	</div>

	<h3 class="font-serif text-2xl text-stone-800 mb-6 border-b pb-2">Genèse</h3>
	<div class="grid grid-cols-2 md:grid-cols-5 gap-6 text-center font-serif mb-16">
		{#each genesisChapters as chapter}
			<a href="/genese/{chapter}" class="block p-4 border border-stone-200 rounded hover:border-stone-400 hover:shadow-sm transition-all text-stone-700 hover:text-stone-900">Chapitre {chapter}</a>
		{/each}
	</div>

	<h3 class="font-serif text-2xl text-stone-800 mb-6 border-b pb-2">Exode</h3>
	<div class="grid grid-cols-2 md:grid-cols-5 gap-6 text-center font-serif mb-16">
		{#each exodusChapters as chapter}
			<a href="/exode/{chapter}" class="block p-4 border border-stone-200 rounded hover:border-stone-400 hover:shadow-sm transition-all text-stone-700 hover:text-stone-900">Chapitre {chapter}</a>
		{/each}
	</div>

	<h3 class="font-serif text-2xl text-stone-800 mb-6 border-b pb-2">Lévitique</h3>
	<div class="grid grid-cols-2 md:grid-cols-5 gap-6 text-center font-serif mb-16">
		{#each leviticusChapters as chapter}
			<a href="/levitique/{chapter}" class="block p-4 border border-stone-200 rounded hover:border-stone-400 hover:shadow-sm transition-all text-stone-700 hover:text-stone-900">Chapitre {chapter}</a>
		{/each}
	</div>

	<h3 class="font-serif text-2xl text-stone-800 mb-6 border-b pb-2">Nombres</h3>
	<div class="grid grid-cols-2 md:grid-cols-5 gap-6 text-center font-serif mb-16">
		{#each numbersChapters as chapter}
			<a href="/nombres/{chapter}" class="block p-4 border border-stone-200 rounded hover:border-stone-400 hover:shadow-sm transition-all text-stone-700 hover:text-stone-900">Chapitre {chapter}</a>
		{/each}
	</div>

	<h3 class="font-serif text-2xl text-stone-800 mb-6 border-b pb-2">Deutéronome</h3>
	<div class="grid grid-cols-2 md:grid-cols-5 gap-6 text-center font-serif">
		{#each deuteronomyChapters as chapter}
			<a href="/deuteronome/{chapter}" class="block p-4 border border-stone-200 rounded hover:border-stone-400 hover:shadow-sm transition-all text-stone-700 hover:text-stone-900">Chapitre {chapter}</a>
		{/each}
	</div>
</main>
