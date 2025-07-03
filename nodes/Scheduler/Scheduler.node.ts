import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	NodeConnectionType,
} from 'n8n-workflow';

export class Scheduler implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Scheduler',
		name: 'scheduler',
		icon: 'file:tillit-scheduler.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Tillit Scheduler API. View API documentation at https://[tenant].tillit.cloud/assets/swagger/index.html#/',
		defaults: {
			name: 'Scheduler',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'tillitApi',
				required: true,
			},
		],

		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Availability',
						value: 'availability',
					},
					{
						name: 'Equipment',
						value: 'equipment',
					},
					{
						name: 'Material',
						value: 'material',
					},
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Personnel',
						value: 'personnel',
					},
					{
						name: 'Scenario',
						value: 'scenario',
					},
				],
				default: 'availability',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['availability'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new availability',
						action: 'Create an availability',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an availability',
						action: 'Delete an availability',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an availability by ID',
						action: 'Get an availability',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many availabilities',
						action: 'Get many availabilities',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an availability',
						action: 'Update an availability',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['order'],
					},
				},
				options: [
					{
						name: 'Auto Shift Orders',
						value: 'autoShift',
						action: 'Auto shift orders',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new order',
						action: 'Create an order',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an order',
						action: 'Delete an order',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an order by ID',
						action: 'Get an order',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many orders',
						action: 'Get many orders',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an order',
						action: 'Update an order',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['material'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new material',
						action: 'Create a material',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a material',
						action: 'Delete a material',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a material by ID',
						action: 'Get a material',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many materials',
						action: 'Get many materials',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a material',
						action: 'Update a material',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['equipment', 'personnel', 'scenario'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new resource',
						action: 'Create a resource',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a resource',
						action: 'Delete a resource',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a resource by ID',
						action: 'Get a resource',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many resources',
						action: 'Get many resources',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a resource',
						action: 'Update a resource',
					},
				],
				default: 'getAll',
			},
			// Common parameters
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['get', 'update', 'delete'],
					},
				},
				description: 'The ID of the resource',
				required: true,
			},
			{
				displayName: 'Data Template',
				name: 'dataTemplate',
				type: 'string',
				default: '',
				description: 'Data template for scheduler operations',
				required: true,
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'Number of results to skip',
					},
					{
						displayName: 'Sort By',
						name: 'sortBy',
						type: 'string',
						default: '',
						description: 'Field to sort by',
					},
					{
						displayName: 'Sort Order',
						name: 'sortOrder',
						type: 'options',
						options: [
							{
								name: 'Ascending',
								value: 'asc',
							},
							{
								name: 'Descending',
								value: 'desc',
							},
						],
						default: 'asc',
					},
				],
			},
			{
				displayName: 'JSON Parameters',
				name: 'jsonParameters',
				type: 'boolean',
				default: false,
				description: 'Whether to pass the request parameters as JSON',
			},
			{
				displayName: 'Request Body',
				name: 'requestBody',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						operation: ['create', 'update'],
						jsonParameters: [true],
					},
				},
				description: 'Request body as JSON',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let endpoint = '';
		let method = 'GET';
		let body: IDataObject = {};

		// Get credentials for Basic Authentication
		const credentials = await this.getCredentials('tillitApi');

		for (let i = 0; i < items.length; i++) {
			try {
				// Build endpoint and method for Scheduler API
				const dataTemplate = this.getNodeParameter('dataTemplate', i) as string;
				const id = this.getNodeParameter('id', i, '') as string;

				switch (resource) {
					case 'availability':
						switch (operation) {
							case 'getAll':
								endpoint = `/api/scheduler/availabilities?dataTemplate=${dataTemplate}`;
								method = 'GET';
								break;
							case 'get':
								endpoint = `/api/scheduler/availabilities/${id}?dataTemplate=${dataTemplate}`;
								method = 'GET';
								break;
							case 'create':
								endpoint = `/api/scheduler/availabilities?dataTemplate=${dataTemplate}`;
								method = 'POST';
								break;
							case 'update':
								endpoint = `/api/scheduler/availabilities/${id}?dataTemplate=${dataTemplate}`;
								method = 'PUT';
								break;
							case 'delete':
								endpoint = `/api/scheduler/availabilities/${id}?dataTemplate=${dataTemplate}`;
								method = 'DELETE';
								break;
						}
						break;
					case 'order':
						switch (operation) {
							case 'getAll':
								endpoint = `/api/scheduler/orders?dataTemplate=${dataTemplate}`;
								method = 'GET';
								break;
							case 'get':
								endpoint = `/api/scheduler/orders/${id}?dataTemplate=${dataTemplate}`;
								method = 'GET';
								break;
							case 'create':
								endpoint = `/api/scheduler/orders?dataTemplate=${dataTemplate}`;
								method = 'POST';
								break;
							case 'update':
								endpoint = `/api/scheduler/orders/${id}?dataTemplate=${dataTemplate}`;
								method = 'PUT';
								break;
							case 'delete':
								endpoint = `/api/scheduler/orders/${id}?dataTemplate=${dataTemplate}`;
								method = 'DELETE';
								break;
							case 'autoShift':
								endpoint = `/api/scheduler/auto-shift-orders`;
								method = 'POST';
								break;
						}
						break;
					default:
						// Generic CRUD operations for other scheduler resources
						switch (operation) {
							case 'getAll':
								endpoint = `/api/scheduler/${resource}?dataTemplate=${dataTemplate}`;
								method = 'GET';
								break;
							case 'get':
								endpoint = `/api/scheduler/${resource}/${id}?dataTemplate=${dataTemplate}`;
								method = 'GET';
								break;
							case 'create':
								endpoint = `/api/scheduler/${resource}?dataTemplate=${dataTemplate}`;
								method = 'POST';
								break;
							case 'update':
								endpoint = `/api/scheduler/${resource}/${id}?dataTemplate=${dataTemplate}`;
								method = 'PUT';
								break;
							case 'delete':
								endpoint = `/api/scheduler/${resource}/${id}?dataTemplate=${dataTemplate}`;
								method = 'DELETE';
								break;
						}
						break;
				}

				// Handle request body for create/update operations
				if (['POST', 'PUT', 'PATCH'].includes(method)) {
					const jsonParameters = this.getNodeParameter('jsonParameters', i) as boolean;

					if (jsonParameters) {
						const requestBody = this.getNodeParameter('requestBody', i) as string;
						if (requestBody) {
							try {
								body = JSON.parse(requestBody);
							} catch (error) {
								throw new NodeOperationError(this.getNode(), 'Invalid JSON in request body');
							}
						}
					} else {
						// Use item data as body
						body = items[i].json;
					}
				}

				// Add query parameters
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
				const qs: IDataObject = {};

				if (additionalFields.limit) qs.limit = additionalFields.limit;
				if (additionalFields.offset) qs.offset = additionalFields.offset;
				if (additionalFields.sortBy) qs.sortBy = additionalFields.sortBy;
				if (additionalFields.sortOrder) qs.sortOrder = additionalFields.sortOrder;

				// Prepare request options with authentication
				const requestOptions: any = {
					method: method as any,
					url: endpoint,
					qs,
					body: Object.keys(body).length ? body : undefined,
				};

				// Add Basic Authentication headers
				const authString = `${credentials.username}:${credentials.password}`;
				const encodedAuth = Buffer.from(authString).toString('base64');

				requestOptions.headers = {
					Authorization: `Basic ${encodedAuth}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				};

				// Construct full URL
				const fullUrl = `${credentials.tenantUrl}${endpoint}`;

				// Make the API request
				const responseData = await this.helpers.request({
					...requestOptions,
					url: fullUrl,
				});

				if (Array.isArray(responseData)) {
					returnData.push(...responseData);
				} else {
					returnData.push(responseData);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
