/**
 * Ritorna un array contenente i ruoli che hanno accesso alla lista
 * @param list_roles
 * @returns {*}
 */
function set_roles (list_roles) {

	if (!list_roles || list_roles === '*') {
		return ['*'];
	}
	//	trasformo list_roles da stringa in oggetto separando i ruoli consentiti da quelli bloccati
	list_roles = list_roles.split(',').reduce((acc, r) => {
		r = r.trim();
		acc[r.substring(0, 1) === '-' ? 'deny' : 'allow'][r.replace(/^\W/,'') ] = true;
		return acc;
	}, { allow: {}, deny: {} });

	//	trasformo i ruoli settati sulla lista in oggetto
	const ruoli = this.roles.reduce((acc, r) => {
		acc[r.value] = true;
		return acc;
	}, {});

	let allowed_roles = [];
	//	processo i ruoli consentiti
	if (Object.keys(list_roles.allow).length) {
		allowed_roles = Object.keys(list_roles.allow).filter(r => ruoli[r]);
	}
	//	processo i ruoli bloccati
	if (Object.keys(list_roles.deny).length) {
		allowed_roles = (allowed_roles.length ? allowed_roles : this.roles.map(r => r.value)).filter(r => !list_roles.deny[r])
	}

	return allowed_roles;
}

module.exports = set_roles;
