document.addEventListener("DOMContentLoaded", function() {
    let boxes = document.querySelectorAll(".box");
    let tooltip = document.getElementById("tooltip");
   
    boxes.forEach(box => {
        box.addEventListener("mouseover", function(event) {
            let year = this.getAttribute("data-year");
            tooltip.innerHTML = `Brands: <b>${year}</b>`;
            tooltip.style.display = "block";
            tooltip.style.left = event.pageX + 10 + "px";
            tooltip.style.top = event.pageY + 10 + "px";
        });

        box.addEventListener("mousemove", function(event) {
            tooltip.style.left = event.pageX + 10 + "px";
            tooltip.style.top = event.pageY + 10 + "px";
        });

        box.addEventListener("mouseleave", function() {
            tooltip.style.display = "none";
        });
    });
    
});
document.addEventListener("DOMContentLoaded", function () {
    const salesSection = document.getElementById("sales-section");
    const ctx = document.getElementById("salesChart").getContext("2d");

    // Sales Chart Data
    let salesChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                "Linezolid", "Meropenem", "Trimethoprim-Sulfamethoxazole", "Doxycycline",
                "Azithromycin", "Cefixime", "Ciprofloxacin", "Amoxicillin"
            ],
            datasets: [{
                label: "Units Sold",
                data: [20, 50, 150, 200, 250, 300, 400, 500],
                backgroundColor: [
                    "#FFCCBC", "#FFAB91", "#FF8A65", "#FF7043",
                    "#FF5722", "#F4511E", "#E64A19", "#D84315"
                ],
                borderRadius: 8
            }]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.data[context.dataIndex]} units sold`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { display: false }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });

    // Scroll Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                salesSection.classList.add("active");
            }
        });
    }, { threshold: 0.3 });

    observer.observe(salesSection);
});

document.addEventListener("DOMContentLoaded", function () {
    const dosageSection = document.getElementById("dosage-section");
    const ctxDosage = document.getElementById("dosageChart").getContext("2d");

    // Dosage Data
    const labels = [
        "Vancomycin", "Meropenem", "Trimethoprim + Sulfamethoxazole",
        "Linezolid", "Ciprofloxacin + Tinidazole", "Azithromycin",
        "Amoxicillin + Clavulanic Acid", "Cefixime + Ofloxacin", "Doxycycline"
    ];
    const lowestDosage = [250, 500, 400, 300, 200, 300, 400, 150, 100]; // Example data
    const highestDosage = [2500, 1500, 1200, 800, 700, 500, 1300, 400, 300]; // Example data

    // Find max dosage to correctly scale X-axis
    const maxDosage = Math.max(...highestDosage) * 1.1; // Add 10% padding

    let dosageChart = new Chart(ctxDosage, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Lowest mg",
                    data: lowestDosage,
                    backgroundColor: "#174A7E", // Dark Blue
                    borderRadius: 6
                },
                {
                    label: "Highest mg",
                    data: highestDosage,
                    backgroundColor: "#12342", // Orange
                    borderRadius: 6
                }
            ]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.dataset.data[context.dataIndex]} mg`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    beginAtZero: true,
                    max: maxDosage, // ✅ Dynamic max value for correct scaling
                    ticks: {
                        stepSize: 500 // Ensure readable increments
                    },
                    grid: { display: true }
                },
                y: {
                    stacked: true,
                    grid: { display: false }
                }
            }
        }
    });

    // Scroll Animation for Dosage Chart
    const observerDosage = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                dosageSection.classList.add("active");
            }
        });
    }, { threshold: 0.3 });

    observerDosage.observe(dosageSection);
});


const container = document.querySelector(".container");
const tooltip = document.getElementById("tooltip");

// Create circles dynamically
antibiotics.forEach((drug) => {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = drug.name;

    // Show tooltip on hover
    circle.addEventListener("mouseenter", (event) => {
        tooltip.innerHTML = `<strong>${drug.name}</strong>
                             <p><b>Common:</b> ${drug.common}</p>
                             <p><b>Severe:</b> ${drug.severe}</p>`;
        tooltip.style.display = "block";
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    });

    // Move tooltip with cursor
    circle.addEventListener("mousemove", (event) => {
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    });

    // Hide tooltip when not hovering
    circle.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });

    container.appendChild(circle);
});

