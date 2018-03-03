// class Person  {
//  constructor (name,age) {
//       this.name = name ;
//       this.age = age ;
//   }
//   getUserDesription(){
//   return `${this.name} age is${this.age}`;
//   }
// }
// //adduser(id,name,room)
// //remove user(id)
// //getuser(id)
// //getUserlist(room)
// var me = new Person("ankit",23) ;
//
// console.log(me.age);
//
// var des = me.getUserDesription();
// console.log(des);

class Users {
  constructor(){
    this.users  = [];
  }
  addUser(id,name,room){
    var user = {id,name,room};
    this.users.push(user);
     return user;
  }
  removeUser(id){
    var namesArray = this.users.filter((user)=>{
         return (user.id === id);
    });
    this.users = this.users.filter((user)=>{
         return (user.id !== id);
       });

       return namesArray[0];
  }
  getUser(id){
     var users = this.users.filter((user)=>{
       return user.id === id ;
     });
    return users[0];
  }
  getUserlist(room){
    var user  = this.users.filter((user)=>{
      return user.room === room;
    });
    var namesArray = user.map((user)=>{
      return user.name;
    });
    return namesArray;
  }
}

module.exports =({Users});
