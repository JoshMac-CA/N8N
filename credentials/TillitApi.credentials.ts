import {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TillitApi implements ICredentialType {
	name = 'tillitApi';
	displayName = 'Tillit MES API';
	documentationUrl = 'https://help.tillit.cloud/tillit';
	properties: INodeProperties[] = [
		{
			displayName: 'Tenant URL',
			name: 'tenantUrl',
			type: 'string',
			default: '',
			placeholder: 'https://your-tenant.tillit.cloud',
			description: 'Your Tillit tenant URL',
			required: true,
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			placeholder: 'username',
			description: 'Your Tillit username',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Password for your Tillit service account',
			required: true,
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.tenantUrl}}',
			url: '/tenant/user/me',
			method: 'GET',
		},
	};
}
