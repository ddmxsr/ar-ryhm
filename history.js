loadHistoryItems()

function loadHistoryItems() {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', 'history.json', true);
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == "200") {
            var json = JSON.parse(request.responseText);
            addHistoryItemsToTimeTable(json);
        }
    }
    request.send(null);
}

function addHistoryItemsToTimeTable(json) {
    var timelineItems = document.getElementById("timeline-items");

    json.items.forEach(item => {
        addYearToTimeTable(timelineItems, item.years)
        item.events.forEach((item, index) => {
            addEventToTimeTable(timelineItems, item, index % 2 == 0);
        });
    });
}

function addYearToTimeTable(timelineItems, year) {
    var yearComponent = document.createElement('div');
    yearComponent.classList.add("timeline-year");
    yearComponent.innerHTML = `<span class="timeline-year-year">` + year + `</span>
                                <div class="timeline-year-divider"></div>`;
    timelineItems.appendChild(yearComponent);
}

function addEventToTimeTable(timelineItems, event, isAlignEnd = false) {
    var eventComponent = document.createElement('div');
    eventComponent.classList.add("timeline-item");
    if (isAlignEnd) eventComponent.classList.add("align-end");
    eventComponent.innerHTML = `
        <div class="property-card">
            <div class="property-image">
                <img alt="" src="`+ event.image + `"></img>
            </div>
        
            <div class="property-description">
                <h5>` + event.label + `</h5>
                <p>`+ event.message + `</p>
            </div>
        </div>
    `;
    timelineItems.appendChild(eventComponent);
}
