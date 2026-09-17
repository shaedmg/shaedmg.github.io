/* ═══════════════════════════════════════════════════
   PIXEL BOY PORTFOLIO — JavaScript
   Interactive handheld-console navigation
═══════════════════════════════════════════════════ */

'use strict';

/* ─── Portfolio Data ────────────────────────────── */
const PORTFOLIO = {
    name:     'ALEX RIVERA',
    title:    'FULL STACK DEV',
    location: 'NEW YORK, USA',
    exp:      '5+ YEARS',
    status:   'OPEN TO WORK',
    bio:      ['BUILDING WEB APPS &', 'DIGITAL EXPERIENCES', 'SINCE 2019.'],
};

const PROJECTS = [
    {
        id:    'neon-cart',
        name:  'NEON CART',
        short: 'E-COMMERCE PLATFORM',
        desc:  ['FULL-STACK STORE', 'W/ REAL-TIME SYNC', 'AND ADMIN DASH.'],
        tech:  'REACT · NODE · POSTGRES · STRIPE',
        stats: ['★ 10K+ USERS', '◆ 99.9% UPTIME'],
    },
    {
        id:    'pixel-vault',
        name:  'PIXEL VAULT',
        short: 'DIGITAL ART MARKET',
        desc:  ['MARKETPLACE FOR', 'DIGITAL ARTISTS TO', 'SELL THEIR WORK.'],
        tech:  'VUE · PYTHON · MONGODB · AWS',
        stats: ['★ 500+ ARTISTS', '◆ $200K+ SOLD'],
    },
    {
        id:    'cloud-nine',
        name:  'CLOUD NINE',
        short: 'WEATHER APP',
        desc:  ['ANIMATED WEATHER', 'APP W/ 7-DAY CAST', '& LOCATION SYNC.'],
        tech:  'REACT NATIVE · OPENWEATHER',
        stats: ['★ 50K DOWNLOADS', '◆ 4.8 STARS'],
    },
    {
        id:    'retro-quest',
        name:  'RETRO QUEST',
        short: 'BROWSER RPG GAME',
        desc:  ['PIXEL-ART RPG', 'WITH MULTIPLAYER', '& DUNGEONS.'],
        tech:  'THREE.JS · SOCKET.IO · NODE',
        stats: ['★ 2K PLAYERS', '◆ OPEN SOURCE'],
    },
];

const SKILLS = {
    'FRONTEND': ['React', 'Vue.js', 'TypeScript', 'CSS', 'Three.js', 'Next.js'],
    'BACKEND':  ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST'],
    'DEVOPS':   ['Docker', 'AWS', 'Git', 'CI/CD', 'Nginx', 'Linux'],
};

const CONTACT = [
    { icon: '✉', label: 'EMAIL',     value: 'alex@pixeldev.io'  },
    { icon: '⌥', label: 'GITHUB',    value: 'github/alexrivera' },
    { icon: '◈', label: 'LINKEDIN',  value: '/in/alexrivera'    },
    { icon: '◉', label: 'SITE',      value: 'alexrivera.dev'    },
];

const MENU_ITEMS = ['ABOUT ME', 'PROJECTS', 'SKILLS', 'CONTACT'];

/* ─── State ─────────────────────────────────────── */
const state = {
    page:         'boot',   // boot | menu | about | projects | project | skills | contact
    menuCursor:   0,
    projCursor:   0,
    ready:        false,
};

/* ─── DOM refs ──────────────────────────────────── */
const screenContent = document.getElementById('screenContent');
const screenLcd     = document.getElementById('screenLcd');
const speakerGrid   = document.getElementById('speakerGrid');

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
function init() {
    buildSpeakerGrid();
    bindButtons();
    bindKeyboard();
    bootSequence();
}

/* ─── Speaker dots ───────────────────────────────── */
function buildSpeakerGrid() {
    for (let i = 0; i < 20; i++) {          // 5 cols × 4 rows
        const dot = document.createElement('div');
        dot.className = 'sp-dot';
        speakerGrid.appendChild(dot);
    }
}

/* ═══════════════════════════════════════════════════
   BOOT SEQUENCE
═══════════════════════════════════════════════════ */
function bootSequence() {
    state.page  = 'boot';
    state.ready = false;

    // Start with off-screen
    screenLcd.style.background = '#495B00';
    screenContent.innerHTML    = '';

    setTimeout(() => {
        // Screen flickers on
        screenLcd.style.background = '';

        // Phase 1 — logo appears
        screenContent.innerHTML = renderBootPhase1();

        setTimeout(() => {
            // Phase 2 — "PRESS START" blinks in
            screenContent.innerHTML = renderBootPhase2();
            state.ready = true;
        }, 1600);
    }, 700);
}

