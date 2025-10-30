<script lang="ts">
	import { currentLanguage, toggleLanguage } from '$lib/stores/language';
</script>

<button
	on:click={toggleLanguage}
	class="group flex items-center gap-2 rounded-lg bg-[#282e39] px-4 py-2 text-white text-sm font-medium leading-normal hover:bg-[#3a4049] transition-all"
	aria-label="Change language"
>
	<svg class="h-4 w-4 text-white transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
	</svg>
	<span class="font-bold uppercase">{$currentLanguage === 'es' ? 'EN' : 'ES'}</span>
</button>

