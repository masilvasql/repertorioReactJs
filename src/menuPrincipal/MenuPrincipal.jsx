import React, { Component } from 'react'
import { nomeDaBanda } from '../login/login'
import * as firebase from 'firebase'
import List from './list'
import Modal from 'react-modal';
var repertorioFirebase = []

var renderRows = {}
var listaFire = []

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}




export default class MenuPrincipal extends Component {

    constructor() {
        super()
        this.state = {
            
            modalIsOpen: false,
            nomeMusica: '',
            nomeAutor: '',
            tomMusica: '',
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.capNomeMusica = this.capNomeMusica.bind(this)
        this.capNomeAutor = this.capNomeAutor.bind(this)
        this.capTomMusica = this.capTomMusica.bind(this)
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }


    componentDidMount() {
        this.carregaDadosFirebase()
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

    insereMusica() {

        var key = firebase.database().ref(nomeDaBanda).push().key
        firebase.database().ref(nomeDaBanda).child("repertório").child(key).set({
            id: key,
            Musica: this.state.nomeMusica,
            Autor: this.state.nomeAutor,
            Tom: this.state.tomMusica
        })
        listaFire = []
        this.setState({ modalIsOpen: false });
        this.carregaDadosFirebase()

    }

    atualizaPagina(){
        listaFire =[]
        console.log('->',listaFire)
        this.carregaDadosFirebase()
     
        
    }

    carregaDadosFirebase() {
        repertorioFirebase=[]
        var teste = firebase.database().ref().child(nomeDaBanda).child('repertório')
        teste.once('value', (dados) => {
            dados.forEach((data) => {
                var todo = {
                    id: data.val().id,
                    Musica: data.val().Musica,
                    Autor: data.val().Autor,
                    Tom: data.val().Tom
                }
                repertorioFirebase.push(todo)
                this.setState({ repertorioFirebase: repertorioFirebase })
                renderRows = this.state.repertorioFirebase
                this.setState({ listaFire: this.state.repertorioFirebase })
                listaFire = this.state.repertorioFirebase
            })
        })
    }

    render() {

        return (
            <form>
                <div className='form-group'>
                    <div>
                        <Modal
                            isOpen={this.state.modalIsOpen}

                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <div className='container' style={{ marginTop: 20, marginLeft: 250 }}>
                                <form className='form-control' style={{ width: 800, height: 300, borderColor: 'blue', borderWidth: 2 }}>
                                    <h1 style={{ marginLeft: 225 }}>Cadastro de Música</h1>
                                    <div>
                                        <input
                                            className='form-control'
                                            placeholder='Nome da Música'
                                            onChange={this.capNomeMusica}
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
                                                onClick={this.closeModal}
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
                        </Modal>
                    </div>
                    <div className='container'>
                        <div style={{ marginTop: 15, display: 'flex' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Pesquise sua Música"
                                style={{ flexDirection: 'row' }} />
                            <i className='fa fa-search' style={{ fontSize: 30, color: '#fff', marginLeft: 10, backgroundColor: '#34495e', paddingRight: 10, paddingLeft: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}> </i>
                            <i className='fa fa-plus' onClick={() => this.openModal()} style={{ fontSize: 35, color: '#4cd137', marginLeft: 10, backgroundColor: '#34495e', paddingRight: 10, paddingLeft: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}> </i>
                            <i className='fa fa-retweet' onClick={() => this.atualizaPagina()} style={{ fontSize: 35, color: '#fbc531', marginLeft: 10, backgroundColor: '#34495e', paddingRight: 10, paddingLeft: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}> </i>                    
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <List
                        list={listaFire}
                    >
                    </List>

                </div>

            </form>
        )
    }
}

export { nomeDaBanda }