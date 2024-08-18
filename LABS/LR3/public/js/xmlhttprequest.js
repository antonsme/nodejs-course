const requestUrl = "http://localhost:5000/api/name"

const xhr = new XMLHttpRequest()

xhr.open("GET", requestUrl, true)

xhr.onload = () => {
    const jsonText = xhr.responseText
    console.log(typeof jsonText)
    console.log(jsonText)

    const clientInfo = document.createElement("p")
    clientInfo.innerHTML = jsonText
    document.body.appendChild(clientInfo)

}



xhr.send()