const http= require('http');

const port = process.env.PORT || 3000;

class App {
    #handlers = {};
    addGetHandler(url, handler) {
        this.addHandler(url, 'GET', handler)
    }
    addPostHandler(url, handler) {
        this.addHandler(url, 'POST', handler)
    }
    addDeleteHandler(url, handler) {
        this.addHandler(url, 'DELETE', handler)
    }
    addPutHandler(url, handler) {
        this.addHandler(url, 'PUT', handler)
    }
    addHandler(url, method, handler) {
        this.#handlers[this.getHandlerKey(method, url)] = handler;
    }

    getHandlerKey(method, url) {
        return `${method} ${url}`;
    }

    handle(req, res) {
        const key = this.getHandlerKey(req.method, req.url);
        const handler = this.#handlers[key];

        console.log(req.params)
        if (handler) {
            handler(req, res);
        } else {

            const paramHandlerKey = Object.keys(this.#handlers).find((key) => {
                const [method,route] = key.split(' ');
                const routeParts = route.split('/');
                const pathParts = req.url.split('/');

                console.log(pathParts)
                console.log(routeParts)
                
                return !(method !== req.method || routeParts.length !== pathParts.length);
            });
            
            if (paramHandlerKey) {
                const foundHandel = this.#handlers[paramHandlerKey];
                foundHandel(req, res)
            } else {
                res.statusCode = 404;
                res.end('url not found');
            }
        }
    }

    run() {
        const server = http.createServer((req, res) => {
            this.handle(req, res)
        });


        server.listen(port, () => {
            console.log("Server was launched");
        });
    }
}

module.exports = App





