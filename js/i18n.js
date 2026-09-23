/* ============================================================
   MooduTools — Lightweight Vanilla JS i18n (EN / KO)
   ----------------------------------------------------------------------
   - Zero dependencies. No external libraries, no build step.
   - `data-i18n="key"` attributes drive real-time DOM updates.
   - Persists the user's choice in localStorage.
   - Exposes `window.I18N` and dispatches `i18n:changed`.
   ---------------------------------------------------------------------- */
(function (global) {
  'use strict';

  var STORE_KEY = 'moodu_i18n_lang';

  /* ---------------- Dictionary (en / ko) ---------------- */
  var DICT = {
    en: {
      // Navigation / chrome
      'nav.home': 'Home',
      'nav.docs': 'Docs',
      'nav.blog': 'Blog',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.privacy': 'Privacy Policy',
      'nav.terms': 'Terms of Service',
      'footer.resources': 'Resources',
      'footer.company': 'Company',
      'footer.desc': 'Free on-device AI text tools. Runs 100% on your device — private, no app, no sign-up, forever free.',
      'footer.copyright': '© 2026 MooduTools. All rights reserved.',

      // Hero
      'hero.badge': '🔒 100% On-Device AI (Browser WebGPU) · $0 Infrastructure · No Logs',
      'hero.titlea': 'Private ',
      'hero.titleb': 'on-device AI',
      'hero.titlec': ' text tools',
      'hero.sub': 'Prompt builder, tone shifter, and smart summarizer that run entirely on your device. Your text never leaves this browser — nothing is uploaded, stored, or tracked.',

      // Tabs
      'tabs.builder': '🪄 Prompt Builder',
      'tabs.tone': '🎭 Tone Shifter',
      'tabs.summary': '📋 Smart Summarizer',

      // Common controls
      'common.generate': '✨ Generate',
      'common.quickSelect': 'Quick select (optional)',
      'common.clear': 'Clear',
      'common.output': 'Output',
      'common.outputPlaceholder': 'Your result will appear here.',
      'common.copy': '📋 Copy',
      'common.copied': '✓ Copied!',
      'common.share': '𝕏 Share on X',
      'common.privacyFoot': '🔒 100% On-Device & Private. Your text is processed only inside your browser and is never stored anywhere.',

      // Engine / progress
      'engine.warming': 'Warming up the on-device model…',
      'engine.checking': 'Checking WebGPU…',
      'engine.loading': 'Loading the WebLLM engine…',
      'engine.preparing': 'Preparing the model…',
      'engine.downloading': 'Downloading model weights (cached after first run)…',
      'engine.readyCached': 'Model ready · from browser cache',
      'engine.ready': 'Model ready',
      'engine.offline': 'Offline synthesis mode',
      'engine.starting': 'Starting the on-device model… (first run downloads one-time weights)',
      'engine.offlineStarting': 'Offline synthesis…',
      'engine.doneWeb': 'Done · on-device WebGPU model.',
      'engine.doneOffline': 'Done · offline mood engine.',
      // Tool strings
      'tool.builder.placeholder': 'e.g. Write a prompt for creating a summer-sale marketing email',
      'tool.builder.hint': 'Turns a simple idea into a complete, high-quality prompt.',
      'tool.tone.placeholder': 'Paste the original text you want to rewrite here.',
      'tool.tone.hint': 'Rewrites your text in the selected tone.',
      'tool.summary.placeholder': 'Paste the source text you want to summarize or explain here.',
      'tool.summary.hint': 'Summarizes the key points in your requested format.',
      'tool.builder.preset.0': 'Blog post',
      'tool.builder.preset.1': 'Code review request',
      'tool.builder.preset.2': 'Social media marketing',
      'tool.tone.preset.0': 'Polite business',
      'tool.tone.preset.1': 'Gentle rejection',
      'tool.tone.preset.2': 'Firm but courteous',
      'tool.summary.preset.0': '3-line summary',
      'tool.summary.preset.1': "Explain like I'm 5",
      'tool.summary.preset.2': 'Extract action items',

      // Mood art canvas
      'art.title': '🎨 Mood art canvas',
      'art.render': 'Render Mood Art',
      'art.foot': 'A live animation derived from your generated result — export it as a PNG card or a WebM clip. Rendered entirely on-device.',
      'art.png': '💾 Save Card (PNG)',
      'art.webm': '🎬 Record Clip (WebM)',
      'art.first': 'Generate a result first, then render the mood art.',
      'art.rendered': 'Mood art rendered below.',
      'art.recording': 'Recording mood clip (~4s)…',
      'art.webmUnsupported': 'WebM clip needs a newer Chrome with canvas recording — PNG card still works.',
      'art.pngDownloaded': 'PNG card downloaded.',
      'art.webmDownloaded': 'WebM clip downloaded.',
      'art.pngFail': 'PNG export failed.',
      'art.pngUnsupported': 'PNG export unavailable in this browser.',
      'art.webmFail': 'WebM clip export failed — PNG card still works.',

      // Notices / toasts
      'toast.enterText': 'Please enter some text first.',
      'toast.shareEmpty': 'There is no result to share yet. Please generate something first.',
      'toast.copied': 'Copied! ✓',

      // Share template
      'share.base': 'I polished my text with 100% private on-device AI ✨ moodutools.com #MooduTools',

      // Offline fallback templates (also used with no WebGPU)
      'fallback.builder': 'OFFLINE DRAFT · Prompt Builder\n\nIdea: "{{topic}}"\n\nYou are a world-class specialist in "{{topic}}".\nGoal: produce a complete, actionable draft that turns this idea into a polished result.\n\nConstraints:\n• Stay concise and scannable; no fluff.\n• Preserve the original intent of: "{{topic}}".\n• Always end with a clear call to action.\n\nOutput format:\n1) One-sentence summary of the deliverable\n2) Step-by-step structure\n3) Suggested tone / persona\n4) Final call-to-action line',
      'fallback.tone': 'OFFLINE REVISION · Tone Shifter\n\nOriginal:\n"{{src}}"\n\nRefined version:\n• Lead with the core message clearly and politely.\n• Replace abrupt phrasing with courteous, confident wording.\n• Preserve every key fact from the original.\n• Close on an appreciative, forward-looking note.\n\nPolished rewrite:\nThank you for sharing this with me — your point comes across clearly, and I have rephrased it in a warm and professional manner while keeping every important detail intact. "{{src150}}"',
      'fallback.summary': 'OFFLINE SUMMARY · Smart Summarizer\n\nKey points:\n• {{topic}}\n• Core subject introduced: "{{sample}}"\n• Central idea: convey the main message clearly without the reader needing the full source.\n\nPlain-language overview:\n{{src240}}'
    },

    ko: {
      // Navigation / chrome
      'nav.home': '홈',
      'nav.docs': '문서',
      'nav.blog': '블로그',
      'nav.about': '소개',
      'nav.contact': '문의',
      'nav.privacy': '개인정보처리방침',
      'nav.terms': '이용약관',
      'footer.resources': '리소스',
      'footer.company': '회사',
      'footer.desc': '무료 온디바이스 AI 텍스트 도구. 100% 기기 내부에서 실행 — 비공개, 앱/가입 불필요, 영원히 무료.',
      'footer.copyright': '© 2026 MooduTools. All rights reserved.',

      // Hero
      'hero.badge': '🔒 100% 온디바이스 AI (브라우저 WebGPU) · 인프라 비용 $0 · 로그 없음',
      'hero.titlea': '기기에서 안전하게 동작하는 ',
      'hero.titleb': '온디바이스 AI',
      'hero.titlec': ' 텍스트 도구',
      'hero.sub': '프롬프트 빌더, 톤 변환, 스마트 요약이 전적으로 기기 내부에서 실행됩니다. 입력한 텍스트는 이 브라우저를 떠나지 않습니다 — 업로드, 저장, 추적이 없습니다.',

      // Tabs
      'tabs.builder': '🪄 프롬프트 빌더',
      'tabs.tone': '🎭 톤 변환',
      'tabs.summary': '📋 스마트 요약',

      // Common controls
      'common.generate': '✨ 생성',
      'common.quickSelect': '빠른 선택 (선택 사항)',
      'common.clear': '지우기',
      'common.output': '결과',
      'common.outputPlaceholder': '결과가 여기에 표시됩니다.',
      'common.copy': '📋 복사',
      'common.copied': '✓ 복사됨!',
      'common.share': '𝕏 공유하기',
      'common.privacyFoot': '🔒 100% 온디바이스·비공개. 입력한 텍스트는 브라우저 안에서만 처리되며 어디에도 저장되지 않습니다.',

      // Engine / progress
      'engine.warming': '온디바이스 모델을 준비하는 중…',
      'engine.checking': 'WebGPU 확인 중…',
      'engine.loading': 'WebLLM 엔진 로딩 중…',
      'engine.preparing': '모델 준비 중…',
      'engine.downloading': '모델 가중치 다운로드 중 (최초 1회 후 캐시됨)…',
      'engine.readyCached': '모델 준비 완료 · 브라우저 캐시 사용',
      'engine.ready': '모델 준비 완료',
      'engine.offline': '오프라인 합성 모드',
      'engine.starting': '온디바이스 모델 시작 중… (최초 실행 시 1회 가중치 다운로드)',
      'engine.offlineStarting': '오프라인 합성 중…',
      'engine.doneWeb': '완료 · 온디바이스 WebGPU 모델.',
      'engine.doneOffline': '완료 · 오프라인 무드 엔진.',
      // Tool strings
      'tool.builder.placeholder': '예: 여름 세일 마케팅 이메일용 프롬프트 작성',
      'tool.builder.hint': '간단한 아이디어를 완성된 고품질 프롬프트로 만들어 줍니다.',
      'tool.tone.placeholder': '톤을 바꿀 원문을 여기에 붙여넣으세요.',
      'tool.tone.hint': '선택한 톤으로 텍스트를 다시 써 줍니다.',
      'tool.summary.placeholder': '요약하거나 설명할 원문을 여기에 붙여넣으세요.',
      'tool.summary.hint': '요청한 형식으로 핵심 내용을 요약해 줍니다.',
      'tool.builder.preset.0': '블로그 글',
      'tool.builder.preset.1': '코드 리뷰 요청',
      'tool.builder.preset.2': '소셜 미디어 마케팅',
      'tool.tone.preset.0': '정중한 비즈니스',
      'tool.tone.preset.1': '부드러운 거절',
      'tool.tone.preset.2': '단호하지만 예의 바르게',
      'tool.summary.preset.0': '3줄 요약',
      'tool.summary.preset.1': '5살에게 설명하듯',
      'tool.summary.preset.2': '실행 항목 추출',

      // Mood art canvas
      'art.title': '🎨 무드 아트 캔버스',
      'art.render': '무드 아트 렌더링',
      'art.foot': '생성 결과에서 파생된 라이브 애니메이션입니다 — PNG 카드 또는 WebM 클립으로 내보낼 수 있습니다. 전적으로 온디바이스에서 렌더링됩니다.',
      'art.png': '💾 카드 저장 (PNG)',
      'art.webm': '🎬 클립 녹화 (WebM)',
      'art.first': '먼저 결과를 생성한 뒤 무드 아트를 렌더링하세요.',
      'art.rendered': '아래에 무드 아트를 렌더링했습니다.',
      'art.recording': '무드 클립 녹화 중 (약 4초)…',
      'art.webmUnsupported': 'WebM 클립은 캔버스 녹화를 지원하는 최신 Chrome이 필요합니다 — PNG 카드는 계속 사용할 수 있습니다.',
      'art.pngDownloaded': 'PNG 카드를 다운로드했습니다.',
      'art.webmDownloaded': 'WebM 클립을 다운로드했습니다.',
      'art.pngFail': 'PNG 내보내기에 실패했습니다.',
      'art.pngUnsupported': '이 브라우저에서는 PNG 내보내기를 지원하지 않습니다.',
      'art.webmFail': 'WebM 클립 내보내기에 실패했습니다 — PNG 카드는 계속 사용할 수 있습니다.',

      // Notices / toasts
      'toast.enterText': '먼저 텍스트를 입력해 주세요.',
      'toast.shareEmpty': '아직 공유할 결과가 없습니다. 결과를 먼저 생성해 주세요.',
      'toast.copied': '복사됨! ✓',

      // Share template
      'share.base': '100% 프라이빗 온디바이스 AI로 텍스트를 다듬었습니다 ✨ moodutools.com #MooduTools',

      // Offline fallback templates
      'fallback.builder': '오프라인 초안 · 프롬프트 빌더\n\n아이디어: "{{topic}}"\n\n당신은 "{{topic}}" 분야의 세계적 전문가입니다.\n목표: 이 아이디어를 훌륭한 결과물로 만들 수 있는 완성된 실행 초안을 만듭니다.\n\n제약사항:\n• 간결하고 읽기 쉽게, 군더더기 없이.\n• 원래 의도를 보존: "{{topic}}".\n• 항상 명확한 행동 유도로 마무리.\n\n출력 형식:\n1) 결과물 한 줄 요약\n2) 단계별 구조\n3) 제안 톤 / 페르소나\n4) 최종 콜투액션',
      'fallback.tone': '오프라인 다듬기 · 톤 변환\n\n원문:\n"{{src}}"\n\n다듬은 버전:\n• 핵심 메시지를 명확하고 예의 바르게 앞세웁니다.\n• 퉁명스러운 표현은 정중하고 자신 있는 표현으로 바꿉니다.\n• 원문의 모든 핵심 사실을 보존합니다.\n• 감사하고 발전적인 마무리로 끝냅니다.\n\n다듬은 문장:\n이 글을 공유해 주셔서 감사합니다 — 말씀하신 요지가 분명하게 전달되며, 중요한 내용을 모두 살려 따뜻하고 전문적인 표현으로 다시 다듬었습니다. "{{src150}}"',
      'fallback.summary': '오프라인 요약 · 스마트 요약\n\n핵심 요점:\n• {{topic}}\n• 다루는 핵심 주제: "{{sample}}"\n• 핵심 생각: 원문을 끝까지 읽지 않아도 핵심 메시지를 명확하게 전달.\n\n쉬운 언어 개요:\n{{src240}}'
    }
  };

  /* ---------------- State ---------------- */
  var current = 'en';

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* ignore */ }
    if (saved === 'en' || saved === 'ko') return saved;
    try {
      var navLang = String(navigator.language || navigator.userLanguage || '').toLowerCase();
      if (navLang.indexOf('ko') === 0) return 'ko';
    } catch (e) { /* ignore */ }
    return 'en';
  }

  function dispatchChanged(lang) {
    var ev;
    try { ev = new CustomEvent('i18n:changed', { detail: { lang: lang } }); }
    catch (e) {
      ev = document.createEvent('Event');
      ev.initEvent('i18n:changed', true, false);
      ev.detail = { lang: lang };
    }
    document.dispatchEvent(ev);
  }

  /* ---------------- Public API ---------------- */
  var I18N = {
    getLang: function () { return current; },

    setLang: function (lang) {
      lang = (lang === 'ko') ? 'ko' : 'en';
      if (lang === current) { this.apply(); return; }
      current = lang;
      try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* ignore */ }
      try { document.documentElement.setAttribute('lang', lang); } catch (e) { /* ignore */ }
      this.apply();
      buildToggle();
      dispatchChanged(lang);
    },

    toggle: function () { this.setLang(current === 'en' ? 'ko' : 'en'); },

    t: function (key) {
      var bucket = DICT[current] || DICT.en;
      if (key in bucket) return bucket[key];
      if (key in DICT.en) return DICT.en[key];
      return key;
    },

    /* t with {{var}} replacement */
    tn: function (key, vars) {
      var s = this.t(key);
      if (vars) {
        for (var k in vars) {
          s = String(s).replace(new RegExp('\\{\\{' + k + '\\}\\}', 'g'), String(vars[k]));
        }
      }
      return s;
    },

    /* Apply dictionary to every [data-i18n] element, live. */
    apply: function (root) {
      var scope = root || document;
      var els = scope.querySelectorAll('[data-i18n]');
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var key = el.getAttribute('data-i18n');
        if (!key) continue;
        var val = this.t(key);
        var props = (el.getAttribute('data-i18n-props') || 'text').split(',');
        for (var p = 0; p < props.length; p++) {
          var prop = props[p].trim();
          if (prop === 'text') { el.textContent = val; }
          else { el.setAttribute(prop, val); }
        }
      }
      try { document.documentElement.setAttribute('lang', current); } catch (e) { /* ignore */ }
    }
  };

  /* ---------------- Language Switcher [🌐 EN | KO] ---------------- */
  var toggleStyle = '\n.mt-lang{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:600;color:var(--muted,#8A8A9C);background:rgba(255,255,255,.03);border:1px solid var(--line,#262633);border-radius:999px;padding:5px 10px;user-select:none;white-space:nowrap;margin-left:6px;}\n'
    + '.mt-lang .mt-lang-globe{font-size:14px;}\n'
    + '.mt-lang button{background:transparent;border:none;cursor:pointer;padding:2px 7px;border-radius:6px;color:var(--muted,#8A8A9C);font-size:12.5px;font-weight:700;transition:all .15s;}\n'
    + '.mt-lang button.active{background:rgba(34,211,238,.14);color:var(--accent,#22D3EE);}\n'
    + '.mt-lang .mt-lang-sep{color:var(--muted,#8A8A9C);opacity:.55;}\n'
    + '@media(max-width:640px){.mt-lang{font-size:12px;padding:4px 8px;}}\n';

  function ensureStyle() {
    if (document.getElementById('mt-lang-style')) return;
    var style = document.createElement('style');
    style.id = 'mt-lang-style';
    style.textContent = toggleStyle;
    document.head.appendChild(style);
  }

  function buildToggle() {
    var host = document.querySelector('[data-langswitch]');
    if (!host) host = document.querySelector('.site-nav');
    if (!host) return;
    var old = document.getElementById('mt-lang');
    if (old && old.parentNode) old.parentNode.removeChild(old);

    var wrap = document.createElement('div');
    wrap.id = 'mt-lang';
    wrap.className = 'mt-lang';
    wrap.setAttribute('aria-label', 'Language / 언어');

    var globe = document.createElement('span');
    globe.className = 'mt-lang-globe';
    globe.textContent = '🌐';
    wrap.appendChild(globe);

    var make = function (code, label) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      if (current === code) b.className = 'active';
      b.addEventListener('click', function () { I18N.setLang(code); });
      return b;
    };

    wrap.appendChild(make('en', 'EN'));
    var sep = document.createElement('span');
    sep.className = 'mt-lang-sep';
    sep.textContent = '|';
    wrap.appendChild(sep);
    wrap.appendChild(make('ko', 'KO'));

    host.appendChild(wrap);
  }

  var inited = false;
  function init() {
    if (inited) return;
    inited = true;
    current = detectLang();
    try { document.documentElement.setAttribute('lang', current); } catch (e) { /* ignore */ }
    ensureStyle();
    buildToggle();
    I18N.apply();
    // Notify pages (e.g. the app's tool chrome) of the initial detected locale.
    dispatchChanged(current);
  }

  global.I18N = I18N;

  /* Pages include this script right before their own logic, so the DOM
     header usually exists already; otherwise wait for DOMContentLoaded. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);