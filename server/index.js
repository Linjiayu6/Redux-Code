const PORT = process.env.port || 8080;

const Koa = require('koa');
const Router = require('koa-router');

const routerMiddleware = require('./middleware/routerMiddleware');
const devHotMiddleware = require('./middleware/devHotMiddleware');

const app = new Koa();

devHotMiddleware(app);

const router = new Router();
app.use(routerMiddleware(Router));
app.use(router.allowedMethods());
app.listen(PORT);

console.log(`http server is listening port ${PORT}`);
