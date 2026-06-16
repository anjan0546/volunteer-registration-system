const table = document.getElementById("volunteerTable");

const API_URL =
"https://volunteer-registration-system-a3h1.onrender.com/api/volunteers";

async function loadVolunteers() {

    try {

        const response = await fetch(API_URL);

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

        console.error("Error loading volunteers:", error);

    }
}

async function approveVolunteer(id) {

    try {

        await fetch(
            `${API_URL}/approve/${id}`,
            {
                method: "PUT"
            }
        );

        loadVolunteers();

    } catch (error) {

        console.error("Error approving volunteer:", error);

    }
}

async function deleteVolunteer(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this volunteer?");

    if (!confirmDelete) return;

    try {

        await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );

        loadVolunteers();

    } catch (error) {

        console.error("Error deleting volunteer:", error);

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