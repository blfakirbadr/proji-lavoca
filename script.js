const timeline = gsap.timeline();

// دوال التحكم فالصوت
function playAudio(id, volume = 1) {
    const audio = document.getElementById(id);
    if (audio) {
        if (audio.paused) {
            audio.currentTime = 0;
            audio.volume = volume;
            audio.play().catch(e => console.log("Audio Error:", e));
        }
    }
}

function stopAudio(id) {
    const audio = document.getElementById(id);
    if (audio) {
        gsap.to(audio, { volume: 0, duration: 0.5, onComplete: () => {
            audio.pause();
            audio.currentTime = 0;
        }});
    }
}

// دالة الباب
function enterOffice() {
    playAudio('snd-door', 1);
    const txt = document.getElementById('door-text');
    if(txt) txt.style.display = 'none';

    gsap.to("#magic-door", { 
        scale: 60, duration: 4, ease: "power2.in",
        onComplete: () => window.location.href = 'home.html'
    });
}

// === الدخلة ===
window.onload = () => {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        document.querySelector('.bar').style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            document.querySelector('.loader').style.display = 'none';
            document.querySelector('p').innerText = "واجد؟ ورك لتحت 👇";
            const startBtn = document.getElementById('start-btn');
            
            if(startBtn) {
                startBtn.classList.remove('hidden');
                startBtn.addEventListener('click', () => {
                    playAudio('snd-gta', 1.0);
                    gsap.to('#intro-screen', { opacity: 0, duration: 1, onComplete: () => {
                        document.getElementById('intro-screen').style.display = 'none';
                        document.getElementById('game-stage').classList.remove('hidden');
                        startMovie(); 
                    }});
                });
            }
        }
    }, 50);
};

