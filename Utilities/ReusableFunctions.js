class ReusableFunctions {
  GetRandomCharacs(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  GetRandomNumbers(length) {
    var result = "";
    var numbers = "0123456789";
    var numLen = numbers.length;
    for (var i = 0; i < length; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numLen));
    }
    return result;
  }
}

module.exports = { ReusableFunctions };
