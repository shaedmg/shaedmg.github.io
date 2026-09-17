/* ═══════════════════════════════════════════════════
   PIXEL BOY PORTFOLIO — JavaScript
   Angelo Medina Gonzalez
═══════════════════════════════════════════════════ */

'use strict';

/* ─── Portfolio Data ────────────────────────────── */
const PORTFOLIO = {
    name:     'ANGELO MEDINA',
    title:    'FULL STACK DEV',
    location: 'LAS PALMAS, ES',
    exp:      '5+ YEARS',
    status:   'OPEN TO WORK',
    langs:    [['ES', 'Native'], ['EN', 'Professional']],
};

const EXPERIENCE = [
    {
        company: 'SALESCALING',
        role:    'Full Stack Dev',
        period:  'May 2024 - Jul 2025',
        stack:   ['TypeScript', 'React', 'NestJS', 'PostgreSQL'],
        note:    'Web platform for sales scaling & automation.',
    },
    {
        company: 'SQUAADS',
        role:    'Full Stack Dev',
        period:  'Aug 2020 - Mar 2024',
        stack:   ['TypeScript', 'React', 'Node.js', 'Express.js'],
        note:    'Digital product studio building client apps.',
    },
];

const SKILLS = {
    'FRONTEND': ['TypeScript · JS', 'React · Next.js', 'Ionic · Vue.js'],
    'BACKEND':  ['Nest.js · Express', 'Node.js · PostgreSQL'],
    'TOOLS':    ['Git · SCRUM', 'Docker · AWS'],
};

const EDUCATION = [
    {
        type:   'DEGREE',
        school: 'ULPGC',
        course: 'Computer Science',
        years:  '2014 - 2020',
    },
    {
        type:   'COURSE',
        school: 'EOI',
        course: 'Full-Stack Engineering',
        years:  '2018',
    },
    {
        type:   'COURSE',
        school: 'EOI',
        course: 'UX / UI Engineering',
        years:  '2020',
    },
];

const CONTACT = [
    { icon: '✉', label: 'EMAIL',    value: 'angelo.dev@hotmail.com' },
    { icon: '◈', label: 'GITHUB',   value: 'github.com/shaedmg'    },
    { icon: '◉', label: 'LOCATION', value: 'Las Palmas, Spain'      },
];

const MENU_ITEMS = ['ABOUT ME', 'EXPERIENCE', 'SKILLS', 'EDUCATION', 'CONTACT'];

/* Pages where ↑/↓ scrolls content instead of moving a cursor */
const SCROLL_PAGES = new Set(['about', 'exp_detail', 'skills', 'education', 'contact']);

/* ─── State ─────────────────────────────────────── */
const state = {
    page:         'boot',
    menuCursor:   0,
    expCursor:    0,
    scrollOffset: 0,
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

function buildSpeakerGrid() {
    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'sp-dot';
        speakerGrid.appendChild(dot);
    }
}

/* ═══════════════════════════════════════════════════
   SCROLL SYSTEM
═══════════════════════════════════════════════════ */
const LINE_H = 16; // pixels per scroll step (one line)

function scrollPage(dir) {
    if (dir === 0) return;
    const inner = document.getElementById('scrollInner');
    if (!inner) return;
    const outer = inner.parentElement;
    const max = Math.max(0, inner.scrollHeight - outer.clientHeight);
    state.scrollOffset = Math.max(0, Math.min(max, state.scrollOffset + dir * LINE_H));
    inner.style.transform = `translateY(-${state.scrollOffset}px)`;
    updateScrollIndicators();
}

function updateScrollIndicators() {
    const inner = document.getElementById('scrollInner');
    const top   = document.getElementById('scrollIndTop');
    const bot   = document.getElementById('scrollIndBot');
    if (!inner || !top || !bot) return;
    const outer = inner.parentElement;
    const max = Math.max(0, inner.scrollHeight - outer.clientHeight);
    top.style.opacity = state.scrollOffset >      1 ? '1' : '0';
    bot.style.opacity = state.scrollOffset < max - 1 ? '1' : '0';
}

/**
 * Wraps body HTML in the scroll container + indicators.
 * All content pages use this so ↑/↓ can scroll them.
 */
function wrapScrollable(bodyHTML) {
    return `<div class="scroll-outer">
        <div class="scroll-inner" id="scrollInner">${bodyHTML}</div>
        <div class="scroll-ind"     id="scrollIndTop">▲</div>
        <div class="scroll-ind bot" id="scrollIndBot">▼</div>
    </div>`;
}

