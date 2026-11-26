// Comportements communs à toutes les pages (rejoués à chaque navigation Astro)
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T | null;

function initNav() {
  const nav = $('nav');
  const onScroll = () => nav?.classList.toggle('scrolled', scrollY > 40);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });
  const mobile = $('mobile');
  const set = (open: boolean) => {
    mobile?.classList.toggle('open', open);
    $('menu-open')?.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('lock', open);
  };
  $('menu-open')?.addEventListener('click', () => set(true));
  $('menu-close')?.addEventListener('click', () => set(false));
  mobile?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
}

function initReveal() {
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.rv').forEach((el) => io.observe(el));
}

function initPanels() {
  const tabs = [...document.querySelectorAll<HTMLButtonElement>('.pn')];
  const open = (i: number, focus = false) => {
    tabs.forEach((t, k) => {
      t.setAttribute('aria-expanded', String(k === i));
      t.setAttribute('aria-selected', String(k === i));
      t.tabIndex = k === i ? 0 : -1;
      $(`dt-${k}`)?.classList.toggle('on', k === i);
    });
    if (focus) tabs[i]?.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => open(i));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); open((i + 1) % tabs.length, true); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); open((i - 1 + tabs.length) % tabs.length, true); }
    });
  });
}

function initJournee() {
  const clock = $('clock');
  const items = [...document.querySelectorAll<HTMLElement>('.mo')];
  const idx = [...document.querySelectorAll('#idx li')];
  if (!clock || !items.length) return;
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      clock.textContent = el.dataset.h ?? '';
      idx.forEach((li, k) => li.classList.toggle('on', String(k) === el.dataset.i));
    }),
    { rootMargin: '-45% 0px -45% 0px' }
  );
  items.forEach((m) => io.observe(m));
}

// Barre rapide du hero : boutons segmentés
function initSegs() {
  document.querySelectorAll('.seg').forEach((g) => {
    g.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
      g.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    }));
  });
}

// ---------- Demande de devis en étapes ----------
type QData = { current: string; ateliers: { id: string; nom: string; court: string; couleur: string; on: string; prestations: string[] }[] };

