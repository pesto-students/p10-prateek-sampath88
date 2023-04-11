const vowelCount = (str) => {
    let originalStr = str.toLowerCase();
    let originalStrLength = originalStr.length;
    let vowelCountMap = new Map();
    let vowels = ["a", "e", "i", "o", "u"];
    vowels.forEach((vowel) => {
      let tempStr = originalStr.replaceAll(vowel, "");
      let count = originalStrLength - tempStr.length;
      vowelCountMap.set(vowel, count);
    });
    return vowelCountMap;
  };
  console.log(vowelCount("jAne JohN"));
  
  /* vowel count using regex */
  const vowelCountUsingRegExp = (str) => {
    let originalStr = str;
    let vowelCountMap = new Map();
    let vowels = ["a", "e", "i", "o", "u"];
    vowels.forEach((vowel) => {
      let regex = new RegExp(vowel, "gi");
      let count = [...originalStr.matchAll(regex)];
      vowelCountMap.set(vowel, count.length);
    });
    return vowelCountMap;
  };
  console.log(vowelCountUsingRegExp("jAne JohN"));
  