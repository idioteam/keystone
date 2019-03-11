export function role_check (prop, user_role) {
	if (!user_role) {
		user_role = Keystone.user.role;
	}
	return prop[0] === '*' || prop.includes(user_role);
}
