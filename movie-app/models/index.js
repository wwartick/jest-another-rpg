const User = require('./User');
const Movie = require('./Movie');

User.hasMany(Movie, {
  foreignKey: 'user_id'
});

Movie.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Movie };