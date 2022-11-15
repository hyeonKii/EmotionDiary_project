const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const nameValidation = /^/;
const passwordValidation = /^/;

export default function RegisterValidation(id: string, value: string): boolean {
  if (id === 'email') {
    return emailValidation.test(value);
  }

  if (id === 'name') {
    return nameValidation.test(value);
  }

  if (id === 'password') {
    return passwordValidation.test(value);
  }

  return false;
}
