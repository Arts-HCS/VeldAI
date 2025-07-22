const cards = document.querySelectorAll('.option-card');
const chooseButton = document.getElementById('chooseOptionButton');

cards.forEach((card)=>{
    card.addEventListener('click', ()=>{
        cards.forEach((notSelected)=>{
            notSelected.classList.remove('selected')
        })
        card.classList.add('selected');
        chooseButton.classList.add('active')
    })
})