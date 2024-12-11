

var md = window.markdownit();

function sendMassage() {
  let massage = document.getElementById("massegeTxt").value;
  // alert(massage);

 
    
    document.getElementById("massageDisplyUser").innerHTML += `
    <li class="d-flex justify-content-end mt-2">
        <div class=" text-white userSide p-2 me-2 message-bubble">
            <p class="mb-0 fs-6 text-break" >${massage}</p>
        </div>
        <div class="d-flex flex-row imgUser">
            <img src="img/prof_01.jpg" class="rounded-circle " width="40">
        </div>
    </li>`;
  console.log(massage);

  
  
  document.getElementById("massegeTxt").value = "";


const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "contents": [
    {
      "parts": [
        {
          "text": massage
        }
      ]
    }
  ]
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD98TtQ80--skLI9p9lmTeWTG9j3HVnN1A", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    


    console.log(result.candidates[0].content.parts[0].text); 

    

    document.getElementById("massageDisplyUser").innerHTML += `
    <li class="d-flex justify-content-start mt-2">
        <div class="d-flex flex-row imgAi ">
            <img src="img/prof_02.jpg" class="rounded-circle " width="40">
        </div>    
        <div class=" text-white aiSide p-2 me-2 message-bubble">
            <p class="mb-0 fs-6 text-break" > ${md.render(result.candidates[0].content.parts[0].text)} </p>
        </div>    
    </li> `;

    scrollToBottom();
  })
  .catch((error) => console.error(error));

}
// In script.js

function scrollToBottom() {
  console.log("Scrolling to the bottom...");
  
  const messageContainer = document.getElementById("massageDisplyUser");
  messageContainer.scrollTop = messageContainer.scrollHeight;
}