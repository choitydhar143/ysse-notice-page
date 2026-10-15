
const searchInput = document.getElementById("noticeSearch");
const categoryFilter = document.getElementById("categoryFilter");
const noticeCards = document.querySelectorAll(".notice-card");
const noticeCount = document.getElementById("noticeCount");
const emptyState = document.getElementById("emptyState");

function filterNotices() {
    const keyword = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    let visibleCount = 0;

    noticeCards.forEach(function(card) {
        const text = card.textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesKeyword = text.includes(keyword);
        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const shouldShow = matchesKeyword && matchesCategory;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }
    });

    noticeCount.textContent =
        visibleCount +
        (visibleCount === 1 ? " notice found" : " notices found");

    emptyState.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterNotices);
categoryFilter.addEventListener("change", filterNotices);

const noticeDialog = document.getElementById("noticeDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogCategory = document.getElementById("dialogCategory");
const dialogDate = document.getElementById("dialogDate");
const dialogDescription = document.getElementById("dialogDescription");

document.querySelectorAll(".details-button").forEach(function(button) {
    button.addEventListener("click", function() {
        dialogTitle.textContent = button.dataset.title;
        dialogCategory.textContent = button.dataset.category;
        dialogDate.textContent = "Published: " + button.dataset.date;
        dialogDescription.textContent = button.dataset.description;

        noticeDialog.showModal();
    });
});

document.getElementById("closeDialog").addEventListener("click", function() {
    noticeDialog.close();
});

noticeDialog.addEventListener("click", function(event) {
    if (event.target === noticeDialog) {
        noticeDialog.close();
    }
});
