const requestUrl = "http://localhost:5000/api/name"


const addResponse = async () => {
    const data = await fetch(requestUrl, {
        method: "GET",
        headers: {
            "Content-Type": "text/plain"
        }
    })

    const text = await data.text()
    console.log(text)

    const textEl = document.createElement("p")
    textEl.innerHTML = text

    document.body.appendChild(textEl)


    return text


}

addResponse()