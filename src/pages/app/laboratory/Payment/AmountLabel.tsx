const AmountLabel = ({ children }) => (
  <div>
    <label
      style={{
        padding: '14px 20px',
        background: '#ebffe8',
        color: '#0d4a07',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      {children}
    </label>
  </div>
);

export default AmountLabel;
