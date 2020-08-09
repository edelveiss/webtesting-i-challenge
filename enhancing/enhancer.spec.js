//const enhancer = require('./enhancer.js');
const { success, fail, repair, get, validItem } = require("./enhancer.js");
// test away!
describe("enhancer functions", () => {
  // -----------------valid item testing------------------------------ -
  describe("validItem()", () => {
    it("should throw an exception if a parameter is not an object", () => {
      expect(() => {
        validItem(5);
      }).toThrow(); // a number
      expect(() => {
        validItem("John");
      }).toThrow(); // a string
    });
    it("should throw an exception if a parameter  does not have required fileds", () => {
      expect(() => {
        validItem({ enhancement: 7, durability: 10 });
      }).toThrow(); // without a name filed
      expect(() => {
        validItem({ name: "John", durability: 10 });
      }).toThrow(); // a without a enhancement filed
      expect(() => {
        validItem({ name: "John", enhancement: 5 });
      }).toThrow(); // a without a durability filed
    });
    it("should throw an exception if the enhancement or  are durability property are not numbers", () => {
      expect(() => {
        validItem({ name: "John", enhancement: "someWords", durability: 10 });
      }).toThrow(); // a string
      expect(() => {
        validItem({ name: "John", enhancement: 6, durability: "someWords" });
      }).toThrow(); // a string
      expect(() => {
        validItem({ name: "John", enhancement: NaN, durability: 10 });
      }).toThrow(); // NaN
      expect(() => {
        validItem({ name: "John", enhancement: 6, durability: NaN });
      }).toThrow(); // NaN
    });
    it("should throw an exception if the enhancement or  are durability property are not in a desireable inteval", () => {
      expect(() => {
        validItem({ name: "John", enhancement: -2, durability: 10 });
      }).toThrow(); // <0
      expect(() => {
        validItem({ name: "John", enhancement: 30, durability: 40 });
      }).toThrow(); // >20
      expect(() => {
        validItem({ name: "John", enhancement: 15, durability: -5 });
      }).toThrow(); // <0
      expect(() => {
        validItem({ name: "John", enhancement: 6, durability: 120 });
      }).toThrow(); // >100
    });
    it("should throw an exception if the name is not a string", () => {
      expect(() => {
        validItem({ name: 5, enhancement: 6, durability: 10 });
      }).toThrow(); // not string
    });
  });
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
