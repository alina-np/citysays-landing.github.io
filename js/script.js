document.addEventListener("DOMContentLoaded", function () {
  slidesToggle();
  showTabs();
  showMobileMenu();
  formValidate();
  startAnimation();
});

// Слайдер
function slidesToggle() {
  const slides = document.querySelectorAll(".slider__photo");

  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      slides.forEach((sl) => sl.classList.remove("active"));
      slide.classList.add("active");
    });
  });
}

// Табы
function showTabs() {
  const tabNav = document.querySelectorAll(".video__title .title-three"),
    tabContent = document.querySelectorAll(".video__list");

  tabNav.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabNav.forEach((tb) => tb.classList.remove("active"));
      tab.classList.add("active");
      const tabName = tab.dataset.name;
      tabContent.forEach((content) => {
        content.classList.toggle("active", content.classList.contains(tabName));
      });
    });
  });
}

// Бургерное меню
function showMobileMenu() {
  const menu = document.querySelector(".mobileMenu"),
    nav = document.querySelector(".nav");

  menu.addEventListener("click", function () {
    menu.classList.toggle("active");
    nav.classList.toggle("active");
    window.addEventListener("click", function (e) {
      if (!menu.contains(e.target)) {
        menu.classList.remove("active");
        nav.classList.remove("active");
      }
    });
  });
}

// Маска телефона
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll(".tel"), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      var reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});

// Валидация и отправка формы
function formValidate() {
  const form = document.querySelector(".forma"),
    errorFields = form.querySelectorAll(".forma__error"),
    btn = form.querySelector("button"),
    emailInput = form.querySelector(".email"),
    telInput = form.querySelector(".tel"),
    nameInput = form.querySelector(".name"),
    textInput = form.querySelector(".textarea");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    checkFullField(form);
    if ([...errorFields].some((error) => error.textContent !== "")) return;
    btn.textContent = "Заявка отправлена";
  });

  form.addEventListener("change", (e) => {
    if (e.target.matches(".email")) validateField(emailInput, validateEmail);
    if (e.target.matches(".tel")) validateField(telInput, validateTel);
    if (e.target.matches(".name")) validateField(nameInput, validateText);
    if (e.target.matches(".textarea"))
      validateField(textInput, validateTextarea);
  });

  function validateField(input, validationFunc) {
    validationFunc(input);
  }

  function validateEmail(input) {
    const pattern = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    input.nextElementSibling.innerHTML = input.value.match(pattern)
      ? ""
      : "Вы ввели некорректный e-mail";
  }

  function validateTel(input) {
    const value = input.value;
    if (value.length < 4) {
      input.nextElementSibling.innerHTML = "Поле, обязательное для заполнения";
    } else if (value.length < 17) {
      input.nextElementSibling.innerHTML =
        "Вы ввели некорректный номер телефона";
    } else {
      input.nextElementSibling.innerHTML = "";
    }
  }

  function validateTextarea(input) {
    input.nextElementSibling.innerHTML =
      input.value.length >= 1000
        ? "Число символов не должно превышать 1000"
        : "";
  }

  function validateText(input) {
    const patternLetter = /^[a-zA-ZА-Яа-яЁё]{3,20}$/u,
      value = input.value;
    let errorMessage = "";

    if (value.length === 0) {
      errorMessage = "Поле, обязательное для заполнения";
    } else if (!value.match(patternLetter)) {
      errorMessage = "Поле может содержать только буквы";
    } else if (value.length < 3) {
      errorMessage = "Число символов не должно быть меньше 3";
    } else if (value.length > 30) {
      errorMessage = "Число символов не должно превышать 30";
    }

    input.nextElementSibling.innerHTML = errorMessage;
  }

  function checkFullField(forma) {
    const inputRequired = forma.querySelectorAll("[required]");
    inputRequired.forEach((input) => {
      input.nextElementSibling.innerHTML = !input.value
        ? "Поле, обязательное для заполнения"
        : "";
    });
  }
}

// Анимация с gsap.js и ScrollTrigger
function startAnimation() {
  gsap.from("#stroke", {
    "--dashOffset": 1000,
    delay: 1,
    scrollTrigger: {
      // markers: true,
      trigger: "#page",
      start: "-5% top",
      end: "bottom+=20% bottom",
      scrub: 1,
    },
  });

  gsap.from(".title-big", {
    scrollTrigger: {
      trigger: "#gallery",
      start: "top center",
      end: "bottom top",
      // markers: true,
      scrub: true,
    },
    x: -300,
  });
}
