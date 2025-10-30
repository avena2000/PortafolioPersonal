import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Language = 'es' | 'en';

// Get initial language from localStorage or default to Spanish
const getInitialLanguage = (): Language => {
	if (browser) {
		const stored = localStorage.getItem('language');
		if (stored === 'en' || stored === 'es') {
			return stored as Language;
		}
	}
	return 'es';
};

export const currentLanguage = writable<Language>(getInitialLanguage());

// Save to localStorage whenever language changes
if (browser) {
	currentLanguage.subscribe((lang) => {
		localStorage.setItem('language', lang);
	});
}

export const toggleLanguage = () => {
	currentLanguage.update((lang) => (lang === 'es' ? 'en' : 'es'));
};

