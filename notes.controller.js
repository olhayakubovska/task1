const fs = require("fs/promises");
const path = require("path");

const notesPath = path.join(__dirname, "db.json");
console.log(notesPath);

async function addNote(title) {
  //   const notes = require("./db.json");
  //   const notes = await fs.readFile(notesPath,{encoding:'utf-8'});
  //   const notes = Buffer.from(buffer).toString("utf-8");
  //   console.log(typeof JSON.parse(notes));

  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}
async function removeItem(id) {
  const notes = await getNotes();

  const updateNotes = notes.filter((item) => item.id !== id);
  const newNotes = await fs.writeFile(notesPath, JSON.stringify(updateNotes));
  return;
}

module.exports = {
  addNote,
  getNotes,
  removeItem,
};
