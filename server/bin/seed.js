const mongoose = require('mongoose')
const Book = require('../models/book.model')
const User = require('../models/user.model')

const dbName = 'book-app2020'

mongoose.connect(`mongodb://localhost/${dbName}`)

// const books = [
//     {
//         title: 'La ciudad de vapor',
//         author: 'Carlos Ruiz Zafon',
//         description: 'Puedo conjurar rostros de chiquillos del barrio de la Ribera con los que a veces jugaba o peleaba en la calle, pero ninguno que quisiera rescatar del país de la indiferencia. Ninguno excepto el de Blanca. Un muchacho decide hacerse escritor al descubrir que sus invenciones le regalan un rato más de interés por parte de la niña rica que le ha robado el corazón.Un arquitecto huye de Constantinopla con los planos de una biblioteca inexpugnable.Un extraño caballero tienta a Cervantes para que escriba un libro como no ha existido jamás.Y Gaudí, navegando hacia una misteriosa cita en Nueva York, se deleita con la luz y el vapor, la materia de la que deberían estar hechas las ciudades.',
//         image: 'https://www.carlosruizzafon.com/img/rotadores/novelas/la-ciudad-de-vapor.png',
//         photos: '',
//         status: '5',
//         exchange: true,
//         sale: true,
//         price: 15,
//         comments: 'Excelente libro'
//     },
//     {
//         title: 'El dominio mental',
//         author: 'Pedro Baños',
//         description: 'Un libro sobre el control mental y social como herramienta de poder. Qué es el dominio mental, para qué sirve y cómo se controlan las poblaciones. Tras los exitosos Así se domina el mundo y El dominio mundial, Pedro Baños dirige su atención en este nuevo libro a las técnicas que el poder utiliza para controlar nuestras emociones, porque quien consigue manejar las emociones es capaz de condicionar las decisiones de las personas. El poder, como estructura de control de la masa, no ignora que esta es manipulable por medio del contagio sugestivo, ni que tiene sed de sometimiento y demanda ilusión, fantasía y afectividad.Para lograr este dominio mental existen técnicas muy sofisticadas, como el lavado de cerebro, que supone el adoctrinamiento repetitivo, el monopolio y control de la información y las comunicaciones, la anulación del sentido crítico, el refuerzo de las dependencias grupales y emocionales, la modificación y restricción de la dieta(reducción de glucosa y proteínas), y la despersonalización. Hoy en día estas acciones son mucho más sencillas gracias a los avances tecnológicos, y lo serán aún más a corto plazo, lo que permitirá que los poderosos logren el dominio absoluto de las poblaciones.',
//         image: 'https://www.planetadelibros.com/usuaris/libros/fotos/322/m_libros/portada_el-dominio-mental_pedro-banos-bajo_202009032028.jpg',
//         photos: '',
//         status: '5',
//         exchange: true,
//         sale: true,
//         price: 12,
//         comments: 'Te abre la mente, es imprescindible, un libro que todo el mundo debería leer.'
//     },
//     {
//         title: 'Los Futbolisimos',
//         author: 'Roberto Santiago',
//         description: '¡Los Futbolísimos están en el campeonato de España! ¿Llegarán a la final? ¡El campeonato de España se juega nada menos que en Tenerife!El Soto Alto está más preparado que nunca, ¡es su gran oportunidad!Esta vez, ningún misterio va a impedir que se concentren en el fútbol.Aunque aún no conocen a Los Dragones, ni a Los Gigantes, ni a los ecologistas de Tenerife Verde y mucho menos al Ejército de las Sombras…¡Pero nada puede con Los Futbolísimos!',
//         image: 'https://i.pinimg.com/originals/6a/37/a1/6a37a1e7caba3056435fd9a3ca3019a5.jpg',
//         photos: '',
//         status: '4',
//         exchange: true,
//         sale: true,
//         price: 6,
//         comments: 'Mantiene a los niños super entretenidos'
//     },
//     {
//         title: 'Patria',
//         author: 'Fernando Aramburu',
//         description: 'El dia en que ETA anuncia el abandono de las armas, Bittori se dirige al cementerio para contarle a la tumba de su marido el Txato, asesinado por los terroristas, que ha decidido volver a la casa donde vivieron. ¿Podra convivir con quienes la acosaron antes y despues del atentado que trastoco su vida y la de su familia? ¿Podra saber quien fue el encapuchado que un dia lluvioso mato a su marido, cuando volvia de su empresa de transportes? Por mas que llegue a escondidas, la presencia de Bittori alterara la falsa tranquilidad del pueblo, sobre todo de su vecina Miren, amiga intima en otro tiempo, y madre de Joxe Mari, un terrorista encarcelado y sospechoso de los peores temores de Bittori. ¿Que paso entre esas dos mujeres? ¿Que ha envenenado la vida de sus hijos y sus maridos tan unidos en el pasado? Con sus desgarros disimulados y sus convicciones inquebrantables, con sus heridas y sus valentias, la historia incandescente de sus vidas antes y despues del crater que fue la muerte del Txato, nos habla de la imposibilidad de olvidar y de la necesidad de perdon en una comunidad rota por el fanatismo politico.',
//         image: 'https://images-na.ssl-images-amazon.com/images/I/51WF56eKZcL._SX329_BO1,204,203,200_.jpg',
//         photos: '',
//         status: '3',
//         exchange: true,
//         sale: true,
//         price: 8,
//         comments: 'Un libro para mantener la historia presente'
//     },
//     {
//         title: 'Pideme lo que quieras',
//         author: 'Megan Maxwell',
//         description: 'Tras la muerte de su padre, el prestigioso empresario aleman Eric Zimmerman decide viajar a España para supervisar las delegaciones de la empresa Muller. En la oficina central de Madrid conoce a Judith, una joven ingeniosa y simpatica de la que se encapricha de inmediato. Judith sucumbe a la atraccion que el aleman ejerce sobre ella y acepta formar parte de sus juegos sexuales, repletos de fantasias y erotismo. Junto a el aprendera que todos llevamos dentro un voyeur, y que las personas se dividen en sumisas y dominantes... Pero el tiempo pasa, la relacion se intensifica y Eric empieza a temer que se descubra su secreto, algo que podria marcar el principio o el fin de la relacion.',
//         image: 'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/201711/29/00106520646180____2__640x640.jpg',
//         photos: '',
//         status: '3',
//         exchange: true,
//         sale: true,
//         price: 4,
//         comments: 'Muy bueno'
//     },
//     {
//         title: 'Espia de Dios',
//         author: 'Juan Gomez-Jurado',
//         description: 'Dejate atrapar por este thriller repleto de tension. Cada minuto cuenta. No dejes pasar el tiempo... Por el autor de Reina Roja. Un asesino en serie. Un conclave amenazado. Una frenetica carrera contra la muerte. Con la muerte del Papa Juan Pablo II, Roma se llena de personas dispuestas a darle el ultimo adios. Al mismo tiempo, el Vaticano se inunda de rumores y alianzas a medida que los cardenales llegan para preparar la eleccion del nuevo pontifice. A pesar de las extremas medidas de seguridad, dos brutales asesinatos sacudiran la ciudad. Para investigar estos terribles crimenes llaman a Paola Dicanti, inspectora criminalista. Sin embargo, la seguridad del Vaticano, que pretende ocultar las muertes, no deja de poner obstaculos en su camino. A estas dificultades se une otra mayor cuando asignan a su equipo al padre Fowler, un exmilitar en el que Paola no acaba de confiar. Ambos tendran que detener al asesino antes de que continue el siniestro juego que acaba de comenzar...',
//         image: 'https://i2.wp.com/juangomezjurado.com/wp-content/uploads/2020/10/Espia_De_Dios_Juan_Gomez_Jurado_big.jpg?fit=594%2C896&ssl=1',
//         photos: '',
//         status: '4',
//         exchange: true,
//         sale: true,
//         price: 8,
//         comments: 'Muy bueno'
//     }
// ]

// Book
//     .create(books)
//     .then(response => {
//         console.log('Se han creado', response.length)
//         mongoose.connection.close()
//     })
//     .catch(err => console.log('Hubo un error', err))


const users = [
    {
        name: 'Heyling',
        lastname: 'Marquez',
        email: 'heyling@gmail.com',
        password: '12345'
    },
    {
        name: 'Carlos',
        lastname: 'Martin-Salas',
        email: 'carlos@gmail.com',
        password: '12345'
    },
    {
        name: 'Ana',
        lastname: 'Davila',
        email: 'ana@gmail.com',
        password: '12345'
    },
    {
        name: 'Miguel',
        lastname: 'Perez',
        email: 'miguel@gmail.com',
        password: '12345'
    }
]

User
    .create(users)
    .then(response => {
        console.log('Se han creado', response.length)
        mongoose.connection.close()
    })
    .catch(err => console.log('Hubo un error', err))



