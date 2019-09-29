$(document).ready(function() {
    // NAV Buttons to slide in and out the requested section

    $("#apodNav").click(function() {
        $("#epic").slideUp("slow", function() {
            $("#mars").slideUp("slow", function() {
                $("#apod").slideDown("slow")
            });
        });
    });
    $("#epicNav").click(function() {
        $("#apod").slideUp("slow", function() {
            $("#mars").slideUp("slow", function() {
                $("#epic").slideDown("slow")
            });
        });
    });
    $("#marsNav").click(function() {
        $("#apod").slideUp("fast", function() {
            $("#epic").slideUp("fast", function() {
                $("#mars").slideDown("slow")
            });
        });
    });

    // Set variable to today's date

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var today = d.getFullYear() + '-' + (('' + month).length < 2 ? '0' : '') + month + '-' + (('' + day).length < 2 ? '0' : '') + day;
    document.getElementById("apodDate").setAttribute("max", today);
    document.getElementById("apodDate").setAttribute("value", today);

    // Astronomy Picture of the Day

    function getApod(cb) {
        let xhr = new XMLHttpRequest();

        var apodDate = $("#apodDate").val();

        xhr.open("GET", "https://api.nasa.gov/planetary/apod?date=" + apodDate + "&api_key=wUAJ4mhB3TmjgWUsGryQlRMw59v3Wzbg3xXc8AlR");
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                cb(JSON.parse(this.responseText));
            }
        };
    }

    getApod(function(data) {
        document.getElementById("apodDate").innerHTML = data.date;
        document.getElementById("apodTitle").innerHTML = data.title;
        document.getElementById("apodImg").src = data.url;
        document.getElementById("apodExplanation").innerHTML = data.explanation;
        document.getElementById("exampleModalLabel").innerHTML = data.title;

    });

    $("#apodDate").change(function(){
        getApod(function(data) {
            document.getElementById("apodDate").innerHTML = data.date;
            document.getElementById("apodTitle").innerHTML = data.title;
            document.getElementById("apodImg").src = data.url;
            document.getElementById("apodExplanation").innerHTML = data.explanation;
            document.getElementById("exampleModalLabel").innerHTML = data.title;
        });
    });

    // EPIC - Earth Polychromatic Imaging Camera

});
