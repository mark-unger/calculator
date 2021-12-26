
// basic math operations as functions

function add(x,y) {
    let sum = x + y
    return sum
}

function subtract(x,y) {
    let difference = x - y
    return difference
}

function multiply(x,y) {
    let product = x * y
    return product
}

function divide(x,y) {
    let quotient = x / y
    return quotient
}

//rounds to six decimal places
function roundToTwo(num) {
    return +(Math.round(num + "e+6")  + "e-6");
}



// sets up array that will be looped through to do the math
const screen = document.getElementById('screen')
let displayText = ""
let problemText = ""
let problemArray = []
let header = document.getElementById("header")
let footer = document.getElementById("footer")

// does the chosen operation 
function operate(sign,x,y) {
    if (sign == "+") {
       return roundToTwo(add(x,y))
       
    }
    else if (sign == '-') {
        return roundToTwo(subtract(x,y))
    }
    else if (sign == 'x') {
        return roundToTwo(multiply(x,y))
    }
    else {
        if (y != 0){
        return roundToTwo(divide(x,y))
        } else {
            return "You can't do that!"
        
        }
    }
   
}

// sets up the equals key to run through and do the work
function screenEqual() {
    decimal.style.visibility = "visible"

    
    if (problemText != "") {
        problemArray.push(problemText)
        let x = Number(problemArray[0])
        let sign = problemArray[1]
        let y = Number(problemArray[2])
        
        let answer = operate(sign,x,y)
    
        if (answer == 0) {
            displayText = "0" 
            problemText = "0"
            
        }
        else {
            displayText = answer 
            problemText = answer
            problemArray = []
        }
       screen.innerHTML = displayText
    }
    
    
    else {
        screen.innerHTML = "You forgot the last number..."
        
        problemText = ""
        problemArray = []
        displayText = ""
    }
    
   
}  

// changes the numbers 
function changeDisplay(z) {
    displayText += z
    problemText += z
    screen.innerHTML = displayText
}
// functi0ns for each button to have them add to display     


function screenZero() {
    changeDisplay("0")
}
function screenOne() {
    changeDisplay("1")
}
function screenTwo() {
    changeDisplay("2")
}
function screenThree() {
    changeDisplay("3")
}
function screenFour() {
    changeDisplay("4")
}
function screenFive() {
    changeDisplay("5")
}
function screenSix() {
    changeDisplay("6")
}
function screenSeven() {
    changeDisplay("7")
}
function screenEight() {
    changeDisplay("8")
}
function screenNine() {
    changeDisplay("9")
}
function screenDecimal() {
    
    if (problemText.lastIndexOf(".") != -1) {
        decimal.style.visibility = "hidden"
    }
    else {
           
        changeDisplay(".")
    }
           
}
function screenNegative() {
    decimal.style.visibility = "visible"

    //add works
    if (problemText != "") {
        if ((problemArray.lastIndexOf("+") != -1)) {
        let negIndex = displayText.lastIndexOf("+")
        displayText = displayText.substring(0 ,negIndex)
        displayText += `-${problemText}`
        problemText = `-${problemText}`
        screen.innerHTML = displayText
        } 
        //sub works 
        else if ((problemArray.lastIndexOf("-") != -1)) {
        let negIndex = displayText.lastIndexOf("-")
        displayText = displayText.substring(0 ,negIndex )
        displayText += `+${problemText}`
        problemText = `-${problemText}`
        screen.innerHTML = displayText
        }
        //mult div work
        else {
        let negIndex = displayText.search(/[/x]/)
        
        displayText = displayText.substring(0 ,negIndex + 1)
        displayText += `(-${problemText})`
        problemText = `-${problemText}`
        screen.innerHTML = displayText
        }
    }
    
}

    
    


// chooses operation
function changeOperation (w) {
    decimal.style.visibility = "visible"
        
    displayText += w
    screen.innerHTML = displayText

   if (problemText != "") {
        
        problemArray.push(problemText)
        problemArray.push(w)
        problemText = ""
   }
   else if (problemArray.lastIndexOf(w) != -1) {
        screen.innerHTML = "you have too many operators"
        problemText = ""
   }
    else {
       screen.innerHTML = "forgot the first number"
       problemText = ""
   }
    
}

