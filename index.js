let rightclickcard=null;

//_____________________________addtask__________________________________________//

function addTask(columnId){
    const input=document.getElementById(`${columnId}-input`);
    const taskText=input.value.trim();
 

    if(taskText===""){
        return
    }
        const taskdate= new Date().toLocaleString();
        const taskElement=createTaskElement(taskText,taskdate);

        document.getElementById(`${columnId}-tasks`).appendChild(taskElement);
         updateTasksCount(columnId);

        input.value= ""; 
}
//_________________________createtaskelement_______________________________________//

function createTaskElement(taskText,taskdate){
    const Element=document.createElement('div')
    Element.innerHTML= `<span>${taskText}</span><br><small class="time">${taskdate}</small>`
    Element.classList.add("card");
    Element.setAttribute('draggable',true)
    Element.addEventListener('dragstart',dragStart);
    Element.addEventListener('dragend',dragEnd);
    Element.addEventListener('contextmenu',function(event){
        event.preventDefault();
        rightclickcard=this;
        showFeature(event.pageX,event.pageY);
    });
    return Element;   
}

//_______________dragstart_______________________________//

function dragStart(){
    this.classList.add("dragging");
    dragcard=this;
}


//___________________dragend__________________________//

function dragEnd()
{
    this.classList.remove("dragging")

}

const column=document.querySelectorAll('.tasks');
column.forEach((column)=>{
    column.addEventListener('dragover', dragOver);
    
});

//__________________________dragover_____________________________//

function dragOver(event){
    event.preventDefault();

    //   (or) const dragcard= document.queryselector('.dragging)
    this.appendChild(dragcard);
    setTimeout(() => {
        ["todo", "doing", "done"].forEach(updateTasksCount);
    }, 0.4*1000);

}
const contextmenu=document.querySelector(".feature");

//_________________show contextmenu________________________//

function showFeature(x, y){
    contextmenu.style.left=`${x}px`
    contextmenu.style.top=`${y}px`
    contextmenu.style.display="block";
}
document.addEventListener('click',()=>{
    contextmenu.style.display="none"
})

//_____________edittask______________________//

function editTask(){
if(rightclickcard !==null){
  
        const newtask=prompt("Edit task", rightclickcard.textContent);
      
    if(newtask!==null)
    {
        rightclickcard.textContent=newtask;
          const taskdate= new Date().toLocaleString();
          rightclickcard.querySelector('small.time').textContent=taskdate;
          console.log(small.time);
    }
}
}

//___________________deletetask___________________________//

function deleteTask() {
    if (!rightclickcard) return;

    const columnId = rightclickcard.parentElement.id.replace('-tasks', '');
    rightclickcard.remove();
    updateTasksCount(columnId);
}

//_________________updatecount____________________________//

function updateTasksCount(columnId) {
    const count = document.querySelectorAll(`#${columnId}-tasks .card`).length;
    document.getElementById(`${columnId}-count`).textContent = count;
}