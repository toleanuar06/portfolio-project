/**
 * db.js - Портфолио сайтының бірыңғай мәліметтер базасы (LocalStorage негізінде)
 * Студенттер кестесі, күнтізбе сабақ жоспарлары, блог мақалалары мен баптауларды сақтайды.
 */

class PortfolioDB {
    constructor() {
        this.STUDENTS_KEY = 'portfolio_students_v1';
        this.CALENDAR_KEY = 'portfolio_calendar_v1';
        this.BLOG_KEY = 'portfolio_blog_v1';
        this.init();
    }

    init() {
        // Студенттер тізімі (Практикалық жұмыс №6 үшін базалық деректер)
        if (!localStorage.getItem(this.STUDENTS_KEY)) {
            const initialStudents = [
                { id: 1, name: 'Айдана Ермек', group: 'ИТ-21', subject: 'Web-технология', grade: 95 },
                { id: 2, name: 'Данияр Нұрлан', group: 'ИТ-21', subject: 'Web-технология', grade: 88 },
                { id: 3, name: 'Аружан Серік', group: 'ИТ-22', subject: 'Web-технология', grade: 92 },
                { id: 4, name: 'Бекзат Әлихан', group: 'ИТ-21', subject: 'Алгоритмдеу', grade: 78 },
                { id: 5, name: 'Дильназ Қайрат', group: 'ИТ-22', subject: 'Деректер базасы', grade: 90 },
                { id: 6, name: 'Ерасыл Болат', group: 'ИТ-21', subject: 'Web-технология', grade: 85 },
                { id: 7, name: 'Жансая Марат', group: 'ИТ-22', subject: 'Бағдарламалау', grade: 96 },
                { id: 8, name: 'Ануар Төле', group: 'ИТ-21', subject: 'Web-технология', grade: 100 },
                { id: 9, name: 'Мадина Сейіт', group: 'ИТ-23', subject: 'Компьютерлік желілер', grade: 89 },
                { id: 10, name: 'Нұрсұлтан Қуаныш', group: 'ИТ-21', subject: 'Web-технология', grade: 94 }
            ];
            this.setStudents(initialStudents);
        }

        // Блог жазбалары (Практикалық жұмыс №2 үшін базалық деректер)
        if (!localStorage.getItem(this.BLOG_KEY)) {
            const initialArticles = [
                {
                    id: 'it-1',
                    category: 'it',
                    categoryName: 'IT-технологиялар',
                    title: 'Білім берудегі AR/VR толықтырылған шынайылықтың маңызы',
                    date: '2026-10-15',
                    readTime: '5 мин оқу',
                    excerpt: 'Толықтырылған және виртуалды шынайылық технологиялары заманауи сабақ үдерісін түбегейлі өзгертуде.',
                    content: `<p>Толықтырылған шынайылық (Augmented Reality - AR) оқушыларға күрделі деректерді, физикалық тәжірибелерді және биологиялық құрылымдарды 3D форматында визуалды түрде көруге мүмкіндік береді.</p>
                             <p>Біздің дипломдық зерттеуіміз аясында жасалып жатқан "AR Book" қосымшасы информатика мен жаратылыстану пәндері бойынша интерактивті 3D модельдерді оқулық бетінен тікелей камера арқылы көрсетуге бағытталған.</p>
                             <section>
                                 <h3>Негізгі артықшылықтары:</h3>
                                 <ul>
                                     <li>Оқушылардың сабаққа деген қызығушылығы 40%-ға артады;</li>
                                     <li>Күрделі кеңістіктік ұғымдарды оңай қабылдау;</li>
                                     <li>Қауіпсіз виртуалды тәжірибелер жасау мүмкіндігі.</li>
                                 </ul>
                             </section>`
                },
                {
                    id: 'programming-1',
                    category: 'programming',
                    categoryName: 'Бағдарламалау',
                    title: 'HTML5 семантикалық тегтері және CSS Flexbox артықшылықтары',
                    date: '2026-10-20',
                    readTime: '6 мин оқу',
                    excerpt: 'Неліктен div тегтерінің орнына семантикалық тегтерді және адаптивті макет үшін Flexbox-ты қолдану керек?',
                    content: `<p>HTML5 стандарты веб-әзірлеушілерге <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code> және <code>&lt;footer&gt;</code> сияқты семантикалық тегтерді ұсынды. Бұл тек кодтың оқылуын жақсартып қана қоймай, SEO оңтайландыруды және қолжетімділікті (accessibility) айтарлықтай арттырады.</p>
                             <p>CSS Flexbox технологиясы элементтерді экран өлшеміне қарай бір өлшемді бағытта (қатар немесе баған бойынша) оңай туралауға, арақашықтықтарын реттеуге көмектеседі.</p>
                             <section>
                                 <h3>Flexbox-тың негізгі қасиеттері:</h3>
                                 <ul>
                                     <li><code>display: flex</code> — контейнерді иілгіш блокқа айналдырады;</li>
                                     <li><code>justify-content: space-between</code> — элементтерді шетке жаяды;</li>
                                     <li><code>align-items: center</code> — тігінен дәл ортаға туралайды;</li>
                                     <li><code>flex-wrap: wrap</code> — кіші экрандарда келесі жолға тасымалдайды.</li>
                                 </ul>
                             </section>`
                },
                {
                    id: 'pedagogy-1',
                    category: 'pedagogy',
                    categoryName: 'Педагогика',
                    title: 'Информатика сабақтарындағы геймификация әдістері',
                    date: '2026-10-28',
                    readTime: '4 мин оқу',
                    excerpt: 'Ойын элементтерін оқыту процесіне енгізу арқылы бағдарламалау сабақтарын тиімді ұйымдастыру.',
                    content: `<p>Геймификация — бұл ойындық емес ортада ойын механикасын қолдану. Информатика сабақтарында код жазуды тапсырмалар жүйесі, ұпай жинау және интерактивті викториналар түрінде беру оқушылардың мотивациясын еселейді.</p>
                             <p>Мысалы, шартты операторларды үйрету кезінде қарапайым «Жасырын санды тап» ойынын немесе виртуалды калькулятор құру балаларға алгоритмді терең түсінуге жол ашады.</p>`
                }
            ];
            this.setArticles(initialArticles);
        }
    }

