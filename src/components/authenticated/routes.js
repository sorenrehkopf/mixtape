import React from 'react';
import Dashboard from '../dashboard';
import Songs from '../songs';

const routes = {
	"/": <Dashboard />,
	"/songs": <Songs />
};

export default routes;