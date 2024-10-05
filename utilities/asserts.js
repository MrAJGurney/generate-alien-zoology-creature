const assertIsType = (value, type) => {
	if (typeof value !== type) {
		throw new Error(`Must be a ${type}: "${value}" has type ${typeof value}`);
	}
}

export const assertIsNumber = value => assertIsType(value, 'number');

export const assertIsString = value => assertIsType(value, 'string');