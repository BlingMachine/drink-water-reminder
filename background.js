
// this will run in the background 
// background scripts keep running even when the popup is closed

// TAKE USER INPUT TO SET ALARM INTERVAL
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === "setAlarm") {
        let interval = request.interval;

        //clear existing alarm
        chrome.alarms.clear("drinkWaterAlarm", () => {
            console.log("Existing alarm cleared. Setting new alarm for every", interval, "minutes");

            chrome.alarms.create("drinkWaterAlarm", {
                delayInMinutes: interval,
                periodInMinutes: interval
            });
        });
    }
});

// LISTENS FOR ALARMS AND SENDS NOTIFICATIONS
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "drinkWaterAlarm") {
        console.log("Alarm fired!!! Attempting to create notification...");

        // CREATE notification
        chrome.notifications.create(
            // notificationID
            "drinkWaterNotification",
            // notification specifics and details
            {
            type: "basic",
            title: "Drink Water!",
            iconUrl: chrome.runtime.getURL("images/icon-128.png"),
            message: "CHUG! CHUG! CHUG!"
            },
            // callback
            function(notificationID) {
                if (chrome.runtime.lastError) {
                    console.error("Notification error:", chrome.runtime.lastError);
                } else {
                    console.log("Notification created with ID:", notificationID); 
                }
            } 
        );
    }
});

// store that alarm interval in storage