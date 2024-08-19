
const factorial = (value) => {


    if (value === 0) {
        return 1;
    } else {
        return value * factorial(value - 1);
    }


}


const getFactFunc = async()=>{
    


}

const result = document.createElement("p")
result.innerHTML = `результат:${message}`
console.log(message)

document.body.appendChild(result)