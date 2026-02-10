function calculateLoan() {
  const principal = parseFloat(document.getElementById("amount").value);
  const annualRate = parseFloat(document.getElementById("rate").value);
  const months = parseFloat(document.getElementById("months").value);

  // Validate inputs
  if (!principal || !annualRate || !months) {
    document.getElementById("result").innerText = "Please fill in all fields";
    return;
  }

  // Convert annual rate to monthly rate
  const monthlyRate = annualRate / 100 / 12;

  // Calculate monthly payment using amortization formula
  let monthlyPayment;
  
  if (monthlyRate === 0) {
    // If no interest rate, simple division
    monthlyPayment = principal / months;
  } else {
    // Standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
    monthlyPayment = principal * (numerator / denominator);
  }

  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

  document.getElementById("result").innerText =
    `Monthly Payment: ₦${monthlyPayment.toFixed(2)} | Total Interest: ₦${totalInterest.toFixed(2)} | Total Payback: ₦${totalPayment.toFixed(2)}`;
}

function clearCalculator() {
  document.getElementById("amount").value = "";
  document.getElementById("rate").value = "";
  document.getElementById("months").value = "";
  document.getElementById("result").innerText = "";
}

// FAQ toggle: smoothly expand/collapse answer using scrollHeight
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const answer = faqItem.querySelector('.faq-answer');

  if (faqItem.classList.contains('active')) {
    // collapse
    answer.style.maxHeight = null;
    faqItem.classList.remove('active');
  } else {
    // expand - set explicit maxHeight to enable transition
    faqItem.classList.add('active');
    // allow browser to calculate natural height
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

document.getElementById("loanForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Application submitted successfully! We will contact you shortly.");
});
