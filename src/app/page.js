import Link from 'next/link';
import {Box} from '@mui/material';
export default function Home() {
  return (
    <Box>
      <h1>رادیو بهشت</h1>
	  <a href='/signup'> ثبت‌نام </a>
	  <br></br>
	  <a href='/login'> ورود </a>
    </Box>
  );
}
