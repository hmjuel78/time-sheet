

const Login = () => {

    const handleLogin = (e) => {
        e.preventDefault()

        const userEmail = e.target.email.value
        const userPassword = e.target.password.value

        console.log(userEmail, userPassword)
    }


    return (
        <div>
            <h1 className="text-4xl">Login page</h1>

            <form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login