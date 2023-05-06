function wait(fn, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fn());
    }, time);
  });
}

function doTask1() {
  return wait(() => console.log("Task1"), 1000);
}
function doTask2() {
  return wait(() => console.log("Task2"), 2000);
}
function doTask3() {
  return wait(() => console.log("Task3"), 3000);
}

async function doAsyncTasks() {
  try {
    await doTask1();
    await doTask2();
    await doTask3();
  } catch (error) {
    console.error(error);
  }
}

function* generatorTask() {
  yield doTask1();
  yield doTask2();
  yield doTask3();
}

function doGeneratorTasks() {
  const iterator = generatorTask();
  const handleResult = (result) => {
    if (!result.done) {
      result.value.then(() => {
        handleResult(iterator.next());
      });
    }
  };

  handleResult(iterator.next());
}

doAsyncTasks();
doGeneratorTasks();
