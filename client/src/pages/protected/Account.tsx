export default function Account() {
  return (
    <div className='account'>
      <h1>Account</h1>
      <p>Protected Account page when user is authorized </p>
      <p>
        You will only see this page when you are authorized and have a
        authentication token
      </p>
    </div>
  );
}
