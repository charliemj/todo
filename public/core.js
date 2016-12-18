var scotchTodo = angular.module("scotchTodo", []);


//On page load, we will GET /api/todos and bind the JSON we receive from the API to $scope.todos. 
//We will then loop over these in our view to make our todos.
// Similar for post and delete

function mainController($scope, $http){
    $scope.formData = {};
    $scope.formDataQ = {};
    
    // when landing on the page, get all todos and show them

    $http.get('/api/todos')
        .success(function(data){
            $scope.todos = data[0];
            if (data.length > 1){
                $scope.dones = data[1];
            }
            console.log(data);
        })

        .error(function(data){
            console.log("Error: " + data);
        });

    // when landing on the page, get all todos and show them

    $scope.createTodo = function(){
        $http.post("/api/todos", $scope.formData)
            .success(function(data){
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data[0];
                if (data.length > 1){
                    $scope.dones = data[1];
                }
                console.log(data);
            })
            .error(function(data){
                console.log("Error: " + data);
        });
    };

    // "update a todo after checking it (to done)
    $scope.updateTodo = function(id){
        $http.put("/api/todos/"+id)
            .success(function(data){
                $scope.todos = data[0];
                if (data.length > 1){
                    $scope.dones = data[1];
                }
                console.log(data);
            })
            .error(function(data){
                console.log("Error: "+data);
            });
    };

    //delete a done todo
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                
                $scope.dones = data;
                  
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
    };

    // when landing on the page, get all items in queue and show them

    $http.get('/api/queue')
        .success(function(data){
            $scope.items = data[0];
            console.log(data);
        })

        .error(function(data){
            console.log("Error: " + data);
        });

    // when landing on the page, get all items and show them

    $scope.createItem = function(){
        $http.post("/api/queue", $scope.formDataQ)
            .success(function(data){
                $scope.formDataQ = {}; // clear the form so our user is ready to enter another
                $scope.items = data[0];
                console.log(data);
            })
            .error(function(data){
                console.log("Error: " + data);
        });
    };

    //delete an item
    $scope.deleteItem = function(id) {
        $http.delete('/api/queue/' + id)
            .success(function(data) {
                $scope.items = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
    };

};