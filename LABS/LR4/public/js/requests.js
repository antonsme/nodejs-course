



document.getElementById("get").addEventListener("click", () => {
    sendGetRes()
    alert("hello")
})




const sendGetRes = async () => {

    const response = await fetch("http://localhost:3500//api/db")
    return await response.json()


}

// const sendPostRes = async()=>{

//     const response = await fetch("http://localhost:3500//api/db" , {
//         method: "POST",
//         body:
//     })
// }


