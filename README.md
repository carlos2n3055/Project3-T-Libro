# T-LIBRO

## ----- BACKEND (SERVER) -----
​
### Books: Endpoints books (GET/POST/PUT/DELETE)
​
​
La Base URL de la API de los libros es `http://localhost:5000/api/books`, con los siguientes endpoints:
​
  | Path        | Method           | Description  |
  | ------------- | ------------- | ------------- |
  | `/getAllBooks` | GET | Muestra la lista de los libros para intercambio o venta |
  | `/getBooksBuyer/:buyer_id` | GET | Muestra la lista de los libros del buyer |
  | `/getMyBooks/:owner_id` | GET | Muestra la lista de los libros del usuario logueado(owner) |
  | `/getOneBook/:book_id` | GET | Muestra los detalles de un libro |
  | `/newBook` | POST | Guarda en la BBDD un nuevo libro |
  | `/editBook/:book_id` | PUT | Edita en la BBDD un libro |
  | `/deleteBook/:book_id` | DELETE | Borra de la BBDD un libro |
  | `/editBookOwner/:book_id` | PUT | Cambia en la BBDD el id de la propiedad "owner" del libro y se cambian "exchange" y "sale" a "false" para sacarlos de la lista de libros disponibles. Se resetea "price=0" |


  
  ### Users: Endpoints users (GET/PUT)
​
​
 La Base URL de la API de los usuarios es `http://localhost:5000/api/users`, con los siguientes endpoints:
​
  | Path        | Method           | Description  |
  | ------------- | ------------- | ------------- |
  | `/getAllUsers` | GET | Muestra la lista de todos los usuarios |
  | `/getOneUser/:user_id` | GET | Muestra los datos de un usuario |
  | `/editUser/:user_id` | PUT | Actualiza los datos de un usuario en la BBDD |
  


### Auth: Endpoints auth (GET/POST)
​
​
 La Base URL de la API de los usuarios es `http://localhost:5000/api/auth`, con los siguientes endpoints:
​
  | Path        | Method           | Description  |
  | ------------- | ------------- | ------------- |
  | `/signup` | POST | Registra un nuevo usuario |
  | `/login` | POST | Inicia sesion un usuario |
  | `/logout` | POST | Cierra la sesion del usuario |
  | `/loggedin` | GET | Comprueba si un usuario tiene la sesion iniciada |



### Comments: Endpoints comments (GET/POST/DELETE)
​
​
 La Base URL de la API de los comentarios es `http://localhost:5000/api/comments`, con los siguientes endpoints:
​
  | Path        | Method           | Description  |
  | ------------- | ------------- | ------------- |
  | `/getAllComments/:book_id` | GET | Muestra todos los comentarios de un libro |
  | `/getOneComment/:comment_id` | GET | Muestra un comentario |
  | `/newComment` | POST | Guarda en la BBDD un nuevo comentario |
  | `/deleteComment/:comment_id` | DELETE | Borra de la BBDD un comentario |



### Transations: Endpoints transations (GET/POST/PUT)
​
​
 La Base URL de la API de las transacciones es `http://localhost:5000/api/transation`, con los siguientes endpoints:
​
  | Path        | Method           | Description  |
  | ------------- | ------------- | ------------- |
  | `/getAllTransation/:owner_id` | GET | Muestra todas las transacciones del usuario logueado(owner) |
  | `/newTransation` | POST | Guarda en la BBDD una nueva transacción |
  | `/editTransation/:trans_id` | PUT | Edita en la BBDD una transacción |
  | `/changeTransationBuy/:trans_id` | PUT | Actualiza en la BBDD la propiedad "buy" a "true" de una transacción para indicar que es una transacción de venta |
  | `/closeTransation/:trans_id` | PUT | Actualiza en la BBDD la propiedad "status" a "true" de una transacción para indicar que se cierra una transacción |




  ## ----- FRONTEND (CLIENT) -----
​
​
La Base URL de la aplicacion T-Libro es `http://localhost:3000`, con los siguientes endpoints:
​
  | Path        | Component           | Description  |
  | ------------- | ------------- | ------------- |
  | `/`  | Index | Vista principal de la aplicacion |
  | `/libros`  | Book-list | Vista de todos los libros |
  | `/libros/:book_id` | Book-details | Vista de los detalles de un libro |
  | `/libros/editar/:book_id` | Book-edit | Vista de un formulario para editar un libro |
  | `/libros/crear` | Book-form | Vista del formulario para crear un nuevo libro |
  | `/registro` | Signup | Vista para crear un nuevo usuario |
  | `/inicio-sesion` | Login | Vista para iniciar sesion |
  | `/perfil` | Profile | Vista del perfil del usuario  |
  | `/editar-perfil/:perfil_id` | User-edit | Vista del formulario para editar los datos usuario |
  | `/miBiblioteca` | MyLibrary | Vista de los libros del usuario logueado  |
 

  ## ----- COMPONENTS SCHEME -----


##### SRC
  
* Components


  + pages

    + BackgroundVideo
      + BackgroundVideo.js
      + BackgroundVideo.css

    + Book-details
      + Book-details.js
      + Book-details.css
    
    + Book-edit
      + Book-edit.js
    
    + Book-form
      + Book-form.js
      
    + Book-list
      + Book-list.js
      + Book-list.css
      + Book-card.js
      + Book-card.css
    
    + Comment-form
      + Comment-form.js

    + Home
      + Home.js
      + Home.css

    + Login
      + Login.js

    + MyLibrary
      + MyLibrary.js
      + MyLibrary.css
      + MyBook-card.js
      + MyBook-card.css

    + Profile
      + Profile.js
      + Profile.css
      + Profile-edit.js
      + Profile-edit.css

    + Signup
      + Signup.js

    + Transations
      + Transations.js
    

  + layout
    + Navigation
      + Navigation.js
      + Navigation.css
    
    + Footer
      + Footer.js
      + Footer.css
      

  + shared
    + Alert
      + Alert.js

    + Popup
      + Popup.js


 	 
* service
	+ auth.service.js
	+ book.service.js
  + comments.service.js
  + transation.service.js
  + upload.service.js
	+ users.service.js