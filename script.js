const CONFIG = {
  brand: "Назва закладу",
  telegramAdmin: "",
  phone: "",
  address: "",
  hours: "",
  instagram: "",
  telegramPage: "",
  maps:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Шептицький"),
  prices: ["Уточнюйте", "Уточнюйте", "Уточнюйте", "Уточнюйте"],
  events: [
    {
      title: "Назва події",
      date: "Дата уточнюється",
      text: "Короткий опис події.",
      more: "Розширений опис події: що відбуватиметься, для кого і чого чекати.",
      details: ["Початок: уточнюється", "Вхід: уточнюється", "Місць обмежена кількість"],
      img: "",
      service: "",
    },
    {
      title: "Назва події",
      date: "Дата уточнюється",
      text: "Короткий опис події.",
      more: "Розширений опис події: що відбуватиметься, для кого і чого чекати.",
      details: ["Початок: уточнюється", "Вхід: уточнюється", "Місць обмежена кількість"],
      img: "",
      service: "",
    },
    {
      title: "Назва події",
      date: "Дата уточнюється",
      text: "Короткий опис події.",
      more: "Розширений опис події: що відбуватиметься, для кого і чого чекати.",
      details: ["Початок: уточнюється", "Вхід: уточнюється", "Місць обмежена кількість"],
      img: "",
      service: "",
    },
    {
      title: "Назва події",
      date: "Дата уточнюється",
      text: "Короткий опис події.",
      more: "Розширений опис події: що відбуватиметься, для кого і чого чекати.",
      details: ["Початок: уточнюється", "Вхід: уточнюється", "Місць обмежена кількість"],
      img: "",
      service: "",
    },
  ],
  gallery: [
    { src: "images/gallery-1.jpg", alt: "Ігрова зона з PlayStation", shape: "big" },
    { src: "images/gallery-2.jpg", alt: "Великий екран для футболу", shape: "tall" },
    { src: "images/gallery-3.jpg", alt: "Зона відпочинку", shape: "" },
    { src: "images/gallery-4.jpg", alt: "Компанія друзів за грою", shape: "" },
    { src: "images/gallery-5.jpg", alt: "Інтер'єр закладу", shape: "wide" },
    { src: "images/gallery-6.jpg", alt: "Вечір футболу в Шептицькому", shape: "" },
    { src: "images/gallery-7.jpg", alt: "Геймпади та консолі", shape: "" },
  ],
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (t) =>
  String(t).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

$$("[data-brand]").forEach((e) => (e.textContent = CONFIG.brand));
$("#year").textContent = new Date().getFullYear();
$$("[data-price]").forEach(
  (e, i) => (e.textContent = CONFIG.prices[i] || "Уточнюйте"),
);

const burger = $(".burger");
const setNav = (open) => {
  document.body.classList.toggle("nav-open", open);
  burger.setAttribute("aria-expanded", open);
};
burger.addEventListener("click", () =>
  setNav(!document.body.classList.contains("nav-open")),
);
$$("#nav a, #nav button").forEach((el) =>
  el.addEventListener("click", () => setNav(false)),
);

const fx = $(".fx");
if (fx && !rm) {
  const sy = ["△", "○", "✕", "□"];
  const cl = ["#5fe3a1", "#ff5c6c", "#6fb0ff", "#ff8fd1"];
  fx.innerHTML = Array.from(
    { length: 16 },
    (_, i) =>
      `<span style="left:${((i * 6.3 + Math.random() * 5) % 96).toFixed(1)}%;--s:${(14 + Math.random() * 26).toFixed(0)}px;--d:${(12 + Math.random() * 14).toFixed(1)}s;--dl:${(-Math.random() * 20).toFixed(1)}s;--c:${cl[i % 4]};--x:${(Math.random() * 80 - 40).toFixed(0)}px">${sy[i % 4]}</span>`,
  ).join("");
}

$("#eventTrack").innerHTML = CONFIG.events
  .map(
    (ev, i) => `
  <article class="story reveal" data-ev="${i}" tabindex="0" aria-haspopup="dialog">
    ${ev.img ? `<img loading="lazy" src="${esc(ev.img)}" alt="${esc(ev.title)}" onerror="this.remove()">` : ""}
    <span class="bar" aria-hidden="true"></span>
    <span class="when">${esc(ev.date)}</span>
    <h3>${esc(ev.title)}</h3><p>${esc(ev.text)}</p>
    <button class="btn btn-sm" data-book="${esc(ev.service || "")}" data-ev="${i}">Забронювати</button>
  </article>`,
  )
  .join("");

const evm = $("#evModal");
function openEv(i) {
  const ev = CONFIG.events[i];
  if (!ev) return;
  $("#evDate").textContent = ev.date;
  $("#evTitle").textContent = ev.title;
  $("#evText").textContent = ev.more || ev.text;
  const list = ev.details || [];
  $("#evList").innerHTML = list.map((d) => `<li>${esc(d)}</li>`).join("");
  $("#evList").hidden = !list.length;
  $("#evImg").innerHTML = ev.img
    ? `<img src="${esc(ev.img)}" alt="${esc(ev.title)}" onerror="this.remove()">`
    : "";
  evm.dataset.i = i;
  evm.showModal();
}
$("#eventTrack").addEventListener("click", (e) => {
  if (e.target.closest("[data-book]")) return;
  const s = e.target.closest(".story");
  if (s) openEv(s.dataset.ev);
});
$("#eventTrack").addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches(".story")) {
    e.preventDefault();
    openEv(e.target.dataset.ev);
  }
});
evm.addEventListener("click", (e) => {
  if (e.target === evm) evm.close();
});
$("[data-close-ev]").addEventListener("click", () => evm.close());

