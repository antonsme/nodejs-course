$(document).ready(function () {
    $.ajax({
        url: "http://localhost:5000/api/name",
        dataType: 'html',
        success: function (data) {
            const pEl = document.createElement("p")
            pEl.innerHTML = data
            document.body.appendChild(pEl)
        }
    });
});