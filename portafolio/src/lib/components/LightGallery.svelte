<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import lightGallery from 'lightgallery';
	import lgThumbnail from 'lightgallery/plugins/thumbnail';
	import lgZoom from 'lightgallery/plugins/zoom';

	export let galleryId: string;
	export let items: Array<{ src: string; thumb?: string; subHtml?: string }> = [];
	export let openIndex: number = -1;

	let container: HTMLDivElement | null = null;
	let lgInstance: any = null;
	let previousItemsLength = 0;
	let previousOpenIndex = -1;

	function destroyGallery() {
		if (lgInstance) {
			lgInstance.destroy();
			lgInstance = null;
		}
	}

	function initGallery() {
		if (!container || items.length === 0) return;

		destroyGallery();

		// Initialize lightGallery
		lgInstance = lightGallery(container, {
			plugins: [lgThumbnail, lgZoom],
			speed: 500,
			download: false,
			enableSwipe: true,
			enableDrag: true,
			actualSize: true,
			showThumbByDefault: false,
			thumbnail: true,
			zoom: true,
			controls: true,
			closeOnTap: true,
			closeOnSwipeUp: true,
			closeOnSwipeDown: true,
			hideBarsDelay: 3000,
			hideControlOnEnd: false,
			slideEndAnimation: true,
			allowMediaOverlap: false,
			toggleThumb: true
		});
	}

	// Watch for items changes - recreate gallery when items change
	$: if (items.length !== previousItemsLength && container) {
		previousItemsLength = items.length;
		if (items.length > 0) {
			// Use setTimeout to ensure DOM is updated
			setTimeout(() => {
				initGallery();
				// Open gallery if openIndex is set
				if (openIndex >= 0 && openIndex < items.length && lgInstance) {
					setTimeout(() => {
						lgInstance.openGallery(openIndex);
					}, 100);
				}
			}, 0);
		}
	}

	// Watch for openIndex changes
	$: if (
		openIndex >= 0 &&
		openIndex < items.length &&
		openIndex !== previousOpenIndex &&
		lgInstance &&
		items.length > 0
	) {
		previousOpenIndex = openIndex;
		setTimeout(() => {
			if (lgInstance) {
				lgInstance.openGallery(openIndex);
			}
		}, 100);
	}

	onMount(() => {
		if (items.length > 0) {
			initGallery();
			if (openIndex >= 0 && openIndex < items.length && lgInstance) {
				setTimeout(() => {
					if (lgInstance) {
						lgInstance.openGallery(openIndex);
					}
				}, 100);
			}
		}
	});

	onDestroy(() => {
		destroyGallery();
	});
</script>

<div bind:this={container} id={galleryId} class="lightgallery-container" style="display: none;">
	{#each items as item, idx}
		<a href={item.src} data-src={item.src} data-sub-html={item.subHtml || ''}>
			<img src={item.thumb || item.src} alt={item.subHtml || `Image ${idx + 1}`} />
		</a>
	{/each}
</div>

<style>
	:global(.lg-container) {
		background-color: rgba(0, 0, 0, 0.95) !important;
	}

	:global(.lg-toolbar) {
		background-color: rgba(0, 0, 0, 0.7) !important;
	}

	:global(.lg-thumb-item.active) {
		border-color: white !important;
	}
</style>

