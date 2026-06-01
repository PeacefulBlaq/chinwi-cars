console.log("Car Rental Website Loaded");

/*
|--------------------------------------------------------------------------
| VEHICLE LIVE SEARCH
|--------------------------------------------------------------------------
*/

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const value =
            searchInput.value
                .toLowerCase()
                .trim();

        document.querySelectorAll(".car-item").forEach(car => {

            const name =
                car.dataset.name.toLowerCase();

            car.style.display =
                name.includes(value)
                    ? ""
                    : "none";

        });

    });

}

/*
|--------------------------------------------------------------------------
| NAVBAR AUTO CLOSE
|--------------------------------------------------------------------------
*/

function closeNavbar() {

    const menu =
        document.getElementById("menu");

    if (!menu) return;

    if (menu.classList.contains("show")) {

        const collapse =
            bootstrap.Collapse.getOrCreateInstance(menu);

        collapse.hide();

    }

}

/*
|--------------------------------------------------------------------------
| CLOSE MENU WHEN NAV LINK IS CLICKED
|--------------------------------------------------------------------------
*/

document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            closeNavbar();

        });

    });

/*
|--------------------------------------------------------------------------
| MULTI LANGUAGE SYSTEM
|--------------------------------------------------------------------------
*/

let currentLang = "en";

const langBtn =
    document.getElementById("langBtn");

let translations = {};

fetch("js/lang.json")
    .then(response => response.json())
    .then(data => {

        translations = data;

        applyLanguage(currentLang);

    })
    .catch(error => {

        console.error(
            "Language file error:",
            error
        );

    });

function applyLanguage(lang) {

    if (!translations[lang]) return;

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.getAttribute("data-i18n");

            if (translations[lang][key]) {

                element.innerText =
                    translations[lang][key];

            }

        });

    if (searchInput) {

        searchInput.placeholder =
            translations[lang]
                .searchPlaceholder || "";

    }

    /*
    |--------------------------------------------------------------------------
    | RTL SUPPORT FOR ARABIC
    |--------------------------------------------------------------------------
    */

    if (lang === "ar") {

        document.documentElement.dir = "rtl";
        document.documentElement.lang = "ar";

    } else {

        document.documentElement.dir = "ltr";
        document.documentElement.lang = lang;

    }

}

if (langBtn) {

    langBtn.addEventListener("click", () => {

        if (currentLang === "en") {

            currentLang = "fr";
            langBtn.innerText = "AR";

        } else if (currentLang === "fr") {

            currentLang = "ar";
            langBtn.innerText = "EN";

        } else {

            currentLang = "en";
            langBtn.innerText = "FR";

        }

        applyLanguage(currentLang);

        closeNavbar();

    });

}

/*
|--------------------------------------------------------------------------
| DARK / LIGHT MODE
|--------------------------------------------------------------------------
*/

const themeBtn =
    document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle(
            "dark-mode"
        );

        themeBtn.innerText =
            document.body.classList.contains(
                "dark-mode"
            )
                ? "☀️"
                : "🌙";

        closeNavbar();

    });

}

/*
|--------------------------------------------------------------------------
| BOOKING SIMULATION
|--------------------------------------------------------------------------
*/

let selectedVehicle = "";
let selectedPrice = "";

document
    .querySelectorAll(".reserve-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            selectedVehicle =
                button.dataset.car;

            selectedPrice =
                button.dataset.price;

            document.getElementById(
                "selectedCar"
            ).innerText =
                `${selectedVehicle} (${selectedPrice} MAD/day)`;

        });

    });

const submitBooking =
    document.getElementById(
        "submitBooking"
    );

if (submitBooking) {

    submitBooking.addEventListener(
        "click",
        () => {

            const name =
                document.getElementById(
                    "customerName"
                ).value.trim();

            const phone =
                document.getElementById(
                    "customerPhone"
                ).value.trim();

            const pickup =
                document.getElementById(
                    "pickupDate"
                ).value;

            const returnDate =
                document.getElementById(
                    "returnDate"
                ).value;

            if (
                !name ||
                !phone ||
                !pickup ||
                !returnDate
            ) {

                alert(
                    "Please complete all fields."
                );

                return;
            }

            const message =

`Hello,

I would like to reserve a vehicle.

Vehicle: ${selectedVehicle}

Price: ${selectedPrice} MAD/day

Name: ${name}

Phone: ${phone}

Pickup Date: ${pickup}

Return Date: ${returnDate}`;

            window.open(

                "https://wa.me/+212664142131?text=" +
                encodeURIComponent(message),

                "_blank"

            );

        }
    );

}
