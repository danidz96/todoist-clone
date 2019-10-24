import { collatedTasks } from '../constants';

export const getTitle = (projects, projectId: string) => projects.find((project) => project.projectId === projectId);

export const getCollatedTitle = (projects, key: string) => projects.find((project) => project.key === key);

export const collatedTasksExist = (selectedProject: string) =>
	collatedTasks.find((task) => task.key === selectedProject);

export const generatePushId = (() => {
	const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

	const lastRandChars = [];

	return function() {
		let now: number = new Date().getTime();

		const timeStampChars = new Array(8);
		for (var i = 7; i >= 0; i--) {
			timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
			now = Math.floor(now / 64);
		}

		let id: string = timeStampChars.join('');

		for (i = 0; i < 12; i++) {
			id += PUSH_CHARS.charAt(lastRandChars[i]);
		}

		return id;
	};
})();
