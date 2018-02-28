var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message.js');
describe('generateMessage',()=>{
  it('should generate correct messsage object',()=>{
     var res = generateMessage("ankit","welcome");
     console.log(res.from);
     expect(res.createdAt).toBeA('number');
     expect(res.from).toBeA('string');
     expect(res.text).toExist();
     expect(res).toInclude({
       from:'ankit',
       text:'welcome'
     });
    });
});

describe('generateLocationMessage',()=>{
  it('should generate correct url location',()=>{
    var res = generateLocationMessage("ankit",1,2);
    expect(res.createdAt).toBeA('number');
    expect(res.from).toBeA('string');
    expect(res.url).toBe("https://www.google.com/maps?q=1,2");
  });
  
});
