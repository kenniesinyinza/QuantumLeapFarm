/* Simple lightbox: click a photo to enlarge; arrows / Esc work. Without JS the link just opens the full photo. */
(function () {
  var links = [].slice.call(document.querySelectorAll('a[data-gallery]')), i = 0;
  if (!links.length) return;
  var box = document.createElement('div');
  box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button><button class="lb-prev" aria-label="Previous photo">&#8249;</button><img alt=""><p></p><button class="lb-next" aria-label="Next photo">&#8250;</button>';
  document.body.appendChild(box);
  var img = box.querySelector('img'), cap = box.querySelector('p');
  function show(n) {
    i = (n + links.length) % links.length;
    img.src = links[i].getAttribute('href');
    img.alt = cap.textContent = links[i].querySelector('img').alt;
  }
  function open(n) { show(n); box.classList.add('open'); box.querySelector('.lb-close').focus(); }
  function close() { box.classList.remove('open'); img.removeAttribute('src'); links[i].focus(); }
  links.forEach(function (a, n) { a.addEventListener('click', function (e) { e.preventDefault(); open(n); }); });
  box.querySelector('.lb-close').onclick = close;
  box.querySelector('.lb-prev').onclick = function (e) { e.stopPropagation(); show(i - 1); };
  box.querySelector('.lb-next').onclick = function (e) { e.stopPropagation(); show(i + 1); };
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
})();
