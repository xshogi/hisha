This project is inspired from Adminium and pgweb. These projects are cross platform postgres editors. The features are:

1. Cross-platform.
2. Click cell to edit. Enter to save.

But Adminium does not open as a public service but only be an add-on of heroku. pgweb is lack of saving data by press enter. Both of them do not provide user management.


## How to use

There are two parts of this client.

1. API: In this part, you will need to defined logic of CRUD operation of Postgres SQL Database.
2. UI: here is a web-base user interface for users to management the database and 

This platform provide two methods to manipulate Postgres SQL. One is native SQL string. You can use SQL syntax to do create, update, read and detele of data just like traditional database management softwares. The other way is WYSIWYG editors. For creating table, there is an HTML form for you to add new colume into schema and define the type, nullable, default value, and other properties. To update existed data entry, you can go into target table, simply select the cell of entry you would like to edit and double click the cell to edit. It's also easy to save the editing. All you need to do is press enter key or click check button. Then the JavaScript behind this base will make an Ajax request your API backend to finish the update operation.