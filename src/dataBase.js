import localforage from "localforage";

let twittes = localforage.createInstance({
  name: "TwitterDb",
});
export const AllData = async () => {
  let arr = [];
  await twittes
    .iterate(function (value, key, iterationNumber) {
      arr.push(value);
    })
    .catch(function (err) {
      console.log(err);
    });
  return arr.sort((prev, next) => {
    return new Date(next.createdAt) - new Date(prev.createdAt);
  });
};

export const saveTwitte = (item) => {
  twittes.setItem(item.id, item).catch(function (err) {
    console.log(err);
  });
};

export const updateDb = (id, newItem) => {
  twittes.getItem(id).then(function (item) {
    item.id = id;
    item.noteTitle = newItem.noteTitle;
    item.noteVal = newItem.noteVal;
    item.updateDate = newItem.updateDate;
    item.dateReminder = newItem.dateReminder;
    localforage.setItem(id, item);
  });
};

export const removeItemdb = (id) => {
  twittes.removeItem(id).catch(function (err) {
    console.log(err);
  });
};
