// ROYAL WEDDING COUNTDOWN

const weddingDate = new Date("December 25, 2026 09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);


// RSVP FORM

const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const phone = document.getElementById("guestPhone").value.trim();
    const attendance = document.getElementById("attendance").value;
    const guestCount = Number(document.getElementById("guestCount").value);

    const message = document.getElementById("rsvpMessage");

    if (name.length < 2) {
        message.textContent = "Please enter a valid name.";
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        message.textContent = "Enter a valid 10-digit phone number.";
        return;
    }

    if (guestCount < 1 || guestCount > 20) {
        message.textContent = "Guest count must be between 1 and 20.";
        return;
    }

    const response = {
        name: name,
        phone: phone,
        attendance: attendance,
        guests: guestCount,
        submittedAt: new Date().toISOString()
    };

    try {
        const savedResponses = JSON.parse(
            localStorage.getItem("weddingRSVPs") || "[]"
        );

        savedResponses.push(response);

        localStorage.setItem(
            "weddingRSVPs",
            JSON.stringify(savedResponses)
        );

        message.textContent = "Thank you! Your RSVP has been saved.";

        rsvpForm.reset();

    } catch (error) {
        message.textContent = "Unable to save response. Please try again.";
    }
});