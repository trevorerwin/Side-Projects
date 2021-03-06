/*
    JS File using OOP, prototypes
*/

// Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI(){}

//add book to list
UI.prototype.addBookToList = function(book){
    const list = document.querySelector('#book-list');

    //create tr element
    const row = document.createElement('tr');

    //insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='delete'>X</a></td>
    `;

    list.appendChild(row);
}

//Show alert
UI.prototype.showAlert = function(message, className){
    //create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);

    //timeout after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

//Delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//Clear fields
UI.prototype.clearFields = function (){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

//Event listener for add book
document.querySelector('#book-form').addEventListener('submit', function(e){
    // get values
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;

    //instantiate book
    const book = new Book(title, author, isbn);
    //instantiate UI
    const ui = new UI();

    //validate
    if(title === '' || author === '' || isbn === ''){
        //error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        //add book to list
        ui.addBookToList(book);

        //show success
        ui.showAlert('Book Added!', 'success');

        //clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

//Event listener for delete
document.querySelector('#book-list').addEventListener('click', function(e){

    //instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);

    //Show message
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
})