const wrappers = document.querySelectorAll('.input-wrapper');

//підсвітка полів input
wrappers.forEach((wrapper) => {
  const input = wrapper.querySelector('input');

  input.addEventListener('focus', () => {
    const errorMessage = wrapper.querySelector('input+.error-message');
    console.log(errorMessage);

    wrapper.classList.add('focused');
    wrapper.classList.remove('errored');
    errorMessage.classList.remove('error-message-errored');
    input.addEventListener('blur', () => {
      console.log(input.value);
      wrapper.classList.remove('focused');
      if (isTextErrore(input)) {
        wrapper.classList.add('errored');
        errorMessage.classList.add('error-message-errored');
      }
    });
    input.addEventListener('mouseenter', () => {
      wrapper.classList.remove('errored');

      errorMessage.classList.remove('error-message-errored');
    });
    input.addEventListener('mouseleave', () => {
      if (isTextErrore(input)) {
        wrapper.classList.add('errored');
        errorMessage.classList.add('error-message-errored');
      }
    });
  });

  function isTextErrore(input) {
    return input.value.trim() === '';
  }
});
