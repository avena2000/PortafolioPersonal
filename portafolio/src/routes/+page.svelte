<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { currentLanguage } from '$lib/stores/language';
	import { getTranslations } from '$lib/i18n/translations';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';

	let mounted = false;
	let mobileMenuOpen = false;

	$: t = getTranslations($currentLanguage);

	onMount(() => {
		mounted = true;
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

<div class="relative flex h-auto min-h-screen w-full flex-col bg-[#111318] dark group/design-root overflow-x-hidden" style='font-family: Inter, "Noto Sans", sans-serif;'>
	<div class="layout-container flex h-full grow flex-col">
		<header class="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#282e39] bg-[#111318] px-4 sm:px-6 md:px-10">
			<div class="flex items-center gap-3 sm:gap-4 text-white">
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
							<clipPath id="clip0_6_330"><rect width="48" height="48" fill="white"></rect></clipPath>
						</defs>
					</svg>
				</div>
				<h2 class="text-white text-sm sm:text-base md:text-lg font-bold leading-tight tracking-[-0.015em]">{t.meta.title}</h2>
			</div>
			<div class="flex flex-1 justify-end gap-3 sm:gap-4 md:gap-8">
				<div class="hidden md:flex items-center gap-6 lg:gap-9">
					<a class="text-white text-xs sm:text-sm font-medium leading-normal hover:text-[#9da6b9] transition-colors" href="#projects">{$currentLanguage === 'es' ? 'Proyectos' : 'Projects'}</a>
					<a class="text-white text-xs sm:text-sm font-medium leading-normal hover:text-[#9da6b9] transition-colors" href="#experience">{t.experience.title}</a>
					<a class="text-white text-xs sm:text-sm font-medium leading-normal hover:text-[#9da6b9] transition-colors" href="#skills">{t.stack.title}</a>
					<a class="text-white text-xs sm:text-sm font-medium leading-normal hover:text-[#9da6b9] transition-colors" href="#contact">{t.contact.title}</a>
				</div>
				<!-- Mobile menu button -->
				<button
					on:click={toggleMobileMenu}
					class="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#282e39] transition-colors"
					aria-label="Toggle menu"
					aria-expanded={mobileMenuOpen}
				>
					{#if mobileMenuOpen}
						<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					{:else}
						<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					{/if}
				</button>
				<div class="hidden md:flex items-center">
					<LanguageSwitcher />
				</div>
			</div>
		</header>

		<!-- Mobile menu overlay -->
		{#if mobileMenuOpen}
			<div class="fixed inset-0 z-40 md:hidden" transition:fade={{ duration: 200 }}>
				<div class="fixed inset-0 bg-black/50" on:click={closeMobileMenu}></div>
				<div class="fixed top-14 left-0 right-0 bg-[#111318] border-b border-[#282e39] shadow-lg" transition:slide={{ duration: 200, axis: 'y' }}>
					<nav class="flex flex-col py-4">
						<a
							class="px-6 py-3 text-white text-base font-medium hover:bg-[#282e39] transition-colors"
							href="#projects"
							on:click={closeMobileMenu}
						>
							{$currentLanguage === 'es' ? 'Proyectos' : 'Projects'}
						</a>
						<a
							class="px-6 py-3 text-white text-base font-medium hover:bg-[#282e39] transition-colors"
							href="#experience"
							on:click={closeMobileMenu}
						>
							{t.experience.title}
						</a>
						<a
							class="px-6 py-3 text-white text-base font-medium hover:bg-[#282e39] transition-colors"
							href="#skills"
							on:click={closeMobileMenu}
						>
							{t.stack.title}
						</a>
						<a
							class="px-6 py-3 text-white text-base font-medium hover:bg-[#282e39] transition-colors"
							href="#contact"
							on:click={closeMobileMenu}
						>
							{t.contact.title}
						</a>
						<div class="px-6 py-3 border-t border-[#282e39] mt-2">
							<LanguageSwitcher />
						</div>
					</nav>
				</div>
			</div>
		{/if}

		<!-- Spacer to offset fixed header height -->
		<div class="h-14"></div>

		<div class="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40 flex flex-1 justify-center py-5 sm:py-6 md:py-8 w-full">
			<div class="layout-content-container flex flex-col max-w-[960px] flex-1 w-full">
				<div class="flex p-4 sm:p-6 @container">
					<div class="flex w-full flex-col gap-4 sm:gap-6 items-center">
						<div class="flex gap-4 sm:gap-6 flex-col items-center">
							<div class="relative">
								<img
									src="/perfil.jpeg"
									alt="Profile"
									class="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[#282e39] shadow-lg"
								/>
								<!-- Gradient ring decoration -->
								<div class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 pointer-events-none"></div>
							</div>
							<div class="flex flex-col items-center justify-center px-2">
								<p class="text-white text-xl sm:text-2xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">{t.hero.title1} {t.hero.title2}</p>
								<p class="text-[#9da6b9] text-sm sm:text-base font-normal leading-normal text-center mt-1">{t.hero.subtitle}</p>
							</div>
						</div>
					</div>
				</div>

				<h2 id="projects" class="text-white text-xl sm:text-2xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 sm:pt-6">{$currentLanguage === 'es' ? 'Proyectos' : 'Projects'}</h2>
				<!-- Mobile: horizontal scroll with padding on both sides -->
				<div class="md:hidden w-full overflow-x-auto scrollbar-hide pb-6 scroll-smooth snap-x snap-mandatory px-4" style="scrollbar-width: none; -ms-overflow-style: none;">
					<div class="flex gap-3 min-w-max">
					{#each t.projects as project, index}
						<div class="group relative shrink-0 w-[280px] overflow-hidden rounded-xl border border-[#282e39] bg-[#1a1f28] hover:border-[#3a4049] transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1 flex flex-col snap-start">
							<!-- Image Section - Prepared for images -->
							<div class="relative w-full h-48 bg-gradient-to-br {project.color} overflow-hidden shrink-0">
								<!-- 
									To add an image, uncomment and update the img tag below:
									<img src="/images/projects/{project.company.toLowerCase().replace(/\s+/g, '-')}.jpg" 
										alt="{project.company}" 
										class="w-full h-full object-cover" 
										on:error={(e) => e.target.style.display = 'none'}
									/>
								-->
								
								<!-- Fallback gradient background -->
								<div class="absolute inset-0 bg-gradient-to-br {project.color}"></div>
								
								<!-- Pattern overlay for visual interest -->
								<div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 24px 24px;"></div>
								
								<!-- Company initials overlay -->
								<div class="absolute inset-0 flex items-center justify-center">
									<span class="text-white text-5xl font-bold opacity-20">{project.company.split(' ').map(w => w[0]).join('').substring(0, 3)}</span>
								</div>
								
								<!-- Gradient accent overlay -->
								<div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1a1f28] via-[#1a1f28]/80 to-transparent"></div>
							</div>
							
							<!-- Content Section -->
							<div class="flex-1 p-4 sm:p-5 flex flex-col">
								<!-- Header -->
								<div class="mb-3">
									<h3 class="text-white text-base sm:text-lg font-bold leading-tight mb-1">{project.company}</h3>
									<p class="text-[#9da6b9] text-xs sm:text-sm font-medium mb-2">{project.role}</p>
									<div class="flex flex-wrap items-center gap-2 sm:gap-3 text-[#9da6b9] text-xs">
										<span class="flex items-center gap-1 whitespace-nowrap">
											<svg class="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
											</svg>
											<span>{project.period}</span>
										</span>
										<span class="flex items-center gap-1 whitespace-nowrap">
											<svg class="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
											</svg>
											<span>{project.location}</span>
										</span>
									</div>
								</div>
								
								<!-- Description -->
								<p class="text-[#9da6b9] text-sm font-normal leading-relaxed mb-4">
									{project.description}
								</p>
								
								<!-- Technologies -->
								<div class="flex flex-wrap gap-2">
									{#each project.technologies as tech}
										<span class="px-2 py-1 rounded-md bg-[#282e39] text-[#9da6b9] text-xs font-medium whitespace-nowrap">
											{tech}
										</span>
									{/each}
								</div>
							</div>
							
							<!-- Gradient accent bar -->
							<div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b {project.color}"></div>
						</div>
					{/each}
					<!-- Spacer for better scroll ending -->
					<div class="shrink-0 w-4"></div>
					</div>
				</div>
				
				<!-- Desktop: show all projects in grid -->
				<div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 px-4 pb-6">
					{#each t.projects as project, index}
						<div class="group relative overflow-hidden rounded-xl border border-[#282e39] bg-[#1a1f28] hover:border-[#3a4049] transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1 flex flex-col">
							<!-- Image Section - Prepared for images -->
							<div class="relative w-full h-48 bg-gradient-to-br {project.color} overflow-hidden shrink-0">
								<!-- 
									To add an image, uncomment and update the img tag below:
									<img src="/images/projects/{project.company.toLowerCase().replace(/\s+/g, '-')}.jpg" 
										alt="{project.company}" 
										class="w-full h-full object-cover" 
										on:error={(e) => e.target.style.display = 'none'}
									/>
								-->
								
								<!-- Fallback gradient background -->
								<div class="absolute inset-0 bg-gradient-to-br {project.color}"></div>
								
								<!-- Pattern overlay for visual interest -->
								<div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 24px 24px;"></div>
								
								<!-- Company initials overlay -->
								<div class="absolute inset-0 flex items-center justify-center">
									<span class="text-white text-5xl font-bold opacity-20">{project.company.split(' ').map(w => w[0]).join('').substring(0, 3)}</span>
								</div>
								
								<!-- Gradient accent overlay -->
								<div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1a1f28] via-[#1a1f28]/80 to-transparent"></div>
							</div>
							
							<!-- Content Section -->
							<div class="flex-1 p-5 flex flex-col">
								<!-- Header -->
								<div class="mb-3">
									<h3 class="text-white text-lg font-bold leading-tight mb-1">{project.company}</h3>
									<p class="text-[#9da6b9] text-sm font-medium mb-2">{project.role}</p>
									<div class="flex flex-wrap items-center gap-3 text-[#9da6b9] text-xs">
										<span class="flex items-center gap-1 whitespace-nowrap">
											<svg class="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
											</svg>
											<span>{project.period}</span>
										</span>
										<span class="flex items-center gap-1 whitespace-nowrap">
											<svg class="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
											</svg>
											<span>{project.location}</span>
										</span>
									</div>
								</div>
								
								<!-- Description -->
								<p class="text-[#9da6b9] text-sm font-normal leading-relaxed mb-4">
									{project.description}
								</p>
								
								<!-- Technologies -->
								<div class="flex flex-wrap gap-2">
									{#each project.technologies as tech}
										<span class="px-2 py-1 rounded-md bg-[#282e39] text-[#9da6b9] text-xs font-medium whitespace-nowrap">
											{tech}
										</span>
									{/each}
								</div>
							</div>
							
							<!-- Gradient accent bar -->
							<div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b {project.color}"></div>
						</div>
					{/each}
				</div>

				<h2 id="experience" class="text-white text-xl sm:text-2xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 sm:pt-6">{t.experience.title}</h2>
				<div class="space-y-4 sm:space-y-5 p-4 sm:p-5">
					{#each t.projects as project, index}
						<div class="group relative overflow-hidden rounded-xl border border-[#282e39] bg-[#1a1f28] hover:border-[#3a4049] transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
							<!-- Gradient accent bar -->
							<div class="absolute left-0 top-0 h-full w-1 bg-gradient-to-b {project.color}"></div>
							
							<div class="pl-4 pr-4 py-4 sm:pl-6 sm:pr-6 sm:py-6">
								<!-- Header -->
								<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
									<div class="flex-1">
										<div class="flex items-start gap-3 sm:gap-4 mb-2">
											<!-- Company Icon -->
											<div class="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br {project.color} flex items-center justify-center">
												<span class="text-white text-xs sm:text-sm font-bold">{project.company.split(' ').map(w => w[0]).join('').substring(0, 2)}</span>
											</div>
											<div class="flex-1 min-w-0">
												<h3 class="text-white text-lg sm:text-xl font-bold leading-tight mb-1">{project.company}</h3>
												<p class="text-white text-sm sm:text-base font-semibold mb-2 bg-gradient-to-r {project.color} bg-clip-text text-transparent">
													{project.role}
												</p>
												<div class="flex flex-wrap items-center gap-3 sm:gap-4 text-[#9da6b9] text-xs sm:text-sm">
													<span class="flex items-center gap-1.5">
														<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
														</svg>
														{project.period}
													</span>
													<span class="flex items-center gap-1.5">
														<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
														</svg>
														{project.location}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								<!-- Description -->
								<p class="text-[#9da6b9] text-xs sm:text-sm font-normal leading-relaxed mb-4 sm:mb-5">
									{project.description}
								</p>
								
								<!-- Achievements -->
								<div class="mb-4 sm:mb-5">
									<h4 class="text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
										<svg class="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
										{t.experience.achievementsTitle}
									</h4>
									<ul class="space-y-2 sm:space-y-2.5">
										{#each project.achievements as achievement}
											<li class="flex items-start gap-2 sm:gap-3 text-[#9da6b9] text-xs sm:text-sm leading-relaxed">
												<svg class="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
												</svg>
												<span>{achievement}</span>
											</li>
										{/each}
									</ul>
								</div>
								
								<!-- Technologies -->
								<div>
									<h4 class="text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
										<svg class="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
										</svg>
										{t.experience.technologiesTitle}
									</h4>
									<div class="flex flex-wrap gap-2">
										{#each project.technologies as tech}
											<span class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#282e39] text-white text-xs font-medium border border-[#3a4049] hover:border-[#4a5059] transition-colors">
												{tech}
											</span>
										{/each}
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<h2 id="skills" class="text-white text-xl sm:text-2xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 sm:pt-6">{t.stack.title}</h2>
				<div class="flex gap-2 sm:gap-3 p-3 sm:p-4 flex-wrap">
					{#each allSkills as skill}
						<div class="flex h-7 sm:h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#282e39] pl-3 pr-3 sm:pl-4 sm:pr-4">
							<p class="text-white text-xs sm:text-sm font-medium leading-normal">{skill}</p>
						</div>
					{/each}
				</div>

				<h2 id="contact" class="text-white text-xl sm:text-2xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 sm:pt-6">{t.contact.title}</h2>
				<p class="text-white text-sm sm:text-base font-normal leading-normal pb-3 sm:pb-4 pt-1 px-4">{t.contact.subtitle}</p>
				<div class="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 pb-6 sm:pb-8">
					<a href="mailto:contact@example.com" class="text-white text-sm sm:text-base font-normal leading-normal hover:text-[#9da6b9] transition-colors py-2 sm:py-0">{t.contact.email}</a>
					<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-white text-sm sm:text-base font-normal leading-normal hover:text-[#9da6b9] transition-colors py-2 sm:py-0">{t.contact.linkedin}</a>
					<a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-white text-sm sm:text-base font-normal leading-normal hover:text-[#9da6b9] transition-colors py-2 sm:py-0">{t.contact.github}</a>
				</div>
			</div>
		</div>
	</div>
</div>

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
	a, button {
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

<svelte:window on:keydown={(e) => e.key === 'Escape' && mobileMenuOpen && closeMobileMenu()} />
