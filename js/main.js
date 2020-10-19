var taskService = new TaskService();
var isLoading;

getEle("addItem").addEventListener("click",function(){
    var nameTask =  getEle("newTask").value ;
    console.log(nameTask);
    var status = "todo";
    var task = new Task("", nameTask, status);
    console.log(task);
    taskService.addTaskService(task)
    .then(function(result){
        getAllTask();
        // getLocalStorage(result.data);
     console.log(result);
    })
    .catch(function(err){
     console.log(err);
    })
 
 });
 getLocalStorage();
function getAllTask(){
    taskService.getListTask()
    .then(function(result){
        createToDoTask(result.data,"todo");
        createToDoTask(result.data,"completed");
        setLocalStorage(result.data);
        console.log("NHQT result", result.data);
    })
    .catch(function(){

    })
};

function createToDoTask(arr, status){
    if(arr){
        var content = "";
    arr.forEach(function(item) {
        if(item.status == status){
            content += `
            <li>
                <span>${item.name}</span>   
                <div class="buttons">
                    <button class="remove" onclick= "moveToTrash(${item.id})"><i class="fa fa-trash-alt "></i></button>
                    <button class="complete" onclick = "changeStatus(${item.id})"><i class="fa fa-check-circle complete"></i></button>
                </div> 
            </li>
               
            `;
        }
    });
    }
    return getEle(status).innerHTML = content;
}

function moveToTrash(id){
    taskService.deleteTask(id)
    .then(function(result){
        getAllTask();
    })
}
function changeStatus(id){
    isLoading = true;
    setLoading();
    taskService.getTaskById(id)
    .then(function(resultReceive){
        console.log("resultReceive",resultReceive.data.status);
        // resultReceive.data.status = "Completed";
        if(resultReceive.data.status == "completed"){
            console.log("ahihi todo nhe");
            resultReceive.data.status = "todo";
           
        }else{
            resultReceive.data.status = "completed";
        }
        var updatedTask = new Task(id, resultReceive.data.name, resultReceive.data.status);
        console.log("resultsend",updatedTask);
        taskService.updateTask(updatedTask)
        .then(function(result){
            getAllTask();
            isLoading = false;
        })
    })
}
 function setLoading(){
     if(isLoading){
         content = `<div class="loader"></div>`;
         return document.getElementsByClassName("card__body").innerHTML = content;
     }
 }
 function getEle(id){
    return document.getElementById(id);
 }
function getLocalStorage(){
    if(localStorage.getItem("TASKLIST")){
        dataTaskStored = JSON.parse(localStorage.getItem("TASKLIST"));
        createToDoTask(dataTaskStored,"todo");
        createToDoTask(dataTaskStored,"completed");

    };
};
function setLocalStorage(dataToLocal){
    localStorage.setItem("TASKLIST", JSON.stringify(dataToLocal));
};
