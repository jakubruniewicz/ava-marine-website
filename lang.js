function updateLanguageButtons(activeLang) {
    document.querySelectorAll('.language-switcher button').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === activeLang);
    });
}

async function setLanguage(lang) {
    try {
        // 🔧 dynamiczne wykrywanie poprawnej ścieżki do folderu lang
        let pathPrefix = '';
        if (window.location.pathname.includes('/ribs/') || window.location.pathname.includes('/olimpic_ribs/')) {
            pathPrefix = '../'; // jeśli jesteśmy w podfolderze
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
