# T-LIBRO

## ----- BACKEND (SERVER) -----
​
### Book: Endpoints books (GET/POST/PUT/DELETE)
​
​
La Base URL de la API de los libros es `http://localhost:5000/api/books`, con los siguientes endpoints:
​
  | Path        | Method           | Description  |
  | ------------- | ------------- | ------------- |
  | `/getAllBooks`  | GET | Muestra todos los libros |
  | `/getOneBook/:book_id` | GET | Muestra los detalles de un libro |
  | `/newBook` | POST | Crea un nuevo libro |
  | `/editBook/:book_id` | PUT | Edita un libro |
  | `/deleteBook/:book_id` | DELETE | Elimina un libro |
 
  
  
  ### Users: Endpoints users (GET/PUT)
​
​
 La Base URL de la API de los usuarios es `http://localhost:5000/api/users`, con los siguientes endpoints:
​
  | Path        | Method           | Description  |
  | ------------- | ------------- | ------------- |
  | `/getAllUsers` | GET | Muestra todos los usuarios |
  | `/getOneUser/:user_id` | GET | Muestra los detalles de un usuario |
  | `/editUser/:user_id` | PUT | Edita los datos del usuario |
  


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



  
  ## ----- FRONTEND (CLIENT) -----
​
​
La Base URL de la aplicacion de los libros es `http://localhost:3000`, con los siguientes endpoints:
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
 

  ## ----- COMPONENTS SCHEME -----


##### SRC
  
* Components

  + pages
    + Book-details
      + Book-details.js
      + Book-details.css
    
    + Book-edit
      + Book-edit.js
      + Book-edit.css
    
    + Book-form
      + Book-form.js
      
    + Book-list
      + Book-list.js
      + Book-list.css
      + Book-card.js
    
    + Signup
      + Signup.js
      
    + Login
      + Login.js
      
    + Profile
      + Profile.js
      + User-edit.js
    
  + layout
    + Navigation
      + Navigation.js	
    
    + Footer
      + Footer.js
      
  + shared
 	 
* service

	+ auth.service.js
	+ book.service.js
	+ user.server.js