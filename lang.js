function updateLanguageButtons(activeLang) {
    document.querySelectorAll('.language-switcher button').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === activeLang);
    });
}

async function setLanguage(lang) {
    try {
        let pathPrefix = '';
        if (
            window.location.pathname.includes('/ribs/') ||
            window.location.pathname.includes('/olimpic_ribs/')
        ) {
            pathPrefix = '../';
        }

        const response = await fetch(`${pathPrefix}lang/lang-${lang}.json`);
        if (!response.ok) throw new Error(`Nie znaleziono pliku języka: ${lang}`);

        const translations = await response.json();

        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });

        if (window.pageTitleKey && translations[window.pageTitleKey]) {
            document.title = translations[window.pageTitleKey];
        }

        localStorage.setItem('ava-lang', lang);

        updateLanguageButtons(lang);

    } catch (error) {
        console.error('Błąd wczytywania języka:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('ava-lang') || 'pl';
    setLanguage(savedLang);
});
