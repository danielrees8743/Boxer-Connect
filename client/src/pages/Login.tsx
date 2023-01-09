export default function Login() {
  return (
    <div className='login'>
      <h3>Login</h3>
      <form>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' required />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' required />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
