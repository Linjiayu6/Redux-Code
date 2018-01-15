const fs = require('fs');
const ejs = require('ejs');

// 前端
const view = (router) => {
  // 如果本地请求的是本地资源, 需要资源过滤
  // router.get('/public/*', async (ctx) => {
  //   ctx.body = fs.readFileSync(`./dist${ctx.request.url}`, 'utf8');
  // });

  router.get('*', async (ctx, next) => {
    const ejsOpts = {
      development: true,
    };

    const templateHtml = fs.readFileSync('./server/view.html', 'utf8');
    const viewHtml = ejs.render(templateHtml, ejsOpts, { _with: true });

    ctx.status = 200;
    ctx.response.type = 'text/html';
    ctx.response.body = viewHtml;

    await next();
  });
};

const routerMiddleware = (Router) => {
  const router = new Router();
  view(router);

  return router.routes();
};

module.exports = routerMiddleware;
