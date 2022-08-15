const Examples = ({meanings}) => {
    return ( 
        <div className="examples">
            <h1>EXAMPLES</h1>
            {meanings.map(val => val.meanings.map(means => means.definitions.map(def => (
            <div key={def.example}>
                {def.example ? <p key={def.example}>{def.example}</p> : 'no example available'}
            </div>
            ))))}
      </div>
     );
}
 
export default Examples;