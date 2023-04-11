const aboutLink = document.getElementById("about-link");
const homeLink = document.getElementById("home-link");
const profileLink = document.getElementById("profile-link");
const homeContent = document.getElementById("home");
const aboutContent = document.getElementById("about");
const profileContent = document.getElementById("profile");
const newFormWindow = document.getElementById("new-person-menu");
const aboutDotPage = document.getElementById('about-dot-page');

aboutLink.addEventListener('click', () =>{
    newFormWindow.style.display = "none";
    newFormWindow.classList.remove("show");
    aboutContent.style.display = 'block';
    homeContent.style.display = "none";
    profileContent.style.display = "none";
})

homeLink.addEventListener('click', () =>{
    
    homeContent.style.display = 'block';
    aboutContent.style.display = "none";
    profileContent.style.display = "none";
})

profileLink.addEventListener('click', () =>{
    newFormWindow.style.display = "none";
    newFormWindow.classList.remove("show");
    profileContent.style.display = 'block';
    aboutContent.style.display = "none";
    homeContent.style.display = "none";
})

fetch('user.json')
    .then(response => response.json())
    .then(data => {

        const name = data.name;
        const age = data.age;
        const gender = data.gender;
        const location = data.location
        const interests = data.interests;
        const about = data.about;
        const people = data.people;
        const container = document.getElementById('people-container');
        const profileContainer = document.getElementById('profile');
        const profileInfo = document.getElementById('profile-info');
        const topProfileInfo = document.createElement('span');
        const bottomProfileInfo = document.createElement('span');
        const profileAboutContainer = document.getElementById('profile-about-container');
        const aboutContent = document.getElementById('about-content')

        aboutDotPage.innerText = "Welcome " + name + " to Flirtfolio! This is the main page. Each person's name is shown, along with a colored dot that represents their chosen theme color. When hovering over a person's name or picture, an X icon appears in the top right corner. Clicking this icon removes the person from your list of matches. If you want to add a new person to your list, click the Edit button at the bottom of the page to load a new form."

        topProfileInfo.textContent = name;
        bottomProfileInfo.textContent = age + " / " + location;
        topProfileInfo.classList.add("profile-name");
        bottomProfileInfo.classList.add("age-and-location");
        profileInfo.appendChild(topProfileInfo);
        profileInfo.appendChild(bottomProfileInfo);
        aboutContent.innerText = about;

        const interestsContainer = document.getElementById("interests-list");

        interests.forEach(interest => {
            const interestItem = document.createElement("li");
            interestItem.innerText = interest;
            interestsContainer.appendChild(interestItem);
        });


        people.forEach(person => {
          const firstName = person.firstName;
          const lastName = person.lastName;
          const color = person.color;
          const numOfDates = person.numOfDates;

          const personDiv = document.createElement('div');
          personDiv.classList.add('person-div');

          const colorSpan = document.createElement('span');
          colorSpan.classList.add('dotSpan');
          colorSpan.style.backgroundColor = color;
          personDiv.appendChild(colorSpan);

          const nameSpan = document.createElement('div');
          nameSpan.textContent = firstName + ' ' + lastName;
          personDiv.appendChild(nameSpan);

          const closeButton = document.createElement('button');
          closeButton.innerHTML = "X";
          closeButton.classList.add('close-button');
          closeButton.style.display = "none";
          personDiv.appendChild(closeButton);

          closeButton.addEventListener('click', () => {
            personDiv.classList.add('leave');
            setTimeout(function(){personDiv.remove();},700);
          });
        
          
          personDiv.addEventListener('mouseenter', () => {
            closeButton.style.display = 'block';
          });
          personDiv.addEventListener('mouseleave', () => {
            closeButton.style.display = 'none';
          });
          
          container.appendChild(personDiv);
        })
    });

const xButton = document.getElementById("exit-button");
const editIcon = document.getElementById("edit-icon");

xButton.addEventListener("click", () => {
    newFormWindow.classList.remove("show");
    newFormWindow.style.display = "none";
})

editIcon.addEventListener("click", () => {
    newFormWindow.classList.add("show");
    newFormWindow.style.display = "inline";
})


// submit handling

const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const color = document.getElementById('color').value;
    
    const newPerson = {
        firstName,
        lastName, 
        color,
        numOfDates: 0,
    };

    // Get the current people array from the JSON file
    fetch('user.json')
        .then(response => response.json())
        .then(data => {
            const people = data.people;
            
            // Add the new person to the array
            people.push(newPerson);
            
            // Write the updated array to the JSON file
            fetch('user.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

            // Add the new person to the page
            const container = document.getElementById('people-container');
            const personDiv = document.createElement('div');
            personDiv.classList.add('person-div');

            const colorSpan = document.createElement('span');
            colorSpan.classList.add('dotSpan');
            colorSpan.style.backgroundColor = newPerson.color;
            personDiv.appendChild(colorSpan);

            const nameSpan = document.createElement('div');
            nameSpan.textContent = newPerson.firstName + ' ' + newPerson.lastName;
            personDiv.appendChild(nameSpan);

            const closeButton = document.createElement('button');
          closeButton.innerHTML = "X";
          closeButton.classList.add('close-button');
          closeButton.style.display = "none";
          personDiv.appendChild(closeButton);

          closeButton.addEventListener('click', () => {
            personDiv.classList.add('leave');
            setTimeout(function(){personDiv.style.display = "none";},900);
          });
        
          
          personDiv.addEventListener('mouseenter', () => {
            closeButton.style.display = 'block';
          });
          personDiv.addEventListener('mouseleave', () => {
            closeButton.style.display = 'none';
          });

            container.appendChild(personDiv);
        })
        .catch(error => {
            console.error(error);
        });
});


  