/**
 * Renders a standard content page (title + scrollable body + footer).
 * Resets scroll and triggers indicator update after DOM settles.
 */
function renderContentPage(title, bodyHTML, footer) {
    const hint = footer || '[↑↓] SCROLL &nbsp; [B] BACK';
    screenContent.innerHTML = `
    <div class="content-page">
        <div class="page-title">${title}</div>
        ${wrapScrollable(bodyHTML)}
        <div class="page-footer">${hint}</div>
    </div>`;
    state.scrollOffset = 0;
    // Give the browser one tick to lay out, then check overflow
    requestAnimationFrame(updateScrollIndicators);
}

/* ═══════════════════════════════════════════════════
   BOOT SEQUENCE
═══════════════════════════════════════════════════ */
function bootSequence() {
    state.page  = 'boot';
    state.ready = false;
    screenLcd.style.background = '#495B00';
    screenContent.innerHTML    = '';

    setTimeout(() => {
        screenLcd.style.background = '';
        screenContent.innerHTML = bootHTML(false);

        setTimeout(() => {
            screenContent.innerHTML = bootHTML(true);
            state.ready = true;
        }, 1600);
    }, 700);
}

function bootHTML(showStart) {
    return `
    <div class="boot-screen">
        <div class="boot-art">PB</div>
        <div class="boot-title">PIXEL BOY</div>
        <div class="boot-sub">PORTFOLIO EDITION</div>
        <div class="boot-cr">© 2026 ANGELO MEDINA</div>
        ${showStart ? '<div class="press-start">PRESS START</div>' : ''}
    </div>`;
}

/* ═══════════════════════════════════════════════════
   PAGE RENDERERS
═══════════════════════════════════════════════════ */

function renderMenu() {
    const items = MENU_ITEMS.map((item, i) => {
        const active = i === state.menuCursor;
        return `<div class="menu-item ${active ? 'active' : ''}">
                    <span class="m-cursor">${active ? '▶' : '&nbsp;'}</span>
                    <span>${item}</span>
                </div>`;
    }).join('');

    screenContent.innerHTML = `
    <div class="menu-screen">
        <div class="menu-header">
            <span class="menu-player">${PORTFOLIO.name}</span>
            <span class="menu-ver">${PORTFOLIO.title}</span>
        </div>
        <div class="menu-list">${items}</div>
        <div class="menu-footer">[↑↓] MOVE &nbsp;&nbsp; [A] SELECT</div>
    </div>`;
}

function renderAbout() {
    state.page = 'about';
    const langsHTML = PORTFOLIO.langs
        .map(([l, lvl]) => `<span class="val">${l}: ${lvl}</span>`)
        .join('');

    renderContentPage('ABOUT ME', `
        <span class="lbl">NAME</span>
        <span class="val">ANGELO MEDINA</span>
        <span class="lbl">ROLE</span>
        <span class="val">${PORTFOLIO.title}</span>
        <span class="lbl">LOCATION</span>
        <span class="val">${PORTFOLIO.location}</span>
        <span class="lbl">EXPERIENCE</span>
        <span class="val">${PORTFOLIO.exp}</span>
        <span class="lbl">LANGUAGES</span>
        ${langsHTML}
        <span class="lbl">STATUS</span>
        <span class="status-open">★ ${PORTFOLIO.status} ★</span>
    `);
}

function renderExperience() {
    const items = EXPERIENCE.map((e, i) => {
        const active = i === state.expCursor;
        return `<div class="proj-item ${active ? 'active' : ''}">
                    <span class="p-cursor">${active ? '▶' : '&nbsp;'}</span>
                    <span>${e.company}</span>
                </div>`;
    }).join('');

    const sel = EXPERIENCE[state.expCursor];
    screenContent.innerHTML = `
    <div class="content-page">
        <div class="page-title">EXPERIENCE</div>
        <div class="page-body">
            ${items}
            <div class="proj-preview">
                ${sel.role}<br>${sel.period}
            </div>
        </div>
        <div class="page-footer">[↑↓] MOVE &nbsp; [A] VIEW &nbsp; [B] BACK</div>
    </div>`;
}