// === السيناريو ===
function startMovie() {
    
    // --- 1. المطاردة ---
    timeline
        .add("startChase")
        .call(() => {
            playAudio('snd-gta', 0.2);
            playAudio('snd-police', 0.8);
        }, null, "startChase")
        
        .to("#msg-police", { opacity: 1, duration: 0.5, delay: 0.5 })
        .to("#msg-police", { opacity: 0, duration: 0.5, delay: 9 }) // 9 ثواني قراءة
        
        .to("#giant-hand", { top: "60%", duration: 1, ease: "bounce.out" })
        .to("#giant-hand", { top: "-100px", duration: 1, ease: "power2.in" }, "+=0.5")
        .to("#runner", { bottom: "100%", duration: 1, ease: "power2.in" }, "<")
        .to("#police", { left: "-100%", duration: 1 }, "<")

        // --- 2. الماتريكس ---
        .to("#fade-overlay", { opacity: 1, duration: 0.5 })
        .call(() => {
            stopAudio('snd-gta');
            stopAudio('snd-police');
            playAudio('snd-matrix', 0.9);
            switchScene('scene-chase', 'scene-matrix');
        })
        .to("#fade-overlay", { opacity: 0, duration: 0.5 })

        .to("#badr-img", { right: "10%", duration: 1 })
        .to("#msg-badr", { opacity: 1, duration: 0.5 })
        .to("#msg-badr", { opacity: 0, duration: 0.5, delay: 10 }) // 10 ثواني قراءة
        .to("#badr-img", { right: "-500px", duration: 1 })

        // --- 3. الصالون ---
        .to("#fade-overlay", { opacity: 1, duration: 0.5 })
        .call(() => {
            stopAudio('snd-matrix');
            playAudio('snd-godfather', 1.0);
            switchScene('scene-matrix', 'scene-salon');
        })
        .to("#fade-overlay", { opacity: 0, duration: 0.5 })

        .fromTo("#runner-salon", { top: "-100px", rotation: 180 }, { top: "60%", duration: 0.8, ease: "bounce.out" })
        .to("#runner-salon", { rotation: 0, duration: 0.3 })
        .to("#othman-img", { left: "10%", duration: 1 })
        .to("#msg-othman", { opacity: 1, duration: 0.5 })
        .to("#msg-othman", { opacity: 0, duration: 0.5, delay: 11 }) // 11 ثانية قراءة
        .to("#othman-img", { left: "-500px", duration: 1 })
        
        .call(() => {
            const runner = document.getElementById('runner-salon');
            if(runner) {
                runner.classList.remove('runner-idle');
                runner.classList.add('runner');
            }
        })
        .to("#runner-salon", { left: "120%", duration: 1.5, ease: "power1.in" })

        // --- 4. الكسيدة (التعديل: حساب 3 ثواني بالضبط) ---
        .to("#fade-overlay", { opacity: 1, duration: 0.5 })
        .call(() => {
            stopAudio('snd-godfather');
            switchScene('scene-salon', 'scene-crash');
        })
        .to("#fade-overlay", { opacity: 0, duration: 0.5 })

        .fromTo("#runner-street", { left: "-100px" }, { left: "45%", duration: 1.5, ease: "power1.out" })
        
        // >> بداية لقطة الكسيدة <<
        .add("crashStart")
        
        // 1. تشغيل صوت الكسيدة (فيه 3 ثواني ديال الروطار)
        .call(() => {
            playAudio('snd-crash', 1.0); 
            playAudio('snd-racing', 0.5); // صوت الموطور خفيف فالخلفية
        }, null, "crashStart") 
        
        // 2. كنتسناو 2.5 ثانية (والصوت خدام) عاد كنحركو الطوموبيل
        // الطوموبيل غاتاخد 0.5 ثانية باش توصل
        .to("#incoming-car", { right: "55%", duration: 0.5, ease: "power4.in" }, "crashStart+=2.5")
        
        // 3. لحظة الاصطدام (فالثانية 3.0 بالضبط)
        .add("impactMoment", "crashStart+=3.0") 
        
        .call(() => stopAudio('snd-racing'), null, "impactMoment")
        
        // التأثيرات البصرية (مع البووم)
        .to("#flash-overlay", { opacity: 0.9, duration: 0.1, yoyo: true, repeat: 3 }, "impactMoment")
        .to("#game-stage", { x: 15, y: 15, duration: 0.05, repeat: 10, yoyo: true }, "impactMoment")
        
        // السقوط
        .call(() => {
            document.getElementById('runner-street').className = "character runner-idle";
        }, null, "impactMoment")
        .to("#runner-street", { 
            rotation: 90, 
            y: 60, 
            x: 50, 
            scale: 0.9, 
            duration: 0.1 
        }, "impactMoment")
        .to(".smoke", { opacity: 1, duration: 0.1 }, "impactMoment")

        // 5. دخول صتيفا (بعد شوية)
        .add("stifaEnter", "+=1")
        .to("#stifa-img", { right: "10%", duration: 1 }, "stifaEnter")
        .to("#msg-stifa", { opacity: 1, duration: 0.5 })
        .to("#msg-stifa", { opacity: 0, duration: 0.5, delay: 13 }) // 13 ثانية قراءة
        
        // --- 6. النهاية ---
        .to("#fade-overlay", { opacity: 1, duration: 0.5 })
        .call(() => {
            stopAudio('snd-crash');
            switchScene('scene-crash', 'scene-door');
        })
        .to("#fade-overlay", { opacity: 0, duration: 0.5 })
        
        .to("#magic-door", { scale: 1.5, duration: 1, ease: "power1.out" }) 
        .call(() => {
            const txt = document.getElementById('door-text');
            if(txt) {
                txt.classList.remove('hidden');
                gsap.fromTo(txt, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
            }
        });
}

function switchScene(hide, show) {
    const h = document.getElementById(hide);
    const s = document.getElementById(show);
    if(h) h.classList.add('hidden');
    if(s) s.classList.remove('hidden');
}

// Matrix Background
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const chars = "01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ"; 
    const drops = Array(Math.floor(canvas.width / 20)).fill(1);
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0F0"; ctx.font = "20px arial";
        drops.forEach((y, i) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 20, y * 20);
            if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }
    setInterval(drawMatrix, 50);
}