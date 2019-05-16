const hello = require('./hello.js');

test('should get "Hello world"', () => {
    expect(hello()).toBe('Hello world') // 测试成功
    // expect(hello()).toBe('Hello') // 测试失败
})

// describe("A suite", function () {
//     it("contains spec with an expectation", function () {
//         expect(hello()).toBe("Hello world"); // 测试成功
//     });
// });
