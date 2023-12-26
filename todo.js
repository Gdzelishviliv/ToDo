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
function addItem() {
    const input = document.getElementById("inputi");
    const inputValue = input.value.trim();

    if (inputValue.length > 1) {
        const li = document.createElement('li');
        const checkboxDiv = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'button';
        checkbox.value = ''; // Set a value to make the button visible
        const removeBtn = document.createElement('button');
        removeBtn.innerText = '';
        removeBtn.onclick = function () {
            li.remove();
            updateLocalStorage();
        };

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(removeBtn);

        li.appendChild(document.createTextNode(inputValue));
        li.appendChild(checkboxDiv);

        checkbox.addEventListener('click', function () {
            checkbox.classList.toggle('clicked');
            updateLocalStorage();
        });

        document.getElementById("todoList").appendChild(li);
        updateLocalStorage();

        input.value = "";
    }
}

function updateLocalStorage() {
    const todoListItems = document.querySelectorAll("#todoList li");
    const todoListArray = Array.from(todoListItems).map(item => item.outerHTML);
    localStorage.setItem('todoList', JSON.stringify(todoListArray));
}

function loadItemsFromLocalStorage() {
    const storedList = localStorage.getItem('todoList');
    if (storedList) {
        const todoList = document.getElementById("todoList");
        todoList.innerHTML = JSON.parse(storedList).join('');
        addEventListenersToItems();
    }
}

function addEventListenersToItems() {
    const items = document.querySelectorAll("#todoList li");
    items.forEach(item => {
        const checkbox = item.querySelector('input[type="button"]');
        checkbox.addEventListener('click', function () {
            checkbox.classList.toggle('clicked');
            updateLocalStorage();
        });

        const removeBtn = item.querySelector('button');
        removeBtn.addEventListener('click', function () {
            item.remove();
            updateLocalStorage();
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    loadItemsFromLocalStorage();
});

document.addEventListener('DOMContentLoaded', function () {
    updateCurrentDateTime();
});

function addItem() {
    const input = document.getElementById("inputi");
    const inputValue = input.value.trim();

    if (inputValue.length > 1) {
        const li = document.createElement('li');
        const containerDiv = document.createElement('div');
        const textDiv = document.createElement('div'); 
        const dateDiv = document.createElement('div'); 
        const checkboxDiv = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'button';
        checkbox.value = ''; 
        const removeBtn = document.createElement('button');
        removeBtn.innerText = '';
        removeBtn.onclick = function () {
            li.remove();
            updateLocalStorage();
        };

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(removeBtn);

        const currentDate = new Date();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        const formattedDate = `Today at ${formatTime(hours, minutes)} ${amOrPm}`;

        dateDiv.textContent = formattedDate;
        dateDiv.classList.add('item-date');

        textDiv.appendChild(document.createTextNode(inputValue));

        containerDiv.appendChild(textDiv);
        containerDiv.appendChild(dateDiv);

        li.appendChild(containerDiv);
        li.appendChild(checkboxDiv);

        checkbox.addEventListener('click', function () {
            checkbox.classList.toggle('clicked');
            updateLocalStorage();
        });

        document.getElementById("todoList").appendChild(li);
        updateLocalStorage();

        input.value = "";
    }
}

function formatTime(hours, minutes) {
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}
