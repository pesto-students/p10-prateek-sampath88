// import { useEffect, useState } from "react";

// const useLocalStorage = (key, initialValue) => {
//   const [value, setValue] = useState(() => {
//     console.log("init: localStorage: ", key);
//     let currentValue;
//     try {
//       currentValue = JSON.parse(
//         localStorage.getItem(key) || JSON.stringify(initialValue)
//       );
//     } catch (error) {
//       currentValue = initialValue;
//     }
//     return currentValue;
//   });

//   useEffect(() => {
//     console.debug("useLocalStorage: ", value);
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [value, key]);

//   return [value, setValue];
// };

// export default useLocalStorage;

import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storeValue, setStoreValue] = useState(() => {
    console.log("init useLocalStorage");
    let currentValue;
    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || JSON.stringify(initialValue)
      );
    } catch (error) {
      currentValue = initialValue;
    }
    return currentValue;
  });

  const setValue = (value) => {
    console.log("setValue: ", value);
    try {
      if (typeof value === "function") {
        let newValue = value(storeValue);
        setStoreValue(newValue);
        console.log("newValue: ", newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } else {
        setStoreValue(value);
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log("new storeValue: ", storeValue);
  //   //   localStorage.setItem(key, JSON.stringify(storeValue));
  // }, [storeValue, key]);
  return [storeValue, setValue];
};

export default useLocalStorage;
