
// this will run in the background 
// background scripts keep running even when the popup is closed

<<<<<<< HEAD

// // do i need these?
// chrome.runtime.onInstalled.addListener(() => {
//     console.log("Extension installed, creating default alarm.");
//     chrome.alarms.create("drinkWaterAlarm", {
//         delayInMinutes: 1,
//         periodInMinutes: 1
//     });
// });

// chrome.runtime.onStartup.addListener(() => {
//     console.log("Extension restarted, re-creating alarm.");
//     chrome.alarms.create("drinkWaterAlarm", {
//         delayInMinutes: 1,
//         periodInMinutes: 1
//     });
// });


// // CREATE default alarm
// chrome.alarms.create("drinkWaterAlarm", {
//     delayInMinutes: 1,
//     periodInMinutes: 1,
// });

=======
>>>>>>> f05394b (initial commit)
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

<<<<<<< HEAD

// store that alarm interval in storage



=======
// store that alarm interval in storage
>>>>>>> f05394b (initial commit)