const lb = $("#lightbox"),
  lbImg = $("#lbImg");
$("#gal").innerHTML = CONFIG.gallery
  .map(
    (g, i) => `
  <button class="tile ${g.shape || ""} reveal" data-i="${i}" aria-label="Відкрити фото: ${esc(g.alt)}">
  <img loading="lazy" src="${esc(g.src)}" alt="${esc(g.alt)}" onerror="this.remove()"></button>`,
  )
  .join("");
$("#gal").addEventListener("click", (e) => {
  const b = e.target.closest(".tile");
  if (!b) return;
  const g = CONFIG.gallery[b.dataset.i];
  lbImg.src = g.src;
  lbImg.alt = g.alt;
  lb.showModal();
});
lb.addEventListener("click", (e) => {
  if (e.target === lb) lb.close();
});
$$("[data-close]").forEach((b) =>
  b.addEventListener("click", () => lb.close()),
);

const I = {
  pin: '<path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  phone:
    '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  insta:
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  tg: '<path d="M21 4L3 11l6 2 2 6 3-4 5 4z"/><path d="M9 13l8-6"/>',
  map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
};
const card = (ic, label, val, href, wide) => {
  const tag = href ? "a" : "div";
  const attrs = href
    ? ` href="${esc(href)}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ""}`
    : "";
  return `<${tag} class="cc${wide ? " wide" : ""}"${attrs}><svg viewBox="0 0 24 24" aria-hidden="true">${I[ic]}</svg><small>${label}</small><b>${val}</b></${tag}>`;
};
const none = "Уточнюйте";
$("#contactList").innerHTML = [
  card("pin", "Адреса", CONFIG.address ? esc(CONFIG.address) : none, "", true),
  card(
    "phone",
    "Телефон",
    CONFIG.phone ? esc(CONFIG.phone) : none,
    CONFIG.phone ? "tel:" + CONFIG.phone : "",
  ),
  card("clock", "Графік роботи", CONFIG.hours ? esc(CONFIG.hours) : none, ""),
  card(
    "insta",
    "Instagram",
    CONFIG.instagram ? "Відкрити" : none,
    CONFIG.instagram,
  ),
  card(
    "tg",
    "Telegram",
    CONFIG.telegramPage ? "Відкрити" : none,
    CONFIG.telegramPage,
  ),
  card("map", "Google Maps", "Прокласти маршрут", CONFIG.maps, true),
].join("");

