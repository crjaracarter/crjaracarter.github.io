const $navbar = document.getElementById("navbar");
const $navHamburger = document.querySelector(".btn-responsive");
const $navList = document.querySelector(".nav__menu");
const $servicesViewMore = document.querySelectorAll(
    ".services__section__view-more"
);
const $modalContainer = document.querySelector(".modal-container");
const $modal = document.querySelector(".modal");
const $modalTitle = document.querySelector(".modal__title");
const $modalSubtitle = document.querySelector(".modal__sub-title");
const $modalList = document.querySelector(".modal__lista");
const $modalBtnExit = document.querySelector(".modal__btn");
const $formSubmit = document.querySelector(".contact__form");
const $alertForm = document.querySelector(".contact__window__span");
/*
//DOT GRID
class dotGrid {
     constructor(container = "sketch") {
       this.canvasElement = document.getElementById(container);
  
       // Get the device pixel ratio, falling back to 1.
       this.dpr = window.devicePixelRatio || 1;
  
       this.drawable = this.canvasElement.getBoundingClientRect();
  
       this.canvasWidth = this.drawable.width * this.dpr;
       this.canvasHeight = this.drawable.height * this.dpr;
  
       this.canvasElement.width = this.canvasWidth;
       this.canvasElement.height = this.canvasHeight;
  
       this.mouseX = 0;
       this.mouseY = 0;
  
       // Setup Canvas
       this.canvas = this.canvasElement.getContext("2d");
       this.canvas.scale(this.dpr, this.dpr);
     }
  
     onMouseUpdate(e) {
       this.mouseX = e.pageX - this.drawable.left;
       this.mouseY = e.pageY - this.drawable.top;
  
       window.requestAnimationFrame(this.draw.bind(this));
     }
  
     init() {
       window.requestAnimationFrame(this.draw.bind(this));
       // Listen for Mouse updates
       document.body.addEventListener(
         "mousemove",
         this.onMouseUpdate.bind(this),
         false
       );
     }
  
     // Draws the background and calls the function for drawing the dots
     draw() {
       this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
       this.drawDots();
     }
  
     /*
     //((j - this.mouseY) / dist * 4)
     
  
     // i and j function as x and y when drawing the dot grid.
     drawDots() {
       let size = 2;
       let gridSize = 30;
       for (var i = 2; i < this.canvasWidth / this.dpr / gridSize - 1; i++) {
         for (var j = 2; j < this.canvasHeight / this.dpr / gridSize - 1; j++) {
           let x = i * gridSize;
           let y = j * gridSize;
           let dist = this.pythag(x, y, this.mouseX, this.mouseY);
           this.canvas.beginPath();
           this.canvas.arc(
             x + (x - this.mouseX) / dist * gridSize,
             y + (y - this.mouseY) / dist * gridSize,
             size,
             size,
             Math.PI,
             true
           );
           this.canvas.fillStyle = "#00E56C";
           this.canvas.fill();
         }
       }
     }
  
     // Grabs mouse position, checks if the mouse is off the screen (NaN) and calculates the distance from the mouse pointer and each dot using the pythagorean theorem.
     pythag(ellipseX, ellipseY, mouseX, mouseY) {
       let x = mouseX;
       let y = mouseY;
  
       if (x == NaN) {
         return 1;
       } else {
         let leg1 = Math.abs(x - ellipseX);
         let leg2 = Math.abs(y - ellipseY);
         let pyth = Math.pow(leg1, 2) + Math.pow(leg2, 2);
         return Math.sqrt(pyth);
       }
     }
   }
  
   const grid = new dotGrid("sketch");
   grid.init();
*/




// Navbar
window.addEventListener("scroll", () =>
    $navbar.classList.toggle("sticky", window.scrollY > 10)
);
$navHamburger.addEventListener("click", () =>
    $navList.classList.toggle("menuResponsive")
);
$navList.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav__menu__a")) {
        document
            .querySelectorAll(".nav__menu__a")
            .forEach((item) => item.classList.remove("active"));
        e.target.classList.add("active");
        $navList.classList.remove("menuResponsive");
    }
});

