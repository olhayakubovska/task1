const yargs = require("yargs");

const pkg = require("./package.json");

const { addNote, getNotes, removeItem } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    console.log("Add command", title);
    addNote(title);
  },
});
yargs.command({
  command: "list",
  describe: "Prints all list",
  async handler() {
    const notes = await getNotes();
    const newNotes = notes.map(({ title, id }) => console.log(id, title));
    return newNotes;
  },
});
yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id: {
      type: "string",
      describe: "remove note",
      demandOption: true,
    },
  },
  async handler({ id }) {
    removeItem(id);
  },
});

yargs.parse();
