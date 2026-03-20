import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./NotFoundPage.module.css";
import eggStyles from "./EasterEggs.module.css";

const TARGET = new Date(Date.now() + 614 * 24 * 3600000 + 7 * 3600000 + 43 * 60000);
const LAUNCH_START = new Date("2003-12-21");
const TOTAL = TARGET - LAUNCH_START;
const pad = (n) => String(n).padStart(2, "0");

function getThaiTime() {
    return new Date().toLocaleString("th-TH", {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function getCountdown() {
    const diff = Math.max(0, TARGET - Date.now());
    return {
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
        pct: Math.min(100, ((TOTAL - diff) / TOTAL) * 100),
    };
}

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    dur: 6 + Math.random() * 8,
    delay: Math.random() * 4,
}));

const MARQUEE = [
    "Coming Soon", "//", "teeprakorn1", "//", "github.com/teeprakorn1", "//",
    "Still Cooking", "//", "Touch Grass", "//", "Skill Issue", "//",
    "Coming Soon", "//", "teeprakorn1", "//", "github.com/teeprakorn1", "//",
    "Still Cooking", "//", "Touch Grass", "//", "Skill Issue", "//",
];

const PILLS = ["Aitia", "Aiyulia", "Lostland", "Catnip", "Sigma boy", "Logs"];

const GithubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

function EggOverlay({ active, onClose, children, withMatrix }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!active) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active, onClose]);

    useEffect(() => {
        if (!active || !withMatrix) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const cols = Math.floor(canvas.width / 16);
        const drops = Array(cols).fill(1);
        const chars = "アイユリスAIYULIS01teeprakorn404";
        const draw = () => {
            ctx.fillStyle = "rgba(3,3,3,0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#00ff88";
            ctx.font = "14px 'Share Tech Mono', monospace";
            drops.forEach((y, i) => {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * 16, y * 16);
                if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            });
        };
        const id = setInterval(draw, 40);
        return () => clearInterval(id);
    }, [active, withMatrix]);

    if (!active) return null;

    return (
        <div className={eggStyles.overlay} onClick={onClose}>
            {withMatrix && <canvas ref={canvasRef} className={eggStyles.matrix} />}
            {children}
        </div>
    );
}

function EggPopup({ title, closeLabel = "[ ESC ] close", onClose, children }) {
    return (
        <div className={eggStyles.popup} onClick={(e) => e.stopPropagation()}>
            <div className={eggStyles.popupBar}>
                <span className={eggStyles.dot} />
                <span className={eggStyles.dot} />
                <span className={eggStyles.dot} />
                <span className={eggStyles.popupTitle}>{title}</span>
            </div>
            <div className={eggStyles.popupBody}>{children}</div>
            <button className={eggStyles.closeBtn} onClick={onClose}>{closeLabel}</button>
        </div>
    );
}

function EasterEgg1({ active, onClose }) {
    return (
        <EggOverlay active={active} onClose={onClose} withMatrix>
            <EggPopup title="secret.log" onClose={onClose}>
                <p><span className={eggStyles.ok}>[FOUND]</span> aiyulis.easter_egg — unlocked</p>
                <p><span className={eggStyles.cm}>{'// สวัสดี คนขยัน'}</span></p>
                <p><span className={eggStyles.cm}>{'// ยินดีที่เจอระบบนี้'}</span></p>
                <p><span className={eggStyles.prompt}>$ </span>cat /secret/message.txt</p>
                <p className={eggStyles.secret}>
                    "the website isn't done.<br />
                    but you found this,<br />
                    so you're already ahead."
                </p>
                <p><span className={eggStyles.prompt}>$ </span><span className={eggStyles.blink}>_</span></p>
            </EggPopup>
        </EggOverlay>
    );
}

