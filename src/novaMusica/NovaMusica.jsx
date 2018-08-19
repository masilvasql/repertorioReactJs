import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Column, Row } from 'simple-flexbox';

import {nomeDaBanda} from '../login/login'
export default class NovaMusica extends Component {

    constructor() {
        super()
        this.state = {
            nomeMusica: '',
            nomeAutor: '',
            tomMusica: '',
            existeMusica: true,
            existeAutor: true,
            existeTom: true,
            banda: nomeDaBanda
        }
        this.capNomeMusica = this.capNomeMusica.bind(this)
        this.capNomeAutor = this.capNomeAutor.bind(this)
        this.capTomMusica = this.capTomMusica.bind(this)
    }

    componentDidMount() {
        console.log(nomeDaBanda)
        // if (resultDadosMusica != null || resultDadosMusica != {}) {
        //     this.setState({ nomeMusica: resultDadosMusica.Musica })
        //     this.setState({ nomeAutor: resultDadosMusica.Autor })
        //     this.setState({ tomMusica: resultDadosMusica.Tom })
        // }
    }

    insereMusica() {

        var key = firebase.database().ref(nomeDaBanda).push().key
        firebase.database().ref(nomeDaBanda).child("repertório").child(key).set({
            id: key,
            Musica: this.state.nomeMusica,
            Autor: this.state.nomeAutor,
            Tom: this.state.tomMusica
        })
        // window.location.replace('/MenuPrincipal')
    }
    capNomeMusica(e) {
        this.setState({ ...this.state, nomeMusica: e.target.value })
    }
    
    capNomeAutor(e) {
        this.setState({ ...this.state, nomeAutor: e.target.value })
    }
    
    capTomMusica(e) {
        this.setState({ ...this.state, tomMusica: e.target.value })
    }
    



render() {
    return (
        <Row>
            <div className='container' style={{ marginTop: 20, marginLeft: 250 }}>
                <form className='form-control' style={{ width: 800, height: 300, borderColor: 'blue', borderWidth: 2 }}>
                    <h1 style={{ marginLeft: 225 }}>Cadastro de Música</h1>
                    <div>
                        <input
                            className='form-control'
                            placeholder='Nome da Música'
                            onChange={this.capTomMusica}
                        >
                        </input>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <input
                            className='form-control'
                            placeholder='Nome do Autor'
                            onChange={this.capNomeAutor}
                        >
                        </input>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <input
                            style={{ width: 120 }}
                            className='form-control'
                            placeholder='Tom da Música'
                            onChange={this.capTomMusica}
                        >
                        </input>
                        <div style={{ flexDirection: 'row', marginTop: 30 }}>
                            <i
                                className='fa fa-chevron-left'
                                style={
                                    {
                                        color: '#273c75',
                                        fontSize: 35
                                    }
                                }

                            />
                            <i
                                className='fa fa-check'
                                style=
                                {
                                    {
                                        color: '#4cd137',
                                        fontSize: 35,
                                        marginLeft: 200
                                    }
                                }
                                onClick={() => this.insereMusica()}
                            />
                            <i className='fa fa-retweet' style={{ color: '#2980b9', fontSize: 35, marginLeft: 200 }} />
                            <i className='fa fa-trash' style={{ color: 'red', fontSize: 35, marginLeft: 200 }} />
                        </div>
                    </div>
                </form>
            </div>
        </Row>
    )
}
}