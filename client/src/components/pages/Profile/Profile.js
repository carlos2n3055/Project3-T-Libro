import { Container } from 'react-bootstrap'


const Profile = ({ user }) => {

    return (

        <Container className="paddingTop70">

            <h1>¡Bienvenid@, {user.name} {user.lastname}!</h1>

            <img src={user.img} alt={user.name}/>

        </Container>
    )
}



export default Profile
