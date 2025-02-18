import emailjs from 'emailjs-com';

const handleSubmit = (event) => {
  event.preventDefault();

  emailjs
    .sendForm('service_tuyta68', 'template_867h6us', event.target, 'PppvZXvgkW1zRPxqc')
    .then((result) => {
      console.log(result.text);
      alert('Email sent successfully!');
      window.location.href = '/';
    })
    .catch((error) => {
      console.error(error.text);
      alert('Failed to send email.');
    });

  event.target.reset();
};

export default handleSubmit;
