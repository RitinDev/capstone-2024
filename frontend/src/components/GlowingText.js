const GlowingText = ({ text, fontSize = 'calc(1.375rem + 1.5vw)', className }) => ( // Default h1 font size
    <h1
        style={{
            color: '#fff',
            fontWeight: 700,
            textShadow: '0 0 0.12em #99CCCC',
            fontSize: fontSize,
            marginBottom: '1rem'
        }}
        className={className}
    >
        {text}
    </h1>
)

export default GlowingText;