//does the math when using the operation buttons
function simplifyExpression(w) {
    decimal.style.visibility = "visible"
    //displayText += w
    //screen.innerHTML = displayText


   if (problemText != "") {
        
        problemArray.push(problemText)
        problemArray.push(w)
        problemText = ""
        let x = Number(problemArray[0])
        let sign = problemArray[1]
        let y = Number(problemArray[2])
        
        let answer = operate(sign,x,y)
        displayText = answer + `${w}`
        problemArray = []
        problemArray.push(answer)
        problemArray.push(w)
        screen.innerHTML = displayText

   }
   else if (problemArray.lastIndexOf(w) != -1) {
        screen.innerHTML = "you have too many operators"
        problemText = ""
   }
    else {
       screen.innerHTML = "forgot the first number"
       problemText = ""

   }
}


//adds the operations to the problem
function screenPlus() {
    
    if (problemArray.length < 2) { 
        changeOperation ("+")
    }
    else {
        simplifyExpression("+") 
    }
}

function screenMinus() {
    if (problemArray.length < 2) { 
        changeOperation ("-")
    }
    else {
        simplifyExpression("-") 
    }
}


function screenMultiply() {
    if (problemArray.length < 2) { 
        changeOperation ("x")
    }
    else {
        simplifyExpression("x") 
    }
}


function screenDivide() {
    if (problemArray.length < 2) { 
        changeOperation ("/")
    }
    else {
        simplifyExpression("/") 
    }

}

function screenClear() {
    decimal.style.visibility = "visible"
    displayText = ""
    problemText = ""
    problemArray = []
    screen.innerHTML = displayText
}
//del works except with negs
function screenDelete() {
   
    //displayText = displayText.substring(0 ,displayText.length -1)
   if (problemText.includes("-")) {
       problemText =""
       problemArray =[]
       displayText = ""
       screen.innerHTML = displayText
   }
   else {
    displayText = displayText.substring(0 ,displayText.length -1)
    if (problemText == "") {
        problemArray = []
        problemText = displayText
        screen.innerHTML = displayText
    }
    else {
        problemText = problemText.substring(0 ,problemText.length -1)
    
        screen.innerHTML = displayText
    }
    
   
    if (problemText.lastIndexOf(".") == -1) {
        decimal.style.visibility = "visible"

    }
}
}



//button events
//adds numbers from keyboard
document.addEventListener('keyup', (event) => {
    let key_press = Number(event.key);
        if(isNaN(key_press) == false){
            displayText += key_press
            problemText += key_press
            screen.innerHTML =  displayText
            
        }
    })

//adds operations from keyboard
document.addEventListener('keyup', (event) => {
    let key_press = (event.key);
    if (key_press =="Enter") {
        screenEqual()
    }
    else if (key_press =="+") {
        screenPlus()
    }
    else if (key_press =="-") {
        screenMinus()
    }
    else if ((key_press == "*") || (key_press == "x")){
        screenMultiply()
    }
    else if (key_press == "/") {
        screenDivide()
    }
    else if (key_press == "Backspace") {
        screenDelete()
    }
    else if (key_press == ".") {
        screenDecimal()
    }
    else if (key_press == "n") {
        screenNegative()
    }
    else if ((key_press == "c") || (key_press == "C")) {
        screenClear()
    }
})




    



const clearButton = document.getElementById('clear')
clearButton.addEventListener('click', screenClear)

const deleteButton = document.getElementById('delete')
deleteButton.addEventListener('click', screenDelete)

const equals = document.getElementById('equal')
equals.addEventListener('click',screenEqual)

const nine = document.getElementById('nine')
nine.addEventListener('click',screenNine)

const eight = document.getElementById('eight')
eight.addEventListener('click',screenEight)

const seven = document.getElementById('seven')
seven.addEventListener('click',screenSeven)

const six = document.getElementById('six')
six.addEventListener('click',screenSix)

const five = document.getElementById('five')
five.addEventListener('click',screenFive)

const four = document.getElementById('four')
four.addEventListener('click',screenFour)

const three = document.getElementById('three')
three.addEventListener('click',screenThree)

const two = document.getElementById('two')
two.addEventListener('click',screenTwo)

const one = document.getElementById('one')
one.addEventListener('click',screenOne)

const zero = document.getElementById('zero')
zero.addEventListener('click',screenZero)


const plus = document.getElementById('plus')
plus.addEventListener('click',screenPlus)

const minus = document.getElementById('minus')
minus.addEventListener('click',screenMinus)

const product = document.getElementById('multiply')
product.addEventListener('click',screenMultiply)

const division = document.getElementById('divide')
division.addEventListener('click',screenDivide)

const negative = document.getElementById('negative')
negative.addEventListener('click',screenNegative)

const decimal = document.getElementById('dot')
decimal.addEventListener('click', screenDecimal)