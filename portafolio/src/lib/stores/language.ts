import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { page } from '$app/stores';
import { goto } from '$app/navigation';

export type Language = 'es' | 'en';

// Get initial language from URL or localStorage or default to Spanish
const getInitialLanguage = (): Language => {
	if (browser) {
		// Try to get from URL first
		const pathLang = window.location.pathname.split('/')[1];
		if (pathLang === 'en' || pathLang === 'es') {
			return pathLang as Language;
		}
		// Fallback to localStorage
		const stored = localStorage.getItem('language');
		if (stored === 'en' || stored === 'es') {
			return stored as Language;
		}
	}
	return 'es';
};

export const currentLanguage = writable<Language>(getInitialLanguage());

// Update language from URL when page changes
if (browser) {
	page.subscribe((p) => {
		const lang = (p.params?.lang as Language) || 'es';
		if (lang === 'es' || lang === 'en') {
			currentLanguage.set(lang);
			localStorage.setItem('language', lang);
		}
	});

	// Save to localStorage whenever language changes
	currentLanguage.subscribe((lang) => {
		if (browser) {
			localStorage.setItem('language', lang);
		}
	});
}

export const toggleLanguage = () => {
	currentLanguage.update((lang) => {
		const newLang = lang === 'es' ? 'en' : 'es';
		// Navigate to the new language URL
		if (browser) {
			const currentPath = window.location.pathname;
			const pathParts = currentPath.split('/');
			pathParts[1] = newLang;
			const newPath = pathParts.join('/');
			goto(newPath);
		}
		return newLang;
	});
};

