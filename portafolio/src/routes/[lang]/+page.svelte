<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { currentLanguage } from '$lib/stores/language';
	import { getTranslations } from '$lib/i18n/translations';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import LightGallery from '$lib/components/LightGallery.svelte';

	let mounted = false;
	let mobileMenuOpen = false;

	// Carousel state: map project index to current image index
	let carouselStates: Record<number, number> = {};

	// Gallery state for lightGallery
	let galleryItems: Array<{ src: string; thumb?: string; subHtml?: string }> = [];
	let galleryOpenIndex = -1;

	// Get language from URL params
	$: lang = ($page.params?.lang as 'es' | 'en') || 'es';
	$: currentLanguage.set(lang);
	$: t = getTranslations(lang);

	onMount(() => {
		mounted = true;
		// Initialize carousel states
		t.projects.forEach((_, index) => {
			carouselStates[index] = 0;
		});
	});

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		// Prevent body scroll when menu is open
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
		document.body.style.overflow = '';
	}

	// Helper function to get image folder name from company name
	function getImageFolder(company: string): string | null {
		const folderMap: Record<string, string> = {
			'LA MEJOR OPCIÓN': 'LaMejorOpcion',
			'INTEGRA EXPANSIÓN': 'IntegraExpansion',
			CENTROGEO: 'CentroGeo'
		};
		return folderMap[company] || null;
	}

	// Helper function to get number of images for a project
	function getImageCount(company: string): number {
		const imageCounts: Record<string, number> = {
			'LA MEJOR OPCIÓN': 5,
			'INTEGRA EXPANSIÓN': 6,
			CENTROGEO: 9
		};
		return imageCounts[company] || 0;
	}

	// Carousel navigation functions
	function nextImage(projectIndex: number, imageCount: number) {
		carouselStates[projectIndex] = (carouselStates[projectIndex] + 1) % imageCount;
		carouselStates = carouselStates; // Trigger reactivity
	}

	function prevImage(projectIndex: number, imageCount: number) {
		carouselStates[projectIndex] = (carouselStates[projectIndex] - 1 + imageCount) % imageCount;
		carouselStates = carouselStates; // Trigger reactivity
	}

	function goToImage(projectIndex: number, imageIndex: number) {
		carouselStates[projectIndex] = imageIndex;
		carouselStates = carouselStates; // Trigger reactivity
	}

	// Gallery functions for lightGallery
	function openGallery(projectIndex: number, imageIndex: number) {
		const project = t.projects[projectIndex];
		const imageFolder = getImageFolder(project.company);
		const imageCount = getImageCount(project.company);

		if (!imageFolder || imageCount === 0) return;

		// Prepare gallery items
		galleryItems = Array.from({ length: imageCount }, (_, i) => ({
			src: `/${imageFolder}/${i + 1}.avif`,
			thumb: `/${imageFolder}/${i + 1}.avif`,
			subHtml: `${project.company} - Image ${i + 1}`
		}));

		// Open gallery at specified index
		galleryOpenIndex = imageIndex;
	}

	// Helper function to get all skills from stack
	$: allSkills = [
		...t.stack.backend.items,
		...t.stack.frontend.items,
		...t.stack.mobile.items,
		...t.stack.devops.items,
		...t.stack.security.items,
		...t.stack.architecture.items
	];
</script>

<svelte:head>
	<title>{t.meta.title}</title>
	<meta name="description" content={t.meta.description} />
</svelte:head>

<div
	class="group/design-root dark relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#111318]"
	style="font-family: Inter, 'Noto Sans', sans-serif;"
