const container = document.querySelector(".container")
let parts = undefined
let penColor = "rgba(0,0,0"

function createDivs(size = 16) {
    let containerStyles = window.getComputedStyle(container)

    parts = size
    let width = containerStyles.getPropertyValue("width")
    width = Number(width.slice(0, 3)) / parts

    let height = containerStyles.getPropertyValue("height")
    height = Number(height.slice(0, 3)) / parts

    let div = document.createElement("div")
    div.style.width = `${width}px`
    div.style.height = `${height}px`
    div.classList.add("box")

    return div
}

function createGrid(size) {
    let box = createDivs(size)
    for (let i = 0; i < parts; i++) {
        for (let j = 0; j < parts; j++) {
            clone = box.cloneNode()
            container.appendChild(clone)
        }
    }
}


container.addEventListener("mouseover", (e) => {
    let eleBackgroundColor = e.target.style.backgroundColor
    let lastPart = undefined
    if (eleBackgroundColor.includes("a")) {
        if (eleBackgroundColor.includes(".")) {
            lastPart = eleBackgroundColor.slice(-6);
        }
        else {
            lastPart = eleBackgroundColor.slice(-4);
        }
    }
    else{
        lastPart = eleBackgroundColor.slice(-1);
        let start = eleBackgroundColor.slice(0,3)
        let end = eleBackgroundColor.slice(3)
        eleBackgroundColor = start + "a" + end
    }

    eleBackgroundColor = eleBackgroundColor.replace(lastPart, "").replaceAll(" ", "")
    if (eleBackgroundColor != penColor) {
        e.target.style.backgroundColor = `${penColor},0.1)`
    }
    else {
        lastPart = Number(lastPart.replace(", ", "").replace(")", ""))
        if (lastPart < 0.9) {
            lastPart += 0.1
        }
        else{
            lastPart = 0.9
        }
        e.target.style.backgroundColor = `${eleBackgroundColor},${lastPart})`


    }

})

function changeGrid() {
    let size = Number(prompt("New size"))
    container.innerHTML = ""
    if (size != NaN && size > 0 && size <= 100) {
        if (size != parts) {
            createGrid(size)
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createGrid()
})

document.addEventListener("input", (e) => {
    let colorValue = e.target.value
    colorValue = colorValue.replace("#", "")
    let values = []
    let index = 0
    let endindex = 2

    for (let i = 0; i < 3; i++) {
        values.push(colorValue.slice(index, endindex))
        index += 2
        endindex += 2
    }
    values.forEach((ele, index) => {
        values[index] = parseInt(`0x${ele}`)
    })

    changeColor(values)
})


function changeColor(colorValues) {
    penColor = `rgba(${colorValues[0]},${colorValues[1]},${colorValues[2]}`
}