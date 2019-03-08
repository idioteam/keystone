function add_role (label, value) {
	value = value || label.toLowerCase().replace(/\s/g, '-');
	this.roles.push({label: label, value: value});
}

module.exports = add_role;
