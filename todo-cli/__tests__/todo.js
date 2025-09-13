/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("First test suite", () => {
  // beforeAll(() => {
  //   add({
  //     title: "Test todo",
  //     completed: false,
  //     dueDate: new Date().toISOString().split("T")[0],
  //   });
  // });
  test("should add a new todo", () => {
    const len = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(all.length).toBe(len + 1);
  });
  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("should retrieve overdue items", () => {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split("T")[0];
    add({
      title: "Test todo overdue",
      completed: false,
      dueDate: yesterday,
    });
    let overdues = overdue();
    expect(overdues.length).toBe(1);
  });
  test("should retrieve due today items", () => {
    let today = new Date().toISOString().split("T")[0];
    add({
      title: "Test todo due today",
      completed: false,
      dueDate: today,
    });
    let itemsDueToday = dueToday();
    expect(itemsDueToday.length).toBe(2);
  });
  test("should retrieve due later items", () => {
    let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0];
    add({
      title: "Test todo due later",
      completed: false,
      dueDate: tomorrow,
    });
    let itemsDueLater = dueLater();
    expect(itemsDueLater.length).toBe(1);
  });
});
