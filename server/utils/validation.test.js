const expect = require('expect');

const {isRealString} = require("./validation.js")

describe('check for the valid string',()=>{
 it("should reject  non-string values",()=>{
    var res =  isRealString(012);
    expect(res).toBe(false);
    });

it("should reject the string with only spaces",()=>{
   var res = isRealString("      ");
   expect(res).toBe(false);
   });
it("should allow string with non-space character",()=>{
  var res = isRealString("ankit");
  expect(res).toBe(true);
});
});
