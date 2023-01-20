import { Box } from '@chakra-ui/react';

export default function Contact() {
  return (
    <Box as='div' display='flex' alignItems='center' justifyContent='center'>
      <h3>Contact</h3>
      <form>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' required />
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' required />
        <label htmlFor='message'>Message</label>
        <textarea name='message' id='message' required />
        <button type='submit'>Send</button>
      </form>
    </Box>
  );
}
