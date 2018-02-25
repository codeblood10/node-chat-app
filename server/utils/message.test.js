var expect = require('expect');
var generateMessage = require('./message.js');
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
