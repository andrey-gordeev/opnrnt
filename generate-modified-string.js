const generateModifiedString = (str) => {
  if (typeof str !== "string" || str.trim() === "") {
    console.warn("Given string must be non-empty");
    return;
  }

  // Assumptions
  // 1. The input string is in English
  //    – For different languages, the result will still be predictable.
  //    – Different languages could be supported via sets of vowels and using localeCompare function.
  // 2. The input string contains digits or symbols
  //    – Not specified in the task.
  //    – Code doesn't break and returns an empty string as the first alphabet letter, which is a reasonable compromise.

  const VOWELS = new Set(["a", "e", "i", "o", "u"]);
  const ODD_SUFFIX = "open";
  const EVEN_SUFFIX = "rent";

  let reversedStr = "";
  let firstAlphabetLetter;
  let suffix;

  // Here we get reversed string
  // Current approach of reversing the string is clear and simple,
  // but could be shorter: [...str].reverse().join('')
  for (let i = str.length - 1; i >= 0; i--) {
    reversedStr += str[i];
  }

  // For different languages we could use localeCompare with a specified locale:
  // [...str].filter(char => /[a-z]/i.test(char)).sort((a, b) => a.localeCompare(b, 'en'))[0];
  const letters = str.toLowerCase().match(/[a-z]/g);
  firstAlphabetLetter = letters ? letters.sort()[0] : "";

  const numOfVowels = str
    .toLowerCase()
    .split("")
    .reduce((count, char) => (VOWELS.has(char) ? count + 1 : count), 0);
  const isVowelCountEven = numOfVowels % 2 === 0;
  suffix = isVowelCountEven ? EVEN_SUFFIX : ODD_SUFFIX;

  return `${reversedStr}${firstAlphabetLetter}${suffix}`;
};

const result = generateModifiedString("nepo");
console.log(result);
