window.addEventListener("load", () =>{
    const form = document.querySelector("#new-post-form");
    const input = document.querySelector("#new-post-input");
    const feed = document.querySelector("#yourfeed");
    const presetdata = [["Bob Jones", "12:00 PM", "With chronos, I was able to complete many of my objectives and stay on track. I finally landed a job at Apple, and it's all thanks to #Chronos"],
                        ["Lamarr Olive", "12:00 PM", "Just hit the one week streak! Excited to keep going and achieve more goals."],
                        ["Deyby Rodriguez", "10:00 AM", "First time using this application, and I love it. I'm able to get all my tasks done and also stay motivated by looking at these posts."]
]


    function addinformation(name, time, postvalue){
        let likecounter = 0;
        let heartcounter = 0;
        let carecounter = 0;
        let laughcounter = 0;
        const feedcontainer = document.createElement("div");
        feedcontainer.classList.add("feedcontainer");

        const profile = document.createElement("img");
        profile.classList.add("profile");
        profile.src = "../../images/empty pfp.png";
        feedcontainer.append(profile)


        const content = document.createElement("div");
        content.classList.add("content");

        const heading = document.createElement("h3");
        heading.innerHTML = "<span class = 'orange'>" + name +"</span> |" + time;
        content.append(heading);

        const post = document.createElement("p");
        post.innerHTML = postvalue;
        content.append(post);

        const reactions = document.createElement("div");
        reactions.classList.add("reactions");

        
        const likecontainer = document.createElement("div");
        likecontainer.classList.add("reaction");

        const likebutton = document.createElement("button");
        likebutton.innerHTML = "<img src = '../../images/like.png'>"
        likebutton.name = "unclicked"
        likecontainer.append(likebutton);


        const liketext = document.createElement("p");
        liketext.innerHTML = likecounter;
        likecontainer.append(liketext);

        likebutton.addEventListener("click", () =>{
            console.log(likebutton.name);
            if(likebutton.name == "unclicked"){
                likebutton.name = "clicked";
                likecounter++;
                liketext.innerHTML = likecounter;
                liketext.style.color = "blue";
            }
            else{
                likebutton.name = "unclicked";
                likecounter--;
                liketext.innerHTML = likecounter;
                liketext.style.color = "white";
            }
        })

        reactions.append(likecontainer)


        const heartcontainer = document.createElement("div");
        heartcontainer.classList.add("reaction");

        const heartbutton = document.createElement("button");
        heartbutton.innerHTML = "<img src = '../../images/heart.png'>"
        heartbutton.name = "unclicked"
        heartcontainer.append(heartbutton);


        const hearttext = document.createElement("p");
        hearttext.innerHTML = heartcounter;
        heartcontainer.append(hearttext);

        heartbutton.addEventListener("click", () =>{
            console.log(heartbutton.name);
            if(heartbutton.name == "unclicked"){
                heartbutton.name = "clicked";
                heartcounter++;
                hearttext.innerHTML = heartcounter;
                hearttext.style.color = "blue";
            }
            else{
                heartbutton.name = "unclicked";
                heartcounter--;
                hearttext.innerHTML = heartcounter;
                hearttext.style.color = "white";
            }
        })

        reactions.append(heartcontainer)


        const carecontainer = document.createElement("div");
        carecontainer.classList.add("reaction");

        const carebutton = document.createElement("button");
        carebutton.innerHTML = "<img src = '../../images/hug.png'>"
        carebutton.name = "unclicked"
        carecontainer.append(carebutton);


        const caretext = document.createElement("p");
        caretext.innerHTML = carecounter;
        carecontainer.append(caretext);

        carebutton.addEventListener("click", () =>{
            console.log(carebutton.name);
            if(carebutton.name == "unclicked"){
                carebutton.name = "clicked";
                carecounter++;
                caretext.innerHTML = carecounter;
                caretext.style.color = "blue";
            }
            else{
                carebutton.name = "unclicked";
                carecounter--;
                caretext.innerHTML = carecounter;
                caretext.style.color = "white";
            }
        })
        reactions.append(carecontainer)



        const laughcontainer = document.createElement("div");
        laughcontainer.classList.add("reaction");

        const laughbutton = document.createElement("button");
        laughbutton.innerHTML = "<img src = '../../images/happy.png'>"
        laughbutton.name = "unclicked"
        laughcontainer.append(laughbutton);


        const laughtext = document.createElement("p");
        laughtext.innerHTML = laughcounter;
        laughcontainer.append(laughtext);

        laughbutton.addEventListener("click", () =>{
            console.log(laughbutton.name);
            if(laughbutton.name == "unclicked"){
                laughbutton.name = "clicked";
                laughcounter++;
                laughtext.innerHTML = laughcounter;
                laughtext.style.color = "blue";
            }
            else{
                laughbutton.name = "unclicked";
                laughcounter--;
                laughtext.innerHTML = laughcounter;
                laughtext.style.color = "white";
            }
        })
        reactions.append(laughcontainer)


        content.append(reactions);
        feedcontainer.append(content);
        
        feed.prepend(feedcontainer)
    }

// _____________________________________________________________________________________________________________________________________________________________________________________________________

    for(const data of presetdata){
        console.log(data);
        addinformation(data[0], data[1], data[2])
    }

    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        const inputval = input.value;
        console.log(input.value);
        if(!inputval){
            alert("Issue")
            return;
        }
        else{
            addinformation("randomuser", "4 PM", inputval)
        }
    })
})
