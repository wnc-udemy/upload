const roles = ['user', 'student', 'instructor', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['optional.get']);
roleRights.set(roles[1], ['image.upload', 'video.upload']);
roleRights.set(roles[2], ['image.upload', 'video.upload']);
roleRights.set(roles[3], ['image.upload', 'video.upload']);

module.exports = {
  roles,
  roleRights,
};
