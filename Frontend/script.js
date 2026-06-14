const form = document.getElementById("volunteerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const volunteerData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        college: document.getElementById("college").value,
        skills: document.getElementById("skills").value,
        availability: document.getElementById("availability").value
    };

    const response = await fetch(
        "http://localhost:5000/api/volunteers/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(volunteerData)
        }
    );

    const data = await response.json();

    document.getElementById("message").innerHTML =
        data.message;
});