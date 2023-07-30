export class BookTransformer {
    transform(book: Record<string, string>) {
        return JSON.stringify(book);
    }
}