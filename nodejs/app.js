const http = require('http');

const port = process.env.PORT || 3000;

function findMatchedPattern(url, patterns) {
    const urlParts = url.split('/');
    for (let pattern of patterns) {
        const patternParts = pattern.split('/');
        if (urlParts.length !== patternParts.length) {
            continue;
        }

        const values = {};
        let isMatch = true;
        for (let i = 0; i < urlParts.length; i++) {
            const urlPart = urlParts[i];
            const patternPart = patternParts[i];
            if (patternPart.startsWith(':')) {
                values[patternPart.slice(1)] = urlPart;
            } else if (urlPart !== patternPart) {
                isMatch = false;
                break;
            }
        }

        if (isMatch) {
            return {
                url: pattern,
                values
            };
        }
    }

    return undefined;
}


class App {
    #handlers = {};
    #notFoundHandler = this.getNotFoundHandler();
    
    setNotFoundHandler(handler) {
        this.#notFoundHandler = handler;
    }

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
        if(!url.startsWith('/')) {
            url = '/' + url;
        }
        
        return `${method} ${url}`;
    }
    
    getNotFoundHandler() {
        return (req, res) => {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end('Not Found');
        }   
    }

    handle(req, res) {
        const { method, url } = req;
        const normalizedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
        const handlerConfig = this.getHandlerByDirectMatch(method, normalizedUrl) 
            || this.getHandlerByPatternMatch(method, normalizedUrl)
            || { handler: this.getNotFoundHandler() };
        
        if (handlerConfig) {
            const { handler, values } = handlerConfig;
            handler(req, res, values);
        }
    }
    
    getHandlerByDirectMatch(method, url) {
        const directMatch = this.getHandlerKey(method, url);
        const handler = this.#handlers[directMatch];
        return handler ? {
            handler,
        } : undefined;
    }

    getHandlerByPatternMatch(method, url) {
        const keysWithPatterns = Object.keys(this.#handlers).filter(key => key.includes(':'));
        const urlPatterns = keysWithPatterns.map(key => key.split(' ')[1]);
        const matchedUrlPattern = findMatchedPattern(url, urlPatterns);
        if (matchedUrlPattern) {
            const handlerKey = this.getHandlerKey(method, matchedUrlPattern.url);
            const handler = this.#handlers[handlerKey];
            return handler ? {
                handler,
                values: matchedUrlPattern.values
            } : undefined;
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

module.exports = { App, findMatchedPattern }



