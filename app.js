class Slider {
    constructor(elemSelector) {
        this.currentSlide = 0; 
        this.sliderSelector = elemSelector; 
        this.slider = null; //here will be generate slider
        this.slides = null; //stored slides from html
        this.prev = null; //button prev
        this.next = null; //button next
        this.dots = []; //dots buttons on the slider
        this.timer = null; //variable for setTimeout

        this.generateSlider(); // create a slider
        this.changeSlide(this.currentSlide); //first run a slider

        
        
    }

    generateSlider() {
        //get element that convert to slider
        this.slider = document.querySelector(this.sliderSelector);
        this.slider.classList.add("slider");

        //create container for slides
        const slidesCnt = document.createElement("div");
        slidesCnt.classList.add("slider-slides-cnt");

        //get element form slides
        this.slides = this.slider.children;

        //this.slides.length is decreasing because this.slides[0] is append to another collection and this cannot be in two collection at once
        while (this.slides.length) {
            this.slides[0].classList.add("slider-slide");
            slidesCnt.append(this.slides[0]);
        }

        //retake slides
        this.slides = slidesCnt.querySelectorAll(".slider-slide");

        this.createPagination();

        //wygenerowaliśmy kontener ze slajdami, wstawiamy go więc do slidera
        this.slider.append(slidesCnt);

        this.createPrevNext();
        
    }


    createPrevNext() {
        //button Previous Slide
        this.prev = document.createElement("button");
        this.prev.type = "button";
        this.prev.innerText = "Poprzedni slide";
        this.prev.classList.add("slider-button");
        this.prev.classList.add("slider-button-prev");
        this.prev.addEventListener("click", this.slidePrev.bind(this));

        //Button Next Slide
        this.next = document.createElement("button");
        this.next.type = "button";
        this.next.innerText = "Następny slide";
        this.next.classList.add("slider-button");
        this.next.classList.add("slider-button-next");
        this.next.addEventListener("click", this.slideNext.bind(this));

        //common div
        const nav = document.createElement("div");
        nav.classList.add("slider-nav");
        nav.appendChild(this.prev);
        nav.appendChild(this.next);

        //append div to slider
        this.slider.appendChild(nav);

        
    }

    createPagination() {
        const ulDots = document.createElement("ul");
        ulDots.classList.add("slider-pagination");

        //li play / pause
        const liPlayPause = document.createElement("li");
        // liPlayPause.classList.add("slider-pagination-element-PlayPause");

        const buttonPlayPause = document.createElement("button");
        buttonPlayPause.classList.add("slider-pagination-button-PlayPause");
        buttonPlayPause.classList.add("material-symbols-outlined");
        buttonPlayPause.type = "button";
        buttonPlayPause.innerText = "Pause";
        buttonPlayPause.innerHTML = "pause_circle";
        buttonPlayPause.setAttribute("aria-label", "PlayPause");

        buttonPlayPause.addEventListener("click", () => {
            if (buttonPlayPause.innerHTML === "pause_circle") {
                clearInterval(this.timer);
                buttonPlayPause.innerText = "Play";
                buttonPlayPause.innerHTML = "play_circle";
            } else { 
                this.changeSlide(this.currentSlide);
                buttonPlayPause.innerText = "Pause";
                buttonPlayPause.innerHTML = "pause_circle";

            }
        
        
        });



        liPlayPause.appendChild(buttonPlayPause);
        
        ulDots.appendChild(liPlayPause);
        // this.elemPlayPause.push(liPlayPause);



        //tworzymy pętlę w ilości liczby slajdów
        for (let i=0; i<this.slides.length; i++) {
            //każdorazowo tworzymy LI wraz z buttonem
            //każdy button po kliknięciu zmieni slajd
            //za pomocą metody changeSlide()

            const li = document.createElement("li");
            li.classList.add("slider-pagination-element");

            const button = document.createElement("button");
            button.classList.add("slider-pagination-button");
            button.type = "button";
            button.innerText = i+1;
            button.setAttribute("aria-label", `Ustaw slajd ${i+1}`);

            button.addEventListener("click", () => this.changeSlide(i));

            li.appendChild(button);

            ulDots.appendChild(li);

            //wygenerowany przycisk wrzucamy do wspólnej tablicy
            //dzięki temu potem łatwiej będzie nam się do tych kropek odwoływać
            this.dots.push(li);
        }

        this.slider.appendChild(ulDots);
    }

    slidePrev() {
        this.currentSlide--;

        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        }

        this.changeSlide(this.currentSlide);

    }
    
    slideNext() {
        this.currentSlide++;

        if (this.currentSlide > this.slides.length - 1) {
            this.currentSlide = 0;
        }

        this.changeSlide(this.currentSlide);
    }
    
    changeSlide(i) {
        //loop what remove class active
        this.slides.forEach(slide => {
            slide.classList.remove("slider-slide-active");
            slide.setAttribute("aria-hidden", true);
        });
        this.dots.forEach(dot => {
            dot.classList.remove("slider-pagination-element-active");
        });

        //set class active to (slide and dot) from function parameter
        this.slides[i].classList.add("slider-slide-active");
        this.slides[i].setAttribute("aria-hidden", false);
        this.dots[i].classList.add("slider-pagination-element-active");

        this.currentSlide = i;

        clearInterval(this.timer);
        this.timer = setTimeout(() => this.slideNext(), 10000);

        //toggle buttonPlayPause from another method
        const toggleButton = document.querySelector(".slider-pagination-button-PlayPause");
            if (toggleButton.innerHTML === "play_circle") {
                toggleButton.innerHTML = "pause_circle";
                toggleButton.innerText = "Pause";

        }

    }

}

const slide = new Slider("#slider1");

