class User {
  constructor(email, password) {
    this.id = undefined;
    this.email = email;
    this.password = password;
    this.created = '2021-08-23 21:33:00';
    this.modified = '2021-08-23 21:33:00';
  }

  getId() {
    return this.id;
  }

  store(provider) {
    // provider.save(this);
    this.id = 123;
  }

  toJson() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      created: this.created,
      modified: this.modified,
    };
  }
  // delete() {}
  // load() {}
}

module.exports = User;