const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
$$(".reveal").forEach((el) => io.observe(el));

const bg = $("[data-parallax]");
if (bg && !rm) {
  let t = false;
  addEventListener(
    "scroll",
    () => {
      if (t) return;
      t = true;
      requestAnimationFrame(() => {
        bg.style.transform = `translateY(${Math.min(scrollY, 800) * 0.25}px)`;
        t = false;
      });
    },
    { passive: true },
  );
}

document.addEventListener(
  "pointermove",
  (e) => {
    const c = e.target.closest(".card");
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", e.clientX - r.left + "px");
    c.style.setProperty("--my", e.clientY - r.top + "px");
  },
  { passive: true },
);

const form = $("#bookForm"),
  done = $("#done"),
  err = $("#err");
form.date.min = new Date().toISOString().slice(0, 10);

function goBook(service, evIdx) {
  if (service) form.service.value = service;
  if (evIdx !== undefined) {
    const ev = CONFIG.events[evIdx];
    if (ev) form.comment.value = `Подія: ${ev.title}, ${ev.date}`;
  }
  $("#booking").scrollIntoView({ behavior: rm ? "auto" : "smooth" });
  setTimeout(() => form.name.focus({ preventScroll: true }), 600);
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-book]");
  if (!b) return;
  goBook(b.dataset.book, b.dataset.ev);
});

$("#evBook").addEventListener("click", () => {
  const i = evm.dataset.i;
  const ev = CONFIG.events[i];
  evm.close();
  goBook(ev.service, i);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const digits = d.phone.replace(/\D/g, "");
  if (d.name.trim().length < 2)
    return fail("Вкажіть ім'я (мінімум 2 символи).", form.name);
  if (digits.length < 10 || digits.length > 13)
    return fail("Вкажіть коректний номер телефону.", form.phone);
  if (!d.date) return fail("Оберіть дату.", form.date);
  if (!d.time) return fail("Оберіть час.", form.time);
  if (!d.service) return fail("Оберіть послугу.", form.service);
  if (!(+d.people >= 1)) return fail("Вкажіть кількість людей.", form.people);
  err.textContent = "";

  const msg = [
    "Запит на бронювання (Шептицький)",
    `Ім'я: ${d.name.trim()}`,
    `Телефон: ${d.phone.trim()}`,
    `Дата: ${d.date}`,
    `Час: ${d.time}`,
    `Послуга: ${d.service}`,
    `Людей: ${d.people}`,
    `Коментар: ${d.comment.trim() || "—"}`,
  ].join("\n");

  $("#msgBox").textContent = msg;
  const text = $("#doneText");
  if (CONFIG.telegramAdmin) {
    window.open(
      `https://t.me/${encodeURIComponent(CONFIG.telegramAdmin)}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener",
    );
    text.textContent =
      "Telegram відкрито з підготовленим повідомленням. Натисніть «Надіслати» там. Бронювання НЕ підтверджене, доки адміністратор не відповість вам.";
  } else {
    try {
      await navigator.clipboard.writeText(msg);
    } catch (_) {}
    text.textContent =
      "Telegram адміністратора ще не налаштований у script.js, тому запит нікуди не надіслано. Текст нижче скопійовано — надішліть його адміністратору вручну. Бронювання не підтверджене.";
  }
  form.hidden = true;
  done.hidden = false;
  form.reset();
  form.people.value = 2;
});
$("#again").addEventListener("click", () => {
  done.hidden = true;
  form.hidden = false;
  form.name.focus();
});
function fail(text, field) {
  err.textContent = text;
  field.focus();
}