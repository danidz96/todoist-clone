import { collatedTasks } from '../constants';

export const collatedTasksExist = (selectedProject: string) =>
	collatedTasks.find((task) => task.key === selectedProject);
