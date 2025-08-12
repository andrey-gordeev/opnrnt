const generateModifiedString = (str: string): string | undefined => {
  // Type check is redundant in TS,
  // but it's good practice to validate input anyway.
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

  const VOWELS: Set<string> = new Set(["a", "e", "i", "o", "u"]);
  const ODD_SUFFIX: string = "open";
  const EVEN_SUFFIX: string = "rent";

  let reversedStr: string = "";
  let firstAlphabetLetter: string;
  let suffix: string;

  // Here we get reversed string
  // Current approach of reversing the string is clear and simple,
  // but could be shorter: [...str].reverse().join('')
  for (let i: number = str.length - 1; i >= 0; i--) {
    reversedStr += str[i];
  }

  // For different languages we could use localeCompare with a specified locale:
  // [...str].filter(char => /[a-z]/i.test(char)).sort((a, b) => a.localeCompare(b, 'en'))[0];
  const letters: string[] | null = str.toLowerCase().match(/[a-z]/g);
  firstAlphabetLetter = letters ? letters.sort()[0] : "";

  const numOfVowels: number = str
    .toLowerCase()
    .split("")
    .reduce(
      (count: number, char: string) => (VOWELS.has(char) ? count + 1 : count),
      0,
    );
  const isVowelCountEven: boolean = numOfVowels % 2 === 0;
  suffix = isVowelCountEven ? EVEN_SUFFIX : ODD_SUFFIX;

  return `${reversedStr}${firstAlphabetLetter}${suffix}`;
};

const result = generateModifiedString("nepo");
console.log(result);
