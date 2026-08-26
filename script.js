/* =========================================
   CUP OF COMFORT
   RESERVATION SYSTEM
========================================= */


/* ================= DATE ================= */

const dateInput = document.getElementById("date");

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;


/* ================= SEAT SELECTION ================= */

const seats = document.querySelectorAll(
    ".seat:not(.reserved)"
);

const selectedSeat = document.getElementById(
    "selectedSeat"
);


seats.forEach(function (seat) {

    seat.addEventListener("click", function () {

        // Remove previously selected seat
        seats.forEach(function (item) {

            item.classList.remove("selected");

        });


        // Select current seat
        seat.classList.add("selected");


        // Store seat number
        selectedSeat.value = seat.textContent.trim();

    });

});


/* ================= RESERVATION FORM ================= */

const reservationForm =
    document.getElementById("reservationForm");


reservationForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /* Get values */

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const date =
            document.getElementById("date").value;

        const time =
            document.getElementById("time").value;

        const seat =
            selectedSeat.value;


        /* Check seat */

        if (seat === "") {

            alert(
                "Please select an available seat first."
            );

            return;

        }


        /* Check phone number */

        if (!/^[0-9]{10}$/.test(phone)) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            return;

        }


        /* Generate booking ID */

        const bookingId =
            "COC-" +
            Math.floor(
                10000 + Math.random() * 90000
            );


        /* Confirmation box */

        const confirmation =
            document.getElementById("confirmation");


        confirmation.style.display = "block";


        confirmation.innerHTML = `

            <h3>
                🎉 Reservation Confirmed!
            </h3>

            <p>
                Thank you,
                <strong>${name}</strong>!
            </p>

            <br>

            <p>
                <strong>Booking ID:</strong>
                ${bookingId}
            </p>

            <p>
                <strong>Seat:</strong>
                ${seat}
            </p>

            <p>
                <strong>Date:</strong>
                ${date}
            </p>

            <p>
                <strong>Time:</strong>
                ${time}
            </p>

            <br>

            <p>
                ☕ We are waiting for you at
                <strong>Cup Of Comfort!</strong>
            </p>

        `;


        /* Make selected seat reserved */

        const selectedElement =
            document.querySelector(
                ".seat.selected"
            );


        if (selectedElement) {

            selectedElement.classList.remove(
                "selected"
            );

            selectedElement.classList.add(
                "reserved"
            );

            selectedElement.disabled = true;

        }


        /* Reset form */

        reservationForm.reset();

        selectedSeat.value = "";


        /* Scroll to confirmation */

        confirmation.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* ================= MENU CARD ANIMATION ================= */

const menuCards =
    document.querySelectorAll(".menu-card");


menuCards.forEach(function (card) {

    card.addEventListener(
        "mouseenter",
        function () {

            card.style.transform =
                "translateY(-6px)";

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.style.transform =
                "translateY(0)";

        }
    );

});