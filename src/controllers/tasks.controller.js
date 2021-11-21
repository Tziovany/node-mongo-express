import Task from "../models/Task";

export const renderTasks = async (req, res) => {
  const tasks = await Task.find().lean();
  res.render("index", { tasks: tasks });
};

export const createTask = async (req, res) => {
  try {
    const task = Task(req.body);
    const taskSaved = await task.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

export const renderTaskEdit = async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.id).lean();

    res.render("edit", { task: tasks });
  } catch (err) {
    console.log(err.message);
  }
};

export const editTask = async (req, res) => {
  const { id } = req.params;

  await Task.findByIdAndUpdate(id, req.body);

  res.redirect("/");
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);

  res.redirect("/");
};

export const taskToggleDone = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  task.done = !task.done;

  await task.save();

  res.redirect("/");
};
