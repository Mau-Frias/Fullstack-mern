import Navbar from './Navbar';

function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <main className="p-5">
                {children}
            </main>
            <footer className="text-center mt-5">
                © 2023 MyApp. All rights reserved.
            </footer>
        </div>
    );
}

export default Layout;
