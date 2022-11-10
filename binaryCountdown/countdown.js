let timer=0;
let intervalId;

const startCountdown = (time) => {
    timer = time - 1    
    showBinary(time)
    if (intervalId)
    {
        clearInterval(intervalId)
    }
    intervalId = setInterval(update, 1000, timer)
}

const update = (time) => {
    if (timer == -1) {
        document.getElementById("0").classList.add('inactive')
        clearInterval(intervalId)
        resetBlocks()
    }
    else {
        showBinary(timer)
        timer = timer - 1
    }
}

const resetBlocks = () => {
    const items = document.getElementsByClassName("binary-block")
    Array.prototype.forEach.call(items, (element => {
        element.classList = "inactive binary-block"
    }));
}

const showBinary = (seconds) => {
    const binString = seconds.toString(2).split("").reverse().join("")
    for (let i = 0; i < binString.length; i ++) {
        const item = document.getElementById(i);
        // item.innerText = binString.charAt(i);
        if (item.classList.contains('inactive'))
        {
            item.classList.remove('inactive')
        }
        if (binString.charAt(i) == 1)
        {
            item.classList.remove("off")
            item.classList.add("on")
        }
        else {
            item.classList.remove("on")
            item.classList.add("off")

        }
    }
    for (let i = binString.length; i < 16; i++)
    {
        const item = document.getElementById(i)
        item.classList.remove('on')
        item.classList.add('inactive')
    }
    
}

const createDivs = () => {
    let divs = []
    const grid = document.querySelector(".grid-container")
    for (let i = 15; i >= 0; i--)
    {
        const item = document.createElement('div')
        item.classList.add("binary-block")
        item.id = i
        grid.appendChild(item)
        divs.push(item)
    }
    return divs
}



const onLoad = () => {
    createDivs();
    resetBlocks();
    const startTimer = document.getElementById("start-timer");
    startTimer.addEventListener("click", () => {
        const seconds = parseInt(document.getElementById('seconds').value)
        const minutes = parseInt(document.getElementById('minutes').value)
        console.log(minutes * 60 + seconds)
        startCountdown(minutes * 60 + seconds)
    })
}

onLoad()