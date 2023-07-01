document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.getElementById("dog-bar");
    const dogInfo = document.getElementById("dog-info");
    const filterBtn = document.getElementById("good-dog-filter");
  
    let allDogs = [];
  
    // Step 1: View the data
    fetch("http://localhost:3000/pups")
      .then(response => response.json())
      .then(data => {
        allDogs = data;
        renderDogBar(allDogs);
      });
  
    function renderDogBar(dogs) {
      dogBar.innerHTML = "";
      dogs.forEach(dog => {
        const span = document.createElement("span");
        span.textContent = dog.name;
  
        span.addEventListener("click", () => {
          showDogInfo(dog);
        });
  
        dogBar.appendChild(span);
      });
    }
  
    function showDogInfo(dog) {
      dogInfo.innerHTML = `
        <img src="${dog.image}">
        <h2>${dog.name}</h2>
        <button>${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
      `;
  
      const dogBtn = dogInfo.querySelector("button");
      dogBtn.addEventListener("click", () => {
        dog.isGoodDog = !dog.isGoodDog;
        dogBtn.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
        updateDogStatus(dog.id, dog.isGoodDog);
      });
    }
  
    function updateDogStatus(dogId, isGoodDog) {
      fetch(`http://localhost:3000/pups/${dogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isGoodDog: isGoodDog,
        }),
      });
    }
  
    // Bonus Step 5: Filter Good Dogs
    filterBtn.addEventListener("click", () => {
      const filterText = filterBtn.textContent;
      const showGoodDogs = filterText.includes("ON");
      filterBtn.textContent = showGoodDogs ? "Filter good dogs: OFF" : "Filter good dogs: ON";
  
      if (showGoodDogs) {
        const goodDogs = allDogs.filter((dog) => dog.isGoodDog);
        renderDogBar(goodDogs);
      } else {
        renderDogBar(allDogs);
      }
    });
  });
  