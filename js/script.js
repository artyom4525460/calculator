var topSlider = {
    sliderBackground : document.getElementById('top-slider-background'),
    sliderScale : document.getElementById('scale'),
    currentDeg : 88.69,
    addButton: document.getElementById('addSum'),
    reduceButton: document.getElementById('reduceSum'),
    getCenterCoords : function(){
        let sliderBackground = this.sliderBackground.getBoundingClientRect()
        return {
            x: Math.floor(sliderBackground.x + sliderBackground.width/2),
            y: Math.floor(sliderBackground.y + sliderBackground.height),
        }
    },
    move: function(deg){
        let sliderScale = this.sliderScale
        sliderScale.style.transform = `rotate(${deg}deg)`;
    }
}

var topSliderButton = {
    elem: document.getElementById('top-slider-button'),
    buttonScale: document.getElementById('button-scale'),
    isDown: false,
    move: function(deg){
        let buttonScale = this.buttonScale
        buttonScale.style.transform = `rotate(${deg}deg)`;
    }
}

var form = {
    sumValue: document.getElementsByName('sum')[0],
    minAmount: 0,
    maxAmount: 1500,
    initialAmount: 800,
    currentAmount: 800,
    amount: document.getElementById('amount'),
    countAmountDeg: function(){

    },
    updateAmount: function(){

    },
    add: function(value){
        if(this.maxAmount < (this.currentAmount + value)){
            this.currentAmount =  this.maxAmount
        }
        else{
            this.currentAmount += value
        }
        this.amount.innerHTML = this.currentAmount
        this.sumValue.value = this.currentAmount
        topSlider.currentDeg = Math.ceil(form.currentAmount / ( (form.maxAmount )/180 ) )
        topSlider.move(topSlider.currentDeg)
        topSliderButton.move(topSlider.currentDeg)
    },
    reduce: function(value){
        if(this.minAmount > (this.currentAmount - value)){
            this.currentAmount =  this.minAmount
        }
        else{
            this.currentAmount -= value
        }
        
        this.amount.innerHTML = this.currentAmount
        this.sumValue.value  = this.currentAmount
        topSlider.currentDeg = Math.ceil(form.currentAmount / ( (form.maxAmount )/180 ) )
        topSlider.move(topSlider.currentDeg)
        topSliderButton.move(topSlider.currentDeg)
    }
}

var moveSliders = function(mousePosition){
    let center = topSlider.getCenterCoords()
    let xLine = center.x - mousePosition.x
    let yLine = center.y - mousePosition.y
    if(yLine < 0){
        yLine = 0;
    }
    let newDeg = 180 / Math.PI * Math.atan2(yLine, xLine);
    if((newDeg > topSlider.currentDeg + 0.76 || newDeg < topSlider.currentDeg - 0.76) && !(newDeg > 180) && !(newDeg < 0)){
        if(newDeg > topSlider.currentDeg + 0.76){
            form.add(10)
        }
        else{
            form.reduce(10)
        }
    }
}


topSlider.addButton.addEventListener('click', function(event){
    event.preventDefault()
    form.add(150)
}, true)

topSlider.reduceButton.addEventListener('click', function(event){
    event.preventDefault()
    form.reduce(150)
}, true)

topSliderButton.elem.addEventListener('mousedown', function(event){
    event.preventDefault();
    topSliderButton.isDown = true
    let coords = topSlider.getCenterCoords()
})

document.addEventListener('mouseup', function() {
    topSliderButton.isDown = false
}, true)

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (topSliderButton.isDown) {
        mousePosition = {
            x : event.clientX,
            y : event.clientY
        };
        moveSliders(mousePosition)
    }
}, true)

var init = function(){
    topSlider.move(topSlider.currentDeg)
    topSliderButton.move(topSlider.currentDeg)
}

init()


/*
 *  Terms slider
 *
*/

var termSlider = {
    sumValue: document.getElementsByName('term')[0],
    item1: document.getElementById('item1'),
    item2: document.getElementById('item2'),
    item3: document.getElementById('item3'),
    progressLine: document.getElementById('progress-line'),
    item2Info: document.getElementById('item2-info'),
    item3Info: document.getElementById('item3-info'),
    flag: document.getElementById('flag'),
    hide: function(){
        this.item2Info.style.display = "none"
        this.item3Info.style.display = "none"
        this.item2Info.style.opacity = 0
        this.item3Info.style.opacity = 0
    }
}

termSlider.item1.addEventListener('click', function(event){
    termSlider.hide()
    termSlider.flag.innerHTML = 1
    termSlider.progressLine.style.width = '0%'
    termSlider.sumValue.value = 1
}, true)
termSlider.item2.addEventListener('click', function(event){
    termSlider.hide()
    termSlider.item2Info.style.display = "block"
    termSlider.item2Info.style.opacity = 1
    termSlider.flag.innerHTML = 2
    termSlider.progressLine.style.width = '50%'
    termSlider.sumValue.value = 2
}, true)
termSlider.item3.addEventListener('click', function(event){
    termSlider.hide()
    termSlider.item3Info.style.display = "block"
    termSlider.item3Info.style.opacity = 1
    termSlider.flag.innerHTML = 3
    termSlider.progressLine.style.width = '100%'
    termSlider.sumValue.value = 3
}, true)


/*
 *
 *  Selector
 * 
 */ 

 var selector = {
    province: document.getElementsByName('province')[0],
    elem: document.getElementById('selector'),
    menu: document.getElementById('selector'),
    dropdown: document.getElementById('dropdown'),
    menuItems: document.getElementsByClassName('selector-item'),
    selectorResult: document.getElementById('selector-result'),
    
    showItems: function(){
        this.dropdown.style.opacity = 1
        selector.dropdown.style.display = 'block'
        // this.dropdown.animate([
        //     //{ opacity: 0, height: '40px' }, 
        //     { opacity: 1, height: '300px' }
        //   ], {
        //     duration: 1000
        //   })
    } 
 }

 selector.elem.addEventListener('click', function(event){
    selector.showItems()
}, true)



Array.from(selector.menuItems).forEach(function(element) {
    element.addEventListener('click', function(){
        Array.from(selector.menuItems).forEach(function(item) {
            item.classList.remove('selected')
        })
        element.classList.add('selected')
        selector.selectorResult.innerHTML = element.innerHTML
        selector.province.value = element.innerHTML
        selector.dropdown.style.opacity = 0
        selector.dropdown.style.display = 'none'
    })
})


document.getElementById('apply-button').addEventListener('click', function(event){
    event.preventDefault()
    let result = {
        sum: form.sumValue.value,
        term: termSlider.sumValue.value,
        province: selector.province.value,
    }
    console.log(result)
    alert(`
        sum: ${form.sumValue.value},
        term: ${termSlider.sumValue.value},
        province: ${selector.province.value},
    `)
})