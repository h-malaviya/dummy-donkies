export const getClassNames = (
    condition,
    truthyClass = "",
    falsyClass = "",
    defaultClass = ""
  ) => {
    return [
      defaultClass,
      condition ? truthyClass : falsyClass
    ].filter(Boolean).join(" ");
  };