import { collatedTasks } from '../constants';

export const getTitle = (projects, projectId: string) => projects.find((project) => project.projectId === projectId);

export const getCollatedTitle = (projects, key: string) => projects.find((project) => project.key === key);

export const collatedTasksExist = (selectedProject: string) =>
	collatedTasks.find((task) => task.key === selectedProject);
