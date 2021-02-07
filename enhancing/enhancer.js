module.exports = {
  success,
  fail,
  repair,
  get,
  validItem,
};

function success(item) {
  //let newItem = { ...item };
  let newItem = { ...validItem(item) };
  newItem.enhancement < 20 ? ++newItem.enhancement : newItem.enhancement;
  return newItem;
}

function fail(item) {
  let newItem = { ...validItem(item) };
  if (newItem.enhancement < 15 && newItem.durability > 5) {
    newItem.durability -= 5;
  }
  if (newItem.enhancement >= 15 && newItem.durability >= 10) {
    newItem.durability -= 10;
  }
  if (newItem.enhancement > 16) {
    newItem.enhancement -= 1;
  }
  return newItem;
}

function repair(item) {
  let newItem = { ...validItem(item) };
  newItem.durability = 100;
  return newItem;
}

function get(item) {
  let newItem = { ...validItem(item) };
  if (newItem.enhancement > 0) {
    newItem.name = `[+${newItem.enhancement}] ${newItem.name}`;
  }
  return newItem;
}

function validItem(item) {
  if (typeof item !== "object") {
    throw new Error("invalid parameter. It is not an object");
  } else if (
    item.name === undefined ||
    item.enhancement === undefined ||
    item.durability === undefined
  ) {
    throw new Error("invalid parameter. It does not have required fileds");
  } else if (
    typeof item.enhancement !== "number" ||
    Number.isNaN(item.enhancement) ||
    item.enhancement > 20 ||
    item.enhancement < 0
  ) {
    throw new Error("invalid enhancement property of arg");
  } else if (
    typeof item.durability !== "number" ||
    Number.isNaN(item.durability) ||
    item.durability > 100 ||
    item.durability < 0
  ) {
    throw new Error("invalid durability property of args");
  } else if (typeof item.name !== "string") {
    throw new Error("invalid name property of args");
  } else {
    return item;
  }
}
