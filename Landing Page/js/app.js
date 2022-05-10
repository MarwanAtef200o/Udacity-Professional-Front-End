//"To the Top" button that takes the user to the top of the page
const btnToTop= document.querySelector("#btn");
btnToTop.addEventListener("click", function (){
    window.scrollTo({ top: 0, behavior: 'smooth' })
});

// Our 3 main global varibles
const mySections= document.querySelectorAll("section"); //returns a NodeList
const myUl= document.querySelector("#navbar__list"); //returns the only ul element with that id
const myFragment= document.createDocumentFragment(); //creates an empty fragment (container) to be filled with li elements

//Building the NAV part

//looping over the list of sections
for (const aSection of mySections){
    const text= aSection.getAttribute("data-nav");   //gets the number of the section
    const myLi= document.createElement("li");        //creates a new li element
    const myA= document.createElement("a");          //creates a new anchor element which will be prevented from its default functionaility

    myA.addEventListener("click", function(event){
        event.preventDefault();
        aSection.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    });                       
    myA.textContent= text;                          //filled the newly created empty a element with the section number which also resembels the textContent of the parent li element
    myLi.appendChild(myA);
    myFragment.appendChild(myLi);                   //then append that ready li element to the fragment
}

myUl.appendChild(myFragment);                       //finally, append that full fragment to the ul element

//Building the Active Section Part

//Implementation of the "while scrolling" requirement as an event of the type "scroll"
document.addEventListener("scroll", active);

function active (){
for (const activeSec of mySections){                                            //Consider the activeSec (which is just a normal section from the mySections NodeList) to be the active section
    const view= activeSec.getBoundingClientRect();                              //to know info about the section through the view window 
    if (view.top>=0 && view.top<600){                                          //the active section condition
        mySections.forEach ( section => {
            section.classList.remove("your-active-class");                      //when the active section is found, loop all over the mySections NodeList and remove the active section class from all the sections 
            activeSec.classList.add("your-active-class");                       //and add the active section class to the active section that was found
        }); 
        
        
        const myLi_s= document.querySelectorAll("li");
        for (const activeLi of myLi_s){                                         //and loop all over the li elements
            if (activeLi.textContent === activeSec.getAttribute("data-nav")){   //then compare if the li's text is the same as the active section's text
                myLi_s.forEach ( Li => {
                    Li.classList.remove("your-active-link");                    //if true, loop all over the myLi_s NodeList and remove the active link class from all the li elements
                    activeLi.classList.add("your-active-link");                 //and add the active link class to the active link that was found (the one that matched its text with the active section text)
                });
            }
    }
}

}

}
