// 1️⃣ Run when the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Run when Enter is pressed in the input box
  document.getElementById("skill-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  // Run when the search icon is clicked
  document.querySelector(".search-icon").addEventListener("click", handleSearch);
});

// 2️⃣ Define the function that fetches data from your backend
function handleSearch() {
  const skill = document.getElementById("skill-input").value.trim();

  if (!skill) {
    alert("Please enter a skill to search for.");
    return;
  }

  fetch(`http://localhost:3000/courses/${encodeURIComponent(skill.toLowerCase())}`)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("results-container");
      container.style.display = "block"; // show container if hidden
      container.innerHTML = ""; // clear previous results
      console.log("Fetched video objects:", data);
console.log("First video object keys:", Object.keys(data[0] || {}));

      if (data.length === 0) {
        container.innerHTML = "<p>No videos found for this skill.</p>";
        return;
      }

      data.forEach(video => {
        container.innerHTML += `
          <div class="video-card">
            <h3>${video.title}</h3>
           <p><strong>Channel:</strong> ${video.ChannelName}</p>
      <p><strong>Views:</strong> ${video.Views}</p>
      <p><strong>Likes:</strong> ${video.Likes}</p>
      <a href="${video.URL}" target="_blank">Watch Video</a>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("Error fetching from DB:", err);
    });
}