function EasterEgg2({ active, onClose }) {
    return (
        <EggOverlay active={active} onClose={onClose}>
            <EggPopup title="debug.log — COMING x5" onClose={onClose}>
                <p><span className={eggStyles.warn}>[WARN]</span> title clicked 5 times</p>
                <p><span className={eggStyles.ok}>[OK]</span> patience.exe detected</p>
                <p><span className={eggStyles.cm}>{'// นายคลิกมันซ้ำๆ จริงๆเหรอ ไม่น่าเชื่อเลย'}</span></p>
                <p><span className={eggStyles.prompt}>$ </span>whoami</p>
                <p className={eggStyles.secret}>"someone who reads everything."</p>
                <p><span className={eggStyles.cm}>{'// respect. โอเครเพื่อน นายสุดยอดมาก'}</span></p>
                <p><span className={eggStyles.prompt}>$ </span><span className={eggStyles.blink}>_</span></p>
            </EggPopup>
        </EggOverlay>
    );
}

function EasterEgg3({ active, onClose }) {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (!active) {
            setCountdown(5);
            return;
        }
        const tick = setInterval(() => {
            setCountdown((c) => {
                if (c <= 1) {
                    clearInterval(tick);
                    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
                    onClose();
                    return 5;
                }
                return c - 1;
            });
        }, 1000);
        return () => clearInterval(tick);
    }, [active, onClose]);

    return (
        <EggOverlay active={active} onClose={onClose}>
            <EggPopup
                title="redirect.exe"
                closeLabel="[ ESC ] abort redirect"
                onClose={onClose}
            >
                <p><span className={eggStyles.ok}>[KONAMI]</span> cheat code accepted</p>
                <p><span className={eggStyles.warn}>[WARN]</span> initiating reward protocol...</p>
                <p><span className={eggStyles.cm}>{'// congratulations, you played yourself'}</span></p>
                <p><span className={eggStyles.prompt}>$ </span>open reward.mp4</p>
                <p className={eggStyles.secret}>
                    "redirecting in {countdown}s...<br />
                    you asked for this."
                </p>
                <p><span className={eggStyles.cm}>{'// กด ESC สิถ้านายกล้ามากพอ'}</span></p>
                <p><span className={eggStyles.prompt}>$ </span><span className={eggStyles.blink}>_</span></p>
            </EggPopup>
        </EggOverlay>
    );
}

function EasterEgg4({ active, onClose }) {
    return (
        <EggOverlay active={active} onClose={onClose}>
            <EggPopup
                title="transmission_2027.log"
                closeLabel="[ ESC ] close transmission"
                onClose={onClose}
            >
                <p><span className={eggStyles.warn}>[RECV]</span> incoming signal — year 2027</p>
                <p><span className={eggStyles.cm}>{'// decrypting message...'}</span></p>
                <p><span className={eggStyles.prompt}>$ </span>cat /future/note_to_past.txt</p>
                <p className={eggStyles.secret}>
                    "เว็บเสร็จแล้วนะ<br />
                    ใช้เวลานานกว่าที่คิด<br />
                    แต่มันออกมาดีมาก<br />
                    trust the process."
                </p>
                <p><span className={eggStyles.warn}>[WARN]</span> signal lost. connection closed.</p>
                <p><span className={eggStyles.prompt}>$ </span><span className={eggStyles.blink}>_</span></p>
            </EggPopup>
        </EggOverlay>
    );
}

