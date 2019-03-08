/**
 * Ritorna un array contenente i ruoli che hanno accesso alla lista
 * @param uiRoles
 * @returns {*}
 */
function set_uiRoles (uiRoles) {

	if (!uiRoles || uiRoles === '*') {
		return ['*'];
	}
	//	trasformo uiRoles da stringa in oggetto separando i ruoli consentiti da quelli bloccati
	uiRoles = uiRoles.split(',').reduce((acc, r) => {
		r = r.trim();
		acc[r.substring(0,1) === '-' ? 'deny' : 'allow'][r.replace(/^\W/,'') ] = true;
		return acc;
	}, {allow: {}, deny: {}})

	//	trasformo i ruoli settati sulla lista in oggetto
	const ruoli = this.roles.reduce((acc, r) => {
		acc[r.value] = true;
		return acc;
	}, {});

	let allowed_roles = [];
	//	processo i ruoli consentiti
	if (Object.keys(uiRoles.allow).length) {
		allowed_roles = Object.keys(uiRoles.allow).filter(r => ruoli[r]);
	}
	//	processo i ruoli bloccati
	if (Object.keys(uiRoles.deny).length) {
		allowed_roles = (allowed_roles.length ? allowed_roles : this.roles.map(r => r.value)).filter(r => !uiRoles.deny[r])
	}

	return allowed_roles;
}

module.exports = set_uiRoles;
