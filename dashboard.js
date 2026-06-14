const table = document.getElementById("volunteerTable");

async function loadVolunteers() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/volunteers"
        );

        const volunteers = await response.json();

        table.innerHTML = "";

        // Dashboard Statistics

        document.getElementById("totalCount").innerText =
            volunteers.length;

        document.getElementById("approvedCount").innerText =
            volunteers.filter(
                volunteer => volunteer.status === "Approved"
            ).length;

        document.getElementById("pendingCount").innerText =
            volunteers.filter(
                volunteer => volunteer.status === "Pending"
            ).length;

        volunteers.forEach(volunteer => {

            table.innerHTML += `
            
            <tr>

                <td>${volunteer.name}</td>

                <td>${volunteer.email}</td>

                <td>${volunteer.college}</td>

                <td>${volunteer.status}</td>

                <td>

                    <button onclick="approveVolunteer('${volunteer._id}')">
                        Approve
                    </button>

                    <button onclick="deleteVolunteer('${volunteer._id}')">
                        Delete
                    </button>

                </td>

            </tr>

            `;
        });

    } catch (error) {

        console.log(error);

    }
}

async function approveVolunteer(id) {

    try {

        await fetch(
            `http://localhost:5000/api/volunteers/approve/${id}`,
            {
                method: "PUT"
            }
        );

        loadVolunteers();

    } catch (error) {

        console.log(error);

    }
}

async function deleteVolunteer(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this volunteer?");

    if (!confirmDelete) return;

    try {

        await fetch(
            `http://localhost:5000/api/volunteers/${id}`,
            {
                method: "DELETE"
            }
        );

        loadVolunteers();

    } catch (error) {

        console.log(error);

    }
}

function searchVolunteer() {

    const input =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll("#volunteerTable tr");

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        row.style.display =
            text.includes(input)
                ? ""
                : "none";

    });
}

loadVolunteers();