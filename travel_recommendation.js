document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#search-input");
    const searchButton = document.querySelector("#search-button");
    const resetButton = document.querySelector("#reset-button"); // Bouton Reset
    const resultsContainer = document.querySelector("#results-container");
  
    // Fetch Data from JSON File
    let travelData = {};
    fetch("travel_recommendation_api.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        travelData = data;
        console.log("Data fetched successfully:", travelData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  
    // Function to Handle Search
    function handleSearch() {
      const searchTerm = searchInput.value.toLowerCase();
      let results = [];
  
      // Search in countries
      travelData.countries.forEach((country) => {
        country.cities.forEach((city) => {
          if (city.name.toLowerCase().includes(searchTerm)) {
            results.push({
              name: city.name,
              imageUrl: city.imageUrl,
              description: city.description,
            });
          }
        });
      });
  
      // Search in temples
      travelData.temples.forEach((temple) => {
        if (temple.name.toLowerCase().includes(searchTerm)) {
          results.push({
            name: temple.name,
            imageUrl: temple.imageUrl,
            description: temple.description,
          });
        }
      });
  
      // Search in beaches
      travelData.beaches.forEach((beach) => {
        if (beach.name.toLowerCase().includes(searchTerm)) {
          results.push({
            name: beach.name,
            imageUrl: beach.imageUrl,
            description: beach.description,
          });
        }
      });
  
      // Display Results
      displayResults(results);
    }
  
    // Function to Display Results
    function displayResults(results) {
      resultsContainer.innerHTML = "";
  
      if (results.length === 0) {
        resultsContainer.innerHTML = `<p>Aucun résultat trouvé pour votre recherche.</p>`;
        return;
      }
  
      results.forEach((item) => {
        const resultCard = document.createElement("div");
        resultCard.className = "result-card";
  
        resultCard.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.name}" class="result-image">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        `;
  
        resultsContainer.appendChild(resultCard);
      });
    }
  
    // Attach Event Listener to Search Button
    searchButton.addEventListener("click", handleSearch);
  
    // Attach Event Listener to Reset Button
    resetButton.addEventListener("click", () => {
      searchInput.value = ""; // Efface la valeur du champ de recherche
      resultsContainer.innerHTML = ""; // Vide les résultats affichés
    });
  });
  