(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const isPresenter = new URLSearchParams(location.search).has('presenter');
  const clamp = n => Math.max(0, Math.min(slides.length - 1, n));
  const fromHash = () => clamp((parseInt(location.hash.slice(1), 10) || 1) - 1);
  let current = fromHash(), presenterWindow = null, coffees = 2, dynamicIndex = 0, toastTimer;
  const escapeHTML = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const typeData = [
    ['TEXTO', '"Hola"', 'String', 'Una cadena de caracteres. La escribimos entre comillas.'],
    ['NÚMERO', '28', 'Number', 'Para cantidades, edades o medidas. También puede representar decimales, como 2.5.'],
    ['VERDADERO O FALSO', 'true / false', 'Boolean', 'Solo dos valores posibles. Como la respuesta a una pregunta de sí o no.'],
    ['ENTERO DE GRAN PRECISIÓN', '9007199254740993n', 'BigInt', 'Para trabajar con enteros más allá del rango de precisión segura de Number.'],
    ['SIN VALOR DEFINIDO', 'undefined', 'Undefined', 'Por ejemplo, una variable declarada a la que todavía no asignamos un valor.'],
    ['AUSENCIA INTENCIONAL', 'null', 'Null', 'Indicamos explícitamente que no hay un valor. Una caja que dejamos vacía a propósito.']
  ];
  function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 4200); }
  function transmit(index) {
    const target = isPresenter ? window.opener : presenterWindow;
    if (target && !target.closed) target.postMessage({type:'tech-foundations-slide', index}, location.protocol === 'file:' ? '*' : location.origin);
  }
  function render(sync = true) {
    const slide = slides[current];
    document.title = `${String(current + 1).padStart(2,'0')} · ${slide.title} · Tech Foundations`;
    if (isPresenter) {
      $('#presenter-counter').textContent = `${String(current + 1).padStart(2,'0')} / ${slides.length} · ${slide.chapter}`;
      $('#presenter-title').textContent = slide.title;
      $('#presenter-summary').textContent = slide.summary;
      $('#next-title').textContent = slides[current + 1]?.title || 'Fin del bloque';
      $('#teaching-notes').innerHTML = slide.notes.map(n => `<p>${escapeHTML(n)}</p>`).join('');
      $('#original-notes').innerHTML = slide.source.map(n => {
        const original = originalSlides.find(s => s.slide === n);
        return `<h4>Diapositiva original ${n}</h4><p>${escapeHTML(original?.notes || 'Sin notas del presentador en el original.')}</p>`;
      }).join('');
      document.querySelectorAll('[data-action="prev"]').forEach(b => b.disabled = current === 0);
      document.querySelectorAll('[data-action="next"]').forEach(b => b.disabled = current === slides.length-1);
    } else {
      $('#stage').innerHTML = `<section class="slide ${slide.layout || ''}" aria-label="${escapeHTML(slide.title)}">${slide.html}</section>`;
      $('#stage').scrollTop = 0;
      $('#chapter-name').textContent = slide.chapter;
      $('#counter').innerHTML = `${String(current+1).padStart(2,'0')} <span>/ ${slides.length}</span>`;
      $('#progress').style.width = `${(current+1)/slides.length*100}%`;
      $('#prev').disabled = current === 0;
      $('#next').disabled = current === slides.length-1;
      coffees = 2; dynamicIndex = 0;
    }
    if (sync) transmit(current);
  }
  function navigate(index, sync = true) {
    current = clamp(index);
    history.replaceState(null, '', `${location.pathname}${location.search}#${current+1}`);
    render(sync);
  }
  function openOverview() {
    $('#slide-grid').innerHTML = slides.map((s,i) => `<button data-go="${i}" aria-current="${i===current}"><span>${String(i+1).padStart(2,'0')} · ${escapeHTML(s.chapter)}</span><b>${escapeHTML(s.title)}</b></button>`).join('');
    $('#overview').showModal();
    $('#slide-grid button[aria-current="true"]').focus();
  }
  function closeDialogs() { document.querySelectorAll('dialog[open]').forEach(d => d.close()); }
  function openPresenter() {
    const url = new URL(location.href); url.searchParams.set('presenter','1');
    presenterWindow = window.open(url.href, 'tech-foundations-presenter', 'popup,width=1200,height=850');
    if (!presenterWindow) toast('Permití ventanas emergentes para abrir las notas del docente.');
    else presenterWindow.focus();
  }
  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else toast('Usá la opción de pantalla completa del navegador.');
    } catch { toast('No se pudo activar pantalla completa. Usá la opción del navegador.'); }
  }
  function pulse(el) { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }
  const actions = {
    next: () => navigate(current+1), prev: () => navigate(current-1), overview: openOverview,
    close: closeDialogs, help: () => $('#help').showModal(), fullscreen, presenter: openPresenter,
    variable: () => { coffees++; $('#variable-value').textContent=coffees; pulse($('#variable-value')); $('#variable-feedback').textContent=`cantidadDeCafes ahora vale ${coffees}. Mismo nombre, nuevo valor.`; },
    constant: () => { $('#variable-feedback').textContent='El valor sigue siendo 20. const no permite reasignarlo: JavaScript produciría un error.'; pulse($('.sealed')); },
    dynamic: () => { dynamicIndex = (dynamicIndex+1)%3; const values=[['28','Number'],['"Hola"','String'],['true','Boolean']]; $('#dynamic-value').textContent=values[dynamicIndex][0]; $('#dynamic-type').textContent=values[dynamicIndex][1]; pulse($('#dynamic-value')); },
    reveal: () => { const answer=$('#constant-answer'); answer.hidden=!answer.hidden; const btn=$('[data-action="reveal"]'); btn.setAttribute('aria-expanded',String(!answer.hidden)); btn.textContent=answer.hidden?'Revelar respuesta +':'Ocultar respuesta −'; },
    timer: () => { running=!running; $('#timer-toggle').textContent=running?'Pausar':'Continuar'; lastTick=Date.now(); },
    'reset-timer': () => { elapsed=0; lastTick=Date.now(); $('#elapsed').textContent='00:00'; }
  };
  document.addEventListener('click', e => {
    const btn=e.target.closest('button');
    if (!btn || btn.disabled) return;
    if (btn.dataset.action) actions[btn.dataset.action]?.();
    if (btn.dataset.go !== undefined) { closeDialogs(); navigate(Number(btn.dataset.go)); if (!isPresenter) $('#stage').focus({preventScroll:true}); }
    if (btn.dataset.type !== undefined) {
      const data=typeData[Number(btn.dataset.type)];
      ['#type-category','#type-value','#type-name','#type-description'].forEach((id,i) => $(id).textContent=data[i]);
      document.querySelectorAll('[data-type]').forEach(b => b.setAttribute('aria-pressed',String(b===btn)));
    }
    if (btn.dataset.name) {
      document.querySelectorAll('[data-name]').forEach(b=>b.classList.remove('correct','wrong'));
      const good=btn.dataset.name==='good'; btn.classList.add(good?'correct':'wrong');
      $('#name-feedback').textContent = good?'Exacto. edadPersona es válido y describe el dato que guarda.':btn.dataset.name==='bad'?'Un nombre no puede empezar con un número. Probá otra opción.':'let es una palabra reservada del lenguaje. Probá otra opción.';
      $('#name-feedback').className=`feedback ${good?'success':'incorrect'}`;
    }
    if (btn.dataset.day) {
      const day=btn.dataset.day==='true';
      document.querySelectorAll('[data-day]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
      $('#phone-preview').classList.toggle('dark',!day); $('#mode-icon').textContent=day?'☀':'☾';
      $('#mode-greeting').textContent=day?'¡Buen día!':'¡Buenas noches!'; $('#mode-pill').textContent=day?'Modo claro':'Modo oscuro';
      $('#day-branch').classList.toggle('active-line',day); $('#night-branch').classList.toggle('active-line',!day);
      $('#mode-feedback').textContent=day?'La condición es verdadera → modo claro.':'La condición es falsa → modo oscuro.';
    }
    if (btn.dataset.condition) {
      const three=btn.dataset.condition==='three';
      document.querySelectorAll('[data-condition]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
      $('#condition-prose').innerHTML=three?'<span class="large-step">01 → 02 → 03</span><h3>Más condiciones.<br>Un camino elegido.</h3><p>Se ejecuta la primera que se cumple. Si ninguna se cumple, se usa else.</p>':'<span class="large-step">01 → 02</span><h3>Una condición.<br>Dos alternativas.</h3><p>Se ejecuta la rama que corresponde.</p>';
      $('#condition-code').innerHTML=code(three?'<em>if</em> (esDeDia) {\n  modo = <q>"claro"</q>;\n} <em>else if</em> (esDeNoche) {\n  modo = <q>"oscuro"</q>;\n} <em>else</em> {\n  modo = <q>"automático"</q>;\n}':'<em>if</em> (esDeDia) {\n  modo = <q>"claro"</q>;\n} <em>else</em> {\n  modo = <q>"oscuro"</q>;\n}');
    }
    if (btn.dataset.answer) {
      const good=btn.dataset.answer==='dark';
      document.querySelectorAll('[data-answer]').forEach(b=>b.classList.remove('correct','wrong'));
      btn.classList.add(good?'correct':'wrong');
      $('#exercise-feedback').textContent=good?'¡Exacto! esDeDia guarda false. La condición no se cumple y se ejecuta else: modo oscuro.':'Mirá el valor de esDeDia: es false. La primera rama no se ejecuta. Probá de nuevo.';
      $('#exercise-feedback').className=`feedback ${good?'success':'incorrect'}`;
    }
  });
  document.addEventListener('keydown', e => {
    if (e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,[contenteditable="true"]')) return;
    if (document.querySelector('dialog[open]')) return;
    const key=e.key.toLowerCase();
    if (key===' ' && e.target.closest('button,a,summary')) return;
    if (['arrowright','pagedown',' '].includes(key)) {e.preventDefault();navigate(current+1);}
    else if (['arrowleft','pageup'].includes(key)) {e.preventDefault();navigate(current-1);}
    else if (key==='home') {e.preventDefault();navigate(0);}
    else if (key==='end') {e.preventDefault();navigate(slides.length-1);}
    else if (key==='g') openOverview();
    else if (key==='f') fullscreen();
    else if (key==='p'&&!isPresenter) openPresenter();
    else if (key==='?') $('#help').showModal();
  });
  document.querySelectorAll('dialog').forEach(d => d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
  window.addEventListener('hashchange',()=>{current=fromHash();render();});
  window.addEventListener('message',e=>{
    const trusted=isPresenter?e.source===window.opener:e.source===presenterWindow;
    if(!trusted || (location.protocol!=='file:'&&e.origin!==location.origin))return;
    if(e.data?.type==='tech-foundations-ready')transmit(current);
    if(e.data?.type==='tech-foundations-slide'&&Number.isInteger(e.data.index)&&e.data.index>=0&&e.data.index<slides.length)navigate(e.data.index,false);
  });
  let touchStart=null;
  $('#stage').addEventListener('touchstart',e=>{if(e.target.closest('button,a,input,pre'))return;const t=e.touches[0];touchStart=[t.clientX,t.clientY];},{passive:true});
  $('#stage').addEventListener('touchend',e=>{if(!touchStart)return;const t=e.changedTouches[0],dx=t.clientX-touchStart[0],dy=t.clientY-touchStart[1];touchStart=null;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.5)navigate(current+(dx<0?1:-1));},{passive:true});
  $('#stage').addEventListener('touchcancel',()=>touchStart=null,{passive:true});
  let elapsed=0,running=true,lastTick=Date.now();
  if(isPresenter){
    $('#audience').hidden=true; $('#presenter').hidden=false;document.body.classList.add('presenter-mode');
    setInterval(()=>{const now=Date.now();if(running)elapsed+=now-lastTick;lastTick=now;const seconds=Math.floor(elapsed/1000);$('#elapsed').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;},500);
    if(window.opener)window.opener.postMessage({type:'tech-foundations-ready'},location.protocol==='file:'?'*':location.origin);
  }
  render(false);
})();
