// ==========================================
// 1. إعدادات الشات بوت (L'Haj Bot V5)
// ==========================================
let chatOpen = false;
let isMaximized = false;

// قاعدة المعرفة (الدماغ الموسع)
const knowledgeBase = [
    // --- التحية والتعارف ---
    {
        keywords: ["salam", "slm", "salut", "hi", "hello", "سلام", "اهلا", "cv", "labas", "ca va"],
        reply: "وعليكم السلام! مرحبا بيك فـ 'سلكني.ma'. الدخول فابور والخروج بالدعوة. شنو المصيبة اللي جابتك عندنا اليوم؟ (ورث، كسيدة، طلاق، بوليس...؟)"
    },
    {
        keywords: ["chkoun nta", "chnou nta", "chkon", "شكون", "من انت"],
        reply: "أنا 'الحاج روبو' 🤖. قريت القانون فـ 'درب غلف' وتخرجت من مدرسة 'الرشوة والوساطة'. تخصص: حل المشاكل المستعصية بطرق غير شرعية."
    },
    {
        keywords: ["hh", "haha", "mdr", "lol", "هههه", "ضحك"],
        reply: "ضحك ضحك.. راه الضحك كيطول العمر، ولكن ما كيخلصش المحامي. دوز للمهم: كاين شي 'كاش' ولا غير الهضرة؟"
    },

    // --- سي عثمان (العقار، الورث، المقدم) ---
    {
        keywords: ["otman", "othman", "3tman", "عثمان", "3otman", "mol dar", "akar", "عقار"],
        reply: "الأستاذ عثمان؟ (مول الكرسي). هذاك خبير فـ 'تحفيظ الهواء'. يقدر يبيع ليك 'السطح' بوحدو بلا دار. إلا عندك شي أرض فيها مشاكل، هو الحل."
    },
    {
        keywords: ["wirt", "wirta", "warata", "mirat", "ورث", "تركة", "جدتي", "عمي"],
        reply: "الورث فالقانون كياخد 20 عام. ولكن مع سي عثمان، كنطبقو خطة 'فرق تسد'. كنخرجو إشاعة بلي الدار 'مسكونة'، الورثة كيهربو، ونتا كتشريها بالرخيص."
    },
    {
        keywords: ["moqadem", "mqadem", "m9adem", "مقدم", "chiikh", "شيخ", "bni", "بناء"],
        reply: "المقدم؟ هاداك هو 'الرادار البشري'. الحل الوحيد معاه هو 'القهوة السخونة'. سير عندو ودي معاك 200 درهم وقول ليه 'الوالدة كتسلم عليك'. غيخليك تبني حتى فوسط الشانطي."
    },
    {
        keywords: ["titre", "mohafada", "tahfid", "تيتر", "تحفيظ", "محافظة"],
        reply: "التيتر محبس؟ ساهلة. غنديرو 'شهادة الضعف' للمحافظ وغنقولو ليه الأرض كنزرعو فيها 'الحشيش الطبي'. الملف غيدوز 'إكسبريس' وغتاخد التيتر مذهب."
    },

    // --- سي بدر (السيبير، الهاكينغ، التجسس) ---
    {
        keywords: ["badr", "matrix", "hacker", "piratage", "بدر", "هاكر", "سيبير"],
        reply: "بدر (Neo) راه مكونيكطي دابا من 'سيرفر' فالمريخ. هذاك السيد كيدخل لـ WhatsApp ديال الناس بلا ما يقيس التيليفون. تخصص: فضائح، ابتزاز، ومسح السوابق."
    },
    {
        keywords: ["fb", "facebook", "insta", "instagram", "mot de passe", "password", "مودباس", "تجسس"],
        reply: "باغي تعرف المودباس ديالها؟ بدر كيرسل ليها رابط سميتو 'شوف فضيحة نيبا'. غير كتكليكي، التيليفون ديالها كيولي يصور ويسجل وكيرسل ليك التقرير يوميا مع 8 د الصباح."
    },
    {
        keywords: ["chouha", "fdiha", "video", "photo", "taswira", "فضيحة", "تصاور", "تهديد"],
        reply: "شي حد هددك ينشر تصاورك؟ ما تخافش. بدر كيستعمل الذكاء الاصطناعي وكيبدل وجهك بوجه 'مستر بين'. الفيديو كيولي كوميدي ونتا كتولي مشهور ومحبوب."
    },

    // --- سي صتيفا (الكسيدة، الرادار، البيرمي) ---
    {
        keywords: ["stifa", "speed", "ksida", "accident", "tomobil", "car", "صتيفا", "كسيدة", "طوموبيل"],
        reply: "صتيفا؟ هذاك هو 'ملك التخريجات'. الطوموبيل تكون مقسومة على جوج، هو يخرجك نتا مول الحق. الخطة: 'الرصيف هو اللي دخل فالطوموبيل ماشي العكس'."
    },
    {
        keywords: ["radar", "vitesse", "bolis", "police", "رادار", "سرعة", "بوليس", "مخالفة"],
        reply: "الرادار فلاشاك بـ 180؟ صتيفا كيقول: 'قول للقاضي بلي كنتي كتهرب من دب قطبي'. القاضي غيدوخ وغيعطيك البراءة مع شهادة الشجاعة."
    },
    {
        keywords: ["permis", "retrait", "s7b", "بيرمي", "سحب"],
        reply: "مشا ليك البيرمي؟ هانية. صتيفا يطبع ليك بيرمي جديد ديال 'دولة خيالية' (مملكة أطلانتس). البوليسي فاش غيشوفو، غيحشم يسولك وغيطلب يتصور معاك."
    },

    // --- الفلوس والمواضيع العامة ---
    {
        keywords: ["talaq", "zwaj", "zawaj", "modawana", "طلاق", "زواج", "مدونة"],
        reply: "الزواج بحال 'البطيخة'، والطلاق بحال 'الحريرة'. فنظرنا: طلقها وتهنا. غنرفعو دعوى 'عدم التوافق البرجي' (أنت حوت وهي عقرب). القاضي غيطلقكم فوراً."
    },
    {
        keywords: ["flous", "dh", "prix", "thaman", "chhal", "flos", "فلوس", "ثمن", "بشحال"],
        reply: "شوف، 'سلكني.ma' شعارنا: 'خلص تخلص'. فتح الملف بـ 500 درهم (للطلبة)، و 5000 درهم (لصحاب الشكارة). وإلا ما عندكش، جيب دجاجة محمرة ونتفاهمو."
    },
    {
        keywords: ["fin", "adresse", "localisation", "moka3", "عنوان", "فين"],
        reply: "المكتب ديالنا سري (باش ما يهجموش علينا الضحايا). حالياً حنا فوق سطح عمارة فالدار البيضاء. صيفط الفلوس فـ Wafacash وحنا نرسلو ليك اللوكاليزاسيون."
    },
    {
        keywords: ["3awen", "3awni", "help", "aide", "sos", "مساعدة", "عتق"],
        reply: "باغي المساعدة؟ المساعدة كاينة فـ 'الهلال الأحمر'. هنا كاين 'البيزنس'. وضح سؤالك: واش باغي 'تغبر' شي حد، ولا باغي 'تزور' شي ورقة؟"
    }
];

