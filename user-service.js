/*var user = {
    firstName : "Admin",
    lastName : "Admin",
    mobNum: "+919876543212",
    email: "admin@userapp.com",
    password: "nimda",
    type: "admin"

}

localStorage.setItem('UserList',JSON.stringify([user]));*/

//var user = {firstName:"Dhilip",lastName:"Kumar",email:"dhilip@userapp.com",type:"normal",mobNum:"+919876543456",password:"dhilip@123"}

if(!localStorage.getItem('UserList')){
    console.log('creating User for the first time');
   var user = {
        firstName : "Admin",
        lastName : "Admin",
        mobNum: "+919876543212",
        email: "admin@userapp.com",
        password: "nimda",
        type: "admin"

    }
    localStorage.setItem('UserList',JSON.stringify([user])); 
    console.log('UserList created: ', localStorage.getItem('UserList'));
}

function retrieveUserList(){
    return JSON.parse(localStorage.getItem('UserList'));
}

function postUserList(userArray){
    localStorage.setItem('UserList',JSON.stringify(userArray));
}
function getUser(email){
  var userList = retrieveUserList().filter(function(user){
        if(user.email ==email){
            return user;
        }
    });
    return userList[0];  
}
function getAllUsers(){
    var userList = retrieveUserList().filter(function(user){
        if(user.type!='admin'){
            return user;
        }
    });
    return userList;
}

function createUser(user){

    var checkUserExist = getUser(user.email);
    if(checkUserExist){
        return {error:true,message:'User already Exist'};
    }

    var userList = retrieveUserList();
    userList.push(user);
    postUserList(userList);
    return {error:false,message:'User added successfully!!'};
}

function updateUser(user){
    var userList = retrieveUserList();
    userList.forEach(function(item) {
        if(item.email == user.email){
            item.firstName = user.firstName;
            item.lastName = user.lastName;
            item.mobNum = user.mobNum;
            item.password = user.password
        }
    });
    postUserList(userList);
}

function deleteUser(email){
    
    var userList = retrieveUserList();
    var removeIndex = 0;
    userList.forEach(function(item, index) {
        if(item.email == email){
            removeIndex = index;
        }
    });
    userList.splice(removeIndex,1);
    postUserList(userList);
}