import React from "react"

export default props => {

    const renderRows = () => {

        const lista = props.list || []
        
        return lista.map(todo => (
            <tr className='info'>
                <td>{todo.Musica}</td>
                <td>{todo.Autor}</td>
                <td>{todo.Tom}</td>
                <td>
                    <i
                        className='fa fa-youtube'
                        style={{ color: 'red', fontSize: 35 }}
                        onClick={() => window.open(`https://www.youtube.com/results?search_query= ${todo.Musica} ${todo.Autor}`)}
                    >
                    </i>
                </td>
                <td><i className='fa fa-google' style={{ color: 'black', fontSize: 35 }}
                    onClick={() => window.open(`https://www.google.com.br/search?q=cifra de ${todo.Musica} ${todo.Autor}`)}
                ></i></td>
                <td><i className='fa fa-soundcloud' style={{ color: 'orange', fontSize: 35 }}
                    onClick={() => window.open(`https://soundcloud.com/search?q= ${todo.Musica} ${todo.Autor}`)}
                /></td>
            </tr>
        ))
        
    }
    
    return (
        
        <table className="table">
            <thead>
                <tr>
                    <th>Música</th>
                    <th>Autor</th>
                    <th>Tom</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
    
    
}