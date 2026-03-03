# Tiny Kindness Tunes - Website

Spotify Link

https://open.spotify.com/album/2UCoBXEfiYwmUbYjWXQJt8?si=-4T90rhcRRO3b7iVTKXCtg Be a good friend
https://open.spotify.com/album/6yr3eFUxfRJpbxCoHd5zNJ?si=pR6Mb-inTiy6ueWcwxF68A clean up song
https://open.spotify.com/album/48RQC7W1JG2HwPzfGfeVj3?si=qOOGpljCRsGF-iTN4w7C3A goodnight, kind heart
https://open.spotify.com/album/28VVhIAFPSk2NXudeT3oBI?si=6leOmRFFRUCfPBxhIBxuZA helping hands
https://open.spotify.com/album/3xeartukEymzXUc0XtYVmP?si=D1K-P_cdTBqAxyblOuZaUQ listen
https://open.spotify.com/album/4P09SpGEkP2E6AdbeSTTxh?si=s0GfYUWZSr65emzp9QRoMg please please and thank you
https://open.spotify.com/album/6DT1CTPTeK5gZuqTtpbPMH?si=Z6mElShuRqSmY4MsXsxhbQ use soft words
https://open.spotify.com/album/7HOTbzIqUSCHNJ6x1qasa6?si=Ekt4goVVSByYG7P434gZNA take a turn
https://open.spotify.com/album/6unr8V97RxSaLToFUL6AoW?si=sat0MxkJRPyqoztmzDK3YQ share the toys
https://open.spotify.com/album/0fsEpjpOuPaBmVRNI0TthP?si=dFzAlu5IQcKbESZulBAgSg wake up and smile


## File Structure

  index.html    - website shell (do not edit)
  styles.css    - all design and colors (do not edit)
  data.js    - YOUR FILE: add albums, books, email here
  deploy.bat    - double-click to push to Netlify (Windows)
  netlify.toml  - Netlify settings (do not edit)
  _redirects    - Netlify routing (do not edit)
  assets/
    albums/     - album cover art goes here (.png/.jpg)
    books/      - book covers and free PDFs go here

---

## ONE-TIME SETUP

1. Install Node.js from https://nodejs.org (LTS version)
2. Open Command Prompt and run:
     npm install -g netlify-cli
     netlify login
3. Navigate to your site folder in Command Prompt:
     cd C:\Users\dmchris\Desktop\TinyKindnessTunesSite
     netlify link
   Choose "Create new site" or link to your existing Netlify site.

---

## DEPLOYING UPDATES (every time after setup)

1. Edit data.js
2. Double-click deploy.bat
3. Done - live in ~30 seconds!

---

## HOW TO ADD A NEW ALBUM

In data.js, inside albums[], paste this at the end (before the ];):

  ,{
    title:       "Album 2 Title",
    description: "Short description.",
    coverImage:  "./assets/albums/album2.png",
    color:       "purple",
    songs: [
      { title: "Song Name", embedUrl: "" },
    ]
  }

Color choices: orange | purple | blue | pink | green

---

## HOW TO ADD A NEW BOOK

In data.js, inside books[], paste this at the end (before the ];):

  ,{
    title:       "Book Title",
    author:      "Tiny Kindness Tunes",
    coverImage:  "./assets/books/book.png",
    description: "What this book is about.",
    price:       "paid",
    amazonUrl:   "https://www.amazon.com/dp/XXXXXXXXX",
    pdfUrl:      ""
  }

Set price to "free" and fill pdfUrl for free downloadable books.

---

## WHEN YOUR AMAZON LINK GOES LIVE

Open data.js, find your book entry, and fill in:
  amazonUrl: "https://www.amazon.com/dp/XXXXXXXXX"

Then deploy - the button auto-switches to "Buy on Amazon".

---

## HOW TO GET SPOTIFY EMBED URLS

1. Open your song on open.spotify.com
2. Click the ... menu > Share > Embed track
3. Copy the URL: https://open.spotify.com/embed/track/...
4. Paste it as embedUrl in data.js