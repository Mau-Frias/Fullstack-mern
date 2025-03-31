import useAuth from "../hooks/useAuth";

function acount () {
    const { user, loading } = useAuth()
  return (
    <div>
      <h1>Account</h1>
        {loading ? (
            <p>Loading...</p>
        ) : user ? (
            <p>Welcome, {user.name}!</p>
        ) : (
            <p>Please log in to view your account.</p>
        )}
    </div>
  );
}