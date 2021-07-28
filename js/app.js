'use strict'

let imagesDiv = document.getElementById('images-div');
let buttonElement = document.getElementById('button')
let leftImgElement = document.getElementById('left-image');
let middleImgElement = document.getElementById('middle-image')
let rightImgElement = document.getElementById('right-image');

let maxAttempts = 25;
let userAttemptsCounter = 0;

let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

let nameArray = [];

let voteArray = [];

let shownArray = [];

function Pics(name, src) {
    this.name = name;
    this.source = src;
    this.votes = 0;
    this.shown = 0;

    picturs.push(this);
    nameArray.push(this.name);


}


function updateStorage() {
  
  
    let stringArr=JSON.stringify(picturs);
  
    localStorage.setItem('images', stringArr);
    
    

}

function previousStorage() {

    let data = localStorage.getItem('images');
    let parsedArray=JSON.parse(data);

    if (parsedArray !== null ) {
        picturs=parsedArray;
    }


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

// console.log(picturs);

function randomIndex() {
    return Math.floor(Math.random() * picturs.length);
}

let shownPictures=[];

function renderImg() {
    leftImgIndex = randomIndex();
    middleImgIndex = randomIndex();
    rightImgIndex = randomIndex();


    while (leftImgIndex === middleImgIndex || leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex||shownPictures.includes(leftImgIndex)||shownPictures.includes(rightImgIndex)||shownPictures.includes(middleImgIndex)) {

        leftImgIndex = randomIndex();
        middleImgIndex = randomIndex();
        rightImgIndex = randomIndex();

    }
    shownPictures=[leftImgIndex,rightImgIndex,middleImgIndex];


    leftImgElement.src = picturs[leftImgIndex].source;
    picturs[leftImgIndex].shown++

    middleImgElement.src = picturs[middleImgIndex].source;
    picturs[middleImgIndex].shown++

    rightImgElement.src = picturs[rightImgIndex].source;

    picturs[rightImgIndex].shown++
}

renderImg();

imagesDiv.addEventListener('click', userClick);

function userClick(event) {



    if (userAttemptsCounter < maxAttempts) {


        if (event.target.id === 'left-image') {

            picturs[leftImgIndex].votes++;
            renderImg();


        }
        else if (event.target.id === 'middle-image') {
            picturs[middleImgIndex].votes++;
            renderImg();

        }
        else if (event.target.id === 'right-image') {
            picturs[rightImgIndex].votes++;
            renderImg();

        } else {
            alert("please pick a picture")
            userAttemptsCounter++;
        }
        

        // renderImg();

    }
    else {
        buttonElement.hidden = false;

        buttonElement.addEventListener('click', showingList);

        function showingList() {

            let list = document.getElementById('results-list');



            for (let i = 0; i < picturs.length; i++) {

                let listItem = document.createElement('li');

                list.appendChild(listItem);

                listItem.textContent = `${picturs[i].name} had ${picturs[i].votes} votes, and was seen ${picturs[i].shown}`
            }
            buttonElement.removeEventListener('click', showingList);

            // remove event listener:
            // imagesDiv.removeEventListener('click',userClick);

        }
        for (let i = 0; i < picturs.length; i++) {
            
            voteArray.push(picturs[i].votes);
            shownArray.push(picturs[i].shown);

        }
        imagesDiv.removeEventListener('click', userClick);
        showChart();

        updateStorage();

    }
    userAttemptsCounter++;

}

function showChart() {

    const data = {
        labels: nameArray,
        datasets: [{
            label: 'Votes',
            data: voteArray,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        },
        {
            label: 'Shown',
            data: shownArray,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }

        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      };
    
    
      var myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
    
    }
    previousStorage();
