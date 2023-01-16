let isOnline = true,
    interValid, timer = 10;

const Popup = document.querySelector(".popup");
wifiIcon = document.querySelector(".icon i");
wifiImg = document.querySelector(".icon img");
popupTitle = document.querySelector(".title");
popDesc = document.querySelector(".desc");
reconnectBtn = document.querySelector(".reconnect");

const checkConnection = async () => {

    try {
        // Try to fetch random data from the API. if the status code is between 200 and 30 , the network connection is considered online.

        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;

    } catch (error) {
        isOnline = false; //if there is an error , the connection considered offline.
    }
    timer = 10;
    clearInterval(interValid);
    handlePopup(isOnline);

}

const handlePopup = (status) => {

    if (status) { // if the status is true (online).
        Popup.classList.add("online");
        wifiImg.style.display = "none";
        wifiIcon.style.visibility = "visible";
        popupTitle.innerText = "Restored Connection";
        popDesc.innerHTML = "Your device is now succesfully connected to the internet.";
        return setTimeout(() => Popup.classList.remove("show"), 2000);
    }

    // if the status is false ( offline), ypdate the icon ,title and description accordingly.
    wifiImg.style.display = "inherit";
    wifiIcon.style.visibility = "hidden";
    popupTitle.innerText = "Lost Connection";
    popDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> secends.";

    Popup.className = "popup show";

    interValid = setInterval(() => { // set an inerval to decrease the timer by 1 every second.
        timer--;
        if (timer === 0) {
            checkConnection();
        }
        Popup.querySelector(".desc b").innerText = timer;
    }, 1000);

}




// only if isonline is true , check the connection status every 3 seconds.
setInterval(() => isOnline && checkConnection(), 3000);

reconnectBtn.addEventListener("click", checkConnection);

