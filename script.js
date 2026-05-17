const resizeBtn = document.querySelector('.resizeBtn')
const colorBtn = document.querySelector('.colorBtn')
const opacityBtn = document.querySelector('.opacityBtn')
const clearBtn = document.querySelector('.clearBtn')
const container = document.querySelector('.container')

let squaresPerSide = 16
let randomColor = false
let progressiveOpacity = false

resizeBtn.addEventListener('click', promptUser)

colorBtn.addEventListener('click', () => {
    randomColor = !randomColor
    colorBtn.textContent = `Random Color ${randomColor ? '(On)' : '(Off)'}`
})

opacityBtn.addEventListener('click', () => {
    progressiveOpacity = !progressiveOpacity
    opacityBtn.textContent = `Progressive Opacity ${progressiveOpacity ? '(On)' : '(Off)'}`
})

clearBtn.addEventListener('click', () => setupGrid(squaresPerSide))

function promptUser() {
    squaresPerSide = prompt('How many squares per side should the grid have? (Min: 1, Max: 100)')

    if (isNaN(squaresPerSide)) alert('Entered value is not a number (Min: 1, Max: 100)')
    if (squaresPerSide < 1 || squaresPerSide > 100) alert('Entered value is outside permitted range (Min: 1, Max: 100)')

    setupGrid(squaresPerSide)
}

function setupGrid(squaresPerSide) {
    container.replaceChildren()
    for (let i = 0; i < squaresPerSide; i++) {
        const row = document.createElement('div')
        row.classList.add('row')
        const squares = [];

        for (let j = 0; j < squaresPerSide; j++) {
            const square = document.createElement('div')
            square.classList.add('cell')

            square.addEventListener('mouseenter', (e) => {
                let target = e.target
                let r = randomColor ? Math.random() * 255 : 0
                let g = randomColor ? Math.random() * 255 : 0
                let b = randomColor ? Math.random() * 255 : 0
                let a = 1

                const backgroundColor = getComputedStyle(target).getPropertyValue('background-color')
                
                if (backgroundColor.startsWith('rgba')) {
                    const channels = backgroundColor.split(',')
                    let alpha = parseFloat(channels[channels.length - 1].replace(')', ''))
                    if (progressiveOpacity) {
                        alpha += 0.1
                        a = alpha
                    }
                }

                target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`
            })
            squares.push(square)
        }

        row.append(...squares)
        container.append(row)
    }
}

setupGrid(squaresPerSide)