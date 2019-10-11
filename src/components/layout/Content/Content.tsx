import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Tasks } from '../../Tasks/Tasks';
import './Content.scss';

interface Props {}

export const Content: React.FC<Props> = () => {
	return (
		<section className="content">
			<Sidebar />
			<Tasks />
		</section>
	);
};
