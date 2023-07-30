const { findMatchedPattern } = require("./app");

describe('find match pattern', function () {
    describe('match to one to one', () => {
        test('/books/123 => books/:id', () => {
            const result = findMatchedPattern('/books/123', ['/books/:id']);
            expect(result).toEqual({
                url: '/books/:id',
                values: {
                    id: '123'
                }
            });
        });

        test('/books/123/sites/45 => books/:bookId/sites/:siteId', () => {
            const result = findMatchedPattern('/books/123/sites/45', ['/books/:bookId/sites/:siteId']);
            expect(result).toEqual({
                url: '/books/:bookId/sites/:siteId',
                values: {
                    bookId: '123',
                    siteId: '45'
                }
            });
        });
    })
    
    describe('match to one to many', () => {
        test('/books/123/sites/45 => books/:bookId/sites/:siteId from many', () => {
            const result = findMatchedPattern('/books/123/sites/45', ['/books/:id', '/books/:bookId/sites/:siteId']);
            expect(result).toEqual({
                url: '/books/:bookId/sites/:siteId',
                values: {
                    bookId: '123',
                    siteId: '45'
                }
            });
        });
    });
        
});