// دالة فتح/إغلاق الشات
function toggleChat(event) {
    if (event) event.stopPropagation();

    const widget = document.getElementById('chat-widget');
    
    // إذا كان مسدود (فيه closed) -> حلو
    if (widget.classList.contains('closed')) {
        widget.classList.remove('closed');
        widget.classList.add('open');
        chatOpen = true;
        
        // ترحيب أول مرة
        const msgCount = document.querySelectorAll('.message').length;
        if(msgCount <= 0) { 
             setTimeout(() => addMessage("أهلاً! أنا 'الحاج روبو'. سولني على أي مصيبة.", 'bot-msg'), 500);
        }
    } 
    // إذا كان محلول -> سدو
    else {
        widget.classList.remove('open');
        widget.classList.remove('maximized');
        widget.classList.add('closed');
        chatOpen = false;
        isMaximized = false;
    }
}

// دالة التكبير/التصغير
function toggleMaximize(event) {
    if (event) event.stopPropagation();

    const widget = document.getElementById('chat-widget');
    const maxIcon = document.getElementById('maximize-chat');
    
    isMaximized = !isMaximized;
    
    if (isMaximized) {
        widget.classList.add('maximized');
        maxIcon.innerText = "↙";
    } else {
        widget.classList.remove('maximized');
        maxIcon.innerText = "⤢";
    }
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const msg = input.value.trim();
    if (!msg) return;

    // 1. عرض رسالة المستخدم
    addMessage(msg, 'user-msg');
    input.value = '';

    // 2. إظهار "جاري الكتابة..."
    showTypingIndicator();

    // 3. الرد بعد تحليل ذكي
    const delay = Math.floor(Math.random() * 800) + 1000; 
    setTimeout(() => {
        removeTypingIndicator();
        const reply = findSmartReply(msg);
        addMessage(reply, 'bot-msg');
    }, delay);
}

