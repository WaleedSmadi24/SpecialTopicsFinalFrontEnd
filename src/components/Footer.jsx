import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '20px',
      background: '#f1f1f1',
      fontSize: '14px',
      color: '#666',
      marginTop: '50px'
    }}>
      &copy; {new Date().getFullYear()} Eventify. All rights reserved.
    </footer>
  );
}
