document.addEventListener('DOMContentLoaded', () => {
    let resetBtn = document.getElementById('resetAvgifter')
    resetBtn.addEventListener('click', () => {
        fetch('http://localhost:3000/admin/resetAvgifter')
    })
})