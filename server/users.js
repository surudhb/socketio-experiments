const users = [];

const isUserNameInRoom = (name, room) =>
  users.find((user) => user.room === room && user.name === name);

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (isUserNameInRoom(name, room))
    return { status: `ERROR`, body: `Username ${name} is taken.` };

  const user = { id, name, room };
  users.push(user);

  return { status: `SUCCESS`, body: `User ${user.name} successfully added.` };
};

const removeUser = (id) => {
  const deletedUser = users.find((user) => user.id === id);
  users.filter((user) => user.id !== id);
  if (deletedUser) {
    return { status: `SUCCESS`, body: `Deleted user: ${deletedUser.id}` };
  } else {
    return { status: `ERROR`, body: `User ${id} not found.` };
  }
};

const getUser = (id) => {
  const user = users.find((user) => user.id === id);
  if (user) {
    return { status: `SUCCESS`, body: user };
  } else {
    return { status: `ERROR`, body: `User ${id} not found.` };
  }
};

const getUsersInRoom = (room) => {
  const users = users.filter((user) => user.room === room);
  if (users) {
    return { status: `SUCCESS`, body: users };
  } else {
    return { status: `ERROR`, body: `No users found in ${room}` };
  }
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
