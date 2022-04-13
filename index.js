function showGros(arg) {
  const gros = " gros";
  if (typeof arg === "object") {
    const newObject = Object.assign({}, arg);
    Object.keys(newObject).forEach((key) => {
      newObject[key] = newObject[key] + gros;
    });
    return newObject;
  }
  return arg + gros;
}

const regexCapital = /\b[A-Z][a-zA-Z]*\b/;

function showLe(arg) {
  const le = "le ";
  if (typeof arg === "object") {
    const newObject = Object.assign({}, arg);
    Object.keys(newObject).forEach((key) => {
      if (typeof newObject[key] === "string") {
        newObject[key] = newObject[key].replace(regexCapital, `${le}$&`);
      }
    });
    return newObject;
  }
  return arg.replace(regexCapital, `${le}$&`);
}

var orig = console.log;

console.log = function () {
  var msgs = [];

  while (arguments.length) {
    const argument = [].shift.call(arguments);
    msgs.push(showLe(showGros(argument)));
  }

  orig.apply(console, msgs);
};

export default { orig };
