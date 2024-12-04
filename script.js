let select = document.getElementsByClassName("select-heading")[0];
let arrow = select.querySelector(".arrow-icon");
let options = document.getElementsByClassName("options")[0];
let option = document.querySelectorAll(".option");
let selectText = document.querySelectorAll(".select-heading span")[0]

select.addEventListener("click", () => {
    options.classList.toggle("active-options");
    arrow.classList.toggle("rotate");
});

option.forEach((item) => {
    item.addEventListener("click", () => {
        selectText.innerText = item.innerText
        options.classList.toggle("active-options");
        arrow.classList.toggle("rotate");
    })
})

// Chat Bot

let prompt = document.getElementsByClassName("prompt")[0];
let chatBtn = document.querySelector(".input-area button");
let chatContainer = document.getElementsByClassName("chat-container")[0];
let h1 = document.querySelector(".h1");
let chatImg = document.getElementById("chat-bot-img");
let chatBox = document.querySelector(".chat-box");
let userMessage = "";

chatImg.addEventListener("click", () => {
    chatBox.classList.toggle("active-chat-box");
    if (chatBox.classList.contains("active-chat-box")) {
        chatImg.src = "cross.svg";
    }
    else {
        chatImg.src = "chatbot.svg";
    }
})


let Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDoAxvvGa409581Bjq-nlyMQLvEVGYdvTY";

async function generateApiResponse(aiChatBox) {
    const textElement = aiChatBox.querySelector(".text")
    try {
        const response = await fetch(Api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    "role": "user",
                    "parts": [{ text: `${userMessage}` }]
                }]
            })
        })
        const data = await response.json()
        const apiResponse = data?.candidates[0].content.parts[0].text.trim();
        textElement.innerText = apiResponse
    }
    catch (error) {
        console.log(error)
    }
    finally {
        aiChatBox.querySelector(".loading").style.display = "none"
    }
}

function createChatBox(html, className) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

function showLoading() {
    const html = `<p class="text"></p>
    <img src="load.gif" class="loading" width="50px">`
    let aiChatBox = createChatBox(html, "ai-chat-box")
    chatContainer.appendChild(aiChatBox)
    generateApiResponse(aiChatBox)
}

chatBtn.addEventListener("click", () => {
    h1.style.display = "none";
    userMessage = prompt.value;
    const html = `<p class="text"></p>`
    let userChatBox = createChatBox(html, "user-chat-box")
    userChatBox.querySelector(".text").innerText = userMessage
    chatContainer.appendChild(userChatBox)
    prompt.value = "";
    setTimeout(showLoading, 500)
})

// Virtual Assistant

let ai = document.querySelector(".virtual-assistant img");
let speakpage = document.querySelector(".speak-page");
let content = document.querySelector(".speak-page h1");


function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition();
recognition.onresult = (event) => {
    speakpage.style.display = "none";
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

function takeCommand(message) {
    if (message.includes("open") && (message.includes("chat"))) {
        speak("okay sir")
        chatBox.classList.add("active-chat-box")
    }
    else if (message.includes("close") && (message.includes("chat"))) {
        speak("okay sir")
        chatBox.classList.remove("active-chat-box")
    }
    else if (message.includes("back")) {
        speak("okay sir")
        window.open("http://127.0.0.1:3000/back.html", "_self");
    }
    else if (message.includes("chest")) {
        speak("okay sir")
        window.open("http://127.0.0.1:3000/chest.html", "_self");
    }
    else if (message.includes("leg")) {
        speak("okay sir")
        window.open("http://127.0.0.1:3000/leg.html", "_self");
    }
    else if (message.includes("biceps")) {
        speak("okay sir")
        window.open("http://127.0.0.1:3000/biceps-triceps.html", "_self");
    }
    else if (message.includes("triceps")) {
        speak("okay sir")
        window.open("http://127.0.0.1:3000/biceps-triceps.html", "_self");
    }
    else if (message.includes("shoulder")) {
        speak("okay sir")
        window.open("http://127.0.0.1:3000/shoulder.html", "_self");
    }
    else if (message.includes("all")) {
        speak("okay sir")
        window.open("http://127.0.0.1:3000/workout.html", "_self");
    }
    else if (message.includes("home")) {
        speak("okay sir")
        window.open("http://127.0.0.1:3000/index.html", "_self");
    }
}

ai.addEventListener("click", () => {
    recognition.start()
    speakpage.style.display = "flex";
})
