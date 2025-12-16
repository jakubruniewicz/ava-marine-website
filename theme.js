function updateDarkIcon() {
    const btn = document.getElementById("darkToggle");
    if (!btn) return;

    btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

function toggleDark() {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );
    updateDarkIcon();
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }
    updateDarkIcon();
});
