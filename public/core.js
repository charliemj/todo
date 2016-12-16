var scotchTodo = angular.module("scotchTodo", []);


//On page load, we will GET /api/todos and bind the JSON we receive from the API to $scope.todos. 
//We will then loop over these in our view to make our todos.
// Similar for post and delete

function mainController($scope, $http){
    $scope.formData = {};
    
    // when landing on the page, get all todos and show them

    $http.get('/api/todos')
        .success(function(data){
            $scope.todos = data;
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
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data){
                console.log("Error: " + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id){
        $http.delete("/api/todos/"+id)
            .success(function(data){
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data){
                console.log("Error: "+data);
            });
    };
};