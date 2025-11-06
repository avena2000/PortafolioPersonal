import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, depends }) => {
    depends('app:lang');

    // Get preferred language from query param or default to Spanish
    const queryLang = url.searchParams.get('lang');
    const lang = (queryLang === 'en' || queryLang === 'es') ? queryLang : 'es';

    throw redirect(302, `/${lang}`);
};