function renderExperienceDetail(exp) {
    state.page = 'exp_detail';
    renderContentPage(exp.company, `
        <span class="lbl">ROLE</span>
        <span class="val">${exp.role}</span>
        <span class="lbl">PERIOD</span>
        <span class="val">${exp.period}</span>
        <span class="lbl">TECH STACK</span>
        <span class="proj-tech">${exp.stack.join(' · ')}</span>
        <span class="lbl">INFO</span>
        <span class="proj-tech">${exp.note}</span>
    `);
}

function renderSkills() {
    state.page = 'skills';
    const cats = Object.entries(SKILLS).map(([cat, lines]) => {
        const linesHTML = lines.map(l => `<span class="skill-line">${l}</span>`).join('');
        return `<span class="skills-cat">${cat}</span>${linesHTML}`;
    }).join('');
    renderContentPage('SKILLS', cats);
}

function renderEducation() {
    state.page = 'education';
    const items = EDUCATION.map(e => {
        const badgeClass = e.type === 'DEGREE' ? 'type-degree' : 'type-course';
        return `<div class="edu-item">
            <span class="edu-type ${badgeClass}">${e.type}</span>
            <span class="edu-school">${e.school}</span>
            <span class="edu-course">${e.course}</span>
            <span class="edu-years">${e.years}</span>
        </div>`;
    }).join('');
    renderContentPage('EDUCATION', items);
}

function renderContact() {
    state.page = 'contact';
    const items = CONTACT.map(c => `
        <div class="citem">
            <span class="clabel">${c.icon} ${c.label}</span>
            <span class="cval">${c.value}</span>
        </div>`).join('');
    renderContentPage('CONTACT', items);
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
    } else if (state.page === 'experience') {
        openExpDetail();
    }
}

function pressB() {
    if (!state.ready) return;
    if (state.page === 'exp_detail') {
        transition(() => { state.page = 'experience'; renderExperience(); });
    } else if (['about', 'skills', 'education', 'contact', 'experience'].includes(state.page)) {
        goToMenu();
    }
}

function pressStart() {
    if (!state.ready) return;
    goToMenu();
}

function pressSelect() { /* reserved */ }

function navigate(dir) {
    if (!state.ready) return;

    if (SCROLL_PAGES.has(state.page)) {
        /* On content pages: ↑/↓ scrolls the text */
        if (dir === 'up')   scrollPage(-1);
        if (dir === 'down') scrollPage(+1);

    } else if (state.page === 'menu') {
        if (dir === 'up')   state.menuCursor = Math.max(0, state.menuCursor - 1);
        if (dir === 'down') state.menuCursor = Math.min(MENU_ITEMS.length - 1, state.menuCursor + 1);
        renderMenu();

    } else if (state.page === 'experience') {
        if (dir === 'up')   state.expCursor = Math.max(0, state.expCursor - 1);
        if (dir === 'down') state.expCursor = Math.min(EXPERIENCE.length - 1, state.expCursor + 1);
        renderExperience();
    }
}

function selectMenu() {
    const sel = MENU_ITEMS[state.menuCursor];
    transition(() => {
        if (sel === 'ABOUT ME')   { state.page = 'about';      renderAbout();      }
        if (sel === 'EXPERIENCE') { state.page = 'experience';  renderExperience(); }
        if (sel === 'SKILLS')     { state.page = 'skills';      renderSkills();     }
        if (sel === 'EDUCATION')  { state.page = 'education';   renderEducation();  }
        if (sel === 'CONTACT')    { state.page = 'contact';     renderContact();    }
    });
}

function openExpDetail() {
    transition(() => renderExperienceDetail(EXPERIENCE[state.expCursor]));
}

function goToMenu() {
    transition(() => {
        state.page = 'menu';
        renderMenu();
    });
}

/* ─── Screen flash transition ───────────────────── */
function transition(callback) {
    state.scrollOffset = 0; // always reset scroll for new page
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
            case 'ArrowUp':    case 'w': case 'W': e.preventDefault(); navigate('up');    break;
            case 'ArrowDown':  case 's': case 'S': e.preventDefault(); navigate('down');  break;
            case 'ArrowLeft':  case 'a': case 'A': e.preventDefault(); navigate('left');  break;
            case 'ArrowRight': case 'd': case 'D': e.preventDefault(); navigate('right'); break;
            case 'z': case 'Z': case 'Enter':                          pressA();          break;
            case 'x': case 'X': case 'Escape': case 'Backspace':
                e.preventDefault(); pressB(); break;
            case ' ':
                e.preventDefault(); pressStart(); break;
        }
    });
}

/* ── Start ───────────────────────────────────────── */
window.addEventListener('load', init);
