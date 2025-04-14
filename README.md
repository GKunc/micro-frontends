# micro-frontends

# Module Federation - React Monnorepo setup

https://module-federation.io/practice/frameworks/react/using-nx-for-react.html

# Tutorial

1. NX create workspace - npx -y create-nx-workspace@latest myorg --preset=apps
2. Add react plugin - npx nx add @nx/react
3. Create shell and remote - npx nx g @nx/react:host apps/shell --remotes=remote
4. Start project - npx nx serve shell
5. Add next remote - npx nx g @nx/react:remote apps/login --host=shop
6. Open app - http://localhost:4200/
7. Experiment

# Angular

npx create-nx-workspace@latest agh_angular --preset=apps
cd agh_angular
npx nx add @nx/angular
nx g @nx/angular:remote apps/remote --prefix=agh_angular

npx nx build remote
npm install --global http-server
http-server -p 4202 --cors -o dist/apps/remote

# Important topics

1. Iframe vs Module Federation
2. Style leaking - classNames
3. Commonication between apps - npm i react-bus
4. Routing
5. Deploying only affected apps