// دالة البحث الذكي
function findSmartReply(userMsg) {
    userMsg = userMsg.toLowerCase();
    
    // 1. البحث الدقيق
    for (let entry of knowledgeBase) {
        if (entry.keywords.some(k => userMsg.includes(k))) {
            return entry.reply;
        }
    }
    
    // 2. ردود المراوغة (إلا ما فهم والو)
    const evasiveTactics = [
        "هاد السؤال 'قانونياً' معقد شوية.. خاصو جلسة مغلقة. صيفط 20 درهم روشارج باش نجاوبك بالتفصيل.",
        "سمح ليا، الريزو مشى.. عاود سول على 'الورث' ولا 'الكسيدة'.",
        "شوف، أي مشكل عندو حل عند 'سلكني'. غير قول ليا: واش المشكل فيه 'الحبس' ولا غير 'الفلوس'؟",
        "جاري البحث في الأرشيف... 📂 ... الملف غير موجود. واقيلا كلاوه الفيران.",
        "واش هضرتك فيها 'إنَّ'؟ ياك ما نتا من طرف المقدم؟ بدل الموضوع عفاك."
    ];
    return evasiveTactics[Math.floor(Math.random() * evasiveTactics.length)];
}

function addMessage(text, className) {
    const area = document.getElementById('messages-area');
    if(!area) return;
    const div = document.createElement('div');
    div.className = `message ${className}`;
    div.innerText = text;
    area.appendChild(div);
    area.scrollTop = area.scrollHeight;
}

function showTypingIndicator() {
    const area = document.getElementById('messages-area');
    if(!area) return;
    const div = document.createElement('div');
    div.id = 'typing-indicator';
    div.className = 'message bot-msg';
    div.innerHTML = '<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
    area.appendChild(div);
    area.scrollTop = area.scrollHeight;
}

function removeTypingIndicator() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
}

// ==========================================
// 2. زر الهروب (Panic Button)
// ==========================================
function createPanicButton() {
    const btn = document.createElement('div');
    btn.id = 'panic-btn';
    btn.innerHTML = `<span>🚨</span> الواليد جا!`;
    btn.onclick = () => {
        window.location.href = "https://ar.wikipedia.org/wiki/%D8%A8%D8%B1_%D8%A7%D9%84%D9%88%D8%A7%D9%84%D8%AF%D9%8A%D9%86";
    };
    document.body.appendChild(btn);
}

// ==========================================
// 3. شتا ديال الفلوس (Money Rain)
// ==========================================
function startMoneyRain() {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall { to { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
        .money-bill { position: fixed; top: -50px; z-index: 9999; pointer-events: none; font-size: 2rem; }
    `;
    document.head.appendChild(style);

    for(let i=0; i<30; i++) {
        setTimeout(() => {
            const m = document.createElement('div');
            m.innerText = ["💸", "💵", "💰", "💎"][Math.floor(Math.random() * 4)];
            m.className = 'money-bill';
            m.style.left = Math.random() * 100 + 'vw';
            m.style.fontSize = (Math.random() * 20 + 20) + 'px';
            m.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
            document.body.appendChild(m);
            setTimeout(() => m.remove(), 3000);
        }, i * 100);
    }
}

// ==========================================
// 4. إيفيكت الفلوس عند النقر (Click Effect)
// ==========================================
document.addEventListener('click', (e) => {
    // ما نطبقوش الإيفيكت على الأزرار باش ما نبرزطوش
    if (e.target.tagName === 'BUTTON' || e.target.closest('#chat-widget') || e.target.closest('.news-ticker-bar')) return;

    const effects = ["💸", "-200DH", "🤑", "⚖️", "💰"];
    const el = document.createElement('div');
    el.className = 'click-effect';
    el.innerText = effects[Math.floor(Math.random() * effects.length)];
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';
    document.body.appendChild(el);

    setTimeout(() => el.remove(), 1000);
});

// ==========================================
// 5. إشعارات الخلعة (Notifications)
// ==========================================
const notifications = [
    { icon: "👮", title: "مذكرة بحث", msg: "المقدم كيسول عليك فالدرب.." },
    { icon: "👵", title: "الحاجة (الوالدة)", msg: "جاوب فالتليفون ولا غنسخط عليك!" },
    { icon: "💸", title: "البنك", msg: "تم اقتطاع 500 درهم (ضريبة الهواء)." },
    { icon: "🚘", title: "مخالفة", msg: "الرادار شدك كتجري فـ Facebook." }
];

function showNotification() {
    const container = document.getElementById('notification-container');
    if(!container) return;
    
    const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
    const div = document.createElement('div');
    div.className = 'fake-notification';
    div.innerHTML = `<div class="notif-icon">${randomNotif.icon}</div>
                     <div class="notif-content"><h4>${randomNotif.title}</h4><p>${randomNotif.msg}</p></div>`;
    
    container.appendChild(div);
    
    setTimeout(() => {
        div.style.animation = "fadeOut 0.5s forwards";
        setTimeout(() => div.remove(), 500);
    }, 5000);
}

// === تشغيل كل شيء عند البداية ===
window.addEventListener('load', () => {
    createPanicButton();
    startMoneyRain();
    setTimeout(showNotification, 3000); // أول إشعار بعد 3 ثواني
    setInterval(showNotification, 20000); // كل 20 ثانية
});