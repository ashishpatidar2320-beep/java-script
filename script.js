    let obj = {};
    let countObj = {};

    let todo = document.querySelector(".todo");
    let progress = document.querySelector(".progress");
    let done = document.querySelector(".done");
    let navBtn = document.querySelector(".nav-add-task-btn");
    let modal = document.querySelector(".modal");
    let bgcolor = document.querySelector(".bgcolor");
    let taskadd = document.querySelector(".taskadd");
    let tasktittle = document.querySelector(".tasktittle");
    let taskdis = document.querySelector(".taskdis");
    cols = ([todo,progress,done]);

    function updateCountandLocalStorage(){
      cols.forEach((col)=>{
          let tasks = col.querySelectorAll(".each-task");
          let count = col.querySelector(".count");
          count.textContent = `${tasks.length}`;
           countObj[col.id] = count.textContent;
      localStorage.setItem("countObj" , JSON.stringify(countObj));
          obj[col.id]  = Array.from(tasks).map(t=>{
            return {
              tittle: t.querySelector("h2").textContent,
              description:t.querySelector("p").textContent
            }
          })
            localStorage.setItem("obj", JSON.stringify(obj));
      }) 
    }

    function createtask(parent,tasktittle,taskdis){
      let div = document.createElement("div");
      div.classList.add("each-task")
      div.setAttribute("draggable" ,"true");
      let h2 = document.createElement("h2");
      h2.textContent = tasktittle;
      h2.classList.add("text");
      let p = document.createElement("p");
      p.textContent = taskdis;
      p.classList.add("text");
      let btn = document.createElement("button");
      btn.classList.add("delete");
      btn.textContent = "delete";
      div.appendChild(h2);
      div.appendChild(p);
      div.appendChild(btn);

      parent.appendChild(div);
      modal.style.display = "none"; 

         div.addEventListener("drag" , (e)=>{
          pickitem = e.target;
      })
      let delbtn = div.querySelector(".delete");
          delbtn.addEventListener("click",(e)=>{
            div.remove();
            updateCountandLocalStorage();
          })
          updateCountandLocalStorage();
    }

        if(localStorage.getItem("obj")){
          let data = JSON.parse(localStorage.getItem("obj")) ;
            
                    for(let col in data){
                      let container= document.querySelector(`.${col}`);
                       let eachcount = container.querySelector(".count");
                       countObj =JSON.parse( localStorage.getItem("countObj")); 
                       eachcount.textContent = countObj[col];
                      data[col].forEach((t)=>{
                       
                        createtask( container,t.tittle,t.description);
                           
                      })
                    }
                }

    let pickitem = null;
    let tasks = document.querySelectorAll(".each-task")
    tasks.forEach((task)=>{
        task.addEventListener("drag" , (e)=>{
          pickitem = e.target;
        }) 
    })

function pickanddrop(colume){
    colume.addEventListener("dragenter" , (e)=>{
      e.preventDefault();
      colume.classList.add("dragenter");
    })

    colume.addEventListener("dragleave", function(e){
      e.preventDefault();
      colume.classList.remove("dragenter");
    })

    colume.addEventListener("dragover",function(e){
        e.preventDefault();
    })

    colume.addEventListener("drop" ,(e)=>{
      e.preventDefault();

      colume.appendChild(pickitem);
      colume.classList.remove("dragenter");

      updateCountandLocalStorage();
    })

}
    pickanddrop(todo);
    pickanddrop(progress);
    pickanddrop(done);
    /*model logic */

    navBtn.addEventListener("click" ,function(e){
       modal.style.display = "flex";
    })
    bgcolor.addEventListener("click",function(e){
        modal.style.display = "none";
    })

    taskadd.addEventListener("click" , function(){
        if(tasktittle.value === "" || taskdis.value === ""){
          console.log("fill inputs proper")
        }
      createtask(todo,tasktittle.value,taskdis.value);
      
    document.querySelector(".tasktittle").value = "";
    document.querySelector(".taskdis").value  = "";

    })



   


