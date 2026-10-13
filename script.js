const farePerPerson = 17;
let payments = [
{
    id: 1,
    row: 1,
    amountPaid: 20,
    passengers: 1,
    fareDue: 17,
    change: 3,
    changeGiven: false
},

{
    id: 2,
    row: 2,
    amountPaid: 100,
    passengers: 4,
    fareDue: 68,
    change: 32,
    changeGiven: false
},

{
    id: 3,
    row: 3,
    amountPaid: 60,
    passengers: 3,
    fareDue: 51,
    change: 9,
    changeGiven: false
},

{
    id: 4,
    row: 4,
    amountPaid: 50,
    passengers: 2,
    fareDue: 34,
    change: 16,
    changeGiven: false
},

{
    id: 5,
    row: 5,
    amountPaid: 70,
    passengers: 4,
    fareDue: 68,
    change: 2,
    changeGiven: false
}
];

function renderPayments () {
    const tbody = document.getElementById('payments-body');
    tbody.innerHTML = '';

    payments.forEach(function (payment) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<th scope="row">${payment.row}</th>
                        <td>${payment.passengers}</td>
                        <td>${payment.amountPaid}</td>
                        <td>${payment.fareDue}</td>
                        <td>${payment.change}</td>
                        <td>${payment.changeGiven
                             ? '<span class="badge text-bg-success">Settled</span>'
                                : '<button class="btn btn-sm btn-warning" data-id="${payment.id}">Change given</button>'}
                 </td>
          `;
          tbody.appendChild(tr);
    });
}

renderPayments();