>
	<div class="layout-container flex h-full grow flex-col">
		<header
			class="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between whitespace-nowrap border-b border-solid border-b-[#282e39] bg-[#111318] px-4 sm:px-6 md:px-10"
		>
			<div class="flex items-center gap-3 text-white sm:gap-4">
				<div class="size-4 shrink-0">
					<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_6_330)">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
								fill="currentColor"
							></path>
						</g>
						<defs>
							<clipPath id="clip0_6_330"><rect width="48" height="48" fill="white"></rect></clipPath
							>
						</defs>
					</svg>
				</div>
				<h2
					class="text-sm font-bold leading-tight tracking-[-0.015em] text-white sm:text-base md:text-lg"
				>
					{t.meta.title}
				</h2>
			</div>
			<div class="flex flex-1 justify-end gap-3 sm:gap-4 md:gap-8">
				<div class="hidden items-center gap-6 md:flex lg:gap-9">
					<a
						class="text-xs font-medium leading-normal text-white transition-colors hover:text-[#9da6b9] sm:text-sm"
						href="#projects">{lang === 'es' ? 'Proyectos' : 'Projects'}</a
					>
					<a
						class="text-xs font-medium leading-normal text-white transition-colors hover:text-[#9da6b9] sm:text-sm"
						href="#experience">{t.experience.title}</a
					>
					<a
						class="text-xs font-medium leading-normal text-white transition-colors hover:text-[#9da6b9] sm:text-sm"
						href="#skills">{t.stack.title}</a
					>
					<a
						class="text-xs font-medium leading-normal text-white transition-colors hover:text-[#9da6b9] sm:text-sm"
						href="#contact">{t.contact.title}</a
					>
				</div>
				<!-- Mobile menu button -->
				<button
					on:click={toggleMobileMenu}
					class="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[#282e39] md:hidden"
					aria-label="Toggle menu"
					aria-expanded={mobileMenuOpen}
				>
					{#if mobileMenuOpen}
						<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					{:else}
						<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					{/if}
				</button>
				<div class="hidden items-center md:flex">
					<LanguageSwitcher />
				</div>
			</div>
		</header>

		<!-- Mobile menu overlay -->
		{#if mobileMenuOpen}
			<div class="fixed inset-0 z-40 md:hidden" transition:fade={{ duration: 200 }}>
				<div class="fixed inset-0 bg-black/50" on:click={closeMobileMenu}></div>
				<div
					class="fixed left-0 right-0 top-14 border-b border-[#282e39] bg-[#111318] shadow-lg"
					transition:slide={{ duration: 200, axis: 'y' }}
				>
					<nav class="flex flex-col py-4">
						<a
							class="px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#282e39]"
							href="#projects"
							on:click={closeMobileMenu}
						>
							{lang === 'es' ? 'Proyectos' : 'Projects'}
						</a>
						<a
							class="px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#282e39]"
							href="#experience"
							on:click={closeMobileMenu}
						>
							{t.experience.title}
						</a>
						<a
							class="px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#282e39]"
							href="#skills"
							on:click={closeMobileMenu}
						>
							{t.stack.title}
						</a>
						<a
							class="px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#282e39]"
							href="#contact"
							on:click={closeMobileMenu}
						>
							{t.contact.title}
						</a>
						<div class="mt-2 border-t border-[#282e39] px-6 py-3">
							<LanguageSwitcher />
						</div>
					</nav>
				</div>
			</div>
		{/if}

		<!-- Spacer to offset fixed header height -->
		<div class="h-14"></div>

		<div
			class="flex w-full flex-1 justify-center px-4 py-5 sm:px-6 sm:py-6 md:px-12 md:py-8 lg:px-20 xl:px-40"
		>
			<div class="layout-content-container flex w-full max-w-[960px] flex-1 flex-col">
				<div class="@container flex p-4 sm:p-6">
					<div class="flex w-full flex-col items-center gap-4 sm:gap-6">
						<div class="flex flex-col items-center gap-4 sm:gap-6">
							<div class="relative">
								<img
									src="/perfil.jpeg"
									alt="Profile"
									class="h-28 w-28 rounded-full border-4 border-[#282e39] object-cover shadow-lg sm:h-32 sm:w-32"
								/>
								<!-- Gradient ring decoration -->
								<div
									class="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-20"
								></div>
							</div>
							<div class="flex flex-col items-center justify-center px-2">
								<p
									class="text-center text-xl font-bold leading-tight tracking-[-0.015em] text-white sm:text-2xl md:text-[22px]"
								>
									{t.hero.title1}
									{t.hero.title2}
								</p>
								<p
									class="mt-1 text-center text-sm font-normal leading-normal text-[#9da6b9] sm:text-base"
								>
									{t.hero.subtitle}
								</p>
							</div>
						</div>
					</div>
				</div>

				<h2
					id="projects"
					class="px-4 pb-3 pt-5 text-xl font-bold leading-tight tracking-[-0.015em] text-white sm:pt-6 sm:text-2xl md:text-[22px]"
				>
					{lang === 'es' ? 'Proyectos' : 'Projects'}
				</h2>
				<!-- Mobile: horizontal scroll with padding on both sides -->
				<div
					class="scrollbar-hide w-full snap-x snap-mandatory overflow-x-auto scroll-smooth px-4 pb-6 md:hidden"
					style="scrollbar-width: none; -ms-overflow-style: none;"
				>
					<div class="flex min-w-max gap-3">
						{#each t.projects as project, index}
							{@const imageFolder = getImageFolder(project.company)}
							{@const imageCount = getImageCount(project.company)}
							{@const currentImageIndex = carouselStates[index] || 0}
							<div
								class="group relative flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-[#282e39] bg-[#1a1f28] transition-all duration-300 hover:-translate-y-1 hover:border-[#3a4049] hover:shadow-lg hover:shadow-black/20"
							>
								<!-- Carousel Section -->
								<div
									class="relative h-80 w-full bg-gradient-to-br {project.color} shrink-0 overflow-hidden"
								>
									{#if imageFolder && imageCount > 0}
										<!-- Carousel Container -->
										<div class="relative h-full w-full">
											<!-- Images -->
											<button
												on:click={() => openGallery(index, currentImageIndex)}
												class="relative h-full w-full cursor-pointer overflow-hidden rounded-t-xl focus:outline-none focus:ring-2 focus:ring-white/50"
												aria-label="Open image gallery"
											>
												<div class="relative h-full w-full overflow-hidden">
													{#each Array(imageCount) as _, imgIndex}
														<div
															class="absolute inset-0 transition-opacity duration-500 ease-in-out {currentImageIndex ===
															imgIndex
																? 'z-10 opacity-100'
																: 'z-0 opacity-0'}"
														>
															<img
																src="/{imageFolder}/{imgIndex + 1}.avif"
																alt="{project.company} - Image {imgIndex + 1}"
																class="h-full w-full object-cover"
																loading="lazy"
															/>
														</div>
													{/each}
												</div>
											</button>

											<!-- Navigation Buttons -->
											{#if imageCount > 1}
												<!-- Previous Button -->
												<button
													on:click|stopPropagation={() => prevImage(index, imageCount)}
													class="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/70"
													aria-label="Previous image"
												>
													<svg
														class="h-4 w-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15 19l-7-7 7-7"
														></path>
													</svg>
												</button>

												<!-- Next Button -->
												<button
													on:click|stopPropagation={() => nextImage(index, imageCount)}
													class="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/70"
													aria-label="Next image"
												>
													<svg
														class="h-4 w-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M9 5l7 7-7 7"
														></path>
													</svg>
												</button>

												<!-- Indicators -->
												<div class="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
													{#each Array(imageCount) as _, imgIndex}
														<button
															on:click|stopPropagation={() => goToImage(index, imgIndex)}
															class="h-1.5 w-1.5 rounded-full transition-all duration-200 {currentImageIndex ===
															imgIndex
																? 'w-4 bg-white'
																: 'bg-white/50 hover:bg-white/75'}"
															aria-label="Go to image {imgIndex + 1}"
														></button>
													{/each}
												</div>
											{/if}

											<!-- Gradient accent overlay -->
											<div
												class="pointer-events-none absolute -bottom-10 left-0 right-0 z-10 h-20 bg-gradient-to-t from-[#1a1f28] via-[#1a1f28]/80 to-transparent"
											></div>
										</div>
									{:else}
										<!-- Fallback gradient background when no images -->
										<div class="absolute inset-0 bg-gradient-to-br {project.color}"></div>
										<div
											class="absolute inset-0 opacity-10"
											style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 24px 24px;"
										></div>
										<div class="absolute inset-0 flex items-center justify-center">
											<span class="text-5xl font-bold text-white opacity-20"
												>{project.company
													.split(' ')
													.map((w) => w[0])
													.join('')
													.substring(0, 3)}</span
											>
										</div>
										<div
											class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1a1f28] via-[#1a1f28]/80 to-transparent"
										></div>
									{/if}
								</div>

								<!-- Content Section -->
								<div class="flex flex-1 flex-col p-4 sm:p-5">
									<!-- Header -->
									<div class="mb-3">
										<h3 class="mb-1 text-base font-bold leading-tight text-white sm:text-lg">
											{project.company}
										</h3>
										<p class="mb-2 text-xs font-medium text-[#9da6b9] sm:text-sm">{project.role}</p>
										<div class="flex flex-wrap items-center gap-2 text-xs text-[#9da6b9] sm:gap-3">
											<span class="flex items-center gap-1 whitespace-nowrap">
												<svg
													class="h-3 w-3 shrink-0"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
													></path>
												</svg>
												<span>{project.period}</span>
											</span>
											<span class="flex items-center gap-1 whitespace-nowrap">
												<svg
													class="h-3 w-3 shrink-0"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
													></path>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
													></path>
												</svg>
												<span>{project.location}</span>
											</span>
										</div>
									</div>

									<!-- Description -->
									<p class="mb-4 text-sm font-normal leading-relaxed text-[#9da6b9]">
										{project.description}
									</p>

									<!-- Technologies -->
									<div class="flex flex-wrap gap-2">
										{#each project.technologies as tech}
											<span
												class="whitespace-nowrap rounded-md bg-[#282e39] px-2 py-1 text-xs font-medium text-[#9da6b9]"
											>
												{tech}
											</span>
										{/each}
									</div>
								</div>

								<!-- Gradient accent bar -->
								<div
									class="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b {project.color}"
								></div>
							</div>
						{/each}
						<!-- Spacer for better scroll ending -->
						<div class="w-4 shrink-0"></div>
					</div>
				</div>

				<!-- Desktop: show all projects in grid -->
				<div class="hidden gap-4 px-4 pb-6 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
					{#each t.projects as project, index}
						{@const imageFolder = getImageFolder(project.company)}
						{@const imageCount = getImageCount(project.company)}
						{@const currentImageIndex = carouselStates[index] || 0}
						<div
							class="group relative flex flex-col overflow-hidden rounded-xl border border-[#282e39] bg-[#1a1f28] transition-all duration-300 hover:-translate-y-1 hover:border-[#3a4049] hover:shadow-lg hover:shadow-black/20"
						>
							<!-- Carousel Section -->
							<div
								class="relative h-80 w-full bg-gradient-to-br {project.color} shrink-0 overflow-hidden"
							>
								{#if imageFolder && imageCount > 0}
									<!-- Carousel Container -->
									<div class="relative h-full w-full">
										<!-- Images -->
										<button
											on:click={() => openGallery(index, currentImageIndex)}
											class="relative h-full w-full cursor-pointer overflow-hidden rounded-t-xl focus:outline-none focus:ring-2 focus:ring-white/50"
											aria-label="Open image gallery"
										>
											<div class="relative h-full w-full overflow-hidden">
												{#each Array(imageCount) as _, imgIndex}
													<div
														class="absolute inset-0 transition-opacity duration-500 ease-in-out {currentImageIndex ===
														imgIndex
															? 'z-10 opacity-100'
															: 'z-0 opacity-0'}"
													>
														<img
															src="/{imageFolder}/{imgIndex + 1}.avif"
															alt="{project.company} - Image {imgIndex + 1}"
															class="h-full w-full object-cover"
															loading="lazy"
														/>
													</div>
												{/each}
											</div>
										</button>

										<!-- Navigation Buttons -->
										{#if imageCount > 1}
											<!-- Previous Button -->
											<button
												on:click|stopPropagation={() => prevImage(index, imageCount)}
												class="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 group-hover:opacity-100"
												aria-label="Previous image"
											>
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M15 19l-7-7 7-7"
													></path>
												</svg>
											</button>

											<!-- Next Button -->
											<button
												on:click|stopPropagation={() => nextImage(index, imageCount)}
												class="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 group-hover:opacity-100"
												aria-label="Next image"
											>
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M9 5l7 7-7 7"
													></path>
												</svg>
											</button>

											<!-- Indicators -->
											<div class="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
												{#each Array(imageCount) as _, imgIndex}
													<button
														on:click|stopPropagation={() => goToImage(index, imgIndex)}
														class="h-1.5 w-1.5 rounded-full transition-all duration-200 {currentImageIndex ===
														imgIndex
															? 'w-4 bg-white'
															: 'bg-white/50 hover:bg-white/75'}"
														aria-label="Go to image {imgIndex + 1}"
													></button>
												{/each}
											</div>
										{/if}

										<!-- Gradient accent overlay -->
										<div
											class="pointer-events-none absolute -bottom-10 left-0 right-0 z-10 h-20 bg-gradient-to-t from-[#1a1f28] via-[#1a1f28]/80 to-transparent"
										></div>
									</div>
								{:else}
									<!-- Fallback gradient background when no images -->
									<div class="absolute inset-0 bg-gradient-to-br {project.color}"></div>
									<div
										class="absolute inset-0 opacity-10"
										style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 24px 24px;"
									></div>
									<div class="absolute inset-0 flex items-center justify-center">
										<span class="text-5xl font-bold text-white opacity-20"
											>{project.company
												.split(' ')
												.map((w) => w[0])
												.join('')
												.substring(0, 3)}</span
										>
									</div>
									<div
										class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1a1f28] via-[#1a1f28]/80 to-transparent"
									></div>
								{/if}
							</div>

							<!-- Content Section -->
							<div class="flex flex-1 flex-col p-5">
								<!-- Header -->
								<div class="mb-3">
									<h3 class="mb-1 text-lg font-bold leading-tight text-white">{project.company}</h3>
									<p class="mb-2 text-sm font-medium text-[#9da6b9]">{project.role}</p>
									<div class="flex flex-wrap items-center gap-3 text-xs text-[#9da6b9]">
										<span class="flex items-center gap-1 whitespace-nowrap">
											<svg
												class="h-3 w-3 shrink-0"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
												></path>
											</svg>
											<span>{project.period}</span>
										</span>
										<span class="flex items-center gap-0 whitespace-nowrap">
											<svg
												class="h-3 w-3 shrink-0"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
												></path>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
												></path>
											</svg>
											<span>{project.location}</span>
										</span>
									</div>
								</div>

								<!-- Description -->
								<p class="mb-4 text-sm font-normal leading-relaxed text-[#9da6b9]">
									{project.description}
								</p>

								<!-- Technologies -->
								<div class="flex flex-wrap gap-2">
									{#each project.technologies as tech}
										<span
											class="whitespace-nowrap rounded-md bg-[#282e39] px-2 py-1 text-xs font-medium text-[#9da6b9]"
										>
											{tech}
										</span>
									{/each}
								</div>
							</div>

							<!-- Gradient accent bar -->
							<div
								class="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b {project.color}"
							></div>
						</div>
					{/each}
				</div>

				<h2
					id="experience"
					class="px-4 pb-3 pt-5 text-xl font-bold leading-tight tracking-[-0.015em] text-white sm:pt-6 sm:text-2xl md:text-[22px]"
				>
					{t.experience.title}
				</h2>
				<div class="space-y-4 p-4 sm:space-y-5 sm:p-5">
					{#each t.projects as project, index}
						<div
							class="group relative overflow-hidden rounded-xl border border-[#282e39] bg-[#1a1f28] transition-all duration-300 hover:border-[#3a4049] hover:shadow-lg hover:shadow-black/20"
						>
							<!-- Gradient accent bar -->
							<div class="absolute left-0 top-0 h-full w-1 bg-gradient-to-b {project.color}"></div>

							<div class="py-4 pl-4 pr-4 sm:py-6 sm:pl-6 sm:pr-6">
								<!-- Header -->
								<div class="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
									<div class="flex-1">
										<div class="mb-2 flex items-start gap-3 sm:gap-4">
											
											<div class="min-w-0 flex-1">
												<h3 class="mb-1 text-lg font-bold leading-tight text-white sm:text-xl">
													{project.company}
												</h3>
												<p
													class="mb-2 bg-gradient-to-r text-sm font-semibold text-white sm:text-base {project.color} bg-clip-text text-transparent"
												>
													{project.role}
												</p>
												<div
													class="flex flex-wrap items-center gap-3 text-xs text-[#9da6b9] sm:gap-4 sm:text-sm"
												>
													<span class="flex items-center gap-1.5">
														<svg
															class="h-4 w-4"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
															></path>
														</svg>
														{project.period}
													</span>
													<span class="flex items-center gap-1.5">
														<svg
															class="h-4 w-4"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
															></path>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
															></path>
														</svg>
														{project.location}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>

								<!-- Description -->
								<p
									class="mb-4 text-xs font-normal leading-relaxed text-[#9da6b9] sm:mb-5 sm:text-sm"
								>
									{project.description}
								</p>

								<!-- Achievements -->
								<div class="mb-4 sm:mb-5">
									<h4
										class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white sm:text-sm"
									>
										<svg
											class="h-4 w-4 text-emerald-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											></path>
										</svg>
										{t.experience.achievementsTitle}
									</h4>
									<ul class="space-y-2 sm:space-y-2.5">
										{#each project.achievements as achievement}
											<li
												class="flex items-start gap-2 text-xs leading-relaxed text-[#9da6b9] sm:gap-3 sm:text-sm"
											>
												<svg
													class="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400 sm:mt-1 sm:h-4 sm:w-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M5 13l4 4L19 7"
													></path>
												</svg>
												<span>{achievement}</span>
											</li>
										{/each}
									</ul>
								</div>

								<!-- Technologies -->
								<div>
									<h4
										class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white sm:text-sm"
									>
										<svg
											class="h-4 w-4 text-blue-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
											></path>
										</svg>
										{t.experience.technologiesTitle}
									</h4>
									<div class="flex flex-wrap gap-2">
										{#each project.technologies as tech}
											<span
												class="rounded-lg border border-[#3a4049] bg-[#282e39] px-2.5 py-1 text-xs font-medium text-white transition-colors hover:border-[#4a5059] sm:px-3 sm:py-1.5"
											>
												{tech}
											</span>
										{/each}
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<h2
					id="skills"
					class="px-4 pb-3 pt-5 text-xl font-bold leading-tight tracking-[-0.015em] text-white sm:pt-6 sm:text-2xl md:text-[22px]"
				>
					{t.stack.title}
				</h2>
				<div class="flex flex-wrap gap-2 p-3 sm:gap-3 sm:p-4">
					{#each allSkills as skill}
						<div
							class="flex h-7 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#282e39] pl-3 pr-3 sm:h-8 sm:pl-4 sm:pr-4"
						>
							<p class="text-xs font-medium leading-normal text-white sm:text-sm">{skill}</p>
						</div>
					{/each}
				</div>

				<h2
					id="contact"
					class="px-4 pb-3 pt-5 text-xl font-bold leading-tight tracking-[-0.015em] text-white sm:pt-6 sm:text-2xl md:text-[22px]"
				>
					{t.contact.title}
				</h2>
				<p
					class="px-4 pb-3 pt-1 text-sm font-normal leading-normal text-white sm:pb-4 sm:text-base"
				>
					{t.contact.subtitle}
				</p>
				<div class="flex flex-col gap-3 px-4 pb-6 sm:flex-row sm:gap-4 sm:pb-8">
					<a
						href="mailto:avn2000inc@gmail.com"
						class="py-2 text-sm font-normal leading-normal text-white transition-colors hover:text-[#9da6b9] sm:py-0 sm:text-base"
						>{t.contact.email}</a
					>
					<a
						href="https://linkedin.com/in/adrián-vázquez-nieto-2538ab322"
						target="_blank"
						rel="noopener noreferrer"
						class="py-2 text-sm font-normal leading-normal text-white transition-colors hover:text-[#9da6b9] sm:py-0 sm:text-base"
						>{t.contact.linkedin}</a
					>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- LightGallery Component -->
{#if galleryItems.length > 0}
	<LightGallery galleryId="portfolio-gallery" items={galleryItems} openIndex={galleryOpenIndex} />
{/if}

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Escape' && mobileMenuOpen) {
			closeMobileMenu();
		}
	}}
/>

<style>
	/* Smooth scrolling */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Line clamp utility */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Hide scrollbar but keep functionality */
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	/* Ensure horizontal scroll works on touch devices */
	.overflow-x-auto {
		-webkit-overflow-scrolling: touch;
		overflow-x: auto;
		overflow-y: hidden;
	}

	/* Card hover animations - only on non-touch devices */
	@media (hover: hover) {
		.group:hover {
			transform: translateY(-2px);
		}
	}

	/* Smooth transitions for interactive elements */
	a,
	button {
		transition-property: color, background-color, border-color, opacity, transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 200ms;
	}

	/* Ensure touch targets are at least 44x44px for accessibility on mobile */
	@media (max-width: 768px) {
		nav a {
			min-height: 44px;
			display: flex;
			align-items: center;
		}
	}
</style>
