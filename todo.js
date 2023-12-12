function updateCurrentDateTime() {
    var currentDateTimeElement = document.getElementById('currentDateTime');
    var currentDayOfWeekElement = document.getElementById('currentDayOfWeek');
    var currentDateTime = new Date();
    var hours = currentDateTime.getHours();
    var minutes = currentDateTime.getMinutes();
    var seconds = currentDateTime.getSeconds();
    var day = currentDateTime.getDate();
    var month = currentDateTime.getMonth() + 1; // Months are zero-based
    var dayOfWeek = currentDateTime.toLocaleDateString('en-US', { weekday: 'short' });

    var amOrPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;


    minutes = (minutes < 10 ? '0' : '') + minutes;
    seconds = (seconds < 10 ? '0' : '') + seconds;
    day = (day < 10 ? '0' : '') + day;
    month = (month < 10 ? '0' : '') + month;

    var formattedDayOfWeek =dayOfWeek + ' ' + day;
    var formattedDateTime =hours + ':' + minutes+ ' ' + amOrPm;

    currentDateTimeElement.textContent = formattedDateTime;
    currentDayOfWeekElement.textContent = formattedDayOfWeek;
}

setInterval(updateCurrentDateTime, 1000);

updateCurrentDateTime();