function initQuote() {
  const root = $('qm');
  const raw = $('quote-data');
  if (!root || !raw) return;
  const D: QData = JSON.parse(raw.textContent || '{}');
  const form = $<HTMLFormElement>('qm-form')!;
  const steps = [...root.querySelectorAll<HTMLElement>('.qs')];
  const side = [...root.querySelectorAll<HTMLElement>('#qm-steps li')];
  const LAST = 4;
  let step = 0;
  let lastFocus: HTMLElement | null = null;

  const st = {
    atelier: D.current, prestas: new Set<string>(), type: '', desc: '', delai: '', files: [] as string[],
    lieu: '', ville: 'Casablanca', secteur: '', adresse: '', nom: '', societe: '', tel: '', email: '', contact: 'Téléphone',
  };
  const at = () => D.ateliers.find((x) => x.id === st.atelier)!;
  const par = () => (st.contact === 'WhatsApp' ? 'WhatsApp' : st.contact.toLowerCase());
  const esc = (t: string) => t.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

  // Étape 1 : cartes atelier + prestations
  const cards = $('q-ateliers')!;
  const imgs: Record<string, string> = { mecanique: '/img/atelier-mecanique.webp', metallique: '/img/atelier-metallique.webp' };
  const base = document.querySelector<HTMLImageElement>('.door img, .stage .photo img')?.getAttribute('src')?.startsWith('img/') ? '' : '/';
  cards.innerHTML = D.ateliers.map((a) =>
    `<button type="button" class="q-card" role="radio" data-at="${a.id}" style="--c:${a.couleur}"><img src="${base === '' ? imgs[a.id].slice(1) : imgs[a.id]}" alt=""><i></i><b>${esc(a.court)}</b></button>`).join('');
  const paintAtelier = () => {
    cards.querySelectorAll<HTMLElement>('.q-card').forEach((c) => c.setAttribute('aria-checked', String(c.dataset.at === st.atelier)));
    root.style.setProperty('--qac', at().couleur);
    root.style.setProperty('--qon', at().on);
    $('q-prestas')!.innerHTML = at().prestations.map((p) =>
      `<button type="button" aria-pressed="${st.prestas.has(p)}" data-p="${esc(p)}">${esc(p)}</button>`).join('');
  };
  cards.addEventListener('click', (e) => {
    const c = (e.target as HTMLElement).closest<HTMLElement>('.q-card');
    if (!c || c.dataset.at === st.atelier) return;
    st.atelier = c.dataset.at!; st.prestas.clear(); paintAtelier();
  });
  $('q-prestas')!.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('button');
    if (!b) return;
    const p = b.dataset.p!;
    st.prestas.has(p) ? st.prestas.delete(p) : st.prestas.add(p);
    b.setAttribute('aria-pressed', String(st.prestas.has(p)));
  });

  // Choix uniques (type, délai, lieu, contact)
  root.querySelectorAll<HTMLElement>('[data-single]').forEach((g) => {
    g.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>('button');
      if (!b) return;
      (st as any)[g.dataset.name!] = b.dataset.v;
      paintSingles();
    });
  });
  const paintSingles = () => root.querySelectorAll<HTMLElement>('[data-single]').forEach((g) =>
    g.querySelectorAll<HTMLElement>('button').forEach((b) => b.setAttribute('aria-pressed', String((st as any)[g.dataset.name!] === b.dataset.v))));

  // Fichiers joints
  const files = $<HTMLInputElement>('q-files')!;
  files.addEventListener('change', () => {
    st.files = [...(files.files || [])].map((f) => f.name);
    $('q-files-txt')!.textContent = st.files.length ? `${st.files.length} fichier(s) : ${st.files.join(', ')}` : 'Ajouter des photos ou des plans (facultatif)';
  });

  // Champs texte
  const fields: [string, keyof typeof st][] = [['q-desc', 'desc'], ['q-ville', 'ville'], ['q-secteur', 'secteur'], ['q-adresse', 'adresse'], ['q-nom', 'nom'], ['q-societe', 'societe'], ['q-tel', 'tel'], ['q-email', 'email']];
  const read = () => fields.forEach(([id, k]) => { (st as any)[k] = ($<HTMLInputElement>(id)?.value || '').trim(); });
  const write = () => fields.forEach(([id, k]) => { const el = $<HTMLInputElement>(id); if (el) el.value = (st as any)[k]; });

  const err = (i: number, msg: string) => { const el = root.querySelector(`[data-err="${i}"]`); if (el) el.textContent = msg; return !msg; };
  const validate = (i: number) => {
    read();
    root.querySelectorAll('.q-field.bad').forEach((f) => f.classList.remove('bad'));
    if (i === 0) return err(0, st.prestas.size ? '' : 'Choisissez au moins une prestation.');
    if (i === 1) return err(1, !st.type ? 'Indiquez le type de demande.' : !st.delai ? 'Indiquez le délai souhaité.' : '');
    if (i === 2) return err(2, !st.lieu ? "Indiquez le lieu de l'intervention." : !st.ville ? 'Indiquez la ville.' : '');
    if (i === 3) {
      const bad: string[] = [];
      if (!st.nom) bad.push('q-nom');
      if (st.tel.replace(/\D/g, '').length < 9) bad.push('q-tel');
      if (st.email && !/^\S+@\S+\.\S+$/.test(st.email)) bad.push('q-email');
      bad.forEach((id) => $(id)?.closest('.q-field')?.classList.add('bad'));
      return err(3, bad.includes('q-nom') ? 'Indiquez votre nom.' : bad.includes('q-tel') ? 'Indiquez un numéro de téléphone valide.' : bad.includes('q-email') ? "L'adresse e-mail semble incorrecte." : '');
    }
    if (i === 4) return err(4, $<HTMLInputElement>('q-ok')!.checked ? '' : 'Merci de cocher la case pour envoyer votre demande.');
    return true;
  };

  const recap = () => {
    const rows: [string, string, number][] = [
      ['Atelier', at().nom, 0],
      ['Prestations', [...st.prestas].join('\n'), 0],
      ['Besoin', [st.type, st.delai].filter(Boolean).join(' · ') + (st.desc ? `\n${st.desc}` : ''), 1],
      ['Fichiers', st.files.length ? st.files.join(', ') : 'Aucun', 1],
      ['Site', [st.lieu, st.ville, st.adresse, st.secteur].filter(Boolean).join(' · '), 2],
      ['Contact', [st.nom, st.societe, st.tel, st.email].filter(Boolean).join(' · ') + `\nPar ${par()}`, 3],
    ];
    $('q-recap')!.innerHTML = rows.map(([k, v, s]) =>
      `<button type="button" data-go="${s}"><dt>${k}</dt><dd>${esc(v)}</dd><em>Modifier</em></button>`).join('');
  };
  $('q-recap')!.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-go]');
    if (b) go(Number(b.dataset.go));
  });

  const go = (n: number) => {
    const back = n < step;
    step = n;
    steps.forEach((s, i) => { s.hidden = i !== n; s.classList.toggle('back', back); });
    side.forEach((li, i) => { li.classList.toggle('on', i === n); li.classList.toggle('done', i < n); });
    const done = n > LAST;
    $('qm-foot')!.hidden = done;
    $('qm-bar')!.style.width = `${Math.min(100, ((n + 1) / (LAST + 1)) * 100)}%`;
    $('qm-count')!.textContent = done ? 'Demande prête' : `Étape ${n + 1} sur ${LAST + 1}`;
    ($('q-prev') as HTMLButtonElement).disabled = n === 0;
    $('q-next')!.firstChild!.textContent = n === LAST ? 'Envoyer la demande ' : 'Continuer ';
    if (n === LAST) recap();
    steps[n]?.querySelector<HTMLElement>('h2')?.setAttribute('tabindex', '-1');
    steps[n]?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
    steps[n].scrollTop = 0;
  };
  side.forEach((li, i) => li.addEventListener('click', () => { if (li.classList.contains('done') && step <= LAST) go(i); }));
  // effacer le message d'erreur dès que l'utilisateur corrige
  steps.forEach((sec, i) => ['click', 'input', 'change'].forEach((ev) => sec.addEventListener(ev, () => {
    const el = root.querySelector(`[data-err="${i}"]`); if (el && el.textContent) { el.textContent = ''; root.querySelectorAll('.q-field.bad').forEach((f) => f.classList.remove('bad')); }
  })));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate(step)) return;
    if (step < LAST) return go(step + 1);
    await sendQuote({ ...st, prestas: [...st.prestas], atelierNom: at().nom });
    $('q-done-txt')!.textContent = `${st.nom}, un technicien de l'${at().nom.replace('Atelier', 'atelier')} vous recontacte par ${par()} au sujet de : ${[...st.prestas].join(', ')}.`;
    go(LAST + 1);
  });
  $('q-prev')!.addEventListener('click', () => step > 0 && go(step - 1));

  // Ouverture / fermeture
  const open = (opts: { presta?: string; delai?: string; lieu?: string; ville?: string } = {}) => {
    lastFocus = document.activeElement as HTMLElement;
    if (step > LAST) { // nouvelle demande après un envoi
      Object.assign(st, { prestas: new Set(), type: '', desc: '', delai: '', files: [], lieu: '' });
      ($<HTMLInputElement>('q-ok')!).checked = false;
    }
    if (opts.presta) {
      const owner = D.ateliers.find((a) => a.prestations.includes(opts.presta!));
      if (owner && owner.id !== st.atelier) { st.atelier = owner.id; st.prestas.clear(); }
      st.prestas.add(opts.presta);
    }
    if (opts.delai) st.delai = opts.delai;
    if (opts.lieu) st.lieu = opts.lieu;
    if (opts.ville) st.ville = opts.ville;
    write(); paintAtelier(); paintSingles();
    root.hidden = false; root.classList.remove('closing');
    document.body.classList.add('lock');
    go(st.prestas.size && opts.presta ? 1 : 0);
  };
  const close = () => {
    root.classList.add('closing');
    setTimeout(() => { root.hidden = true; root.classList.remove('closing'); document.body.classList.remove('lock'); lastFocus?.focus(); }, 240);
  };
  root.querySelectorAll('[data-qclose]').forEach((b) => b.addEventListener('click', close));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') { // garder le focus dans la fenêtre
      const f = [...root.querySelectorAll<HTMLElement>('button,input,select,textarea')].filter((x) => x.offsetParent && !(x as HTMLButtonElement).disabled);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  document.querySelectorAll<HTMLElement>('[data-quote]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    open({ presta: b.dataset.presta });
  }));
  $('quick')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const segs = [...document.querySelectorAll('#quick .seg')].map((g) => g.querySelector<HTMLElement>('[aria-pressed=true]')?.dataset.v ?? '');
    open({
      presta: $<HTMLSelectElement>('h-presta')?.value,
      delai: segs[0] === 'Urgent' ? 'Urgent' : '',
      lieu: segs[1] === 'Atelier' ? 'En atelier' : 'Sur site',
      ville: $<HTMLInputElement>('h-ville')?.value.trim(),
    });
  });
}

// Envoi de la demande — à brancher sur l'outil d'envoi (Formspree, endpoint PHP, API…).
// Exemple : await fetch('https://formspree.io/f/XXXX', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
async function sendQuote(data: Record<string, unknown>) {
  console.info('Demande de devis SERVALIA', data);
}

function initMobileCta() {
  const bar = $('mcta');
  if (!bar) return;
  const contact = $('contact');
  let contactVisible = false;
  if (contact) new IntersectionObserver((es) => { contactVisible = es[0].isIntersecting; upd(); }).observe(contact);
  const upd = () => {
    const show = scrollY > innerHeight * 0.7 && !contactVisible;
    bar.classList.toggle('show', show);
    bar.setAttribute('aria-hidden', String(!show));
    bar.querySelectorAll<HTMLElement>('a,button').forEach((el) => (el.tabIndex = show ? 0 : -1));
  };
  addEventListener('scroll', upd, { passive: true });
  upd();
}

document.addEventListener('astro:page-load', () => {
  initNav();
  initMobileCta();
  initReveal();
  initPanels();
  initJournee();
  initSegs();
  initQuote();
});
