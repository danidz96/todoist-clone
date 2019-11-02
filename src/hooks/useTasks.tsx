import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import { ITask } from '../model/ITask';

export const useTasks = (selectedProject: string) => {
	const [ tasks, setTasks ] = useState<ITask[]>([]);
	const [ archivedTasks, setArchivedTasks ] = useState<ITask[]>([]);

	useEffect(
		() => {
			let unsubscribe: any = firebase
				.firestore()
				.collection('tasks')
				.where('userId', '==', 'PIlfw5ql9ExmqixfenaK');

			if (selectedProject && !collatedTasksExist(selectedProject)) {
				unsubscribe = unsubscribe.where('projectId', '==', selectedProject);
			} else {
				switch (selectedProject) {
					case 'TODAY':
						unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY'));
						break;
					case 'INBOX':
					case '0':
						unsubscribe = unsubscribe.where('date', '==', '');
						break;
					default:
						unsubscribe = unsubscribe;
						break;
				}
			}

			unsubscribe = unsubscribe.onSnapshot((snapshot) => {
				const newTasks = snapshot.docs.map((task) => ({
					id: task.id,
					...task.data()
				}));

				setTasks(
					selectedProject === 'NEXT_7'
						? newTasks.filter(
								(task) =>
									moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && task.archived !== true
							)
						: newTasks.filter((task) => task.archived !== true)
				);
				setArchivedTasks(newTasks.filter((task) => task.archived !== false));
			});

			return () => unsubscribe();
		},
		[ selectedProject ]
	);
	return { tasks, archivedTasks };
};
