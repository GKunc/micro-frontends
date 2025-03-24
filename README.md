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