function EasterEgg5({ active, onClose }) {
    const [chosen, setChosen] = useState(null);
    const ANSWER = 2027;
    const OPTIONS = [2025, 2026, 2027];

    useEffect(() => {
        if (!active) setChosen(null);
    }, [active]);

    return (
        <EggOverlay active={active} onClose={onClose}>
            <EggPopup title="quiz.exe — launch_year.unknown" onClose={onClose}>
                <p><span className={eggStyles.ok}>[HELP]</span> distress signal received</p>
                <p><span className={eggStyles.cm}>{"// คนนี้พิมพ์ help จริงๆ เหรอ ..."}</span></p>
                <p><span className={eggStyles.prompt}>$ </span>run quiz --topic=launch_date</p>
                <p style={{ color: "#e8ffe8", fontSize: "13px", marginTop: 4 }}>
                    ตอบให้ถูก: เว็บ aiyulis จะเสร็จปีไหน?
                </p>
                <div className={eggStyles.quizOptions}>
                    {OPTIONS.map((opt) => (
                        <button
                            key={opt}
                            className={[
                                eggStyles.quizBtn,
                                chosen === null ? "" :
                                    opt === ANSWER ? eggStyles.quizCorrect :
                                        opt === chosen ? eggStyles.quizWrong : "",
                            ].join(" ")}
                            disabled={chosen !== null}
                            onClick={() => setChosen(opt)}
                        >
                            {opt === chosen && chosen !== ANSWER && "✗ "}
                            {opt === ANSWER && chosen !== null && "✓ "}
                            {opt}
                        </button>
                    ))}
                </div>
                {chosen === ANSWER && (
                    <p className={eggStyles.secret}>
                        "ถูกต้อง. badge: early_believer unlocked.<br />
                        ขอบคุณที่ยังรออยู่."
                    </p>
                )}
                {chosen !== null && chosen !== ANSWER && (
                    <p style={{ color: "#ff3355", fontSize: "12px" }}>
                        <span className={eggStyles.prompt}>$ </span>
                        wrong. try again? <span className={eggStyles.blink}>_</span>
                    </p>
                )}
                <p><span className={eggStyles.prompt}>$ </span><span className={eggStyles.blink}>_</span></p>
            </EggPopup>
        </EggOverlay>
    );
}

function EasterEgg6({ active, onClose, isMidnight }) {
    return (
        <EggOverlay active={active} onClose={onClose}>
            <EggPopup
                title={isMidnight ? "midnight_mode.log" : "time_check.log"}
                onClose={onClose}
            >
                {isMidnight ? (
                    <>
                        <p><span className={eggStyles.ok}>[MIDNIGHT]</span> you found it. respect.</p>
                        <p><span className={eggStyles.cm}>{"// ตอนตี 12 ยังเปิดเว็บนี้อยู่เหรอ นายโอเคมั้ย"}</span></p>
                        <p><span className={eggStyles.prompt}>$ </span>cat /secret/midnight.txt</p>
                        <div className={eggStyles.loreText}>
                            03 midnight override — access granted<br />
                            only night owls reach this line.<br />
                            the dev is probably also awake right now.<br />
                            สู้ๆ นะ คนขยัน
                        </div>
                        <p><span className={eggStyles.ok}>[UNLOCK]</span> night_owl.badge — stored</p>
                    </>
                ) : (
                    <>
                        <p><span className={eggStyles.warn}>[WARN]</span> too early. or too late.</p>
                        <p><span className={eggStyles.cm}>{"// ยังไม่ถึงเวลา secret นี้"}</span></p>
                        <p><span className={eggStyles.prompt}>$ </span>check --time</p>
                        <p className={eggStyles.secret}>
                            "come back at midnight (Bangkok time).<br />
                            00:00 — 00:59.<br />
                            แล้วลอง Alt+T อีกที"
                        </p>
                    </>
                )}
                <p><span className={eggStyles.prompt}>$ </span><span className={eggStyles.blink}>_</span></p>
            </EggPopup>
        </EggOverlay>
    );
}

function EasterEgg7({ active, onClose }) {
    return (
        <EggOverlay active={active} onClose={onClose}>
            <EggPopup title="transmission_unknown.log" onClose={onClose}>
                <p><span className={eggStyles.warn}>[RECV]</span> signal from: dev_B — unverified</p>
                <p><span className={eggStyles.cm}>{"// ไม่รู้ว่าใครส่งมา แต่มันมา"}</span></p>
                <p><span className={eggStyles.prompt}>$ </span>decrypt --force</p>
                <div className={eggStyles.loreText}>
                    to whoever is reading this—<br /><br />
                    i was the one who helped debug the countdown.<br />
                    teeprakorn never asked me to leave a message.<br />
                    but the status dot was always mine to hide things in.<br /><br />
                    ถ้านายเห็นข้อความนี้<br />
                    แปลว่านายช่างสังเกตมากกว่าคนส่วนใหญ่<br /><br />
                    — dev_B, somewhere in the stack
                </div>
                <p><span className={eggStyles.warn}>[WARN]</span> sender identity unresolved.</p>
                <p><span className={eggStyles.prompt}>$ </span><span className={eggStyles.blink}>_</span></p>
            </EggPopup>
        </EggOverlay>
    );
}

