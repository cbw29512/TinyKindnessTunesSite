// ================================================================
//  RENDERER — renderer.js
// ================================================================

var COLORS = {
  orange: { hex: "#FF6B35" },
  purple: { hex: "#7B3FBE" },
  blue:   { hex: "#0077B6" },
  pink:   { hex: "#E91E8C" }
};

function renderSite() {
  // Spotify hero button
  var spotifyBtn = document.getElementById("spotifyBtn");
  if (spotifyBtn) spotifyBtn.href = site.spotifyArtistUrl;

  // Spotify artist embed (show if URL is real)
  var embed = document.getElementById("spotifyArtistEmbed");
  if (embed && site.spotifyArtistUrl && site.spotifyArtistUrl.indexOf("your-id") === -1) {
    var artistId = site.spotifyArtistUrl.split("/artist/")[1];
    if (artistId) {
      embed.src = "https://open.spotify.com/embed/artist/" + artistId;
      embed.style.display = "block";
    }
  }

  // About text
  var aboutText = document.getElementById("aboutText");
  if (aboutText) aboutText.textContent = site.about;

  // Contact email
  var contactEmail = document.getElementById("contactEmail");
  if (contactEmail) contactEmail.href = "mailto:" + site.contactEmail;

  // Footer copyright
  var footerCopy = document.getElementById("footerCopy");
  if (footerCopy) footerCopy.textContent = "© " + new Date().getFullYear() + " " + site.name + ". Made with 💛";
}

function renderAlbums() {
  var container = document.getElementById("albumsContainer");
  if (!container) return;
  container.innerHTML = "";

  albums.forEach(function(album) {
    if (album.songs.length === 0) {
      // SINGLE CARD MODE: whole card is a Spotify link
      var card = document.createElement("a");
      card.href = album.spotifyUrl || site.spotifyArtistUrl;
      card.target = "_blank";
      card.rel = "noreferrer";
      card.className = "album-section fade-up";

      card.innerHTML =
        '<div class="album-header"><img src="' + album.coverImage + '" class="album-cover-thumb" alt="' + album.title + ' cover"></div>' +
        '<div class="album-title">' + album.title + '</div>' +
        '<div class="album-desc">' + album.description + '</div>' +
        '<div style="padding:0 20px 20px"><div class="btn btn-green" style="width:100%">🎧 Listen on Spotify</div></div>';

      container.appendChild(card);
    } else {
      // Song-grid mode
      var section = document.createElement("div");
      section.className = "album-section fade-up";

      var header = document.createElement("div");
      header.className = "album-header";
      header.innerHTML = '<img src="' + album.coverImage + '" class="album-cover-thumb" alt="' + album.title + ' cover">';
      section.appendChild(header);

      var title = document.createElement("div");
      title.className = "album-title";
      title.textContent = album.title;
      section.appendChild(title);

      var desc = document.createElement("div");
      desc.className = "album-desc";
      desc.textContent = album.description;
      section.appendChild(desc);

      var grid = document.createElement("div");
      grid.className = "songs-grid";
      album.songs.forEach(function(song) {
        var songCard = document.createElement("div");
        songCard.className = "song-card";
        if (song.embedUrl) {
          songCard.innerHTML = '<iframe src="' + song.embedUrl + '" title="' + song.title + '" height="80" style="width:100%;border:none;border-radius:12px;" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>';
        } else {
          songCard.innerHTML = '<div class="song-title">🎵 ' + song.title + '</div>';
        }
        grid.appendChild(songCard);
      });
      section.appendChild(grid);
      container.appendChild(section);
    }
  });
}

function renderBooks() {
  var container = document.getElementById("booksContainer");
  if (!container) return;
  container.innerHTML = "";

  books.forEach(function(book) {
    var card = document.createElement("div");
    card.className = "book-card fade-up";

    // Cover
    var coverWrap = document.createElement("div");
    coverWrap.className = "book-card-cover-wrap";
    coverWrap.innerHTML = '<img src="' + book.coverImage + '" class="book-card-cover" alt="' + book.title + ' cover">';
    card.appendChild(coverWrap);

    // Info
    var info = document.createElement("div");
    info.className = "book-card-info";
    info.innerHTML =
      '<h3 class="book-card-title">' + book.title + '</h3>' +
      '<p class="book-card-author">By ' + book.author + '</p>' +
      '<p class="book-card-desc">' + book.description + '</p>';

    // Button
    var btn = document.createElement("a");
    btn.className = "btn";
    if (book.price === "free" && book.pdfUrl) {
      btn.href = book.pdfUrl;
      var ext = book.pdfUrl.split('.').pop();
      btn.setAttribute("download", book.title + "." + ext);
      btn.className += " btn-green";
      btn.textContent = "📥 Download Free";
    } else if (book.amazonUrl) {
      btn.href = book.amazonUrl;
      btn.target = "_blank";
      btn.rel = "noreferrer";
      btn.className += " btn-amazon";
      btn.textContent = "🛒 Buy on Amazon";
    } else {
      btn.className += " btn-coming";
      btn.style.opacity = "0.6";
      btn.style.cursor = "default";
      btn.textContent = "⏳ Coming Soon";
    }

    info.appendChild(btn);
    card.appendChild(info);
    container.appendChild(card);
  });
}

// BOOTSTRAP
try {
  renderSite();
  renderAlbums();
  renderBooks();
} catch (e) {
  console.error("TKT render error:", e);
}
