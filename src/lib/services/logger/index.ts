import { Logger } from 'tslog';

const logger = new Logger({
	name: 'user-management-logger',
	type: 'pretty',
	hideLogPositionForProduction: false
});

export default logger;
