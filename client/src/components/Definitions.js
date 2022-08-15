const Definitions = ({meanings}) => {
    return ( 
        <div className="definitions">
            <h1>DEFINITIONS</h1>
            {meanings.map(val => val.meanings.map(means => means.definitions.map(def => (
            <div key={def.definition}>
                <p>{def.definition}</p>
            </div>
            ))))}
        </div>
     );
}
 
export default Definitions;