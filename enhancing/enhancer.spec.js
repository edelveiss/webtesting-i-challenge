//const enhancer = require('./enhancer.js');
const { success, fail, repair, get } = require("./enhancer.js");
// test away!
describe("enhancer functions", () => {
  // -----------------repair------------------------------ -
  describe("repair()", () => {
    it("should return new item with restored item.durability to 100", () => {
      let item = { name: "John", enhancement: 0, durability: 10 };
      expect(repair(item)).toEqual({
        name: "John",
        enhancement: 0,
        durability: 100,
      });
      item = { name: "John", enhancement: 0, durability: 0 };
      expect(repair(item).durability).toBe(100);
    });
  });

  //------------------success--------------------------------
  describe("success()", () => {
    it("should return item with the item's enhancement increses by 1", () => {
      let item = { name: "John", enhancement: 4, durability: 10 };
      expect(success(item)).toEqual({
        name: "John",
        enhancement: 5,
        durability: 10,
      });
    });
    it("should return item. If the item enhancement level is 20, the enhancement level is not changed.", () => {
      item = { name: "John", enhancement: 20, durability: 10 };
      expect(success(item).enhancement).toBe(20);
    });
    it("should return item. The durability of the item is not changed.", () => {
      item = { name: "John", enhancement: 20, durability: 10 };
      expect(success(item).durability).toBe(item.durability);
    });
  });
  //------------------fail--------------------------------
  describe("fail()", () => {
    it("should return a new item. If the item's enhancement is less than 15, the durability of the item is decreased by 5.", () => {
      let item = { name: "John", enhancement: 4, durability: 20 };
      expect(fail(item).durability).toBe(15);
    });
    it("should return a new item.If the item's enhancement is 15 or more, the durability of the item is decreased by 10.", () => {
      item = { name: "John", enhancement: 20, durability: 100 };
      expect(fail(item).durability).toBe(90);
    });
    it("should return a new item.If the item's enhancement level is greater than 16, the enhancement level decreases by 1.", () => {
      item = { name: "John", enhancement: 18, durability: 10 };
      expect(fail(item).enhancement).toBe(17);
      expect(fail(item).durability).toBe(0);
    });
  });
  //------------------Stretch Problem--------get------------------------
  describe("get() should return  a new item with the name property modified", () => {
    it("if the enhancement level is 0, the the name is not modified.", () => {
      let item = { name: "Iron Sword", enhancement: 0, durability: 20 };
      expect(get(item).name).toBe("Iron Sword");
    });
    it("if the enhancement level is greater than 0, change the name to include the enhancement level, preceded by a plus sign ( + ), between square brackets before the item's name.", () => {
      let item = { name: "Iron Sword", enhancement: 7, durability: 20 };
      expect(get(item).name).toBe("[+7] Iron Sword");
    });
  });
});