// Services
const servicesList = [{
        title: "Consultoría TI",
        subTitle: "¿Qué ofrezco?",
        services: [
            "Gestión de proyectos TI.",
            "Asesoramiento Personalizado.",
            "Evolución y Adaptación Tecnológica.",
            "Aumento de la Productividad del Proyecto.",
            "Optimización del Trabajo.",
            "Mejora de la Seguridad Informática.",
        ],
    },
    {
        title: "Desarrollo Web",
        subTitle: "¿Qué ofrezco?",
        services: [
            "Atención y Asesoramiento Personalizado.",
            "Desarrollo Web Personalizado.",
            "Desarrollo de Tiendas Virtuales.",
            "Mantenimiento de Plataformas.",
        ],
    },
    {
        title: "Ciberseguridad y Ciberdefensa",
        subTitle: "¿Qué ofrezco?",
        services: [
            "Servicios de consultoría",
            "Capacitación y Concientización",
            "Implementación de Políticas de Seguridad",
            "Optimización de la Ciberseguridad Empresarial",
        ],
    },
];

// Modal
$servicesViewMore.forEach((viewMore, i) => {
    viewMore.addEventListener("click", () => addModal(i));
});
const addModal = (i) => {
    $modalContainer.classList.add("modal-container--show");
    $modal.classList.add("modal--show");
    $modalTitle.textContent = servicesList[i].title;
    $modalSubtitle.textContent = servicesList[i].subTitle;
    let listTech = "";
    servicesList[i].services.forEach((tecnologia) => {
        listTech +=
            //Html
            `
    <li class="modal__li">
      <h5 class="modal__tech"><span>✔️</span> ${tecnologia}</h5>
    </li>
    `;
    });
    $modalList.innerHTML = listTech;
};
const removeModal = () => {
    $modal.classList.remove("modal--show");
    setTimeout(
        () => $modalContainer.classList.remove("modal-container--show"),
        250
    );
};
$modalBtnExit.addEventListener("click", removeModal);
$modalContainer.addEventListener("click", (e) =>
    e.target.classList.contains("modal-container") ? removeModal() : ""
);

// Contact
async function handleSubmit(event) {
    event.preventDefault();
    const {
        name,
        email,
        message
    } = event.target;
    console.log(name, email, message);
    $alertForm.classList.remove("active");
    const form = new FormData(this);
    if (
        name.value.trim() !== "" &&
        email.value.trim() !== "" &&
        message.value.trim() !== ""
    ) {
        const response = await fetch(this.action, {
            method: this.method,
            body: form,
            headers: {
                Accept: "aplication/json"
            },
        });
        if (response.ok) {
            callAlertForm("Correo enviado con exito!");
            this.reset();
        } else callAlertForm("Por favor rellene los campos correctamente");
    } else callAlertForm("Por favor rellene los campos correctamente");
}
$formSubmit.addEventListener("submit", handleSubmit);

const callAlertForm = (msg) => {
    $alertForm.textContent = msg;
    $alertForm.classList.add("active");
};


// Importar Typed
const typed = new Typed('#typed', {
  strings: ['Cristian Jara'],
  typeSpeed: 80,
  backSpeed: 40,
  loop: true
});


// Wrap every letter in a span
var textWrapper = document.querySelector('.ml14 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml14 .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeInOutExpo",
    duration: 900
  }).add({
    targets: '.ml14 .letter',
    opacity: [0,1],
    translateX: [40,0],
    translateZ: 0,
    scaleX: [0.3, 1],
    easing: "easeOutExpo",
    duration: 800,
    offset: '-=600',
    delay: (el, i) => 150 + 25 * i
  }).add({
    targets: '.ml14',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

anime.timeline({loop: true})
  .add({
    targets: '.ml5 .line',
    opacity: [0.5,1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 700
  }).add({
    targets: '.ml5 .line',
    duration: 600,
    easing: "easeOutExpo",
    translateY: (el, i) => (-1.2 + 1.1*2*i) + "em"
  }).add({
    targets: '.ml5 .ampersand',
    opacity: [0,1],
    scaleY: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5 .letters-left',
    opacity: [0,1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=300'
  }).add({
    targets: '.ml5 .letters-right',
    opacity: [0,1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


//MATRIX EFFECT
// Initialising the canvas
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

// Setting up the columns
var fontSize = 15,
    columns = canvas.width / fontSize;

// Setting up the drops
var drops = [];
for (var i = 0; i < columns; i++) {
  drops[i] = 1;
}

// Setting up the draw function
function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = 'rgba(0, 255, 0)';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
      drops[i] = 0;
    }
  }
}

// Loop the animation
setInterval(draw, 33);

