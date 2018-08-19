import React, { Component } from 'react'
import { Column, Row } from 'simple-flexbox';
import * as firebase from 'firebase'
import MenuPrincipal from '../menuPrincipal/MenuPrincipal'
import {Switch, Route,Link} from 'react-router-dom';



var config = {
    apiKey: "AIzaSyCUHWjeCIrcCeSy3ZjBPWI44UrSuQ6EE7c",
    authDomain: "repertorioreact.firebaseapp.com",
    databaseURL: "https://repertorioreact.firebaseio.com",
    projectId: "repertorioreact",
    storageBucket: "repertorioreact.appspot.com",
    messagingSenderId: "1003378859504"
};

var nomeDaBanda 
firebase.initializeApp(config);

const styles = {
    marginTop: 200,
    width: 500,
    marginLeft: 450,
    elevation: 30
}

const estiloBotaoAcessar = {
    marginLeft: 60,
}

const estiloBotaoCad = {
    marginRight: 60
}

let imgUrl = 'https://wallpaperstudio10.com/static/wpdb/wallpapers/3840x2160/030724.jpg'

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nomeUsuario: '',
            senhaUsuario: '',
            existeUsu: true,
            existeSenha: true,
        }
        this.capTuraDados = this.capTuraDados.bind(this)
        this.capturaSenha = this.capturaSenha.bind(this)
    }

        capTuraDados(e) {
            this.setState({ ...this.state, nomeUsuario: e.target.value.toUpperCase() })
        }

        capturaSenha(e) {
            this.setState({ ...this.state, senhaUsuario: e.target.value.toUpperCase() })
        }

        validaUsuario(){
           
            console.log(this.state.nomeUsuario, this.state.senhaUsuario)
            var usuaEsenha
            var varUsuEsenha
        if (this.state.nomeUsuario == null || this.state.nomeUsuario == '') {
            this.loginInput.shake()
            this.setState({ existeUsu: false })
        } else {
            if (this.state.senhaUsuario == null || this.state.senhaUsuario == '') {
                this.senhaInput.shake()
                this.setState({ existeSenha: false })
            } else {
                usuaEsenha = this.state.nomeUsuario.toUpperCase() + this.state.senhaUsuario.toUpperCase()
                firebase.database().ref().child(this.state.nomeUsuario.toUpperCase()).once('value', (dados) => {
                    if (dados.val() == null) {
                        alert("Aviso!" +"\n" +"Usuário ou senha inválidos.")
                    } else {
                        if (dados.val().usuarioEsenha.toUpperCase() != usuaEsenha) {
                            alert("Aviso!" +"\n"+ "Usuário ou senha inválidos.")
                        } else {
                            console.log(dados.val())
                            varUsuEsenha = this.state.nomeUsuario + this.state.senhaUsuario
                            nomeDaBanda = this.state.nomeUsuario.toUpperCase()
                            window.location.replace('/#/MenuPrincipal')
                        }
                    }
                })
            }
        }
        }

        teste(){
            
            <Switch>
                <Route path='/MenuPrincipal' Component={MenuPrincipal}/>
            </Switch>
        }

    render() {
        return (
            <Row>
               
                <div style={{
                    backgroundImage: 'url(' + imgUrl + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    width: 1920,
                    height: 630
                }}>
                
                    <div style={styles}>
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Login</h3>
                            </div>
                            <div className="panel-body">
                                <input
                                    placeholder='Usuário'
                                    className='form-control'
                                    required={true}
                                    onChange={this.capTuraDados}
                                >
                                </input>
                                <br></br>
                                <input
         
                                    placeholder='Senha'
                                    className='form-control'
                                    type='password'
                                    onChange={this.capturaSenha}
                                >
                                </input>
                            </div>
                            <br></br>
                            <div style={{ marginBottom: 20 }}>
                                <Row horizontal='space-between'>
                                    <div style={estiloBotaoAcessar}>
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            style={{ width: 150 }}
                                            onClick={() => this.validaUsuario()}
                                        >
                                            Acessar
                                </button>
                                    </div>
                                    <br></br>

                                    <div style={estiloBotaoCad}>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            style={{ width: 150 }}
                                        >
                                            Cadastrar
                                </button>
                                    </div>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        )
    }
}

export {nomeDaBanda}
