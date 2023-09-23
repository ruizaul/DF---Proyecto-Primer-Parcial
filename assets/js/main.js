/*=============== TEMA ===============*/
const themeButton = document.getElementById("boton_tema");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Tema seleccionado previamente (si el usuario lo seleccionó)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Obtenemos el tema actual de la interfaz validando la clase dark-theme
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// Validamos si el usuario eligió previamente un tema
if (selectedTheme) {
  // Si se cumple la validación, preguntamos cuál fue el tema para saber si activamos o desactivamos el modo oscuro
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activar / desactivar el tema manualmente con el botón
themeButton.addEventListener("click", () => {
  // Agregar o quitar el tema oscuro y el icono
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // Guardamos el tema y el icono actual que eligió el usuario
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== ANIMACIÓN DE SCROLL REVEAL ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

sr.reveal(`.bordes_perfil`);
sr.reveal(`.nombre_perfil`, { delay: 500 });
sr.reveal(`.profesion_perfil`, { delay: 600 });
sr.reveal(`.correo_perfil`, { delay: 700 });
sr.reveal(`.redes_perfil`, { delay: 800 });
sr.reveal(`.profile__info-group`, { interval: 100, delay: 700 });
sr.reveal(`.botones_perfil`, { delay: 900 });
sr.reveal(`.filters__content`, { delay: 1000 });
sr.reveal(`.filters`, { delay: 1100 });

/*=============== MENÚ ===============*/
// Obtener una referencia al botón de menú móvil y a la navegación
const mobileMenuButton = document.getElementById("mobile-menu-button");
const navigation = document.querySelector("nav");

// Obtener todas las etiquetas 'a' dentro de la navegación
const navLinks = navigation.querySelectorAll("a");

// Función para manejar cambios en el tamaño de la ventana
function handleWindowResize() {
  const windowWidth = window.innerWidth;

  if (windowWidth > 768) {
    // Si la pantalla es mayor que 768px, ocultamos el menú móvil
    hideMobileMenu();

    // Además, eliminamos las clases show-menu y show-link
    navigation.classList.remove("show-menu");
    navLinks.forEach((link) => {
      link.classList.remove("show-link");
    });
  }
}

// Función para ocultar el menú móvil
function hideMobileMenu() {
  navigation.classList.remove("show-menu"); // Removemos la clase "show-menu"

  // Iteramos a través de todos los enlaces 'a' y removemos la clase "show-link"
  navLinks.forEach((link) => {
    link.classList.remove("show-link");
  });

  // Removemos el controlador de eventos de clic en el documento
  document.removeEventListener("click", checkClickOutside);
}

// Función para verificar si se hizo clic fuera del menú
function checkClickOutside(event) {
  if (
    !navigation.contains(event.target) &&
    !mobileMenuButton.contains(event.target)
  ) {
    // Si el clic ocurrió fuera del menú y del botón de menú móvil, ocultamos el menú móvil
    hideMobileMenu();
  }
}

// Agregamos un controlador de eventos para el clic en el botón de menú móvil
mobileMenuButton.addEventListener("click", function (event) {
  event.stopPropagation(); // Evitamos que el clic llegue al documento
  navigation.classList.toggle("show-menu"); // Alternamos la clase "show-menu"

  // Iteramos a través de todos los enlaces 'a' y alternamos su visibilidad
  navLinks.forEach((link) => {
    link.classList.toggle("show-link");
  });

  // Agregamos un controlador de eventos de clic en el documento para detectar clics fuera del menú
  document.addEventListener("click", checkClickOutside);
});

// Agregamos un controlador de eventos de clic a los enlaces show-link para cerrar el menú
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    hideMobileMenu(); // Cierra el menú al hacer clic en un enlace show-link
  });
});

// Agregamos un controlador de eventos para el cambio en el tamaño de pantalla
window.addEventListener("resize", handleWindowResize);

// Llamamos a la función handleWindowResize inicialmente para manejar el estado inicial de la pantalla
handleWindowResize();
