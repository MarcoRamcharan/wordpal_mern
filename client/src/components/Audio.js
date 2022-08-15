const Audio = ({meanings}) => {
    return ( 
        <>
            {meanings[0] && (
            <div className="audio">
                <h1>AUDIO</h1>
                <audio
                style={{ borderRadius: '20px' }}
                src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
                controls
                >
                Your browser does not support the audio element.
                </audio>
            </div>
            )}
        </>
     );
}
 
export default Audio;