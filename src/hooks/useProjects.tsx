import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

export const useProjects = () => {
	const [ projects, setProjects ] = useState<any[]>([]);

	useEffect(
		() => {
			firebase
				.firestore()
				.collection('projects')
				.where('userId', '==', 'PIlfw5ql9ExmqixfenaK')
				.orderBy('projectId')
				.get()
				.then((snapshot) => {
					const allProjects = snapshot.docs.map((project) => ({ docId: project.id, ...project.data() }));
					console.log(allProjects);

					if (JSON.stringify(allProjects) !== JSON.stringify(allProjects)) {
						setProjects(allProjects);
					}
				});
		},
		[ projects ]
	);

	return { projects, setProjects };
};
