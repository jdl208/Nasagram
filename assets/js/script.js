$(document).ready(function() {
    // NAV Buttons to slide in and out the requested section

    $("#apodNav").click(function() {
        $("#apodNav").addClass("active");
        $("#epicNav").removeClass("active");
        $("#epic").fadeOut("slow", function() {
            $("#marsNav").removeClass("active");
            $("#mars").fadeOut("slow", function() {
                $("#apod").fadeIn("slow");
            });
        });
    });
    $("#epicNav").click(function() {
        $("#epicNav").addClass("active");
        $("#apodNav").removeClass("active");
        $("#apod").fadeOut("slow", function() {
            $("#marsNav").removeClass("active");
            $("#mars").fadeOut("slow", function() {
                $("#epic").fadeIn("slow");
            });
        });
    });
    $("#marsNav").click(function() {
        $("#marsNav").addClass("active");
        $("#apodNav").removeClass("active");
        $("#apod").fadeOut("fast", function() {
            $("#epicNav").removeClass("active");
            $("#epic").fadeOut("fast", function() {
                $("#mars").fadeIn("slow");
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

    $("#apodDate").change(function() {
        getApod(function(data) {
            document.getElementById("apodDate").innerHTML = data.date;
            document.getElementById("apodTitle").innerHTML = data.title;
            document.getElementById("apodImg").src = data.url;
            document.getElementById("apodExplanation").innerHTML = data.explanation;
            document.getElementById("exampleModalLabel").innerHTML = data.title;
        });
    });

    // EPIC - Earth Polychromatic Imaging Camera

    function getLastEpic(cb) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "https://api.nasa.gov/EPIC/api/enhanced/images?api_key=wUAJ4mhB3TmjgWUsGryQlRMw59v3Wzbg3xXc8AlR");
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                cb(JSON.parse(this.responseText));
            }
        };
    }

    function getEpicInputDate(cb) {
        var xhr = new XMLHttpRequest();

        var epicDate = $("#epicDate").val();

        xhr.open("GET", "https://api.nasa.gov/EPIC/api/enhanced/date/" + epicDate + "?api_key=wUAJ4mhB3TmjgWUsGryQlRMw59v3Wzbg3xXc8AlR");
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                cb(JSON.parse(this.responseText));
            }
        };
    }

    getLastEpic(function(epicData) {
        var lastDate = epicData[0].date.split(" ");
        var lastAvailableDate = lastDate[0];
        document.getElementById("epicDate").setAttribute("value", lastAvailableDate);
        document.getElementById("epicDate").setAttribute("max", lastAvailableDate);
        document.getElementById("modalEpicDate").innerHTML = lastAvailableDate;
        try {
            document.getElementById("epicImg").src = "https://api.nasa.gov/EPIC/archive/enhanced/" + lastAvailableDate.replace(/-/g, "/") + "/png/" + epicData[0].image + ".png?api_key=wUAJ4mhB3TmjgWUsGryQlRMw59v3Wzbg3xXc8AlR";
        }
        catch (err) {
            console.log(err);
            document.getElementById("epicImg").src = "assets/images/no_Image.png";
        }
    });



    $("#epicDate").change(function() {
        getEpicInputDate(function(epicInputData) {
            var epicDate = $("#epicDate").val().replace(/-/g, "/");
            try {
                document.getElementById("epicImg").src = "https://api.nasa.gov/EPIC/archive/enhanced/" + epicDate + "/png/" + epicInputData[0].image + ".png?api_key=wUAJ4mhB3TmjgWUsGryQlRMw59v3Wzbg3xXc8AlR";
            }
            catch (err) {
                console.log(err);
                document.getElementById("epicImg").src = "assets/images/no_Image.png";

            }
        });
    });

    // MARS ROVERS
    function getMarsImg(cb) {
        var xhr = new XMLHttpRequest();

        var rover = $("#marsRover").val();
        var sol = $("#sol").val();

        xhr.open("GET", "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?sol=" + sol + "&api_key=wUAJ4mhB3TmjgWUsGryQlRMw59v3Wzbg3xXc8AlR");
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                cb(JSON.parse(this.responseText));
            }
        };
    }

    function getRover(cb) {
        var xhr = new XMLHttpRequest();

        var rover = $("#marsRover").val();

        xhr.open("GET", "https://api.nasa.gov/mars-photos/api/v1/manifests/" + rover + "?api_key=wUAJ4mhB3TmjgWUsGryQlRMw59v3Wzbg3xXc8AlR");
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                cb(JSON.parse(this.responseText));
            }
        };
    }

    getRover(function(roverData) {
        console.dir(roverData.photo_manifest);
        $("#sol").val(roverData.photo_manifest.max_sol);
        document.getElementById("sol").setAttribute("max", roverData.photo_manifest.max_sol);
        getMarsImg(function(marsData) {
            document.getElementById("marsImg").src = marsData.photos[0].img_src;
        });
    });

    $("#marsRover").change(function() {
        getRover(function(roverData) {
            $("#sol").val(roverData.photo_manifest.max_sol);
            document.getElementById("sol").setAttribute("max", roverData.photo_manifest.max_sol);
            getMarsImg(function(marsData) {
                document.getElementById("marsImg").src = marsData.photos[0].img_src;
            });
        });
    });
    $("#sol").change(function() {
        getRover(function(roverData) {
            getMarsImg(function(marsData) {
                                console.dir(marsData);

                document.getElementById("marsImg").src = marsData.photos[0].img_src;
            });
        });
    });
    $("#cameras").change(function() {
        getRover(function(roverData) {
            getMarsImg(function(marsData) {
                document.getElementById("marsImg").src = marsData.photos[0].img_src;
            });
        });
    });


});
