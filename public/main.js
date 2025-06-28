// 1️⃣ Smooth scroll to search section when "Get Started" is clicked
/*document.getElementById('getStartedBtn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('search').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// 2️⃣ Search functionality: fetch from backend and display results
function handleSearch() {
    const skill = document.getElementById('courseSearch').value.trim();
    const resultsContainer = document.getElementById('resultsContainer');
    if (!skill) {
        alert("Please select a skill to search for.");
        return;
    }

    // Show a loading placeholder while fetching
    resultsContainer.innerHTML = `
        <div class="results-placeholder">
            <div class="placeholder-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                    <path d="M9 12l2 2 4-4"/>
                </svg>
            </div>
            <p class="placeholder-text">
                Searching for "${skill}"...
            </p>
        </div>
    `;

    // Fetch data from backend
    fetch(`http://localhost:3000/courses/${encodeURIComponent(skill.toLowerCase())}`)
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = "";
            if (!Array.isArray(data) || data.length === 0) {
                resultsContainer.innerHTML = `
                    <div class="results-placeholder">
                        <div class="placeholder-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        </div>
                        <p class="placeholder-text">
                            No videos found for this skill.
                        </p>
                    </div>
                `;
                return;
            }
            // Render each video result
            data.forEach(video => {
                resultsContainer.innerHTML += `
                    <div class="video-result">
                        <strong>Channel:</strong> ${video.ChannelName || "N/A"}<br>
                        <strong>Views:</strong> ${video.Views || "N/A"}<br>
                        <a href="${video.VideoUrl.startsWith('http') ? video.VideoUrl : 'https://' + video.VideoUrl}" target="_blank">Watch Video</a><br>
                        <strong>Likes:</strong> ${video.Likes || "N/A"}
                    </div>
                    <hr>
                `;
            });
        })
        .catch(err => {
            resultsContainer.innerHTML = `
                <div class="results-placeholder">
                    <div class="placeholder-icon">❌</div>
                    <p class="placeholder-text">An error occurred while searching. Please try again later.</p>
                </div>
            `;
            console.error(err);
        });
}

// 3️⃣ Attach event listeners for search button and Enter key
document.getElementById('searchBtn').addEventListener('click', handleSearch);

document.getElementById('courseSearch').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});

// 4️⃣ (Optional) Add support for skill buttons in the Skills section
document.querySelectorAll('.skill-button').forEach(btn => {
    btn.addEventListener('click', function() {
        const skill = btn.getAttribute('data-skill');
        document.getElementById('courseSearch').value = skill;
        handleSearch();
        // Optionally scroll to search section
        document.getElementById('search').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});*/

// ================ DOM CONTENT LOADED ================
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll to search section
  document.getElementById('getStartedBtn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('search').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  // Search functionality
  function handleSearch() {
    const skill = document.getElementById('courseSearch').value.trim();
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (!skill) {
      alert("Please select a skill to search for.");
      return;
    }

    // Normalize skill name (remove spaces + lowercase)
    const topic = skill.replace(/\s+/g, '').toLowerCase();
    
    // Show loading state
    resultsContainer.innerHTML = `
      <div class="results-placeholder">
        <div class="placeholder-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        </div>
        <p class="placeholder-text">
          Searching for "${skill}"...
        </p>
      </div>
    `;

    // Fetch from backend
    fetch(`http://localhost:3000/courses/${topic}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response error');
        return response.json();
      })
      .then(data => {
        resultsContainer.innerHTML = "";
        
        if (!Array.isArray(data) || data.length === 0) {
          resultsContainer.innerHTML = `
            <div class="results-placeholder">
              <div class="placeholder-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <p class="placeholder-text">
                No videos found for this skill.
              </p>
            </div>
          `;
          return;
        }
        
        // Render results
        data.forEach(video => {
          // Safely handle video URL
          const url = video.VideoUrl;
          let safeUrl = "#";
          
          if (url) {
            safeUrl = url.startsWith('http') ? url : `https://${url}`;
          }
          
          resultsContainer.innerHTML += `
            <div class="video-result">
              <strong>Channel:</strong> ${video.ChannelName || "N/A"}<br>
              <strong>Views:</strong> ${video.Views || "N/A"}<br>
              <a href="${safeUrl}" target="_blank">Watch Video</a><br>
              <strong>Likes:</strong> ${video.Likes || "N/A"}
            </div>
            <hr>
          `;
        });
      })
      .catch(err => {
        console.error('Fetch error:', err);
        resultsContainer.innerHTML = `
          <div class="results-placeholder">
            <div class="placeholder-icon">❌</div>
            <p class="placeholder-text">
              Error fetching results. Please try again later.
            </p>
          </div>
        `;
      });
  }

  // Search button event
  document.getElementById('searchBtn').addEventListener('click', handleSearch);

  // Enter key support
  document.getElementById('courseSearch').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  // Skill buttons functionality
  document.querySelectorAll('.skill-button').forEach(btn => {
    btn.addEventListener('click', function() {
      const skill = this.getAttribute('data-skill');
      document.getElementById('courseSearch').value = skill;
      handleSearch();
      
      // Scroll to search section
      document.getElementById('search').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
});
