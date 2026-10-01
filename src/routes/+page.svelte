<script lang="ts">
	// Since we know there are 50 chapters in Genesis, we can just hardcode an array of 50.
	const chapters = Array.from({ length: 50 }, (_, i) => i + 1);
</script>

<svelte:head>
	<title>Dom Calmet - Genèse</title>
</svelte:head>

<main class="max-w-4xl mx-auto py-16 px-6">
	<div class="text-center mb-16">
		<h1 class="font-serif text-5xl mb-4 text-stone-900">Dom Calmet</h1>
		<h2 class="font-serif text-3xl text-stone-600">Commentaire Littéral sur la Genèse</h2>
	</div>

	<div class="grid grid-cols-2 md:grid-cols-5 gap-6 text-center font-serif">
		{#each chapters as chapter}
			<a 
				href="/chapter/{chapter}" 
				class="block p-4 border border-stone-200 rounded hover:border-stone-400 hover:shadow-sm transition-all text-stone-700 hover:text-stone-900"
			>
				Chapitre {chapter}
			</a>
		{/each}
	</div>
</main>
