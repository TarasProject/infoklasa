/* Shared demo behaviour for all three home-page variants:
   i18n (uk/pl/en, no reload), theme (auto/light/dark), accessibility panel,
   Ctrl+K search palette, RODO cookie banner, demo login state, icons. */
(function () {
  'use strict';

  const D = {
    uk: {
      'site': 'infoklasa', 'lang.label': 'Мова', 'skip': 'Перейти до змісту',
      'nav.home': 'Головна', 'nav.catalog': 'Каталог тем', 'nav.matura': 'Матура', 'nav.glossary': 'Глосарій', 'nav.news': 'Новини', 'nav.about': 'Про сайт', 'nav.profile': 'Профіль', 'nav.search': 'Пошук',
      'login': 'Увійти', 'logout': 'Вийти',
      'search.ph': 'Знайди тему, термін або тест…', 'search.btn': 'Пошук', 'search.popular': 'Часто шукають:',
      'hero.title': 'Інформатика, яку зручно вчити', 'hero.sub': 'Теорія, тести й вправи до кожної теми — в одному місці. Прочитай і одразу перевір себе.', 'hero.q': 'Що вчимо сьогодні?',
      'banner.admin': 'Банер · керує адміністратор',
      'banner1.kicker': 'Тиждень алгоритмів', 'banner1.title': 'Сортування наживо: подивись на кожен крок', 'banner1.text': 'Бульбашкою, вставками, злиттям — порівняй, скільки кроків робить кожен алгоритм.', 'banner1.cta': 'Відкрити тему',
      'banner2.kicker': 'Тиждень мереж', 'banner2.title': 'Як пакет долітає з Кракова до Києва', 'banner2.text': 'Маршрутизатори, TTL і traceroute — прослідкуй шлях одного пакета.', 'banner2.cta': 'Прокласти маршрут',
      'banner3.kicker': 'Нове на сайті', 'banner3.title': 'Python просто в браузері', 'banner3.text': 'Змінюй код у будь-якій темі й натискай «Запустити» — нічого не треба встановлювати.', 'banner3.cta': 'Спробувати', 'run': 'Запустити', 'console': 'Консоль',
      'ann.label': 'Оголошення', 'ann.1': '10–17 жовтня — шкільний етап олімпіади з інформатики', 'ann.2': 'Нова тема: SQL JOIN — вже в каталозі', 'ann.3': '20 жовтня — пробна матура для 2 класу', 'ann.more': 'Усі оголошення', 'ann.important': 'Важливо',
      'sec.title': 'Розділи', 'sec.alg': 'Алгоритми', 'sec.prog': 'Програмування', 'sec.net': 'Мережі', 'sec.db': 'Бази даних', 'sec.hw': "Комп'ютерні системи", 'sec.sec': 'Кібербезпека', 'sec.matura': 'Підготовка до матури', 'sec.gloss': 'Глосарій',
      'cont.title': 'Продовжити з місця, де зупинився', 'cont.1': 'Рекурсія: базовий випадок і стек викликів', 'cont.2': 'Тест: двійкова система числення', 'cont.go': 'Продовжити', 'cont.score': '7 з 10 правильних', 'cont.read': 'Прочитано 60%', 'cont.week': 'Цього тижня', 'cont.streak': 'тем пройдено',
      'guest.title': 'Твій прогрес — у профілі', 'guest.text': 'Увійди через email — без пароля. Збережемо прочитане, результати тестів і закладки.', 'guest.cta': 'Увійти через email',
      'col.title': 'Назва', 'col.sec': 'Розділ', 'col.type': 'Тип', 'col.level': 'Складність', 'col.time': 'Час', 'new.title': 'Нові матеріали', 'new.all': 'Увесь каталог',
      'type.material': 'Матеріал', 'type.test': 'Тест', 'type.exercise': 'Вправа', 'type.task': 'Завдання', 'type.term': 'Термін', 'type.topic': 'Тема',
      'lvl.1': 'Базовий', 'lvl.2': 'Середній', 'lvl.3': 'Поглиблений', 'cls': '{n} клас', 'min': '{n} хв',
      'mat1': 'Бінарний пошук', 'mat2': 'SQL JOIN на прикладах', 'mat3': 'TCP і UDP: у чому різниця', 'mat4': 'Рекурсія в Python: задачі', 'mat5': 'Паролі та хешування', 'mat6': 'Матура: задачі на рекурсію',
      'missing': 'Переклад відсутній', 'shownIn': 'показано',
      'topic': ['тема', 'теми', 'тем'],
      'cookie.text': 'Ми використовуємо лише необхідні cookies і анонімну статистику без персональних даних.', 'cookie.policy': 'Політика приватності', 'cookie.accept': 'Прийняти', 'cookie.necessary': 'Лише необхідні', 'cookie.settings': 'Налаштувати', 'cookie.save': 'Зберегти вибір', 'cookie.nec': 'Необхідні: вхід, мова, тема — завжди увімкнено', 'cookie.stats': 'Анонімна статистика відвідувань (Plausible)',
      'a11y.title': 'Доступність', 'a11y.large': 'Більший шрифт', 'a11y.contrast': 'Високий контраст', 'a11y.dyslexia': 'Шрифт для дислексії', 'a11y.spacing': 'Збільшені інтервали', 'a11y.motion': 'Вимкнути анімації', 'a11y.reset': 'Скинути все', 'a11y.open': 'Налаштування доступності', 'close': 'Закрити',
      'theme.auto': 'Авто', 'theme.light': 'Світла', 'theme.dark': 'Темна', 'theme.label': 'Тема',
      'pal.empty': 'Нічого не знайдено. Спробуй коротше слово або відкрий глосарій.', 'pal.hint': '↑↓ — вибір · Enter — відкрити · Esc — закрити', 'pal.popular': 'Популярне', 'pal.results': 'Результати',
      'demo.auth': 'Демо: учень увійшов', 'demo.variants': 'Варіанти дизайну', 'toast.open': 'Демо: відкриваємо', 'toast.login': 'Демо: magic link надіслано б на email', 'toast.saved': 'Вибір cookies збережено',
      'foot.about': 'Про автора', 'foot.privacy': 'Приватність і cookies', 'foot.feedback': 'Написати вчителю', 'foot.made': 'Зроблено вчителем інформатики · Краків',
      'g.rec': 'Рекурсія', 'g.hash': 'Хеш-функція', 'g.ip': 'IP-адреса', 'g.pk': 'Первинний ключ', 'g.alg': 'Алгоритм', 'tp.sort': 'Сортування бульбашкою', 'tp.bin': 'Двійкова система числення', 'tp.loops': 'Цикли в Python', 'tp.osi': 'Модель OSI', 'tp.norm': 'Нормалізація баз даних'
    },
    pl: {
      'lang.label': 'Język', 'skip': 'Przejdź do treści',
      'nav.home': 'Start', 'nav.catalog': 'Katalog tematów', 'nav.matura': 'Matura', 'nav.glossary': 'Słowniczek', 'nav.news': 'Aktualności', 'nav.about': 'O stronie', 'nav.profile': 'Profil', 'nav.search': 'Szukaj',
      'login': 'Zaloguj się', 'logout': 'Wyloguj',
      'search.ph': 'Szukaj tematu, pojęcia lub testu…', 'search.btn': 'Szukaj', 'search.popular': 'Często szukane:',
      'hero.title': 'Informatyka, której wygodnie się uczyć', 'hero.sub': 'Teoria, testy i ćwiczenia do każdego tematu — w jednym miejscu. Przeczytaj i od razu sprawdź się.', 'hero.q': 'Czego uczymy się dziś?',
      'banner.admin': 'Baner · zarządza administrator',
      'banner1.kicker': 'Tydzień algorytmów', 'banner1.title': 'Sortowanie na żywo: zobacz każdy krok', 'banner1.text': 'Bąbelkowe, przez wstawianie, przez scalanie — porównaj, ile kroków wykonuje każdy algorytm.', 'banner1.cta': 'Otwórz temat',
      'banner2.kicker': 'Tydzień sieci', 'banner2.title': 'Jak pakiet leci z Krakowa do Kijowa', 'banner2.text': 'Routery, TTL i traceroute — prześledź drogę jednego pakietu.', 'banner2.cta': 'Wyznacz trasę',
      'banner3.kicker': 'Nowość', 'banner3.title': 'Python prosto w przeglądarce', 'banner3.text': 'Zmieniaj kod w dowolnym temacie i klikaj „Uruchom” — nic nie trzeba instalować.', 'banner3.cta': 'Wypróbuj', 'run': 'Uruchom', 'console': 'Konsola',
      'ann.label': 'Ogłoszenia', 'ann.1': '10–17 października — etap szkolny olimpiady informatycznej', 'ann.2': 'Nowy temat: SQL JOIN — już w katalogu', 'ann.3': '20 października — próbna matura dla klasy 2', 'ann.more': 'Wszystkie ogłoszenia', 'ann.important': 'Ważne',
      'sec.title': 'Działy', 'sec.alg': 'Algorytmy', 'sec.prog': 'Programowanie', 'sec.net': 'Sieci', 'sec.db': 'Bazy danych', 'sec.hw': 'Systemy komputerowe', 'sec.sec': 'Cyberbezpieczeństwo', 'sec.matura': 'Przygotowanie do matury', 'sec.gloss': 'Słowniczek',
      'cont.title': 'Kontynuuj naukę', 'cont.1': 'Rekurencja: przypadek bazowy i stos wywołań', 'cont.2': 'Test: system dwójkowy', 'cont.go': 'Kontynuuj', 'cont.score': '7 z 10 poprawnych', 'cont.read': 'Przeczytano 60%', 'cont.week': 'W tym tygodniu', 'cont.streak': 'tematów za tobą',
      'guest.title': 'Twoje postępy — w profilu', 'guest.text': 'Zaloguj się e-mailem — bez hasła. Zapiszemy przeczytane tematy, wyniki testów i zakładki.', 'guest.cta': 'Zaloguj się e-mailem',
      'col.title': 'Tytuł', 'col.sec': 'Dział', 'col.type': 'Typ', 'col.level': 'Poziom', 'col.time': 'Czas', 'new.title': 'Nowe materiały', 'new.all': 'Cały katalog',
      'type.material': 'Materiał', 'type.test': 'Test', 'type.exercise': 'Ćwiczenie', 'type.task': 'Zadanie', 'type.term': 'Pojęcie', 'type.topic': 'Temat',
      'lvl.1': 'Podstawowy', 'lvl.2': 'Średni', 'lvl.3': 'Rozszerzony', 'cls': 'Klasa {n}', 'min': '{n} min',
      'mat1': 'Wyszukiwanie binarne', 'mat3': 'TCP i UDP: czym się różnią', 'mat4': 'Rekurencja w Pythonie: zadania', 'mat5': 'Hasła i haszowanie', 'mat6': 'Matura: zadania z rekurencji',
      'missing': 'Brak tłumaczenia', 'shownIn': 'pokazano',
      'topic': ['temat', 'tematy', 'tematów'],
      'cookie.text': 'Używamy tylko niezbędnych plików cookies i anonimowych statystyk bez danych osobowych.', 'cookie.policy': 'Polityka prywatności', 'cookie.accept': 'Akceptuję', 'cookie.necessary': 'Tylko niezbędne', 'cookie.settings': 'Ustawienia', 'cookie.save': 'Zapisz wybór', 'cookie.nec': 'Niezbędne: logowanie, język, motyw — zawsze włączone', 'cookie.stats': 'Anonimowe statystyki odwiedzin (Plausible)',
      'a11y.title': 'Dostępność', 'a11y.large': 'Większa czcionka', 'a11y.contrast': 'Wysoki kontrast', 'a11y.dyslexia': 'Czcionka dla dyslektyków', 'a11y.spacing': 'Większe odstępy', 'a11y.motion': 'Wyłącz animacje', 'a11y.reset': 'Resetuj wszystko', 'a11y.open': 'Ustawienia dostępności', 'close': 'Zamknij',
      'theme.auto': 'Auto', 'theme.light': 'Jasny', 'theme.dark': 'Ciemny', 'theme.label': 'Motyw',
      'pal.empty': 'Nic nie znaleziono. Spróbuj krótszego słowa lub otwórz słowniczek.', 'pal.hint': '↑↓ — wybór · Enter — otwórz · Esc — zamknij', 'pal.popular': 'Popularne', 'pal.results': 'Wyniki',
      'demo.auth': 'Demo: uczeń zalogowany', 'demo.variants': 'Warianty projektu', 'toast.open': 'Demo: otwieramy', 'toast.login': 'Demo: magic link zostałby wysłany e-mailem', 'toast.saved': 'Wybór cookies zapisany',
      'foot.about': 'O autorze', 'foot.privacy': 'Prywatność i cookies', 'foot.feedback': 'Napisz do nauczyciela', 'foot.made': 'Stworzone przez nauczyciela informatyki · Kraków',
      'g.rec': 'Rekurencja', 'g.hash': 'Funkcja skrótu', 'g.ip': 'Adres IP', 'g.pk': 'Klucz główny', 'g.alg': 'Algorytm', 'tp.sort': 'Sortowanie bąbelkowe', 'tp.bin': 'System dwójkowy', 'tp.loops': 'Pętle w Pythonie', 'tp.osi': 'Model OSI', 'tp.norm': 'Normalizacja baz danych'
    },
    en: {
      'lang.label': 'Language', 'skip': 'Skip to content',
      'nav.home': 'Home', 'nav.catalog': 'Topics', 'nav.matura': 'Matura', 'nav.glossary': 'Glossary', 'nav.news': 'News', 'nav.about': 'About', 'nav.profile': 'Profile', 'nav.search': 'Search',
      'login': 'Log in', 'logout': 'Log out',
      'search.ph': 'Find a topic, term or test…', 'search.btn': 'Search', 'search.popular': 'Popular:',
      'hero.title': 'Computer science that’s easy to learn', 'hero.sub': 'Theory, tests and exercises for every topic — in one place. Read it, then check yourself right away.', 'hero.q': 'What are we learning today?',
      'banner.admin': 'Banner · managed by admin',
      'banner1.kicker': 'Algorithms week', 'banner1.title': 'Sorting, live: watch every step', 'banner1.text': 'Bubble, insertion, merge — compare how many steps each algorithm takes.', 'banner1.cta': 'Open topic',
      'banner2.kicker': 'Networks week', 'banner2.title': 'How a packet travels from Kraków to Kyiv', 'banner2.text': 'Routers, TTL and traceroute — follow a single packet’s path.', 'banner2.cta': 'Trace the route',
      'banner3.kicker': 'New', 'banner3.title': 'Python, right in your browser', 'banner3.text': 'Edit the code in any topic and press “Run” — nothing to install.', 'banner3.cta': 'Try it', 'run': 'Run', 'console': 'Console',
      'ann.label': 'Announcements', 'ann.1': 'Oct 10–17 — school round of the Informatics Olympiad', 'ann.2': 'New topic: SQL JOIN — now in the catalogue', 'ann.3': 'Oct 20 — mock Matura for grade 2', 'ann.more': 'All announcements', 'ann.important': 'Important',
      'sec.title': 'Sections', 'sec.alg': 'Algorithms', 'sec.prog': 'Programming', 'sec.net': 'Networks', 'sec.db': 'Databases', 'sec.hw': 'Computer systems', 'sec.sec': 'Cybersecurity', 'sec.matura': 'Matura prep', 'sec.gloss': 'Glossary',
      'cont.title': 'Pick up where you left off', 'cont.1': 'Recursion: base case and the call stack', 'cont.2': 'Test: the binary number system', 'cont.go': 'Continue', 'cont.score': '7 of 10 correct', 'cont.read': '60% read', 'cont.week': 'This week', 'cont.streak': 'topics done',
      'guest.title': 'Your progress lives in your profile', 'guest.text': 'Log in with your email — no password. We’ll keep what you’ve read, your test scores and bookmarks.', 'guest.cta': 'Log in with email',
      'col.title': 'Title', 'col.sec': 'Section', 'col.type': 'Type', 'col.level': 'Level', 'col.time': 'Time', 'new.title': 'New materials', 'new.all': 'Full catalogue',
      'type.material': 'Reading', 'type.test': 'Test', 'type.exercise': 'Exercise', 'type.task': 'Task', 'type.term': 'Term', 'type.topic': 'Topic',
      'lvl.1': 'Basic', 'lvl.2': 'Intermediate', 'lvl.3': 'Advanced', 'cls': 'Grade {n}', 'min': '{n} min',
      'mat1': 'Binary search', 'mat2': 'SQL JOIN by example', 'mat3': 'TCP vs UDP', 'mat4': 'Recursion in Python: problems', 'mat6': 'Matura: recursion problems',
      'missing': 'Translation missing', 'shownIn': 'shown in',
      'topic': ['topic', 'topics', 'topics'],
      'cookie.text': 'We only use essential cookies and anonymous statistics with no personal data.', 'cookie.policy': 'Privacy policy', 'cookie.accept': 'Accept', 'cookie.necessary': 'Essential only', 'cookie.settings': 'Customise', 'cookie.save': 'Save choice', 'cookie.nec': 'Essential: login, language, theme — always on', 'cookie.stats': 'Anonymous visit statistics (Plausible)',
      'a11y.title': 'Accessibility', 'a11y.large': 'Larger text', 'a11y.contrast': 'High contrast', 'a11y.dyslexia': 'Dyslexia-friendly font', 'a11y.spacing': 'Wider spacing', 'a11y.motion': 'Turn off animations', 'a11y.reset': 'Reset all', 'a11y.open': 'Accessibility settings', 'close': 'Close',
      'theme.auto': 'Auto', 'theme.light': 'Light', 'theme.dark': 'Dark', 'theme.label': 'Theme',
      'pal.empty': 'Nothing found. Try a shorter word or open the glossary.', 'pal.hint': '↑↓ select · Enter open · Esc close', 'pal.popular': 'Popular', 'pal.results': 'Results',
      'demo.auth': 'Demo: student logged in', 'demo.variants': 'Design variants', 'toast.open': 'Demo: opening', 'toast.login': 'Demo: a magic link would be emailed', 'toast.saved': 'Cookie choice saved',
      'foot.about': 'About the author', 'foot.privacy': 'Privacy & cookies', 'foot.feedback': 'Message the teacher', 'foot.made': 'Made by a computer science teacher · Kraków',
      'g.rec': 'Recursion', 'g.hash': 'Hash function', 'g.ip': 'IP address', 'g.pk': 'Primary key', 'g.alg': 'Algorithm', 'tp.sort': 'Bubble sort', 'tp.bin': 'Binary number system', 'tp.loops': 'Loops in Python', 'tp.osi': 'OSI model', 'tp.norm': 'Database normalisation'
    }
  };

  const INDEX = [
    { k: 'tp.sort', type: 'topic', sec: 'alg' }, { k: 'mat1', type: 'material', sec: 'alg' }, { k: 'g.alg', type: 'term', sec: 'alg' },
    { k: 'tp.loops', type: 'topic', sec: 'prog' }, { k: 'mat4', type: 'task', sec: 'prog' }, { k: 'g.rec', type: 'term', sec: 'prog' },
    { k: 'tp.osi', type: 'topic', sec: 'net' }, { k: 'mat3', type: 'test', sec: 'net' }, { k: 'g.ip', type: 'term', sec: 'net' },
    { k: 'mat2', type: 'exercise', sec: 'db' }, { k: 'tp.norm', type: 'topic', sec: 'db' }, { k: 'g.pk', type: 'term', sec: 'db' },
    { k: 'tp.bin', type: 'topic', sec: 'hw' }, { k: 'mat5', type: 'material', sec: 'sec' }, { k: 'g.hash', type: 'term', sec: 'sec' },
    { k: 'mat6', type: 'test', sec: 'matura' }
  ];

  const ICONS = {
    alg: '<rect x="3" y="4" width="7" height="5" rx="1"/><rect x="14" y="15" width="7" height="5" rx="1"/><path d="M6.5 9v4h11v2"/>',
    prog: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    net: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5l-5.5 5.2M12 12l5.5 5.2"/>',
    db: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
    hw: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
    sec: '<path d="M12 3l7 3v5c0 4.6-2.9 7.9-7 10-4.1-2.1-7-5.4-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    matura: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3.5 2.2 8.5 2.2 12 0v-5M22 9v6"/>',
    gloss: '<path d="M5 4.5A1.5 1.5 0 016.5 3H19v15H6.5A1.5 1.5 0 005 19.5z"/><path d="M5 19.5A1.5 1.5 0 006.5 21H19v-3M9 7h6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    theme: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 010 16z" fill="currentColor"/>',
    a11y: '<circle cx="12" cy="4.5" r="1.8"/><path d="M5 8.5l7 1.5 7-1.5M12 10v4.5l-3 6M12 14.5l3 6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    megaphone: '<path d="M3 10v4h4l7 4V6l-7 4z"/><path d="M18 9a4 4 0 010 6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.2 3.2 3.2 14.8 0 18M12 3c-3.2 3.2-3.2 14.8 0 18"/>',
    play: '<path d="M7 4.5l12 7.5-12 7.5z" fill="currentColor"/>',
    home: '<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>'
  };
  function icon(name, cls) {
    return '<svg class="ico ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONS[name] || '') + '</svg>';
  }

  const store = {
    get(k) { try { return localStorage.getItem('infoklasa.' + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem('infoklasa.' + k, v); } catch (e) { /* storage blocked: stay in-memory */ } }
  };
  const root = document.documentElement;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));

  let lang = store.get('lang'); if (!D[lang]) lang = 'uk';
  let theme = store.get('theme') || 'auto';
  const A11Y = ['large', 'contrast', 'dyslexia', 'spacing', 'motion'];
  let a11y = []; try { a11y = JSON.parse(store.get('a11y') || '[]'); } catch (e) { a11y = []; }
  let auth = store.get('auth') === '1';

  function t(k) { const v = D[lang][k] != null ? D[lang][k] : (D.uk[k] != null ? D.uk[k] : k); return v; }
  function fmt(s, n) { return typeof s === 'string' ? s.replace('{n}', n == null ? '' : n) : s; }
  function plural(n, forms) {
    if (!Array.isArray(forms)) return forms;
    if (lang === 'en') return n === 1 ? forms[0] : forms[1];
    const m10 = n % 10, m100 = n % 100;
    if (n === 1 || (lang === 'uk' && m10 === 1 && m100 !== 11)) return forms[0];
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return forms[1];
    return forms[2];
  }
  const motionOff = () => root.classList.contains('a11y-motion') || matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- injected component styles (use each page's tokens) ---------- */
  const css = `
  [hidden]{display:none!important}
  html:not(.is-auth) .only-auth{display:none!important} html.is-auth .only-guest{display:none!important}
  .ico{width:1.25em;height:1.25em;flex:none;display:inline-block;vertical-align:middle}
  :focus-visible{outline:3px solid var(--focus,var(--accent));outline-offset:2px;border-radius:4px}
  .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
  .skip{position:absolute;left:16px;top:-60px;z-index:100;background:var(--ink);color:var(--bg);padding:10px 14px;border-radius:8px}
  .skip:focus{top:12px}
  html.a11y-large{font-size:118%}
  html.a11y-dyslexia body *:not(code):not(kbd):not(pre):not(.mono):not(.ico):not(.ico *){font-family:'Lexend',system-ui,sans-serif!important}
  html.a11y-spacing body{letter-spacing:.03em;word-spacing:.14em} html.a11y-spacing p,html.a11y-spacing li{line-height:1.95!important}
  html.a11y-motion *,html.a11y-motion *::before,html.a11y-motion *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  :root.a11y-contrast:not([data-x]){--muted:var(--ink);--line:var(--ink)}
  html.a11y-contrast a{text-decoration:underline}
  .x-btn{font:inherit;font-weight:600;font-size:.9rem;display:inline-flex;align-items:center;justify-content:center;gap:.4em;min-height:40px;padding:0 14px;border-radius:var(--r-btn,10px);border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer}
  .x-btn:hover{border-color:var(--ink)}
  .x-btn-primary{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
  .x-btn-primary:hover{filter:brightness(1.08);border-color:var(--accent)}
  .x-btn-ghost{border-color:transparent;background:transparent;text-decoration:underline;text-underline-offset:3px}
  .x-pop{position:fixed;z-index:60;right:16px;top:calc(env(safe-area-inset-top,0px) + 72px);width:min(320px,calc(100vw - 32px));background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:var(--r-card,14px);box-shadow:0 18px 50px -12px rgba(0,0,0,.35);padding:14px;display:grid;gap:4px;font-family:var(--font-ui)}
  .x-pop-head{display:flex;align-items:center;justify-content:space-between;padding:2px 4px 8px}
  .x-pop-head strong{font-size:1rem}
  .x-icon-btn{display:inline-grid;place-items:center;width:36px;height:36px;border-radius:8px;border:0;background:transparent;color:var(--muted);cursor:pointer}
  .x-icon-btn:hover{background:var(--surface-2);color:var(--ink)}
  .x-switch{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:44px;padding:0 6px;border:0;border-radius:8px;background:transparent;color:var(--ink);font:inherit;text-align:left;cursor:pointer}
  .x-switch:hover{background:var(--surface-2)}
  .x-switch i{flex:none;width:36px;height:22px;border-radius:99px;background:var(--line);position:relative;transition:background .2s}
  .x-switch i::after{content:"";position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:var(--surface);transition:transform .2s}
  .x-switch[aria-checked="true"] i{background:var(--accent)} .x-switch[aria-checked="true"] i::after{transform:translateX(14px)}
  .x-pop .x-btn-ghost{justify-self:start;margin-top:6px;color:var(--muted)}
  @media (max-width:640px){.x-pop{top:auto;bottom:calc(env(safe-area-inset-bottom,0px) + 12px);left:16px;right:16px;width:auto}}
  .x-overlay{position:fixed;inset:0;z-index:70;background:rgba(8,12,24,.45);backdrop-filter:blur(3px);display:flex;justify-content:center;align-items:flex-start;padding:calc(env(safe-area-inset-top,0px) + 10vh) 16px 16px}
  .x-pal{width:min(640px,100%);background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:var(--r-card,14px);box-shadow:0 30px 80px -20px rgba(0,0,0,.5);overflow:hidden;font-family:var(--font-ui)}
  .x-pal-in{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--line);color:var(--muted)}
  .x-pal-in input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--ink);font:inherit;font-size:1.1rem}
  .x-pal kbd,.kbd{font-family:var(--font-mono);font-size:.72rem;padding:2px 6px;border:1px solid var(--line);border-bottom-width:2px;border-radius:5px;color:var(--muted);background:var(--bg)}
  .x-pal-cap{padding:12px 16px 4px;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:600}
  .x-pal ul{list-style:none;margin:0;padding:4px 8px 8px;max-height:min(50vh,380px);overflow:auto}
  .x-pal li{display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;cursor:pointer}
  .x-pal li[aria-selected="true"]{background:var(--surface-2)}
  .x-pal li .dot{width:10px;height:10px;border-radius:3px;flex:none}
  .x-pal li .ttl{flex:1;min-width:0}
  .x-pal li .ty{font-size:.78rem;color:var(--muted)}
  .x-pal mark{background:transparent;color:var(--accent-text,var(--accent));font-weight:700}
  .x-pal-empty{padding:18px 16px;color:var(--muted)}
  .x-pal-foot{padding:10px 16px;border-top:1px solid var(--line);font-size:.78rem;color:var(--muted)}
  .x-cookie{position:fixed;z-index:50;left:16px;right:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 16px);margin-inline:auto;max-width:560px;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:var(--r-card,14px);box-shadow:0 20px 50px -16px rgba(0,0,0,.35);padding:16px;display:grid;gap:12px;font-family:var(--font-ui);font-size:.92rem}
  .x-cookie p{margin:0;line-height:1.5} .x-cookie a{color:var(--accent-text,var(--accent))}
  .x-cookie-set{display:grid;gap:8px} .x-cookie-set label{display:flex;gap:10px;align-items:flex-start;line-height:1.4}
  .x-cookie-set input{width:18px;height:18px;accent-color:var(--accent);margin-top:1px}
  .x-cookie-actions{display:flex;flex-wrap:wrap;gap:8px}
  .x-toast{position:fixed;z-index:80;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 24px);transform:translate(-50%,20px);opacity:0;pointer-events:none;background:var(--ink);color:var(--bg);padding:10px 16px;border-radius:10px;font-family:var(--font-ui);font-size:.9rem;transition:opacity .2s,transform .2s;max-width:calc(100vw - 32px)}
  .x-toast.on{opacity:1;transform:translate(-50%,0)}
  .tr-missing{display:inline-flex;align-items:center;gap:.35em;font-size:.72rem;font-weight:600;padding:2px 8px;border-radius:99px;border:1px dashed var(--muted);color:var(--muted);white-space:nowrap}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- build shared DOM ---------- */
  const shell = document.createElement('div');
  shell.innerHTML = `
  <div class="x-pop" id="x-a11y" role="dialog" aria-labelledby="x-a11y-h" hidden>
    <div class="x-pop-head"><strong id="x-a11y-h" data-i18n="a11y.title"></strong><button class="x-icon-btn" type="button" data-close-pop data-i18n-aria="close">${icon('close')}</button></div>
    ${A11Y.map(a => `<button class="x-switch" type="button" role="switch" aria-checked="false" data-a11y="${a}"><span data-i18n="a11y.${a}"></span><i aria-hidden="true"></i></button>`).join('')}
    <button class="x-btn x-btn-ghost" type="button" data-a11y-reset data-i18n="a11y.reset"></button>
  </div>
  <div class="x-overlay" id="x-pal" hidden>
    <div class="x-pal" role="dialog" aria-modal="true" data-i18n-aria="nav.search">
      <div class="x-pal-in">${icon('search')}<input id="x-pal-input" type="search" role="combobox" aria-expanded="true" aria-controls="x-pal-list" aria-autocomplete="list" autocomplete="off" data-i18n-ph="search.ph" data-i18n-aria="nav.search"><kbd>Esc</kbd></div>
      <div class="x-pal-cap" id="x-pal-cap"></div>
      <ul id="x-pal-list" role="listbox"></ul>
      <div class="x-pal-foot" data-i18n="pal.hint"></div>
    </div>
  </div>
  <section class="x-cookie" id="x-cookie" aria-labelledby="x-cookie-t" hidden>
    <p id="x-cookie-t"><span data-i18n="cookie.text"></span> <a href="#privacy" data-i18n="cookie.policy"></a></p>
    <div class="x-cookie-set" id="x-cookie-set" hidden>
      <label><input type="checkbox" id="ck-nec" checked disabled> <span data-i18n="cookie.nec"></span></label>
      <label><input type="checkbox" id="ck-stats"> <span data-i18n="cookie.stats"></span></label>
    </div>
    <div class="x-cookie-actions">
      <button class="x-btn x-btn-primary" type="button" data-ck="accept" data-i18n="cookie.accept"></button>
      <button class="x-btn" type="button" data-ck="necessary" data-i18n="cookie.necessary"></button>
      <button class="x-btn x-btn-ghost" type="button" data-ck="settings" data-i18n="cookie.settings"></button>
    </div>
  </section>
  <div class="x-toast" id="x-toast" role="status" aria-live="polite"></div>`;
  document.body.appendChild(shell);

  $$('[data-icon]').forEach(el => { el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)); });

  /* ---------- apply state ---------- */
  function applyLang() {
    root.lang = lang;
    $$('[data-i18n]').forEach(el => { el.textContent = fmt(t(el.dataset.i18n), el.dataset.n); });
    $$('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    $$('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('[data-plural]').forEach(el => { const n = +el.dataset.count; el.textContent = n + ' ' + plural(n, t(el.dataset.plural)); });
    $$('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)));
    $$('[data-avail]').forEach(card => {
      const av = card.dataset.avail.split(',');
      const has = av.includes(lang);
      const title = $('[data-title]', card); if (title) title.lang = has ? lang : av[0];
      let b = $('.tr-missing', card);
      if (!has) {
        if (!b) { b = document.createElement('span'); b.className = 'tr-missing'; ($('.tr-slot', card) || card).appendChild(b); }
        b.hidden = false; b.textContent = t('missing') + ' · ' + t('shownIn') + ' ' + av[0].toUpperCase();
      } else if (b) b.hidden = true;
    });
    applyTheme();
    if (!$('#x-pal').hidden) renderPal($('#x-pal-input').value);
  }
  function applyTheme() {
    if (theme === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', theme);
    $$('[data-theme-label]').forEach(el => { el.textContent = t('theme.' + theme); });
    $$('[data-theme-cycle]').forEach(b => b.setAttribute('aria-label', t('theme.label') + ': ' + t('theme.' + theme)));
  }
  function applyA11y() {
    A11Y.forEach(a => root.classList.toggle('a11y-' + a, a11y.includes(a)));
    $$('[data-a11y]').forEach(s => s.setAttribute('aria-checked', String(a11y.includes(s.dataset.a11y))));
    document.dispatchEvent(new CustomEvent('motionchange'));
  }
  function applyAuth() {
    root.classList.toggle('is-auth', auth);
    $$('[data-auth-toggle]').forEach(c => { if ('checked' in c) c.checked = auth; });
  }

  /* ---------- toast ---------- */
  let toastT;
  function toast(msg) {
    const el = $('#x-toast'); el.textContent = msg; el.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 2400);
  }

  /* ---------- search palette ---------- */
  let palSel = 0, palItems = [], lastFocus = null;
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function renderPal(q) {
    q = (q || '').trim().toLowerCase();
    palItems = q ? INDEX.filter(i => t(i.k).toLowerCase().includes(q) || t('sec.' + i.sec).toLowerCase().includes(q)) : INDEX.slice(0, 6);
    $('#x-pal-cap').textContent = q ? t('pal.results') : t('pal.popular');
    palSel = Math.min(palSel, Math.max(palItems.length - 1, 0));
    const list = $('#x-pal-list');
    if (!palItems.length) { list.innerHTML = `<li class="x-pal-empty" role="presentation">${esc(t('pal.empty'))}</li>`; return; }
    list.innerHTML = palItems.map((i, n) => {
      let title = esc(t(i.k));
      if (q) { const at = t(i.k).toLowerCase().indexOf(q); if (at > -1) { const raw = t(i.k); title = esc(raw.slice(0, at)) + '<mark>' + esc(raw.slice(at, at + q.length)) + '</mark>' + esc(raw.slice(at + q.length)); } }
      return `<li role="option" id="pal-o${n}" aria-selected="${n === palSel}" data-n="${n}"><span class="dot" style="background:var(--c-${i.sec})"></span><span class="ttl">${title}</span><span class="ty">${esc(t('type.' + i.type))} · ${esc(t('sec.' + i.sec))}</span></li>`;
    }).join('');
    $('#x-pal-input').setAttribute('aria-activedescendant', 'pal-o' + palSel);
  }
  function openPal(seed) {
    lastFocus = document.activeElement; closePop();
    const o = $('#x-pal'); o.hidden = false; const inp = $('#x-pal-input'); inp.value = seed || ''; palSel = 0; renderPal(inp.value); inp.focus();
  }
  function closePal() { $('#x-pal').hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function choosePal(n) { const i = palItems[n]; if (!i) return; closePal(); toast(t('toast.open') + ': ' + t(i.k)); }
  $('#x-pal-input').addEventListener('input', e => { palSel = 0; renderPal(e.target.value); });
  $('#x-pal-input').addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); palSel = Math.min(palSel + 1, palItems.length - 1); renderPal(e.target.value); $('#pal-o' + palSel)?.scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); palSel = Math.max(palSel - 1, 0); renderPal(e.target.value); $('#pal-o' + palSel)?.scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'Enter') { e.preventDefault(); choosePal(palSel); }
  });
  $('#x-pal-list').addEventListener('click', e => { const li = e.target.closest('li[data-n]'); if (li) choosePal(+li.dataset.n); });
  $('#x-pal').addEventListener('mousedown', e => { if (e.target.id === 'x-pal') closePal(); });

  /* ---------- a11y popover ---------- */
  function closePop() { const p = $('#x-a11y'); if (!p.hidden) { p.hidden = true; $$('[data-a11y-open]').forEach(b => b.setAttribute('aria-expanded', 'false')); } }

  /* ---------- cookies ---------- */
  function showCookie() { $('#x-cookie').hidden = false; }
  function saveCookie(v) { store.set('cookie', v); $('#x-cookie').hidden = true; $('#x-cookie-set').hidden = true; $('[data-ck="settings"]').dataset.i18n = 'cookie.settings'; applyLang(); toast(t('toast.saved')); }

  /* ---------- events ---------- */
  document.addEventListener('click', e => {
    const b = e.target.closest('button, a, input');
    if (!b) { if (!e.target.closest('#x-a11y')) closePop(); return; }
    if (b.dataset.setLang) { lang = b.dataset.setLang; store.set('lang', lang); applyLang(); }
    else if (b.hasAttribute('data-theme-cycle')) { theme = { auto: 'light', light: 'dark', dark: 'auto' }[theme]; store.set('theme', theme); applyTheme(); toast(t('theme.label') + ': ' + t('theme.' + theme)); }
    else if (b.hasAttribute('data-a11y-open')) { const p = $('#x-a11y'); p.hidden = !p.hidden; b.setAttribute('aria-expanded', String(!p.hidden)); if (!p.hidden) $('.x-switch', p).focus(); e.stopPropagation(); return; }
    else if (b.hasAttribute('data-close-pop')) closePop();
    else if (b.dataset.a11y) { const a = b.dataset.a11y; a11y = a11y.includes(a) ? a11y.filter(x => x !== a) : a11y.concat(a); store.set('a11y', JSON.stringify(a11y)); applyA11y(); }
    else if (b.hasAttribute('data-a11y-reset')) { a11y = []; store.set('a11y', '[]'); applyA11y(); }
    else if (b.hasAttribute('data-search-open')) { e.preventDefault(); openPal(b.hasAttribute('data-seed') ? b.textContent.trim() : ''); }
    else if (b.hasAttribute('data-login')) { e.preventDefault(); toast(t('toast.login')); auth = true; store.set('auth', '1'); applyAuth(); }
    else if (b.hasAttribute('data-logout')) { e.preventDefault(); auth = false; store.set('auth', '0'); applyAuth(); }
    else if (b.hasAttribute('data-auth-toggle')) { auth = b.checked; store.set('auth', auth ? '1' : '0'); applyAuth(); }
    else if (b.hasAttribute('data-cookie-open')) { e.preventDefault(); showCookie(); }
    else if (b.dataset.ck === 'accept') { $('#ck-stats').checked = true; saveCookie('all'); }
    else if (b.dataset.ck === 'necessary') { $('#ck-stats').checked = false; saveCookie('necessary'); }
    else if (b.dataset.ck === 'settings') {
      const set = $('#x-cookie-set');
      if (set.hidden) { set.hidden = false; b.dataset.i18n = 'cookie.save'; b.textContent = t('cookie.save'); }
      else saveCookie($('#ck-stats').checked ? 'all' : 'necessary');
    }
    else if (b.matches('a[href="#"]')) { e.preventDefault(); const lbl = b.textContent.trim(); if (lbl) toast(t('toast.open') + ': ' + lbl); }
    if (!b.closest('#x-a11y')) closePop();
  });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); $('#x-pal').hidden ? openPal() : closePal(); }
    else if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName) && $('#x-pal').hidden) { e.preventDefault(); openPal(); }
    else if (e.key === 'Escape') { if (!$('#x-pal').hidden) closePal(); else closePop(); }
    else if (e.key === 'Tab' && !$('#x-pal').hidden) { e.preventDefault(); $('#x-pal-input').focus(); }
  });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', () => document.dispatchEvent(new CustomEvent('motionchange')));

  applyA11y(); applyAuth(); applyLang();
  if (!store.get('cookie')) setTimeout(showCookie, 600);

  window.InfoDemo = { t, icon, motionOff, toast, get lang() { return lang; } };
})();
