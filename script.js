/* =========================================
   CUP OF COMFORT - COMPLETE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
            });
        });
    }


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* =========================================
       MENU CARD SCROLL ANIMATION
    ========================================= */

    const menuCards =
        document.querySelectorAll(".menu-card");

    const cardObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry, index) {

                if (entry.isIntersecting) {

                    setTimeout(function () {

                        entry.target.classList.add("show");

                    }, index * 120);

                    cardObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );


    menuCards.forEach(function (card) {
        cardObserver.observe(card);
    });


    /* =========================================
       GENERAL SECTION ANIMATION
    ========================================= */

    const animatedSections =
        document.querySelectorAll(
            ".section, .about, .reservation-box, .contact-card, .offer"
        );

    const sectionObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    sectionObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    animatedSections.forEach(function (section) {
        sectionObserver.observe(section);
    });


    /* =========================================
       SEAT SELECTION
    ========================================= */

    const seats =
        document.querySelectorAll(".seat");

    let selectedSeat = null;


    seats.forEach(function (seat) {

        // Don't allow already reserved seats
        if (seat.classList.contains("reserved")) {
            return;
        }


        seat.addEventListener("click", function () {

            // Remove previous selection
            seats.forEach(function (item) {
                item.classList.remove("selected");
            });


            // Select current seat
            seat.classList.add("selected");

            selectedSeat = seat;


            // Get seat number
            const seatNumber =
                seat.dataset.seat ||
                seat.textContent.trim();


            // Update hidden/input seat field
            const seatInput =
                document.querySelector("#selectedSeat");

            if (seatInput) {
                seatInput.value = seatNumber;
            }


            // Update displayed selected seat
            const selectedSeatDisplay =
                document.querySelector(".selected-seat");

            if (selectedSeatDisplay) {
                selectedSeatDisplay.textContent =
                    "Selected Seat: " + seatNumber;
            }

        });

    });


    /* =========================================
       RESERVATION FORM
    ========================================= */

    const reservationForm =
        document.querySelector("#reservationForm");


    if (reservationForm) {

        reservationForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                // Get form values
                const nameInput =
                    document.querySelector(
                        "#name, #customerName"
                    );

                const dateInput =
                    document.querySelector("#date");

                const timeInput =
                    document.querySelector("#time");

                const guestsInput =
                    document.querySelector(
                        "#guests, #numberOfGuests"
                    );


                const name =
                    nameInput ? nameInput.value.trim() : "";

                const date =
                    dateInput ? dateInput.value : "";

                const time =
                    timeInput ? timeInput.value : "";

                const guests =
                    guestsInput ? guestsInput.value : "1";


                // Check seat
                if (!selectedSeat) {

                    alert(
                        "Please select an available seat first ☕"
                    );

                    return;
                }


                // Seat number
                const seatNumber =
                    selectedSeat.dataset.seat ||
                    selectedSeat.textContent.trim();


                /* =====================================
                   RESERVE SEAT
                ===================================== */

                selectedSeat.classList.remove("selected");
                selectedSeat.classList.add("reserved");


                // Prevent further clicking
                selectedSeat.style.pointerEvents = "none";


                /* =====================================
                   CONFIRMATION MESSAGE
                ===================================== */

                const confirmation =
                    document.querySelector(
                        ".confirmation"
                    );


                if (confirmation) {

                    confirmation.innerHTML = `
                        <div class="confirmation-content">

                            <div class="success-icon">
                                ✓
                            </div>

                            <h3>
                                Reservation Confirmed!
                            </h3>

                            <p>
                                Thank you ${name || "Guest"} ☕
                            </p>

                            <p>
                                Your seat <strong>${seatNumber}</strong>
                                has been reserved.
                            </p>

                            <p>
                                📅 ${date || "Selected Date"}
                                <br>
                                ⏰ ${time || "Selected Time"}
                                <br>
                                👥 ${guests} Guest(s)
                            </p>

                            <p>
                                We look forward to welcoming you
                                at Cup Of Comfort!
                            </p>

                        </div>
                    `;

                    confirmation.style.display = "block";

                    confirmation.classList.remove(
                        "confirmation-show"
                    );

                    void confirmation.offsetWidth;

                    confirmation.classList.add(
                        "confirmation-show"
                    );

                } else {

                    alert(
                        "☕ Reservation confirmed for Seat " +
                        seatNumber
                    );

                }


                /* =====================================
                   RESET FORM
                ===================================== */

                reservationForm.reset();

                selectedSeat = null;

            }

        );

    }


    /* =========================================
       BUTTON RIPPLE EFFECT
    ========================================= */

    document.querySelectorAll(".btn").forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (e) {

                    const ripple =
                        document.createElement("span");

                    ripple.classList.add("ripple");

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        e.clientX - rect.left;

                    const y =
                        e.clientY - rect.top;


                    ripple.style.left =
                        x + "px";

                    ripple.style.top =
                        y + "px";


                    button.appendChild(ripple);


                    setTimeout(function () {

                        ripple.remove();

                    }, 600);

                }
            );

        }
    );


    /* =========================================
       IMAGE HOVER EFFECT
    ========================================= */

    const aboutImage =
        document.querySelector(".about-image img");

    if (aboutImage) {

        aboutImage.addEventListener(
            "mouseenter",
            function () {

                this.style.transform =
                    "scale(1.06)";

            }
        );


        aboutImage.addEventListener(
            "mouseleave",
            function () {

                this.style.transform =
                    "scale(1)";

            }
        );

    }


    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    const navbar =
        document.querySelector("nav, .navbar, header");


    window.addEventListener(
        "scroll",
        function () {

            if (!navbar) return;


            if (window.scrollY > 50) {

                navbar.classList.add(
                    "navbar-scrolled"
                );

            } else {

                navbar.classList.remove(
                    "navbar-scrolled"
                );

            }

        }
    );


    /* =========================================
       CURRENT YEAR IN FOOTER
    ========================================= */

    const yearElement =
        document.querySelector("#year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =========================================
       DATE VALIDATION
    ========================================= */

    const dateField =
        document.querySelector("#date");

    if (dateField) {

        const today =
            new Date().toISOString().split("T")[0];

        dateField.setAttribute(
            "min",
            today
        );

    }


    /* =========================================
       WELCOME MESSAGE
    ========================================= */

    console.log(
        "☕ Welcome to Cup Of Comfort!"
    );

});
