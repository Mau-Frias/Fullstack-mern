import Navbar from './Navbar';

function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <main style={{ padding: '20px' }}>
                {children}
            </main>
            <footer style={{ textAlign: 'center', marginTop: '20px' }}>
                © 2023 MyApp. All rights reserved.
            </footer>
        </div>
    );
}

export default Layout;
