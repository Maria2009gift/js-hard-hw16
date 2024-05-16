
const input = document.querySelector("#input")
const listA = document.querySelector("#listNames")


const debaucedShowSameNames = _.debounce(function showSameNames() {
    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
        listA.innerHTML = " "
        let sortedNames = data.filter(a => a.name["common"].includes(input.value))
        
        if (sortedNames.length > 10) {
            const notice = PNotify.notice({
                title: 'Click Close Notice',
                text: 'Too many matches found. Please a more specific query!',
                closer: false,
                sticker: false
              });
              notice.on('click', () => {
                notice.close();
              });
        } else {
            let createP = sortedNames.map(elem => listA.insertAdjacentHTML("beforeend", `<li class="list-item">${elem.name["common"]}</li>`))
            
        }
        if (sortedNames.length === 1) {
            listA.innerHTML = " "
            listA.insertAdjacentHTML("beforeend", `<li>
            <h2>${sortedNames[0].name["common"]}</h2>
            <div style="display: flex;"><div>
            <p class="info">Capital: ${sortedNames[0].capital}</p>
            <p class="info">Population: ${sortedNames[0].population}</p>
            <p class="info">Language:</p>
            <ul id="list-of-names"></ul>
            </div><div><img src="${sortedNames[0].flags["png"]}" alt="" style="margin-left:10px;"></div></div></li>`)
            
            let listOfKeys = Object.keys(sortedNames[0].languages)
            const listOfNames = document.querySelector("#list-of-names")
            
            for (const i of listOfKeys) {         
                let createLi = listOfNames.insertAdjacentHTML("beforeend", `<li>${sortedNames[0].languages[i]}</li>`)
            }
        }
    })
}, 400) 


input.addEventListener("input", debaucedShowSameNames)







