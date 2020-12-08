import { Container } from 'react-bootstrap'


const Profile = ({ user }) => {
    console.log(user)

    return (

        <Container>

            <h1>¡Bienvenid@, {user.name} {user.lastname}!</h1>

            <img src={user.img} />


        </Container>
    )
}

export default Profile