function renderBootPhase1() {
    return `
    <div class="boot-screen">
        <div class="boot-art">PB</div>
        <div class="boot-title">PIXEL BOY</div>
        <div class="boot-sub">PORTFOLIO EDITION</div>
        <div class="boot-cr">© 2026 ALEX RIVERA</div>
    </div>`;
}

function renderBootPhase2() {
    return `
    <div class="boot-screen">
        <div class="boot-art">PB</div>
        <div class="boot-title">PIXEL BOY</div>
        <div class="boot-sub">PORTFOLIO EDITION</div>
        <div class="boot-cr">© 2026 ALEX RIVERA</div>
        <div class="press-start">PRESS START</div>
    </div>`;
}

/* ═══════════════════════════════════════════════════
   RENDERERS
═══════════════════════════════════════════════════ */

function renderMenu() {
    const items = MENU_ITEMS.map((item, i) => {
        const active  = i === state.menuCursor;
        const cursor  = active ? '▶' : '&nbsp;';
        return `<div class="menu-item ${active ? 'active' : ''}">
                    <span class="m-cursor">${cursor}</span>
                    <span>${item}</span>
                </div>`;
    }).join('');

    screenContent.innerHTML = `
    <div class="menu-screen">
        <div class="menu-header">
            <span class="menu-player">${PORTFOLIO.name}</span>
            <span class="menu-ver">${PORTFOLIO.title} &bull; V1.0</span>
        </div>
        <div class="menu-list">${items}</div>
        <div class="menu-footer">[↑↓] MOVE &nbsp; [A/↵] SELECT</div>
    </div>`;
}

function renderAbout() {
    const bio = PORTFOLIO.bio.map(l => `<span class="val">${l}</span>`).join('');
    screenContent.innerHTML = `
    <div class="content-page">
        <div class="page-title">ABOUT ME</div>
        <div class="page-body">
            <span class="lbl">NAME</span>
            <span class="val">${PORTFOLIO.name}</span>
            <span class="lbl">ROLE</span>
            <span class="val">${PORTFOLIO.title}</span>
            <span class="lbl">LOCATION</span>
            <span class="val">${PORTFOLIO.location}</span>
            <span class="lbl">EXPERIENCE</span>
            <span class="val">${PORTFOLIO.exp}</span>
            <span class="lbl">BIO</span>
            ${bio}
            <span class="lbl">STATUS</span>
            <span class="status-open">★ ${PORTFOLIO.status} ★</span>
        </div>
        <div class="page-footer">[B] BACK &nbsp; [START] MENU</div>
    </div>`;
}

function renderProjects() {
    const items = PROJECTS.map((p, i) => {
        const active = i === state.projCursor;
        const cursor = active ? '▶' : '&nbsp;';
        return `<div class="proj-item ${active ? 'active' : ''}">
                    <span class="p-cursor">${cursor}</span>
                    <span>${p.name}</span>
                </div>`;
    }).join('');

    const preview = PROJECTS[state.projCursor];

    screenContent.innerHTML = `
    <div class="content-page">
        <div class="page-title">PROJECTS</div>
        <div class="page-body">
            <div>${items}</div>
            <div class="proj-preview">
                ${preview.short}<br>${preview.stats[0]}
            </div>
        </div>
        <div class="page-footer">[↑↓] MOVE &nbsp; [A] VIEW &nbsp; [B] BACK</div>
    </div>`;
}

function renderProjectDetail(proj) {
    const desc  = proj.desc.join('<br>');
    const stats = proj.stats.join('<br>');
    screenContent.innerHTML = `
    <div class="content-page">
        <div class="page-title">${proj.name}</div>
        <div class="page-body">
            <span class="lbl">${proj.short}</span>
            <span class="proj-tech">${desc}</span>

            <span class="lbl">TECH STACK</span>
            <span class="proj-tech">${proj.tech}</span>

            <span class="lbl">HIGHLIGHTS</span>
            <span class="proj-stat">${stats}</span>
        </div>
        <div class="page-footer">[B] BACK &nbsp; [START] MENU</div>
    </div>`;
}

function renderSkills() {
    const cats = Object.entries(SKILLS).map(([cat, tags]) => {
        const tagHTML = tags.map(t => `<span class="skill-tag">${t}</span>`).join('');
        return `<span class="skills-cat">${cat}</span>
                <div class="skill-wrap">${tagHTML}</div>`;
    }).join('');

    screenContent.innerHTML = `
    <div class="content-page">
        <div class="page-title">SKILLS</div>
        <div class="page-body">${cats}</div>
        <div class="page-footer">[B] BACK &nbsp; [START] MENU</div>
    </div>`;
}

