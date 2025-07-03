

/*function handleSearch() {
 const skill = document.getElementById('courseSearch').value;

  const resultsContainer = document.getElementById('resultsContainer');
  if (!skill) {
    alert("Please select a skill to search for.");
    return;
  }

  // Show a loading placeholder while fetching
  resultsContainer.innerHTML = `
    <div class="loading">Searching for "${skill}"...</div>
  `;

  // ✅ Dynamic base URL: localhost (during dev) or same origin (when deployed)
  const BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : ""; // empty string = same domain as the frontend

  // 🔥 Final fetch using full path
  fetch(`${BASE_URL}/api/courses?skill=${encodeURIComponent(skill)}`)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      if (!data || !data.length) {
        resultsContainer.innerHTML = `
          <div class="no-results">No videos found for this skill.</div>
        `;
        return;
      }
      // Display the results
      let html = `<h2>Courses for "${skill}"</h2><div class="course-list">`;
      data.forEach(course => {
        html += `
          <div class="course-card">
            <h3>${course.Title}</h3>
            <p><strong>Channel:</strong> ${course.ChannelName}</p>
            <p><strong>Views:</strong> ${course.Views.toLocaleString()}</p>
            <p><strong>Likes:</strong> ${course.Likes.toLocaleString()}</p>
            <a href="${course.URL}" target="_blank" rel="noopener noreferrer">Watch Video</a>
          </div>
        `;
      });
      html += '</div>';
      resultsContainer.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      resultsContainer.innerHTML = `
        <div class="error">An error occurred while searching. Please try again later.</div>
      `;
    });
}*/
// main.js

// Handler for dropdown search (Search Section)
document.addEventListener('DOMContentLoaded', function () {
    const searchBtnSelect = document.getElementById('searchBtnSelect');
    const searchBtnInput = document.getElementById('searchBtnInput');
    const skillButtons = document.querySelectorAll('.skill-button');

    if (searchBtnSelect) {
        searchBtnSelect.addEventListener('click', function () {
            const skill = document.getElementById('courseSearchSelect').value;
            fetchAndDisplayCourses(skill, 'resultsContainerSelect');
        });
    }

    // Handler for text input search (Skills Section)
    if (searchBtnInput) {
        searchBtnInput.addEventListener('click', function () {
            const skill = document.getElementById('courseSearchInput').value;
            fetchAndDisplayCourses(skill, 'resultsContainerInput');
        });
    }

    // Handler for quick skill buttons (Skills Section)
    skillButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const skill = btn.getAttribute('data-skill');
            fetchAndDisplayCourses(skill, 'resultsContainerInput');
        });
    });
});

/**
 * Fetches courses from the backend and displays them in the specified container.
 * @param {string} skill - The skill to search for.
 * @param {string} containerId - The ID of the container to display results in.
 */
function fetchAndDisplayCourses(skill, containerId) {
    const resultsContainer = document.getElementById(containerId);
    if (!skill) {
        resultsContainer.innerHTML = "Please select or enter a skill.";
        return;
    }
    resultsContainer.innerHTML = "Loading...";
    fetch(`/api/courses?skill=${encodeURIComponent(skill)}`)
        .then(res => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                resultsContainer.innerHTML = "No courses found.";
                return;
            }
            resultsContainer.innerHTML = data.map(course => `
                <div class="course-card">
                    <strong>Title:</strong> ${course.Title}<br>
                    <strong>Channel:</strong> ${course.ChannelName}<br>
                    <strong>Views:</strong> ${course.Views}<br>
                    <strong>Likes:</strong> ${course.Likes}<br>
                    <a href="${course.URL}" target="_blank">Watch Video</a>
                </div>
                <hr>
            `).join('');
        })
        .catch(err => {
            resultsContainer.innerHTML = "Error fetching results.";
            console.error(err);
        });
}



