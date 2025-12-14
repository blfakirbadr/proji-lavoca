document.addEventListener('DOMContentLoaded', () => {
    
    // 1. إعدادات المحامي
    const lawyerKey = localStorage.getItem('selectedLawyer') || 'badr';
    const lawyers = {
        badr: { name: "ذ. بدر (Matrix)", img: "Tenor-unscreen.gif", sign: "Badr_Hack" },
        othman: { name: "ذ. عثمان (العرّاب)", img: "Tenor-unscreen (1).gif", sign: "Othman_Classic" },
        stifa: { name: "ذ. صتيفا (Speed)", img: "Tenor-unscreen (2).gif", sign: "Stifa_Speed" }
    };
    const selected = lawyers[lawyerKey];
    
    const displayElement = document.getElementById('lawyer-name-display');
    if(displayElement) displayElement.innerText = selected.name;

    // 2. ميزان الرشوة (النسخة المطورة)
    const slider = document.getElementById('rachwa-slider');
    const amountDisplay = document.querySelector('.rachwa-amount');
    const rachwaText = document.getElementById('rachwa-text');
    const face = document.getElementById('rachwa-face');
    let rachwaVal = 0;

    if(slider) {
        slider.addEventListener('input', (e) => {
            rachwaVal = parseInt(e.target.value);
            amountDisplay.innerText = rachwaVal + " DH";
            
            if (rachwaVal === 0) {
                rachwaText.innerText = "❌ والو: سير شد النوبة (السيستيم طايح والكاتب مريض).";
                rachwaText.style.color = "red";
                amountDisplay.style.color = "red";
                if(face) face.innerText = "😒";
            } 
            else if (rachwaVal <= 200) {
                rachwaText.innerText = "☕ حق القهوة: الملف غيتحط فوق البيرو (ماشي فالسلة).";
                rachwaText.style.color = "#cd7f32";
                amountDisplay.style.color = "#cd7f32";
                if(face) face.innerText = "🤨";
            } 
            else if (rachwaVal <= 500) {
                rachwaText.innerText = "📑 تسريع 20%: غنعيطو ليك قبل من 'بوشعيب' اللي كيتسنا.";
                rachwaText.style.color = "orange";
                amountDisplay.style.color = "orange";
                if(face) face.innerText = "😐";
            } 
            else if (rachwaVal <= 1500) {
                rachwaText.innerText = "🚀 Turbo Mode: الكاتب العمومي غيضحك فوجهك (ابتسامة صفراء).";
                rachwaText.style.color = "yellow";
                amountDisplay.style.color = "yellow";
                if(face) face.innerText = "🙂";
            } 
            else if (rachwaVal <= 3000) {
                rachwaText.innerText = "💎 VIP Access: القاضي غيسولك على الصحة د الوالدة.";
                rachwaText.style.color = "#adff2f";
                amountDisplay.style.color = "#adff2f";
                if(face) face.innerText = "😁";
            } 
            else if (rachwaVal <= 7000) {
                rachwaText.innerText = "👑 Premium Plus: غنمسحو السوابق ونعطيوك وسام الاستحقاق.";
                rachwaText.style.color = "#00ff41";
                amountDisplay.style.color = "#00ff41";
                if(face) face.innerText = "🤑";
            } 
            else {
                rachwaText.innerText = "🦁 الحصانة الدبلوماسية: نتا دابا فوق القانون! (القاضي يعتذر لك).";
                rachwaText.style.color = "#00ffff";
                amountDisplay.style.color = "#00ffff";
                if(face) face.innerText = "😎";
            }
        });
    }

    // 3. عند التسجيل (Submit)
    const form = document.getElementById('final-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // تشغيل شتا د الفلوس
            startMoneyRain();

            // تعمير الورقة
            document.getElementById('res-lawyer-header').innerText = selected.name;
            const imgEl = document.getElementById('res-lawyer-img');
            if(imgEl) imgEl.src = selected.img;
            
            document.getElementById('res-name').innerText = document.getElementById('client-name').value;
            document.getElementById('res-cin').innerText = document.getElementById('client-cin').value;
            document.getElementById('res-job').innerText = document.getElementById('client-job').value;
            document.getElementById('res-city-display').innerText = document.getElementById('client-city').value;
            
            // التفاصيل (مع الحفاظ على الأسطر)
            const desc = document.getElementById('client-case').value;
            document.getElementById('res-case-desc').innerText = desc;
            
            // إضافة الرشوة للفاتورة
            const rachwaCell = document.getElementById('res-rachwa');
            if(rachwaCell) rachwaCell.innerText = rachwaVal + " DH";

            // التوقيع
            const signBox = document.getElementById('lawyer-sign'); // تأكد من ID فـ HTML
            if(signBox) signBox.innerText = selected.sign;

            // روليت الثمن
            const totalEl = document.getElementById('res-total');
            let count = 0;
            const final = (Math.floor(Math.random() * 20) + 5) + ",000 DH";
            
            const spin = setInterval(() => {
                totalEl.innerText = ["سجن", "كلوة", "موطور", "إعدام", "1000DH"][Math.floor(Math.random() * 5)];
                count++;
                if(count > 25) {
                    clearInterval(spin);
                    totalEl.innerText = final;
                    totalEl.style.color = "red";
                    totalEl.style.fontSize = "1.5rem";
                }
            }, 70);

            // إظهار الورقة
            document.getElementById('form-stage').classList.add('hidden');
            document.getElementById('receipt-stage').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// === دالة المصادقة (الطابع - بدون صوت) ===
function addStamp() {
    const stamp = document.getElementById('official-stamp');
    const dateSpan = document.getElementById('stamp-date');
    
    // 1. وضع تاريخ اليوم فالطابع
    const today = new Date();
    dateSpan.innerText = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;

    // 2. إظهار الطابع مع الأنميشن
    stamp.classList.remove('hidden');
    stamp.classList.add('stamp-animation');

    // 3. اهتزاز الصفحة (Visual Feedback)
    document.body.style.animation = "shake 0.2s";
    setTimeout(() => document.body.style.animation = "", 200);
}

// دالة شتا د الفلوس
function startMoneyRain() {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall { to { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
        .money-bill { position: fixed; top: -50px; z-index: 99999; pointer-events: none; font-size: 2rem; }
        @keyframes shake { 0% { transform: translate(1px, 1px) } 50% { transform: translate(-1px, -2px) } 100% { transform: translate(0,0) } }
    `;
    document.head.appendChild(style);

    for(let i=0; i<50; i++) {
        setTimeout(() => {
            const m = document.createElement('div');
            m.innerText = ["💸", "💵", "💰", "💎"][Math.floor(Math.random() * 4)];
            m.className = 'money-bill';
            m.style.left = Math.random() * 100 + 'vw';
            m.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
            document.body.appendChild(m);
            setTimeout(() => m.remove(), 3000);
        }, i * 80);
    }
}