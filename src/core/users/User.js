class User {
  constructor(id, email, password, created, modified) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.created = created;
    this.modified = modified;
  }
}

module.exports = User;