function renderContact() {
    const items = CONTACT.map(c => `
        <div class="citem">
            <span class="clabel">${c.icon} ${c.label}</span>
            <span class="cval">${c.value}</span>
        </div>`).join('');

    screenContent.innerHTML = `
    <div class="content-page">
        <div class="page-title">CONTACT</div>
        <div class="page-body">${items}</div>
        <div class="page-footer">[B] BACK &nbsp; [START] MENU</div>
    </div>`;
}

/* ═══════════════════════════════════════════════════
   NAVIGATION / INPUT
═══════════════════════════════════════════════════ */

function pressA() {
    if (!state.ready) return;
    if (state.page === 'boot') {
        goToMenu();
    } else if (state.page === 'menu') {
        selectMenu();
    } else if (state.page === 'projects') {
        openProjectDetail();
    }
}

function pressB() {
    if (!state.ready) return;
    if (state.page === 'project') {
        transition(() => { state.page = 'projects'; renderProjects(); });
    } else if (['about', 'skills', 'contact', 'projects'].includes(state.page)) {
        goToMenu();
    }
}

function pressStart() {
    if (!state.ready) return;
    if (state.page === 'boot') {
        goToMenu();
    } else {
        goToMenu();
    }
}

function pressSelect() {
    // intentionally no action — reserved
}

function navigate(dir) {
    if (!state.ready) return;

    if (state.page === 'menu') {
        if (dir === 'up')   state.menuCursor = Math.max(0, state.menuCursor - 1);
        if (dir === 'down') state.menuCursor = Math.min(MENU_ITEMS.length - 1, state.menuCursor + 1);
        renderMenu();
    } else if (state.page === 'projects') {
        if (dir === 'up')   state.projCursor = Math.max(0, state.projCursor - 1);
        if (dir === 'down') state.projCursor = Math.min(PROJECTS.length - 1, state.projCursor + 1);
        renderProjects();
    }
}

function selectMenu() {
    const selected = MENU_ITEMS[state.menuCursor];
    transition(() => {
        if (selected === 'ABOUT ME')  { state.page = 'about';    renderAbout();    }
        if (selected === 'PROJECTS')  { state.page = 'projects'; renderProjects(); }
        if (selected === 'SKILLS')    { state.page = 'skills';   renderSkills();   }
        if (selected === 'CONTACT')   { state.page = 'contact';  renderContact();  }
    });
}

function openProjectDetail() {
    transition(() => {
        state.page = 'project';
        renderProjectDetail(PROJECTS[state.projCursor]);
    });
}

function goToMenu() {
    transition(() => {
        state.page = 'menu';
        renderMenu();
    });
}

/* ─── Screen flash transition ────────────────────── */
function transition(callback) {
    screenLcd.classList.add('flash');
    screenLcd.addEventListener('animationend', () => {
        screenLcd.classList.remove('flash');
        callback();
    }, { once: true });
}

/* ═══════════════════════════════════════════════════
   EVENT LISTENERS
═══════════════════════════════════════════════════ */

function bindButtons() {
    document.getElementById('dpUp').addEventListener('click',    () => navigate('up'));
    document.getElementById('dpDown').addEventListener('click',  () => navigate('down'));
    document.getElementById('dpLeft').addEventListener('click',  () => navigate('left'));
    document.getElementById('dpRight').addEventListener('click', () => navigate('right'));
    document.getElementById('btnA').addEventListener('click',    pressA);
    document.getElementById('btnB').addEventListener('click',    pressB);
    document.getElementById('btnStart').addEventListener('click',  pressStart);
    document.getElementById('btnSelect').addEventListener('click', pressSelect);
}

function bindKeyboard() {
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                e.preventDefault(); navigate('up');   break;
            case 'ArrowDown':
            case 's':
            case 'S':
                e.preventDefault(); navigate('down'); break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                e.preventDefault(); navigate('left'); break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                e.preventDefault(); navigate('right'); break;
            case 'z':
            case 'Z':
            case 'Enter':
                pressA(); break;
            case 'x':
            case 'X':
            case 'Escape':
            case 'Backspace':
                e.preventDefault(); pressB(); break;
            case ' ':
                e.preventDefault(); pressStart(); break;
        }
    });
}

/* ── Start ───────────────────────────────────────── */
window.addEventListener('load', init);
