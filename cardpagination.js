var currentpage = 1;

$(document).ready(function () {
    apiDetailsCall(1) //to show first page as default after reloading
});

$('#prev').click(function () {
    if (currentpage > 1) { //limiting function of prev to 1
        $('#firstSetInfo').show()
        currentpage = currentpage - 1;
        apiDetailsCall(currentpage);
    }
})

$('#next').click(function () {
    if (currentpage < 5) {
        $('#firstSetInfo').show()
        currentpage = currentpage + 1;
        apiDetailsCall(currentpage);
    }
})

function buttonrun(buttonNumValue) {
    $('#firstSetInfo').show()
    currentpage = buttonNumValue;
    apiDetailsCall(buttonNumValue);
}

const apiDetailsCall = async (pageNumber) => {
    $(function () {
        $.ajax({
            url: "https://picsum.photos/v2/list?page=" + pageNumber + "&limit=20",
            method: "GET",
            dataType: "json",
            success: function (data) {
                var str = "";
                for (var i = 0; i < data.length; i++) {                   
                    str += `
             <div class="card">
             <div class="card-image">
             <img width="100" height="200" src=${data[i].download_url} />
             </div>
             <div class="card-info">
                 <h3> ${data[i].id}</h3>
                 <p>${data[i].author}</p>
             </div>
             </div>
             `;
                }
                $("#firstSetInfo").html(str);
            },
            error: handleError, //set alert message if the api call went wrong
        });
    });
}

function handleError(request) {
    let msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message: " +
            request.responseJSON.Message + "\n";
    }
    alert(msg);
}




