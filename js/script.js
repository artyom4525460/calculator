var topSlider = {
    sliderBackground : document.getElementById('top-slider-background'),
    sliderScale : document.getElementById('scale'),
    minEmount: 0,
    maxEmount: 1500,
    initialEmount: 800,
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

var moveSliders = function(mousePosition){
    let center = topSlider.getCenterCoords()
    let xLine = center.x - mousePosition.x
    let yLine = center.y - mousePosition.y
    if(yLine < 0){
        yLine = 0;
    }
    let newDeg = 180 / Math.PI * Math.atan2(yLine, xLine);
    topSlider.move(newDeg)
    topSliderButton.move(newDeg)
}

// function radToDeg (rad)
// {
//     return (rad * 180) / Math.PI;
// }

console.log(topSlider.sliderBackground)

topSliderButton.elem.addEventListener('mousedown', function(event){
    event.preventDefault();
    topSliderButton.isDown = true
    let coords = topSlider.getCenterCoords()
    //console.log(coords)
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
        
        
        // div.style.left = (mousePosition.x + offset[0]) + 'px';
        // div.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true)