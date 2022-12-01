class User {
  constructor(email, password) {
    this.id = undefined;
    this.email = email;
    this.password = password;
    this.created = new Date().toISOString();
    this.modified = this.created;
  }

  getId() {
    return this.id;
  }

  store(provider) {
    provider.create({
      email: this.email,
      password: this.password,
      created: this.created,
      modified: this.modified,
    });
    this.id = 123;
  }

  toJson() {
    return {
      id: this.id,
      email: this.email,
      created: this.created,
      modified: this.modified,
    };
  }
  // delete() {}
  // load() {}
}

module.exports = User;
