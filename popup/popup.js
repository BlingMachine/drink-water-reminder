
// popup.js only runs when popup.html is opened
// won't repeat unless popup is reopened

// ensure user has notifications allowed--WORKS
chrome.notifications.getPermissionLevel(function(level) {
    if (level === "granted") {
        console.log("Notifications are allowed.");
    } else if (level === "denied") {
        console.log("Notifications are blocked by the user.");
    } else {
        console.log("Permission status is default (not explicitly set).");
    }
});

// send the user's input to background--WORKS
document.getElementById("btn").addEventListener("click", function() {
    let interval = parseInt(document.getElementById("num").value);

    if (!isNaN(interval) && interval > 0) {
        console.log("Setting notification timer to:", interval, "minutes");

        chrome.runtime.sendMessage({ action: "setAlarm", interval: interval });
    } else {
        console.log("Invalid input. Enter number greater than 0.");
    } 
});

// modify popup text to show current alarm interval--WORKS
// does not store that value
document.getElementById("btn").addEventListener("click", function() {
    let inputValue = document.getElementById("num").value;
    if (inputValue) {
        document.getElementById("displayText").textContent = 
            `The current alarm is set for every ${inputValue} minutes.`;
    }
});
