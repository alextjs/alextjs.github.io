
const board = document.querySelector('#board')
const colors = ['red','blue','orange','black','pink','green','purple','white']
const SQUARES_NUMBERS = 1000

for (let i = 0; i < SQUARES_NUMBERS; i++) {
    const square = document.createElement('div')
    square.classList.add('square')

    square.addEventListener('mouseover', () => {
            setColor(square)
        }
    )
    square.addEventListener('mouseleave', () => {
        removeColor(square)
    })

    board.append(square)
    }




    function setColor (element) {
        const color = getRandomColor()
        element.style.backgroundColor = color
    }

    function removeColor (element) {
        element.style.backgroundColor = '#1d1d1d'
    }

    function getRandomColor () {
        const index = Math.floor(Math.random() * colors.length)
        return colors[index]
    }