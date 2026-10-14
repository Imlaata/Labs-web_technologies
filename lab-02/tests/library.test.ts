import { expect } from 'chai';
import { Library } from '../src/services/Library';
import { Book } from '../src/models/Book';

describe('Library Generic Class Tests', () => {
    let library: Library<Book>;

    beforeEach(() => {
        library = new Library<Book>();
    });

    it('should add a book to the library', () => {
        const book = new Book('1', 'Clean Code', 'Robert Martin', 2008);
        library.add(book);
        expect(library.getAll()).to.have.lengthOf(1);
        expect(library.findById('1')).to.equal(book);
    });

    it('should remove a book by id', () => {
        const book = new Book('2', 'Refactoring', 'Martin Fowler', 1999);
        library.add(book);
        const removed = library.remove('2');
        expect(removed).to.be.true;
        expect(library.getAll()).to.be.empty;
    });

    it('should search books by predicate', () => {
        library.add(new Book('1', 'TypeScript Handbook', 'Microsoft', 2021));
        library.add(new Book('2', 'JavaScript Guide', 'Mozilla', 2020));

        const results = library.search((b) => b.title.includes('TypeScript'));
        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('1');
    });
});