module.exports = {
	credentials: {
		TillitApi: require('./dist/credentials/TillitApi.credentials.js').TillitApi,
	},
	nodes: {
		Do: require('./dist/nodes/DO/Do.node.js').Do,
		Scheduler: require('./dist/nodes/Scheduler/Scheduler.node.js').Scheduler,
	},
};
