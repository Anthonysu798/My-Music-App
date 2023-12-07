/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <Anthony Su>
 *      Student ID: <142714229>
 *      Date:       <2023/10/31>
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { songs, artists } = window;

document.addEventListener("DOMContentLoaded", () => {
  function createArtistNavButton() {
    const menu = document.querySelector("#menu");
    artists.forEach((artist) => {
      const button = document.createElement("button");
      button.textContent = artist.name;
      button.classList.add("button");
      button.addEventListener("click", () => {
        showArtistSongsList(artist);
      });
      menu.appendChild(button);
    });
  }
  function findArtistButton(artistName) {
    const buttons = document.querySelectorAll("#menu button");
    return Array.from(buttons).find(
      (button) => button.textContent === artistName,
    );
  }

  createArtistNavButton();

  // Trigger click event on Central Cee's button
  const centralCeeButton = findArtistButton("Central Cee");
  if (centralCeeButton) {
    centralCeeButton.click();
  }

  function showArtistSongsList(artist) {
    // Update the artist name and links
    const artistName = document.querySelector("#selectedArtist");
    artistName.innerHTML = `${artist.name} (${artist.links
      .map((link) => `<a href="${link.url}" target="_blank">${link.name}</a>`)
      .join(", ")})`;

    // Select the container where the cards will be appended
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = ""; // Clear existing cards

    // Filter and display songs for the selected artist
    songs
      .filter((song) => song.artistId === artist.id && !song.explicit)
      .forEach((song) => {
        const card = createSongCard(song); // Use createSongCard to create a card
        cardsContainer.appendChild(card); // Append the card to the container
      });
  }
});

function createSongCard(song) {
  // Create a <div> to hold the card
  const card = document.createElement("div");
  card.classList.add("card");

  // Create a song image
  const songImg = document.createElement("img");
  songImg.src = song.imageUrl; // Ensure each song object has an imageUrl property
  songImg.classList.add("card-image");
  card.appendChild(songImg); // Add image to card

  // Add title
  const title = document.createElement("h3");
  title.textContent = song.title;
  title.classList.add("card-title");
  card.appendChild(title);

  // Add year
  const year = document.createElement("p");
  year.textContent = `Year: ${song.Year_Recorded}`;
  year.classList.add("card-year");
  card.appendChild(year);

  // Add duration - minutes:seconds
  const duration = document.createElement("p");
  duration.textContent = `Duration: ${formatDuration(song.duration)}`;
  duration.classList.add("card-duration");
  card.appendChild(duration);

  songImg.addEventListener("click", () => window.open(song.url, "_blank"));

  return card;
}

function formatDuration(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");
