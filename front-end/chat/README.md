# Development

```bash
npm install
npm run local-dev
```

You can see the changes in the browser by going to http://localhost:8000/chat/. Also hot reloading is enabled so changes should be reflected in the browser almost immediately.

Can set the development server url in django settings.

## Storybook

All components can be seen and interacted with in Storybook.

```bash
npm run storybook
```

Note: To run Storybook you need to have Node.js 18 or higher.

# Production

Before building, the env file must be created as shown in the .env-sample file.

```bash
npm run build
```

After building, the files will be in the `static/front-end/chat` directory.

Note: If a change is made, `npm run build` must be run again to deploy.