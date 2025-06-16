const wrappers = document.querySelectorAll('.input-wrapper');
// const amount = +document.getElementById('amount').value;

// const termYears = +document.getElementById('term').value;
// const annualRate = +document.getElementById('rate').value;

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

// Розрахунок Repayment

function calculateRepayment(amount, termYears, annualRate) {
  const n = termYears * 12;
  const r = annualRate / 100 / 12;
  const numerator = amount * r * Math.pow(1 + r, n);
  const denominator = Math.pow(1 + r, n) - 1;
  const monthlyPayment = numerator / denominator;
  const totalRepayment = monthlyPayment * n;
  return {
    monthlyPayment: +monthlyPayment.toFixed(2),
    totalPaid: +totalRepayment.toFixed(2),
  };
}

// Розрахунок Interest Only

function calculateInterestOnly(amount, termYears, annualRate) {
  const n = termYears * 12;
  const r = annualRate / 100 / 12;
  const monthlyPayment = amount * r;
  const totalPaid = monthlyPayment * n;
  return {
    monthlyPayment: +monthlyPayment.toFixed(2),
    totalPaid: +totalPaid.toFixed(2),
  };
}
// Обираємо тип розрахунку

function checkMortageType() {
  const calculateButton = document.querySelector('.submit');
  calculateButton.addEventListener('click', (e) => {
    e.preventDefault();
    const mortageType = document.querySelector(
      'input[type="radio"]:checked'
    ).id;
    const amount = +document.getElementById('amount').value;

    const termYears = +document.getElementById('term').value;
    const annualRate = +document.getElementById('rate').value;

    let calculations;

    if (mortageType === 'repayment') {
      calculations = calculateRepayment(amount, termYears, annualRate);
    } else {
      calculations = calculateInterestOnly(amount, termYears, annualRate);
    }
    document.getElementById(
      'monthly-repayment'
    ).textContent = `£${calculations.monthlyPayment}`;
    document.getElementById(
      'total-repayment'
    ).textContent = `£${calculations.totalPaid}`;
    console.log(calculations.monthlyPayment, calculations.totalPaid);
  });
}
checkMortageType();
