$(document).ready(function() {

    // Initialize Materialize modal component
    $('.modal').modal();

    setInterval(function(){ $('.sub-header').fadeOut() }, 5000);
   // Stores loading animation in variable
    var poro = '<img src="poro-gif.gif" />' + '<br />' + '<p><b>Loading Poros</b></p>';

    function addData(chart, label, data, color) {
        chart.data.labels.push(label);
        chart.data.datasets[0].backgroundColor.push(color);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);


    });
        chart.update();
    }
    function removeData(chart) {
        chart.data.labels.length = 0;
        chart.data.datasets.forEach((dataset) => {
            dataset.data.length = 0;
        });
        chart.update();
    }

    // Display data from database
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    // Store the data render in a function for later use
    function dataRender() {
        $.ajax({
            url: './data.php',
            type: 'get',
            dataType: 'JSON',
            success: function (data) {
                var html = '';
                // Loop through JSON and put data into HTML tags
                $.each(data, function (i, item) {
                    html += '<div class="champion-list row container">';
                    html += '<h1 class="title col l12 m12 s12">' + item.Title + '</h1>';
                    html += '<hr />';
                    html += '<p class="description l12 m12 s12">' + item.Description + '</p>';
                    html += '<a id="delete-button" type="submit" href="#" class="col l1 push-l11 waves-effect waves-light btn hvr-buzz">Delete</a>';
                    html += '</div>';

                });
                // inserts data inside the insert ID on the HTML page
                $("#insert").html(html);

            },

            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log("Details: " + desc + "\nError:" + err);
            }
        });
    }
    let numberofNames = '';
    let storedNames = [];
    let randomColors = '';

    function storeNames() {
        $.ajax({
            url: './data.php',
            type: 'get',
            dataType: 'JSON',
            success: function (data) {
                var names = [];
                // Loop through JSON and put data into HTML tags
                $.each(data, function (i, item) {
                    names.push(item.Title);
                    storedNames.push(item.Title);
                    numberofNames = storedNames.length;
                    randomColors = '#'+Math.floor(Math.random()*16777215).toString(16);
                    addData(chart, item.Title, numberofNames - numberofNames + 1, randomColors);





                });



            },

            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log("Details: " + desc + "\nError:" + err);
            }
        });
    }


    // Filters results by Name
    function orderbyNAME() {
        $.ajax({
            url: './orderbyNAME.php',
            type: 'get',
            dataType: 'JSON',
            success: function (data) {
                var html = '';
                // Loop through JSON and put data into HTML tags
                $.each(data, function (i, item) {
                    html += '<div class="champion-list row container">';
                    html += '<h1 class="title col l12 m12 s12">' + item.Title + '</h1>';
                    html += '<hr />';
                    html += '<p class="description l12 m12 s12">' + item.Description + '</p>';
                    html += '<a id="delete-button" type="submit" href="#" class="col l1 push-l11 waves-effect waves-light btn hvr-buzz">Delete</a>';
                    html += '</div>';
                });
                // insert sorted data inside the insert ID on the HTML page
                $("#insert").html(html);


            },

            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log("Details: " + desc + "\nError:" + err);
            }
        });
    }

    // Filter results by popularity
    function orderbyPOPULAR() {
        $.ajax({
            url: './orderbyPOPULAR.php',
            type: 'get',
            dataType: 'JSON',
            success: function (data) {
                var html = '';
                // Loop through JSON and put data into HTML tags
                $.each(data, function (i, item) {
                    html += '<div class="champion-list row container">';
                    html += '<h1 class="title col l12">' + item.Title + '</h1>';
                    html += '<p class="description l12">Is the most ranted about champion currenty! Are they OP? Annoying? Will their popularity last?</p>';
                    html += '</div>';
                });
                // insert sorted data inside the insert ID on the HTML page
                $("#insert").html(html);


            },

            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log("Details: " + desc + "\nError:" + err);
            }
        });
    }


    // Data for Chart
    function storeData() {
        $.ajax({
            url: './data.php',
            type: 'get',
            dataType: 'JSON',
            success: function (data) {

                // Loop through JSON and put data into HTML tags
                $.each(data, function (i, item) {

                    storedData = item.Title;
                    storedData.toString();
                });

                // console.log(storedData);


            },

            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log("Details: " + desc + "\nError:" + err);
            }
        });
    }
    var storedData = '';
    // Call render data function when button is clicked
    $('#get-data').on('click', function (e) {

        e.preventDefault();
        // Remove loading button so user can't click again
        $('#get-data').fadeOut(300);
        $('.filter-button').css('z-index', '1');
        // Attach loading animation before ajax executes
        $('#loading').append(poro);
        // Run ajax
        dataRender();

        // Remove loading animation after ajax completes
        $('#loading').fadeOut(300);

    });

    // Call dataRender when button is clicked
    $('#filter-recent').on('click', function (e) {

        e.preventDefault();
        // Remove loading button so user can't click again
        $('#get-data').fadeOut(300);
        // Checks if loading animation is present, if not, attach it, if it is fade it back in
        if ($('#loading').children()){
            $('#loading').fadeIn(1);
        } else {
            $('#loading').append(poro)
        }
        // Empty current data
        $("#insert").empty();
        // Run ajax
        dataRender();
        // Remove loading animation after ajax completes
        $('#loading').fadeOut(300);

    });

    // Call orderbyNAME() when button is clicked
    $('#filter-name').on('click', function (e) {

        e.preventDefault();
        // Remove loading button so user can't click again
        $('#get-data').fadeOut(300);
        // Checks if loading animation is present, if not, attach it, if it is fade it back in
        if ($('#loading').children()){
            $('#loading').fadeIn(1);
        } else {
            $('#loading').append(poro)
        }
        // Empty current data
        $("#insert").empty();
        // Run ajax
        orderbyNAME();
        // Remove loading animation after ajax completes
        $('#loading').fadeOut(300);

    });

    // Display the most popular name
    $('#filter-popular').on('click', function (e) {

        e.preventDefault();
        // Remove loading button so user can't click again
        $('#get-data').fadeOut(300);
        // Checks if loading animation is present, if not, attach it, if it is fade it back in
        if ($('#loading').children()){
            $('#loading').fadeIn(1);
        } else {
            $('#loading').append(poro)
        }
        // Empty current data
        $("#insert").empty();
        // Run ajax
        orderbyPOPULAR();
        // Remove loading animation after ajax completes
        $('#loading').fadeOut(300);

    });

    // Add into database
    $('#submit-rant').on('click', function(e){

        // Store value of user inputed champion name
        var name = $('#Title').val();
        // Store value of user inputed description
        var description = $('#Description').val();
        $.ajax({
            // Pass var name to the Title key and var description to the Description key in the database
            data: {Title:name, Description:description},
            url: './insert.php',
            type: 'post',
            success: function (data) {

                dataRender();
            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log("Details: " + desc + "\nError:" + err);
            }
        })
        Materialize.toast('Rant Submitted!', 4000, 'button-styles');
    })

    // Delete data from database
    $('body').on('click', "#delete-button", function(){
        var description = $(this).prev().text();
        var title = $(this).prev().prev().text();
        var containedData = $(this).parent();
        console.log($(this).prev().text());
        $.ajax ({
            url: './delete.php',
            type: 'post',
            data: title,
            success: function (Title) {
                console.log(Title);
                containedData.fadeOut(500);
            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log("Details: " + desc + "\nError:" + err);
            }
        })
        Materialize.toast('Rant Deleted!', 4000, 'delete-toast');
    })

    $('#chart-button').on('click', function(){
        removeData(chart);
        storeNames();
        // storeData();
        // numberofNames = storedNames.length;
        // storedNames.toString();
        // console.log(numberofNames);
        // console.log(storedNames);
        // addData(chart, storedNames, storedNames.length);
    })


    // ******************************************************
    // Chart Scripts

   // Doughnut chart

    var chart = new Chart(document.getElementById("myChart"), {
        type: 'doughnut',
        responsive: true,
        data: {
            labels: [],
            datasets: [
                {
                    label: "Population (millions)",
                    backgroundColor: [],
                    data: []
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Champions currently being ranted about!'
            }
        }
    });

});