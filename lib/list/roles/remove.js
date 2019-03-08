function remove_role (value) {
	this.roles = this.roles.filter(r => r.value !== value);
}

module.exports = remove_role;
