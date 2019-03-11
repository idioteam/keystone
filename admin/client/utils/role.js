/**
 * Verifica che l'utente abbia diritto all'azione identificata dalla proprietà prop
 * @param prop				la proprietà contenente i ruoli autorizzati
 * @param data_id			id dell'oggetto corrente se corrisponde all'utente corrente autorizza l'utente all'azione
 * 										(utilizzato per modificare il proprio profilo utetne)
 * @param user_role		il ruolo dell'utente. Se omesso viene utilizzato l'oggetto globale Keystone.user
 * @returns {boolean}
 */
export function role_check (prop, data_id, user_role) {
	if (data_id) {
		if (data_id === Keystone.user.id) return true;
	}
	return (prop[0] === '*' || prop.includes(user_role || Keystone.user.role));
}
