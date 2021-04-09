const user = JSON.parse(localStorage.getItem('authUser'));
const root = document.querySelector(":root");

export const getOrgColor = firebase => {
	firebase
		.organization(user.organization)
		.child('/colors')
		.on('value', (snapshot) => {
			const data = snapshot.val();
			const h = data.primaryColor.h;
			const s = data.primaryColor.s;
			const l = data.primaryColor.l;

			return [h, s, l];
		});
};

export const setColorPalette = primaryColorValues => {
	root.style.setProperty(
		'--clr-primary',
		setColor(primaryColorValues, 'primary')
	);
	root.style.setProperty(
		'--clr-primary__brighter',
		setColor(primaryColorValues, 'primary__brighter')
	);
	root.style.setProperty(
		'--clr-primary__dimmer',
		setColor(primaryColorValues, 'primary__dimmer')
	);

	root.style.setProperty(
		'--clr-primary-light',
		setColor(primaryColorValues, 'primary-light')
	);
	root.style.setProperty(
		'--clr-primary-light__dimmer',
		setColor(primaryColorValues, 'primary-light__dimmer')
	);

	console.log(
		`--clr-primary: ${window
			.getComputedStyle(root)
			.getPropertyValue('--clr-primary')}`
	);
	console.log(
		`--clr-primary__brighter: ${window
			.getComputedStyle(root)
			.getPropertyValue('--clr-primary__brighter')}`
	);
	console.log(
		`--clr-primary__dimmer: ${window
			.getComputedStyle(root)
			.getPropertyValue('--clr-primary__dimmer')}`
	);
	console.log(
		`--clr-primary-light: ${window
			.getComputedStyle(root)
			.getPropertyValue('--clr-primary-light')}`
	);
	console.log(
		`--clr-primary-light__dimmer: ${window
			.getComputedStyle(root)
			.getPropertyValue('--clr-primary-light__dimmer')}`
	);
};

const setColor = (primaryColorValues, str) => {
	const [h, s, l] = primaryColorValues;

	let newLightness;

	switch (str) {
		case 'primary':
			newLightness = l;
			break;
		case 'primary__brighter':
			newLightness = l + 4;
			break;
		case 'primary__dimmer':
			newLightness = l - 4;
			break;
		case 'primary-light':
			newLightness = 94;
			break;
		case 'primary-light__dimmer':
			newLightness = 90;
			break;
		default:
			newLightness = l;
			break;
	}

	const hsl = `hsl(${h}, ${s}%, ${newLightness}%)`;

	return hsl;
};