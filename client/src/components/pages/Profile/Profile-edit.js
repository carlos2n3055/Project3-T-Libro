import React, { Component } from 'react'
import UsersService from './../../../service/users.service'
import FilesService from './../../../service/upload.service'


import { Form, Button } from 'react-bootstrap'



class ProfileEdit extends Component {

    constructor(props) {

        super(props)

        this.state = {
            user: undefined,
            uploadingActive: false
            
        }
        this.usersService = new UsersService()
        this.filesService = new FilesService()
     
    }


    componentDidMount = () => {

        const user_id = this.props.loggedUser


        this.usersService
            .getUser(user_id)
            .then(res => this.setState({ user: res.data }))
            .catch(err => console.log(err))
    }


    handleInputChange = e => {

        const { name } = e.target
        const value = e.target.value
        this.setState({ user: { ...this.state.user, [name]: value } })
    }


    handleSubmit = e => {

        const user_id = this.props.loggedUser
            console.log(this.state.user)
        e.preventDefault()

        this.usersService
            .editUser(user_id, this.state.user)
            .then(res => this.props.closeModal())
            .catch(err => console.log(err))
    }


    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    user: { ...this.state.user, img: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => console.log(err))
    }


    render() {

        return (

            <>
                {this.state.user
                    ?
                    <>

                        <Form className="cardProfile" onSubmit={this.handleSubmit}>

                            <Form.Group controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.user.name} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="lastname">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" name="lastname" value={this.state.user.lastname} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Correo Electronico</Form.Label>
                                <Form.Control type="text" name="email" value={this.state.user.email} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="img">
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control type="file" onChange={this.handleImageUpload} />
                            </Form.Group>

                            <Button variant="#272643" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Subiendo imagen...' : 'Guardar cambios'}</Button>

                        </Form>

                    </>

                    :

                    <h1>Cargando...</h1>
                }
            </>
        )
    }
}



export default ProfileEdit
