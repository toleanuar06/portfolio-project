/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Мобильді мәзір
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // 2. Блог логикасы
    const blogGrid = document.querySelector('.blog-grid');
    if (blogGrid) {
        const categoryData = {
            'pedagogy': { name: 'Педагогика', count: 12, titles: ['Заманауи сабақ жоспары', 'Оқушыларды ынталандыру', 'Қалыптастырушы бағалау'] },
            'it': { name: 'IT-технологиялар', count: 8, titles: ['Мектептегі AR/VR', 'Бұлтты технологиялар', 'Жасанды интеллект білімде'] },
            'programming': { name: 'Бағдарламалау', count: 15, titles: ['Python негіздері', 'Оқушыларға Kotlin үйрету', 'Массивтер мен циклдер'] },
            'tips': { name: 'Практикалық кеңестер', count: 5, titles: ['Тиімді уақытты басқару', 'Стресстен арылу', 'Күнделікті жоспарлау'] }
        };

        const articles = [];
        for (const [catKey, data] of Object.entries(categoryData)) {
            for (let i = 1; i <= data.count; i++) {
                const title = data.titles[i % data.titles.length] + ` #${i}`;
                articles.push({
                    id: `${catKey}-${i}`,
                    title: title,
                    category: catKey,
                    date: `Қыркүйек ${Math.floor(Math.random() * 30) + 1}, 2026`,
                    excerpt: `Бұл мақалада ${data.name.toLowerCase()} саласындағы негізгі түсініктер мен қазіргі заманғы тәсілдер туралы баяндалады.`
                });
            }
        }
        
        articles.sort(() => Math.random() - 0.5);

        // Модаль элементтерін іздеу
        const articleModal = document.getElementById('article-modal');
        const closeArticleModal = document.getElementById('close-article-modal');
        const modalCategory = document.getElementById('modal-category');
        const modalTitle = document.getElementById('modal-title');
        const modalDate = document.getElementById('modal-date');
        const modalBody = document.getElementById('modal-body');
        const articleModalContent = document.getElementById('article-modal-content');

        function renderArticles(filter = 'all') {
            blogGrid.innerHTML = '';
            const filtered = filter === 'all' ? articles : articles.filter(a => a.category === filter);
            
            filtered.forEach(article => {
                const articleEl = document.createElement('article');
                // Карточканың дизайны жақсартылды
                articleEl.className = 'bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full';
                articleEl.setAttribute('data-category', article.category);
                
                articleEl.innerHTML = `
                    <header class="mb-4">
                        <span class="text-xs font-semibold text-blue-400 uppercase tracking-wider">${categoryData[article.category]?.name || 'Мақала'}</span>
                        <h3 class="text-xl font-bold text-white mt-2 mb-2 leading-tight">${article.title}</h3>
                        <div class="text-sm text-gray-400 mb-4">
                            ${article.date} • 5 мин оқу
                        </div>
                    </header>
                    <p class="text-gray-300 text-sm flex-grow mb-6">${article.excerpt}</p>
                    <footer class="mt-auto pt-4 border-t border-gray-700">
                        <button class="read-more-btn text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors focus:outline-none flex items-center group">
                            Толық оқу <i class="fas fa-arrow-right ml-2 text-xs transform group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </footer>
                `;
                
                // Батырманы басқанда модальды ашу
                const readBtn = articleEl.querySelector('.read-more-btn');
                readBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    openArticleModal(article);
                });

                blogGrid.appendChild(articleEl);
            });
        }

        // Модальды ашу функциясы
        function openArticleModal(article) {
            modalCategory.textContent = categoryData[article.category]?.name || 'Мақала';
            modalTitle.textContent = article.title;
            modalDate.textContent = article.date;
            
            // Мақаланың толық мәтінін генерациялау
            modalBody.innerHTML = `
                <p class="text-lg text-gray-200 font-medium">${article.excerpt}</p>
                <p>Бұл тақырып қазіргі таңда білім беру мен технологиялар тоғысында өте өзекті мәселелердің бірі болып табылады. Информатика және бағдарламалау саласындағы соңғы жаңалықтар мен әдіс-тәсілдер оқу процесін түбегейлі өзгертіп жатыр.</p>
                <h3 class="text-xl text-white mt-6 mb-3 font-semibold">Негізгі артықшылықтар:</h3>
                <ul class="list-disc pl-5 space-y-2 mb-4 text-gray-300">
                    <li>Оқушылардың сыни ойлауы мен алгоритмдік логикасын дамыту;</li>
                    <li>Жаңа сандық технологияларды сабақ барысында тиімді қолдану;</li>
                    <li>Күрделі ұғымдарды визуалды түрде қарапайым тілмен түсіндіру.</li>
                </ul>
                <div class="bg-gray-900 border border-gray-700 p-4 rounded-lg my-6">
                    <p class="text-sm text-gray-400 italic">"Білім берудегі басты мақсат — ақпарат беру ғана емес, оқушыны өз бетінше ізденуге үйрету."</p>
                </div>
                <p>Қорытындылай келе, бұл бағыттағы ізденістерімізді жалғастыра отырып, біз сапалы білім берудің жаңа деңгейіне шыға аламыз.</p>
            `;

            articleModal.classList.remove('hidden');
            setTimeout(() => {
                articleModal.classList.remove('opacity-0');
                articleModalContent.classList.remove('scale-95');
                articleModalContent.classList.add('scale-100');
            }, 10);
            
            // Модаль ашылғанда артқы жақтың айналдырылуын тоқтату
            document.body.style.overflow = 'hidden';
        }

        // Модальды жабу функциясы
        const closeArtModalFunc = () => {
            articleModal.classList.add('opacity-0');
            articleModalContent.classList.remove('scale-100');
            articleModalContent.classList.add('scale-95');
            setTimeout(() => {
                articleModal.classList.add('hidden');
                document.body.style.overflow = 'auto'; // Айналдыруды қайта қосу
            }, 300);
        };

        if (closeArticleModal) closeArticleModal.addEventListener('click', closeArtModalFunc);
        if (articleModal) articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) closeArtModalFunc();
        });

        renderArticles('all');

        const categoryBtns = document.querySelectorAll('.blog-category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active', 'text-blue-400'));
                btn.classList.add('active', 'text-blue-400');
                const filter = btn.getAttribute('data-filter');
                renderArticles(filter);
            });
        });
    }

    // 3. Күнтізбе логикасы (ОСЫ БӨЛІМ ЖӨНДЕЛДІ)
    const calendarGrid = document.getElementById('calendar-grid');
    if (calendarGrid) {
        const modal = document.getElementById('plan-modal');
        const closeModal = document.getElementById('close-modal');
        const savePlan = document.getElementById('save-plan');
        const generateAiBtn = document.getElementById('generate-ai-plan');
        const modalDateStr = document.getElementById('modal-date-str');
        const planTextarea = document.getElementById('plan-textarea');
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');
        const monthDisplay = document.getElementById('current-month-display');
        
        let currentSelectedDate = null;
        
        // Бастапқы күй: 2026 жыл, Қыркүйек (Айлар индексі 0-ден басталады, сондықтан 8 = Қыркүйек)
        let currentDate = new Date(2026, 8, 1);

        const monthNames = [
            "Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым",
            "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан"
        ];

        function renderCalendar() {
            calendarGrid.innerHTML = ''; // Ескі күндерді тазалау
            
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            // Тақырыпты жаңарту
            monthDisplay.textContent = `${monthNames[month]} ${year}`;
            
            // Осы айда неше күн бар екенін анықтау
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Айдың бірінші күні аптаның қай күніне сәйкес келетінін анықтау (0 = Жексенбі, 1 = Дүйсенбі...)
            let firstDay = new Date(year, month, 1).getDay();
            // Біздің күнтізбе Дүйсенбіден басталатындықтан индексті реттеу
            firstDay = firstDay === 0 ? 6 : firstDay - 1; 

            // Бос орындарды (алдыңғы айдың күндері орнын) салу
            for (let i = 0; i < firstDay; i++) {
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'bg-gray-900 min-h-[100px] border-b border-r border-gray-700/50';
                calendarGrid.appendChild(emptyDiv);
            }

            // Нақты күндерді салу
            for (let i = 1; i <= daysInMonth; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'bg-gray-800 hover:bg-gray-600 min-h-[100px] p-2 cursor-pointer transition relative border-b border-r border-gray-700/50';
                
                // Ай мен күнді 2 таңбалы форматқа келтіру (мысалы: "2026-09-05")
                const formattedMonth = String(month + 1).padStart(2, '0');
                const formattedDay = String(i).padStart(2, '0');
                const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
                
                dayDiv.innerHTML = `<span class="font-semibold text-gray-200">${i}</span>`;
                
                // Егер осы күнге сақталған жоспар болса
                if (localStorage.getItem('plan_' + dateStr)) {
                    dayDiv.innerHTML += `<span class="block w-2 h-2 bg-emerald-500 rounded-full mt-1 absolute top-2 right-2"></span>`;
                }

                // Күнді басқанда
                dayDiv.addEventListener('click', () => {
                    currentSelectedDate = dateStr;
                    modalDateStr.textContent = `${i} ${monthNames[month]} ${year}`;
                    planTextarea.value = localStorage.getItem('plan_' + dateStr) || '';
                    modal.classList.remove('hidden');
                });
                
                calendarGrid.appendChild(dayDiv);
            }
            
            // Торды толтыру үшін соңына бос ұяшықтар қосу (42 ұяшық қағидасы)
            const totalCells = firstDay + daysInMonth;
            const remainingCells = (Math.ceil(totalCells / 7) * 7) - totalCells;
            
            for (let i = 0; i < remainingCells; i++) {
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'bg-gray-900 min-h-[100px] border-b border-r border-gray-700/50';
                calendarGrid.appendChild(emptyDiv);
            }
        }

        // Батырмалардың логикасы
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        // Бастапқы генерация
        renderCalendar();

        // Модаль терезе логикасы
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        savePlan.addEventListener('click', () => {
            if (currentSelectedDate) {
                const content = planTextarea.value.trim();
                if (content) {
                    localStorage.setItem('plan_' + currentSelectedDate, content);
                } else {
                    localStorage.removeItem('plan_' + currentSelectedDate);
                }
                modal.classList.add('hidden');
                renderCalendar(); // Сақтаған соң күнтізбені жаңарту (нүкте шығу үшін)
            }
        });

        // AI логикасы (өзгеріссіз)
        generateAiBtn.addEventListener('click', () => {
            const topic = planTextarea.value.trim();
            if (!topic) {
                alert("Алдымен сабақ тақырыбын немесе кілт сөздерді жазыңыз (мысалы: 'Python негіздері')");
                return;
            }
            generateAiBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Ойланып жатыр...';
            
            setTimeout(() => {
                const aiPlan = `Сабақ жоспары: ${topic}\n\n1. Сабақтың мақсаты:\n- Оқушыларға тақырыптың негізгі түсініктерін меңгерту.\n\n2. Сабақ барысы:\n- Ұйымдастыру кезеңі (5 мин)\n- Жаңа тақырыпты түсіндіру (15 мин)\n- Практикалық тапсырма: ${topic} бойынша жаттығу орындау (20 мин)\n\n3. Бекіту және бағалау:\n- Сұрақ-жауап (5 мин).`;
                planTextarea.value = aiPlan;
                generateAiBtn.innerHTML = '<i class="fas fa-magic mr-2"></i> AI жоспар құру';
            }, 1500);
        });
    }
    // 4. Басты беттегі суретті үлкейту (Modal) логикасы
    const profileImgContainer = document.getElementById('profile-img-container');
    const imageModal = document.getElementById('image-modal');
    const closeImageModal = document.getElementById('close-image-modal');
    const enlargedImg = document.getElementById('enlarged-img');

    if (profileImgContainer && imageModal) {
        profileImgContainer.addEventListener('click', () => {
            // Модальды көрсету
            imageModal.classList.remove('hidden');
            
            // Анимация үшін кішкене кідіріс
            setTimeout(() => {
                imageModal.classList.remove('opacity-0');
                if (enlargedImg) {
                    enlargedImg.classList.remove('scale-95');
                    enlargedImg.classList.add('scale-100');
                }
            }, 10);
            
            // Артқы фонның айналдырылуын тоқтату
            document.body.style.overflow = 'hidden';
        });

        // Модальды жабу функциясы
        const closeImgModalFunc = () => {
            imageModal.classList.add('opacity-0');
            if (enlargedImg) {
                enlargedImg.classList.remove('scale-100');
                enlargedImg.classList.add('scale-95');
            }
            
            setTimeout(() => {
                imageModal.classList.add('hidden');
                document.body.style.overflow = 'auto'; // Айналдыруды қайта қосу
            }, 300);
        };

        // Батырма арқылы жабу
        if (closeImageModal) {
            closeImageModal.addEventListener('click', closeImgModalFunc);
        }
        
        // Бос орынды басқанда жабу
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeImgModalFunc();
            }
        });
    }
    
});
/* =========================================
   ПРАКТИКАЛЫҚ ЖҰМЫС №8 ФУНКЦИЯЛАРЫ
========================================= */

