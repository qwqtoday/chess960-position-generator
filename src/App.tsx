import { useState, useEffect, useRef } from 'react';
import { Chessground } from 'chessground';
import 'chessground/assets/chessground.base.css';
import 'chessground/assets/chessground.brown.css';
import 'chessground/assets/chessground.cburnett.css'; // Added piece theme
import startingPositions from "./startingPositions";

// Function to generate FEN from ID
function generateChess960FEN(id: number): string {
    const white = startingPositions[id];
    const black = white.toLowerCase();
    return `${black}/pppppppp/8/8/8/8/PPPPPPPP/${white} w KQkq - 0 1`;
}

const Chessboard = ({ fen }: { fen: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current && fen) {
            const cg = Chessground(ref.current, {
                viewOnly: true,
                fen: fen,
                coordinates: true,
                orientation: 'white',
                animation: { duration: 300 },
                movable: { showDests: false },
                drawable: { visible: false },
                premovable: { enabled: false },
                events: {}
            });
            return () => cg.destroy();
        }
    }, [fen]);

    return (
        <div style={{
            margin: '20px auto',
            width: '500px',
            height: '500px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
            <div ref={ref} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default function App() {
    const [fen, setFen] = useState('');
    const [currentId, setCurrentId] = useState(0);
    const [inputId, setInputId] = useState('');

    useEffect(() => {
        generateRandomPosition();
    }, []);

    const generateRandomPosition = () => {
        const randomId = Math.floor(Math.random() * 960);
        setCurrentId(randomId);
        setFen(generateChess960FEN(randomId));
    };

    const handleSubmit = () => {
        const id = parseInt(inputId);
        if (!isNaN(id) && id >= 0 && id < 960) {
            setCurrentId(id);
            setFen(generateChess960FEN(id));
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '20px',
            fontFamily: 'sans-serif',
            backgroundColor: '#f0f0f0'
        }}>
            <h1 style={{
                color: '#2c3e50',
                marginBottom: '30px',
                textAlign: 'center'
            }}>
                Chess960 Position Viewer
            </h1>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px',
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <input
                        type="number"
                        min="0"
                        max="959"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                        placeholder="Enter ID (0-959)"
                        style={{
                            padding: '8px 12px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            width: '200px'
                        }}
                    />

                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Load Position
                    </button>

                    <button
                        onClick={generateRandomPosition}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#2ecc71',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Random Position
                    </button>
                </div>

                <div style={{
                    fontSize: '1.2em',
                    color: '#7f8c8d',
                    marginTop: '10px'
                }}>
                    Current Chess960 ID:
                    <span style={{
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        marginLeft: '8px'
                    }}>
            {currentId}
          </span>
                </div>
            </div>

            {fen && <Chessboard fen={fen} />}
        </div>
    );
}