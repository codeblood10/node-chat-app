const expect = require("expect");

const {Users} = require("./user.js");

describe("users",()=>{
     var users;

   beforeEach(()=>{
     users = new Users();
     users.users = [{
       id :"1",
       name : "ankit",
        room : "nodecourse"
     },{
       id : "2",
        name :"nitin",
        room :"reactcourse"
     },{
       id : "3",
       name :"joe",
       room : "nodecourse"
     }];
   });
   it("should remove a user",()=>{
     var userlist = users.removeUser("1");

      expect(userlist).toEqual({id:"1",name:"ankit",room:"nodecourse"});
      expect(users.users.length).toBe(2);
   });
   it("should not remove a user",()=>{
     var userlist = users.removeUser("5");

      expect(userlist).toBe(undefined);

   });
   it("should get a user",()=>{
      var userlist = users.getUser("1");
      expect(userlist).toEqual({id:"1",name:"ankit",room:"nodecourse"});
   });
   it("should not get a user",()=>{
     var userlist = users.getUser("6");
     expect(userlist).toBe(undefined);
   });
  it("should add new user",()=>{
   var users = new Users();
    var user = {
       id : "123",
       name :"ankit",
       room : "the lost fan"
    };
    var res = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it("should return user with same room",()=>{
     var userlist = users.getUserlist("nodecourse");
     expect(userlist).toEqual(["ankit","joe"]);
  });
  it("should return user with same room",()=>{
     var userlist = users.getUserlist("reactcourse");
     expect(userlist).toEqual(["nitin"]);
  });
});