    // Студенттер
    getStudents() {
        try {
            return JSON.parse(localStorage.getItem(this.STUDENTS_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    setStudents(students) {
        localStorage.setItem(this.STUDENTS_KEY, JSON.stringify(students));
    }

    addStudent(student) {
        const students = this.getStudents();
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        const newStudent = { id: newId, ...student, grade: Number(student.grade) };
        students.push(newStudent);
        this.setStudents(students);
        return newStudent;
    }

    deleteStudent(id) {
        let students = this.getStudents();
        students = students.filter(s => s.id !== id);
        this.setStudents(students);
        return students;
    }

    resetStudents() {
        localStorage.removeItem(this.STUDENTS_KEY);
        this.init();
        return this.getStudents();
    }

    // Күнтізбе жоспарлары
    getCalendarPlans() {
        try {
            return JSON.parse(localStorage.getItem(this.CALENDAR_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    saveCalendarPlan(dateKey, planText) {
        const plans = this.getCalendarPlans();
        if (planText && planText.trim()) {
            plans[dateKey] = planText.trim();
        } else {
            delete plans[dateKey];
        }
        localStorage.setItem(this.CALENDAR_KEY, JSON.stringify(plans));
        return plans;
    }

    // Блог жазбалары
    getArticles() {
        try {
            return JSON.parse(localStorage.getItem(this.BLOG_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    setArticles(articles) {
        localStorage.setItem(this.BLOG_KEY, JSON.stringify(articles));
    }

    addArticle(article) {
        const articles = this.getArticles();
        const newArticle = {
            id: 'art-' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            readTime: '3 мин оқу',
            ...article
        };
        articles.unshift(newArticle);
        this.setArticles(articles);
        return newArticle;
    }
}

// Жаһандық қолжетімді нысан
window.db = new PortfolioDB();
