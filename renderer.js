var COLORS = {
  orange: { hex: "#FF6B35" },
  purple: { hex: "#7B3FBE" },
  blue:   { hex: "#0077B6" },
  pink:   { hex: "#E91E8C" }
};

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderSite() {
  var spotifyBtn = document.getElementById("spotifyBtn");
  if (spotifyBtn) spotifyBtn.href = site.spotifyArtistUrl;

  var embed = document.getElementById("spotifyArtistEmbed");
  if (embed && site.spotifyArtistUrl) {
    var artistId = site.spotifyArtistUrl.split("/artist/")[1];
    if (artistId) {
      embed.src = "https://open.spotify.com/embed/artist/" + artistId.split("?")[0] + "?utm_source=generator";
      embed.removeAttribute("hidden");
    }
  }

  var contactEmail = document.getElementById("contactEmail");
  if (contactEmail) contactEmail.href = "mailto:" + site.contactEmail;

  var footerCopy = document.getElementById("footerCopy");
  if (footerCopy) footerCopy.textContent = "© " + new Date().getFullYear() + " " + site.name + ". Made with care.";
}

function renderAlbums() {
  var container = document.getElementById("albumsContainer");
  if (!container) return;
  container.innerHTML = "";

  albums.forEach(function (album) {
    var section = document.createElement("div");
    section.className = "album-section fade-up";

    var header = document.createElement("div");
    header.className = "album-header";
    header.innerHTML = '<img src="' + esc(album.coverImage) + '" class="album-cover-thumb" alt="' + esc(album.title) + ' cover">';
    section.appendChild(header);

    var title = document.createElement("div");
    title.className = "album-title";
    title.textContent = album.title;
    section.appendChild(title);

    var desc = document.createElement("div");
    desc.className = "album-desc";
    desc.textContent = album.description;
    section.appendChild(desc);

    var links = document.createElement("p");
    links.className = "album-links";
    links.innerHTML =
      '<a class="btn btn-green" href="' + esc(album.spotifyUrl || site.spotifyArtistUrl) + '" target="_blank" rel="noopener">Listen on Spotify</a>' +
      (album.amazonUrl
        ? ' <a class="btn btn-amazon" href="' + esc(album.amazonUrl) + '" target="_blank" rel="noopener">Buy on Amazon</a>'
        : "");
    section.appendChild(links);
    container.appendChild(section);
  });
}

// Songs render as static cards in index.html (one Spotify player + a card grid),
// so there is no per-song iframe wall any more. data.js song embed URLs are kept for reference.

// Buyable books first, then upcoming titles, then the free sample page.
function bookRank(book) {
  if (book.amazonUrl) return 0;
  if (book.price === "free" && book.pdfUrl) return 2;
  return 1;
}

function renderBooks() {
  var container = document.getElementById("booksContainer");
  if (!container) return;
  container.innerHTML = "";
  var soonWrap = document.getElementById("booksSoon");
  var soonRow = document.getElementById("booksSoonRow");
  if (soonRow) soonRow.innerHTML = "";
  var soonCount = 0;

  books.slice().sort(function (a, b) {
    return bookRank(a) - bookRank(b);
  }).forEach(function (book) {
    var canBuy = !!book.amazonUrl;
    var canFree = book.price === "free" && book.pdfUrl;
    var isSoon = book.badge === "Coming Soon" && !canBuy;

    // Upcoming titles go in a smaller "More coming soon" row under the main grid.
    if (isSoon) {
      if (!soonRow) return;
      var mini = document.createElement("div");
      mini.className = "book-soon-card";
      mini.innerHTML =
        '<img src="' + esc(book.coverImage) + '" class="book-soon-cover" alt="' + esc(book.title) + ' cover" loading="lazy">' +
        '<div class="book-soon-info"><p class="book-soon-name">' + esc(book.title) + '</p>' +
        '<span class="book-soon-badge">Coming soon</span></div>';
      soonRow.appendChild(mini);
      soonCount += 1;
      return;
    }
    if (!canBuy && !canFree) return;

    var card = document.createElement("div");
    card.className = "book-card fade-up";

    var coverWrap = document.createElement("div");
    coverWrap.className = "book-card-cover-wrap";
    coverWrap.innerHTML = '<img src="' + esc(book.coverImage) + '" class="book-card-cover" alt="' + esc(book.title) + ' cover">';
    card.appendChild(coverWrap);

    var info = document.createElement("div");
    info.className = "book-card-info";
    info.innerHTML =
      '<h3 class="book-card-title">' + esc(book.title) + "</h3>" +
      '<p class="book-card-author">By ' + esc(book.author) + "</p>" +
      '<p class="book-card-desc">' + esc(book.description) + "</p>";

    var btn = document.createElement("a");
    btn.className = "btn";
    if (canFree) {
      btn.href = book.pdfUrl;
      btn.setAttribute("download", "tiny-kindness-coloring-page.jpg");
      btn.className += " btn-green";
      btn.textContent = "Download free page";
    } else {
      btn.href = book.amazonUrl;
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.className += " btn-amazon";
      btn.textContent = "Buy on Amazon";
    }

    info.appendChild(btn);
    card.appendChild(info);
    container.appendChild(card);
  });

  if (soonWrap) {
    if (soonCount > 0) soonWrap.removeAttribute("hidden");
    else soonWrap.setAttribute("hidden", "");
  }
}

try {
  renderSite();
  renderAlbums();
  renderBooks();
} catch (e) {
  console.error("TKT render error:", e);
}
