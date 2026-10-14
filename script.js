const farePerPerson = 17;
let payments = [];


function calculateFare(passengers, farePerPerson) {
    return passengers * farePerPerson;
}

function calculateChange(amountPaid, fareDue) {
    return amountPaid - fareDue;
}

function createPayment(row, amountPaid, passengers) {
    const fareDue = calculateFare(passengers, farePerPerson);
    const change = calculateChange(amountPaid, fareDue);

    return {
        id: Date.now(),
        row: row,
        amountPaid: amountPaid,
        passengers: passengers,
        fareDue: fareDue,
        change: change,
        changeGiven: change === 0
    };
}

function toNumber(value) {
return value.trim() === '' ? NaN : Number(value);
}

function validatePayment(row, amountPaid, passengers) {
    if (Number.isNaN(row) || Number.isNaN(amountPaid) || Number.isNaN(passengers)) {
        return 'Please fill in all 3 fields.';
    }
    if (!Number.isInteger(row) || row < 1) {
        return 'Row must be a positive integer.';
    }
    if (!Number.isInteger(passengers) || passengers < 1) {
        return 'Passengers must be a whole number, 1 or higher.';
    }
    if (amountPaid <= 0) {
        return 'Amount paid must be more than 0.';
    }
    const fareDue = calculateFare(passengers, farePerPerson);
    if (amountPaid < fareDue) {
        return 'Short by R' + (fareDue - amountPaid) + '. The fare for ' + passengers + ' is R' + fareDue + '.';
    }
    return null;
}

function showError(message) {
    const box = document.getElementById('error-box');
    box.textContent = message;
    box.classList.remove('d-none');
}

function hideError() {
    document.getElementById('error-box').classList.add('d-none');
}

function markChangeGiven(id) {
    const payment = payments.find(function (p) {
        return p.id === id;
    });
    if (payment) {
        payment.changeGiven = true;
    }
}

function getSummary() {
    const totalCollected = payments.reduce(function (sum, p) { return sum + p.fareDue; }, 0);
    const passengersPaids = payments.reduce(function (sum, p) { return sum + p.passengers; }, 0);
    const changeTotal = payments.reduce(function (sum, p) { return sum + p.change; }, 0);
    const changeOutstanding = payments
        .filter(function (p) { return !p.changeGiven; })
        .reduce(function (sum, p) { return sum + p.change; }, 0);

    return { totalCollected, passengersPaids, changeTotal, changeOutstanding };
}

function renderSummary() {
    const summary = getSummary();
    document.getElementById('total-collected').textContent = 'R' + summary.totalCollected;
    document.getElementById('passengers-paid').textContent = summary.passengersPaids;
    document.getElementById('change-total').textContent = 'R' + summary.changeTotal;
    document.getElementById('change-outstanding').textContent = 'R' + summary.changeOutstanding;
}

function renderPayments () {
    const tbody = document.getElementById('payments-body');
    tbody.innerHTML = '';

if (payments.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">No payments recorded.</td></tr>';
}
    payments.forEach(function (payment) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<th scope="row">${payment.row}</th>
                        <td>${payment.passengers}</td>
                        <td>${payment.amountPaid}</td>
                        <td>${payment.fareDue}</td>
                        <td>${payment.change}</td>
                        <td>${payment.changeGiven 
                            ? '<span class="badge bg-success">Settled</span>'
                            : `<button class="btn btn-sm btn-warning" data-id="${payment.id}">Change given</button>`}
           </td>`;
          tbody.appendChild(tr);
    });
    renderSummary();
}

document.getElementById('payments-body').addEventListener('click', function (event) {
    const button = event.target.closest('button[data-id]');
if (!button) return;

markChangeGiven(Number(button.dataset.id));
renderPayments();
    });

document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const row = toNumber(document.getElementById('row').value);
    const amountPaid = toNumber(document.getElementById('amountPaid').value);
    const passengers = toNumber(document.getElementById('passengers').value);

    const error = validatePayment(row, amountPaid, passengers);
    if (error) {
        showError(error);
        return;
    }

    hideError();
    payments.push(createPayment(row, amountPaid, passengers));
    renderPayments();
    event.target.reset();
});

renderPayments();