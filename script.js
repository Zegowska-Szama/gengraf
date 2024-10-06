let employees = [];

document.getElementById('addEmployeeButton').addEventListener('click', function() {
    const employeeName = document.getElementById('employeeName').value;
    const availableDays = document.getElementById('availableDays').value.split(',').map(day => day.trim());
    const roles = document.getElementById('roles').value.split(',').map(role => role.trim());

    employees.push({ name: employeeName, availableDays, roles });

    document.getElementById('employeeName').value = '';
    document.getElementById('availableDays').value = '';
    document.getElementById('roles').value = '';

    alert('Pracownik dodany.');
});

document.getElementById('generateButton').addEventListener('click', function() {
    const schedule = initializeSchedule();

    // Przydzielanie ról
    employees.forEach(employee => {
        employee.availableDays.forEach(day => {
            employee.roles.forEach(role => {
                if (schedule[day] && schedule[day][role] === '-') {
                    schedule[day][role] = employee.name;
                }
            });
        });
    });

    // Generowanie tabeli
    let output = '<table><tr><th>Dzień</th><th>Hotdogi</th><th>Bułki</th><th>Kasa</th><th>Sprzątanie</th></tr>';

    const daysOfWeek = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'];
    daysOfWeek.forEach(day => {
        output += `<tr><td>${day.charAt(0).toUpperCase() + day.slice(1)}</td>`;
        output += `<td>${schedule[day]['hotdog'] ? schedule[day]['hotdog'] : '-'}</td>`;
        output += `<td>${schedule[day]['bulki'] ? schedule[day]['bulki'] : '-'}</td>`;
        output += `<td>${schedule[day]['kasa'] ? schedule[day]['kasa'] : '-'}</td>`;
        output += `<td>${schedule[day]['sprzatanie'] ? schedule[day]['sprzatanie'] : '-'}</td>`;
        output += '</tr>';
    });
    output += '</table>';

    document.getElementById('scheduleOutput').innerHTML = output;
});

// Funkcja resetująca grafik
document.getElementById('resetButton').addEventListener('click', function() {
    employees = [];
    document.getElementById('scheduleOutput').innerHTML = '';
    alert('Grafik został zresetowany.');
});

function initializeSchedule() {
    return {
        'poniedziałek': { hotdog: '-', bulki: '-', kasa: '-', sprzatanie: '-' },
        'wtorek': { hotdog: '-', bulki: '-', kasa: '-', sprzatanie: '-' },
        'środa': { hotdog: '-', bulki: '-', kasa: '-', sprzatanie: '-' },
        'czwartek': { hotdog: '-', bulki: '-', kasa: '-', sprzatanie: '-' },
        'piątek': { hotdog: '-', bulki: '-', kasa: '-', sprzatanie: '-' }
    };
}