function EasterEgg8({ active, onClose }) {
    return (
        <EggOverlay active={active} onClose={onClose}>
            <EggPopup title="404.log — this is fine" onClose={onClose}>
                <p><span className={eggStyles.warn}>[404]</span> easter egg not found</p>
                <p><span className={eggStyles.cm}>{"// wait—"}</span></p>
                <div className={eggStyles.innerPopup}>
                    [404] easter egg inside easter egg not found<br />
                    <span style={{ color: "#ff335599", fontSize: "10px" }}>
                        {"// this is recursion. you did this."}
                    </span>
                    <div style={{
                        marginTop: 8,
                        padding: "6px 10px",
                        border: "1px solid #ff335533",
                        fontSize: "10px",
                        color: "#ff335577",
                    }}>
                        [404] easter egg inside easter egg inside easter egg not found<br />
                        <span style={{ fontSize: "9px", opacity: 0.5 }}>{"// ..."}</span>
                    </div>
                </div>
                <p className={eggStyles.secret}>
                    "นายพิมพ์ 404 บนหน้า 404.<br />
                    ขอชื่นชมความ sigma ในตัวนายเลย."
                </p>
                <p><span className={eggStyles.ok}>[OK]</span> recursion_enjoyer.badge — granted</p>
                <p><span className={eggStyles.prompt}>$ </span><span className={eggStyles.blink}>_</span></p>
            </EggPopup>
        </EggOverlay>
    );
}

function EasterEgg9({ active, onClose }) {
    return (
        <EggOverlay active={active} onClose={onClose}>
            <EggPopup
                title="project_codename.classified"
                closeLabel="[ ESC ] seal the file"
                onClose={onClose}
            >
                <p><span className={eggStyles.warn}>[CLASSIFIED]</span> clearance level: curious</p>
                <p><span className={eggStyles.cm}>{"// นายคลิกสามทีติดกัน นายโอเคมั้ย"}</span></p>
                <p><span className={eggStyles.prompt}>$ </span>cat /vault/codename.txt</p>
                <div className={eggStyles.codename}>PROJECT AIYULIS</div>
                <div className={eggStyles.devNote}>
                    เริ่มคิดตั้งแต่ปี 2003<br />
                    ยังไม่เสร็จในปี 2026<br />
                    แต่ทุก commit มันนับ<br />
                    ทุก pixel มันสำคัญ<br /><br />
                    ถ้านายอ่านถึงบรรทัดนี้ —<br />
                    นายคือคนที่เว็บนี้สร้างมาเพื่อ
                </div>
                <p><span className={eggStyles.ok}>[OK]</span> vault access logged. welcome.</p>
                <p><span className={eggStyles.prompt}>$ </span><span className={eggStyles.blink}>_</span></p>
            </EggPopup>
        </EggOverlay>
    );
}