// Практикалық жұмыс 2: Сәлемдесу
function sayHello() {
    let name = document.getElementById("pr2-name").value;
    if(name.trim() === "") {
        alert("Өтінемін, атыңызды жазыңыз!");
        return;
    }
    // Alert ретінде шығару (мұғалім талабы бойынша)
    alert("Сәлем, " + name);
    
    // Сайтта да әдемі көрінуі үшін текст ретінде шығару
    let resultEl = document.getElementById("pr2-result");
    resultEl.textContent = "Сәлем, " + name + "!";
    resultEl.classList.remove("hidden");
}

// Практикалық жұмыс 4: Form жасау (Аты және Жасы)
function showInfo() {
    let name = document.getElementById("pr4-username").value;
    let age = document.getElementById("pr4-age").value;
    
    if(name.trim() === "" || age.trim() === "") {
        alert("Барлық жолақтарды толтырыңыз!");
        return;
    }

    let infoText = "Аты: " + name + "\nЖасы: " + age;
    
    // Alert ретінде шығару
    alert(infoText);

    // Сайтта шығару
    let resultEl = document.getElementById("pr4-result");
    resultEl.textContent = infoText;
    resultEl.classList.remove("hidden");
}

// Үй жұмысы: Date және Color Picker
function applyHomework() {
    let selectedDate = document.getElementById("hw-date").value;
    let selectedColor = document.getElementById("hw-color").value;

    if(!selectedDate) {
        alert("Күнді таңдаңыз!");
        return;
    }

    let resultText = "Таңдалған күн: " + selectedDate + "\nТаңдалған түс: " + selectedColor;
    
    // Alert ретінде шығару
    alert(resultText);

    // Сайтта шығару
    let resultEl = document.getElementById("hw-result");
    resultEl.textContent = resultText;
    resultEl.classList.remove("hidden");

    // Түсті бүкіл сайтқа емес, тек сол карточкаға қолдану (дизайн бұзылмау үшін)
    document.getElementById("hw-card").style.backgroundColor = selectedColor;
}