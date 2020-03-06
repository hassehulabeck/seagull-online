document.addEventListener('DOMContentLoaded', () => {
    // DOM
    let resetBtn = document.getElementById('resetAvgifter')
    let addMemberBtn = document.getElementById('addMember')
    let fName = document.getElementById('firstName');
    let lName = document.getElementById('lastName');

    // Reset avgifter
    resetBtn.addEventListener('click', () => {
        fetch('http://localhost:3000/admin/resetAvgifter')
    })

    // Add Member
    /* Viktigt med headers för att beskriva vilken typ som skickas. */
    addMemberBtn.addEventListener('click', () => {
        fetch('http://localhost:3000/admin/addMember', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                fName: fName.value,
                lName: lName.value
            })
        })
    })
})