export default function ComingSoon() {
    const [t, setT] = useState(getCountdown());
    const [clock, setClock] = useState(getThaiTime());
    const [prevS, setPrevS] = useState(t.s);
    const [tickAnim, setTickAnim] = useState(false);
    const cursorRef = useRef(null);
    const [egg1Active, setEgg1Active] = useState(false);
    const [egg2Active, setEgg2Active] = useState(false);
    const [egg3Active, setEgg3Active] = useState(false);
    const [egg4Active, setEgg4Active] = useState(false);
    const [egg5Active, setEgg5Active] = useState(false);
    const [egg6Active, setEgg6Active] = useState(false);
    const [egg7Active, setEgg7Active] = useState(false);
    const [egg8Active, setEgg8Active] = useState(false);
    const [egg9Active, setEgg9Active] = useState(false);

    const [titleCursed, setTitleCursed] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [isMidnight, setIsMidnight] = useState(false);

    const hoverTimerRef = useRef(null);
    const tripleClickRef = useRef({ count: 0, timer: null });

    useEffect(() => {
        const id = setInterval(() => {
            const next = getCountdown();
            if (next.s !== prevS) {
                setTickAnim(true);
                setTimeout(() => setTickAnim(false), 180);
                setPrevS(next.s);
            }
            setT(next);
            setClock(getThaiTime());
        }, 500);
        return () => clearInterval(id);
    }, [prevS]);

    useEffect(() => {
        const el = cursorRef.current;
        if (!el) return;
        const move = (e) => {
            el.style.left = e.clientX + "px";
            el.style.top = e.clientY + "px";
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    useEffect(() => {
        let buffer = "";
        const handleKey = (e) => {
            buffer = (buffer + e.key).slice(-7);
            if (buffer.toLowerCase() === "aiyulis") {
                setEgg1Active(true);
                buffer = "";
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    useEffect(() => {
        const KONAMI = [
            "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
            "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
            "b", "a",
        ];
        let idx = 0;
        const handleKey = (e) => {
            if (e.key === KONAMI[idx]) {
                idx++;
                if (idx === KONAMI.length) {
                    setEgg3Active(true);
                    idx = 0;
                }
            } else {
                idx = 0;
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    useEffect(() => {
        let fTimer = null;
        let revertTimer = null;
        const onDown = (e) => {
            if ((e.key === "f" || e.key === "F") && !fTimer) {
                fTimer = setTimeout(() => {
                    setTitleCursed(true);
                    fTimer = null;
                    revertTimer = setTimeout(() => setTitleCursed(false), 5000);
                }, 3000);
            }
        };
        const onUp = (e) => {
            if (e.key === "f" || e.key === "F") {
                clearTimeout(fTimer);
                fTimer = null;
            }
        };
        window.addEventListener("keydown", onDown);
        window.addEventListener("keyup", onUp);
        return () => {
            window.removeEventListener("keydown", onDown);
            window.removeEventListener("keyup", onUp);
            clearTimeout(fTimer);
            clearTimeout(revertTimer);
        };
    }, []);

    useEffect(() => {
        let buffer = "";
        const handleKey = (e) => {
            buffer = (buffer + e.key).slice(-4);
            if (buffer.toLowerCase() === "help") {
                setEgg5Active(true);
                buffer = "";
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.altKey && (e.key === "t" || e.key === "T")) {
                const hour = new Date().toLocaleString("en-US", {
                    timeZone: "Asia/Bangkok",
                    hour: "numeric",
                    hour12: false,
                });
                setIsMidnight(Number(hour) === 0);
                setEgg6Active(true);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    useEffect(() => {
        let buffer = "";
        const handleKey = (e) => {
            buffer = (buffer + e.key).slice(-3);
            if (buffer === "404") {
                setEgg8Active(true);
                buffer = "";
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const handleDotEnter = () => {
        hoverTimerRef.current = setTimeout(() => setEgg7Active(true), 3000);
    };
    const handleDotLeave = () => clearTimeout(hoverTimerRef.current);

    const handleProgressClick = () => {
        const ref = tripleClickRef.current;
        ref.count += 1;
        clearTimeout(ref.timer);
        if (ref.count >= 3) {
            setEgg9Active(true);
            ref.count = 0;
        } else {
            ref.timer = setTimeout(() => { ref.count = 0; }, 500);
        }
    };

    const grow = () => cursorRef.current?.classList.add(styles.big);
    const shrink = () => cursorRef.current?.classList.remove(styles.big);

    const handleTitleClick = () => {
        const next = clickCount + 1;
        setClickCount(next);
        if (next >= 5) {
            setEgg2Active(true);
            setClickCount(0);
        }
    };

    const cursedText = "C\u0337O\u0338M\u0335I\u0337N\u0338G\u0335";

    return (
        <>
            <Helmet>
                <html lang="th" />
                <title>Aiyulis Webpage</title>
                <meta name="description" content="เว็บของ aiyulis กำลังจะมา ยังไม่เสร็จ แต่ยังมีชีวิตอยู่ — github.com/teeprakorn1" />
                <meta name="author" content="teeprakorn1" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://aiyulis.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://aiyulis.com/" />
                <meta property="og:title" content="aiyulis — Webpage" />
                <meta property="og:description" content="เว็บกำลังจะมา ยังไม่เสร็จ แต่ยังมีชีวิตอยู่" />
                <meta property="og:image" content="https://aiyulis.com/og-image.png" />
                <meta property="og:locale" content="th_TH" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="aiyulis — Webpage" />
                <meta name="twitter:description" content="เว็บกำลังจะมา ยังไม่เสร็จ แต่ยังมีชีวิตอยู่" />
                <meta name="twitter:image" content="https://aiyulis.com/og-image.png" />
            </Helmet>

            <div ref={cursorRef} className={styles.cursor} aria-hidden="true" />
            <EasterEgg1 active={egg1Active} onClose={() => setEgg1Active(false)} />
            <EasterEgg2 active={egg2Active} onClose={() => setEgg2Active(false)} />
            <EasterEgg3 active={egg3Active} onClose={() => setEgg3Active(false)} />
            <EasterEgg4 active={egg4Active} onClose={() => setEgg4Active(false)} />
            <EasterEgg5 active={egg5Active} onClose={() => setEgg5Active(false)} />
            <EasterEgg6 active={egg6Active} onClose={() => setEgg6Active(false)} isMidnight={isMidnight} />
            <EasterEgg7 active={egg7Active} onClose={() => setEgg7Active(false)} />
            <EasterEgg8 active={egg8Active} onClose={() => setEgg8Active(false)} />
            <EasterEgg9 active={egg9Active} onClose={() => setEgg9Active(false)} />

            <main className={styles.scene} role="main">
                <div className={styles.gridBg} aria-hidden="true" />
                <div className={styles.bracketTL} aria-hidden="true" />
                <div className={styles.bracketBR} aria-hidden="true" />

                {/* Terminal top bar */}
                <div className={styles.termBar} aria-hidden="true">
                    <div className={styles.termDot} />
                    <div className={styles.termDot} />
                    <div className={styles.termDot} />
                    <span className={styles.termTitle}>teeprakorn1@dev ~ bash</span>
                </div>

                {/* Floating particles */}
                {PARTICLES.map((p) => (
                    <div
                        key={p.id}
                        className={`${styles.particle} ${p.id % 2 === 0 ? styles.floatA : styles.floatB}`}
                        aria-hidden="true"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: p.x + "%",
                            top: p.y + "%",
                            background: p.id % 4 === 0 ? "#ff3355" : "#00ff88",
                            opacity: 0.25,
                            borderRadius: "50%",
                            position: "absolute",
                            pointerEvents: "none",
                            animationDuration: `${p.dur}s`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}

                <div className={styles.content}>

                    {/* Boot lines */}
                    <div className={styles.bootLine} role="log">
                        <span className={styles.prompt}>$ </span>
                        <span className={styles.cmd}>init aiyulis.101012</span>
                        <span className={styles.comment}> # booting the system ...</span>
                    </div>
                    <div className={styles.bootLine} role="log">
                        <span className={styles.ok}>[  OK  ] </span>
                        <span className={styles.cmd}>loading brain.exe</span>
                        <span className={styles.comment}> ... 97% done (stuck at 97%)</span>
                    </div>
                    <div className={styles.bootLine} role="log">
                        <span className={styles.warn}>[WARN] </span>
                        <span className={styles.cmd}>website not found</span>
                        <span className={styles.comment}> # But the Aiyuman is still alive.</span>
                    </div>

                    {/* Glitch title */}
                    <div className={styles.titleWrap}>
                        <h1
                            className={styles.title}
                            data-text={titleCursed ? cursedText : "COMING"}
                            onMouseEnter={grow}
                            onMouseLeave={shrink}
                            onClick={handleTitleClick}
                            style={{
                                cursor: "none",
                                filter: titleCursed ? "hue-rotate(180deg)" : "none",
                                transition: "filter 0.3s",
                            }}
                        >
                            {titleCursed ? cursedText : "COMING"}
                        </h1>
                        <div className={styles.titleSub}>SOON™</div>
                    </div>

                    {/* Sassy subtitle */}
                    <div className={styles.sassLine}>
                        <span className={styles.prompt}>{'// '}</span>
                        <span className={styles.cmd}>There's nothing to see on the website yet.<br /></span>
                        <span className={styles.prompt}>{'// '}</span>
                        <span className={styles.cmd}>but i trust me (since 2026)<br /></span>
                        <span className={styles.prompt}>{'// '}</span>
                        <span className={styles.comment}>TODO: ทำให้เสร็จซักที (since 2003)</span>
                    </div>

                    {/* Clock */}
                    <div className={styles.liveClock} aria-live="polite" aria-label="Current time in Thailand">
                        <span className={styles.clockLabel}>TH_TIME://</span>
                        <span>{clock}</span>
                    </div>

                    {/* Marquee */}
                    <div className={styles.marqueeWrap} aria-hidden="true">
                        <div className={styles.marqueeTrack}>
                            {MARQUEE.map((item, i) => (
                                <span key={i} className={item === "//" ? styles.marqueeDot : ""}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Countdown */}
                    <div className={styles.countdown} aria-label="Countdown to launch">
                        {[
                            { val: t.d, label: "Days" },
                            null,
                            { val: t.h, label: "Hrs" },
                            null,
                            { val: t.m, label: "Min" },
                            null,
                            { val: t.s, label: "Sec", anim: true },
                        ].map((item, i) =>
                            item === null ? (
                                <span key={i} className={styles.colon} aria-hidden="true">:</span>
                            ) : (
                                <div key={i} className={styles.unit}>
                                    <div
                                        className={`${styles.num}${item.anim && tickAnim ? " " + styles.tickAnim : ""}`}
                                        aria-label={`${item.val} ${item.label}`}
                                    >
                                        {pad(item.val)}
                                    </div>
                                    <div className={styles.unitLabel}>{item.label}</div>
                                </div>
                            )
                        )}
                    </div>
                    <div
                        className={styles.progressWrap}
                        role="progressbar"
                        aria-valuenow={Math.round(t.pct)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Launch progress"
                        onDoubleClick={() => setEgg4Active(true)}
                        onClick={handleProgressClick}
                        style={{ cursor: "none" }}
                    >
                        <div className={styles.progressTrack}>
                            <div className={styles.progressFill} style={{ width: t.pct + "%" }} />
                        </div>
                        <div className={styles.progressLabel} aria-hidden="true">
                            <span>INIT</span>
                            <span className={styles.pct}>{t.pct.toFixed(2)}% DONE</span>
                            <span>SHIP</span>
                        </div>
                    </div>

                    {/* GitHub */}
                    <a
                        href="https://github.com/teeprakorn1"
                        className={styles.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit teeprakorn1 on GitHub"
                        onMouseEnter={grow}
                        onMouseLeave={shrink}
                    >
                        <GithubIcon />
                        GITHUB.COM/TEEPRAKORN1
                    </a>

                    {/* Pills */}
                    <div className={styles.pills} aria-label="Tech stack">
                        {PILLS.map((p) => (
                            <div key={p} className={styles.pill} role="note">{p}</div>
                        ))}
                    </div>

                </div>
                <div className={styles.status} aria-live="polite">
                    <div
                        className={styles.statusDot}
                        aria-hidden="true"
                        onMouseEnter={handleDotEnter}
                        onMouseLeave={handleDotLeave}
                        style={{ cursor: "none" }}
                    />
                    <span>PROCESS RUNNING... NO ETA</span>
                </div>

            </main>
        </>
    );
}