![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-starter

This repo contains example nodes to help you get started building your own custom integrations for [n8n](https://n8n.io). It includes the node linter and other dependencies.

To make your custom node available to the community, you must create it as an npm package, and [submit it to the npm registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry).

If you would like your node to be available on n8n cloud you can also [submit your node for verification](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/).

## Prerequisites

You need the following installed on your development machine:

* [git](https://git-scm.com/downloads)
* Node.js and npm. Minimum version Node 20. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
* Install n8n with:
  ```
  npm install n8n -g
  ```
* Recommended: follow n8n's guide to [set up your development environment](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).

## Using this starter

These are the basic steps for working with the starter. For detailed guidance on creating and publishing nodes, refer to the [documentation](https://docs.n8n.io/integrations/creating-nodes/).

1. [Generate a new repository](https://github.com/n8n-io/n8n-nodes-starter/generate) from this template repository.
2. Clone your new repo:
   ```
   git clone https://github.com/<your organization>/<your-repo-name>.git
   ```
3. Run `npm i` to install dependencies.
4. Open the project in your editor.
5. Browse the examples in `/nodes` and `/credentials`. Modify the examples, or replace them with your own nodes.
6. Update the `package.json` to match your details.
7. Run `npm run lint` to check for errors or `npm run lintfix` to automatically fix errors when possible.
8. Test your node locally. Refer to [Run your node locally](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/) for guidance.
9. Replace this README with documentation for your node. Use the [README_TEMPLATE](README_TEMPLATE.md) to get started.
10. Update the LICENSE file to use your details.
11. [Publish](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) your package to npm.

## More information

Refer to our [documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) for detailed information on building your own nodes.

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)

# Tillit MES n8n Node

This package provides a custom n8n node for integrating with the Tillit MES platform, supporting both the Digital Operations (DO) and Scheduler APIs.

## Features
- Supports both DO and Scheduler APIs
- Handles API Key and Bearer Token authentication
- Lets you specify your Tillit tenant URL
- Supports all major resources and operations (users, assets, orders, activities, events, materials, translations, scheduler availabilities, orders, scenarios, equipment, personnel, etc.)

## Setup
1. **Credentials**: Add a new credential of type "Tillit MES API" in n8n. Enter your tenant URL and choose your authentication method (API Key or Bearer Token).
2. **Node Usage**: Add the "Tillit MES" node to your workflow. Select the API type (DO or Scheduler), resource, and operation. Fill in any required parameters.

## Example
- To get all users from the DO API:
  - API Type: Digital Operations (DO)
  - Resource: User
  - Operation: Get All

- To create a scheduler availability:
  - API Type: Scheduler
  - Resource: Availability
  - Operation: Create
  - Data Template: (your template)
  - Request Body: (your JSON)

## Documentation
- For full API details, see the [Tillit Help Docs](https://help.tillit.cloud/tillit)
- This node is designed to be easily extended for new endpoints or custom logic.

---

For questions or support, contact [support@gotillit.com](mailto:support@gotillit.com).
