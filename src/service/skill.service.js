const fs = require('fs');
const path = './storage/storage.json';

function getAllSkills() {
    const data = JSON.parse(fs.readFileSync(path));
    return data;
}

function createSkill(title) {
    const data = JSON.parse(fs.readFileSync(path));
    const filtered = data.filter((el) => el.title == title);
    if (!filtered.length == data.length) throw new Error('такой title')
    const item = {
        id: data.length + 1,
        title: title
    }
    data.push(item)
    fs.writeFileSync(path, JSON.stringify(item))
    return data;
}

function updateSkills(id, title) {
    const data = JSON.parse(fs.readFileSync(path));
    const filtered = data.filter((el) => el.id != id);
    if (filtered.length == data.length) throw new Error('takogo id ne najdeno')
    const item = { id, title }
    filtered.push(item);
    fs.writeFileSync(path, JSON.stringify(filtered))
    return filtered
}

function deleteSkills(id) {
    const data = JSON.parse(fs.readFileSync(path));
    const filtered = data.filter((el) => el.id != id);
    if (filtered.length == data.length) throw new Error('id otsutstvuet')
    fs.writeFileSync(path, JSON.stringify(filtered));
    return filtered;
}

module.exports = { getAllSkills, createSkill, updateSkills, deleteSkills }