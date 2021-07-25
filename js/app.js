'use strict'

// let imagesDiv=document.getElementById('images-div');
let leftImgElement = document.getElementById('left-image');
let middleImgElement = document.getElementById('middle-image')
let rightImgElement = document.getElementById('right-image');

let maxAttempts = 10;
let userAttemptsCounter = 0;

let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

function Pics(name, src) {
    this.name = name;
    this.source = src;
    this.votes = 0;
    this.shown = 0;

    picturs.push(this);
}
let picturs = [];

new Pics('bag', 'img/bag.jpg')
new Pics('banana', 'img/banana.jpg')
new Pics('bathroom', 'img/bathroom.jpg')
new Pics('boots', 'img/boots.jpg')
new Pics('breakfast', 'img/breakfast.jpg')
new Pics('bubblegum', 'img/bubblegum.jpg')
new Pics('chair', 'img/chair.jpg')
new Pics('cthulhu', 'img/cthulhu.jpg')
new Pics('dog-duck', 'img/dog-duck.jpg')
new Pics('dragon', 'img/dragon.jpg')
new Pics('pen', 'img/pen.jpg')
new Pics('pet-sweep', 'img/pet-sweep.jpg')

console.log(picturs);

function randomIndex() {
    return Math.floor(Math.random() * picturs.length);
}

function renderImg() {
    leftImgIndex = randomIndex();
    middleImgIndex = randomIndex();
    rightImgIndex = randomIndex();

    while (leftImgIndex === middleImgIndex || leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex) {

        leftImgIndex = randomIndex();
        middleImgIndex = randomIndex();
        rightImgIndex = randomIndex();
        // console.log(leftImgIndex);
        // console.log(middleImgIndex);
        // console.log(rightImgIndex);
        // console.log('hello');

    }


    leftImgElement.src = picturs[leftImgIndex].source;
    middleImgElement.src = picturs[middleImgIndex].source;
    rightImgElement.src = picturs[rightImgIndex].source;
}

renderImg();

let imagesDiv = document.getElementById('images-div');
imagesDiv.addEventListener('click', userClick);

function userClick(event) {
    userAttemptsCounter++;



    if (userAttemptsCounter < maxAttempts) {


        if (event.target.id === 'left-image') {

            picturs[leftImgIndex].votes++;
            picturs[leftImgIndex].shown++;


        }
        else if (event.target.id === 'middle-image') {
            picturs[middleImgIndex].votes++;
            picturs[middleImgIndex].shown++;

        }
        else if (event.target.id === 'right-image') {
            picturs[rightImgIndex].votes++;
            picturs[rightImgIndex].shown++;

        }

        renderImg();

    }
    else {
        let form = document.getElementById('form');

        // adding the event listener
        // form.addEventListener('click', formSubmitter);

        // // create the function that will rn when we submit the form

        // function formSubmitter(event) {
        //     event.preventDefault();


            let list = document.getElementById('results-list');

            list.addEventListener('click', userClick);
       
            for (let i = 0; i < picturs.length; i++) {
              
                let listItem = document.createElement('li');

                list.appendChild(listItem);

                listItem.textContent = `${picturs[i].name} had ${picturs[i].votes} votes, and was seen ${picturs[i].shown}`
            }
        }
            // remove event listener:
            leftImgElement.removeEventListener('click', userClick);
            rightImgElement.removeEventListener('click', userClick);
            middleImgElement.removeEventListener('click', userClick);
        }
    // }
