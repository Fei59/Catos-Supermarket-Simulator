const naarPagina2 = document.getElementById("startKnop");
const producten = document.getElementById("producten");
const naarPagina3 = document.getElementById("pijlVerder"); // Pijl img: Canva
let geld = document.getElementById("geld");

// Achtergrond: Pinterest 
document.getElementById("achtergrondEen").style.backgroundImage = "url('img/startpagina.png')";
document.getElementById("achtergrondTwee").style.backgroundImage = "url('img/supermarkt.png')";
document.getElementById("achtergrondDrie").style.backgroundImage = "url('img/kassa.png')";

naarPagina2.addEventListener("click", function() {
    producten.style.display = "block";
    achtergrondEen.style.display = "none"; 
    achtergrondTwee.style.display = "block"; 
    achtergrondDrie.style.display = "none";
});

naarPagina3.addEventListener("click", function() {
    achtergrondEen.style.display = "none";
    achtergrondTwee.style.display = "none";
    achtergrondDrie.style.display = "block";
    geld.style.display = "block";
})

// Audio: https://youtu.be/0QLnRLuCQ0g?si=s4VlqCpa0aTS4Yox
// Vraag Deepseek: hoe connect ik m'n audio die in de map audio zit
// Audiovolume aanpassen: https://noaheakin.medium.com/adding-sound-to-your-js-web-app-f6a0ca728984#:~:text=The%20simplest%20way%20to%20add,starts%20playing%20the%20current%20audio.
const audioKnopStart = document.getElementById("audioKnopStart")
const audioKnopStop = document.getElementById("audioKnopStop")
audioKnopStart.style.display = 'none';

audio.volume = 0.2;

audioKnopStop.addEventListener('click', function() {
    audio.play();
    audioKnopStop.style.display = 'none';
    audioKnopStart.style.display = 'block';
});

audioKnopStart.addEventListener('click', function() {
    audio.pause();
    audioKnopStart.style.display = 'none';
    audioKnopStop.style.display = 'block';
});

// Popup: https://youtu.be/r_PL0K2fGkY?si=HyUvQ_IKoBU2Ypz-
const informatieDicht = document.getElementById("informatieDicht");
const informatie = document.getElementById("informatie");
const informatieBalk = document.getElementById("informatieBalk")

informatieBalk.addEventListener("click", () => {
    informatie.classList.add("open");
});

informatieDicht.addEventListener("click", () => {
    informatie.classList.remove("open");
});

// Supermarkt
document.addEventListener("DOMContentLoaded", function () {
    const productAfbeeldingen = document.querySelectorAll(".product");
    const randomLijst = document.getElementById('randomLijst');
    let items = Array.from(randomLijst.children); 

    // Fisher-Yates shuffle: https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_sort_random2
    for (let i = items.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    };
    
    // JavaScript Array slice(): https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_slice_array
    let geselecteerdeItems = items.slice(0, 4); 

    // JavaScript new Set: https://www.w3schools.com/jsref/jsref_set_new.asp
    let boodschappenlijst = new Set(); 

    geselecteerdeItems.forEach(function(item) {
        let itemName = item.getAttribute("data-item");
        boodschappenlijst.add(itemName); 
    });

    randomLijst.textContent = "";

    boodschappenlijst.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item; 
        li.setAttribute("data-item", item); // Vraag aan Deepseek: hoe navigeer ik data-item
        randomLijst.appendChild(li);
    });

    productAfbeeldingen.forEach(image => {
        image.addEventListener("click", function () {
            const productNaam = image.dataset.item; 
            if (boodschappenlijst.has(productNaam)) { 
                alert(`${productNaam} zit in je boodschappenmand!`);
                
                const lijstItems = randomLijst.querySelectorAll("li");
                lijstItems.forEach(li => {
                    if (li.getAttribute("data-item") === productNaam) {
                        li.style.textDecoration = "line-through"; 
                    }
                });
                image.style.display = "none";
            } else {
                alert(`${productNaam} heb je niet nodig!`);
            }
        });
    });
});

// Kassa
let h4Element = document.querySelector("h4");

function veranderTekst() {
    h4Element.textContent = "Dank u wel!"
    geld.style.display = "none";
};

geld.addEventListener("drag", veranderTekst);