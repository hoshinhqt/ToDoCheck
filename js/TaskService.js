function TaskService() {

    this.getListTask = function(){
       return axios({
        url : "https://5f826f3e06957200164334d3.mockapi.io/api/Task",
        method : "GET",
        }) 

    //    return new Promise(function(){
    //        setTimeout(
    //         axios({
    //             url : "https://5f826f3e06957200164334d3.mockapi.io/api/Task",
    //             method : "GET",
    //         }), 2000)
    //    });
    }
    this.addTaskService = function(task){
        return axios({
            url : "https://5f826f3e06957200164334d3.mockapi.io/api/Task",
            method : "POST",
            data : task,
        });
    }
    this.deleteTask = function(id){
        return axios({
            url : `https://5f826f3e06957200164334d3.mockapi.io/api/Task/${id}`,
            method : "DELETE",
        });
    }
    this.getTaskById = function(id){
        return axios({
            url : `https://5f826f3e06957200164334d3.mockapi.io/api/Task/${id}`,
            method : "GET",
        })
    }
    this.updateTask = function(task){
        return axios({
            url : `https://5f826f3e06957200164334d3.mockapi.io/api/Task/${task.id}`,
            method : "PUT",
            data : task,
            })
    }
}