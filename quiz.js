document.addEventListener('DOMContentLoaded', () => {
    
    // تعريف العناصر
    const quizStage = document.getElementById('quiz-stage');
    const resultStage = document.getElementById('result-stage');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress');
    const steps = document.querySelectorAll('.question-step');
    
    let currentStep = 0;
    // نقاط المحامين
    let scores = { badr: 0, othman: 0, stifa: 0 };

    // دالة تحديث الواجهة
    function updateQuiz() {
        // إظهار السؤال الحالي فقط
        steps.forEach((step, index) => {
            if (index === currentStep) {
                step.classList.remove('hidden');
                step.classList.add('active');
            } else {
                step.classList.add('hidden');
                step.classList.remove('active');
            }
        });

        // تحديث شريط التقدم
        const progressPercent = ((currentStep + 1) / steps.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        // تغيير نص الزر فالسؤال الأخير
        if (currentStep === steps.length - 1) {
            nextBtn.innerText = "شوف الحكم (النتيجة)";
        } else {
            nextBtn.innerText = "السؤال التالي";
        }
        
        // تعطيل الزر حتى يتم الاختيار
        nextBtn.disabled = true;
    }

    // تفعيل الزر عند اختيار جواب
    document.getElementById('quiz-form').addEventListener('change', () => {
        nextBtn.disabled = false;
    });

    // عند الضغط على التالي
    nextBtn.addEventListener('click', () => {
        // تسجيل النقطة
        const selectedOption = steps[currentStep].querySelector('input:checked');
        if (selectedOption) {
            scores[selectedOption.value]++;
        }

        // المرور للسؤال التالي أو النتيجة
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateQuiz();
        } else {
            showWinner();
        }
    });

    // دالة إظهار النتيجة
    function showWinner() {
        quizStage.classList.add('hidden');
        resultStage.classList.remove('hidden');
        
        // حساب الفائز (أعلى سكور)
        let winnerKey = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        
        // حفظ الفائز فالذاكرة (باش نستعملوه فـ paper.html)
        localStorage.setItem('selectedLawyer', winnerKey);

        // معلومات المحامين
        const lawyers = {
            badr: { 
                name: "ذ. بدر (Matrix)", 
                img: "Tenor-unscreen.gif", 
                quote: "مبروك! قضيتك إلكترونية 100%. غنمسحو ليك الدوسي ونرجعوك 'أنونيموس'." 
            },
            othman: { 
                name: "ذ. عثمان (العرّاب)", 
                img: "Tenor-unscreen (1).gif", 
                quote: "قضية معقدة؟ هادشي كيبغي كاس د أتاي وطول النفس. وجد التيترات." 
            },
            stifa: { 
                name: "ذ. صتيفا (Speed)", 
                img: "Tenor-unscreen (2).gif", 
                quote: "حصلتي حصلة خايبة ياك؟ ماتخافش، صتيفا كيفكك قبل ما يوصلو البوليس." 
            }
        };

        const result = lawyers[winnerKey];

        // عرض الكارطة
        const winnerDiv = document.getElementById('winner-lawyer');
        winnerDiv.innerHTML = `
            <div class="winner-card" onclick="goToPaper()">
                <img src="${result.img}" alt="${result.name}">
                <h3>${result.name}</h3>
                <p>"${result.quote}"</p>
                <div class="cta-text">كليكي هنا لفتح الملف 📝</div>
            </div>
        `;
    }

    // بدء الكويز
    updateQuiz();
});

// دالة الانتقال للصفحة التالية
function goToPaper() {
    window.location.href = "paper.html";
}