function calculateVariables() {
    let sumQ1toQ5 = 0;
    let sumQ6toQ12 = 0;

    // Convert text answers to numbers for Q1 to Q5
    for (let i = 1; i <= 5; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption) {
            const value = selectedOption.value;
            let numericValue = 0;

            switch (value) {
                case 'option1':
                    numericValue = 1; // Very Low
                    break;
                case 'option2':
                    numericValue = 2; // Low
                    break;
                case 'option3':
                    numericValue = 3; // Moderate
                    break;
                case 'option4':
                    numericValue = 4; // High
                    break;
                case 'option5':
                    numericValue = 5; // Very High
                    break;
            }

            sumQ1toQ5 += numericValue;
        }
    }

    // Calculate sum for Q6 to Q12 using correct answers
    const correctAnswers = {
        'q6': 'option1',
        'q7': 'option3', // Correct answer for Q7
        'q8': 'option2',
        'q9': 'option1',
        'q10': 'option2',
        'q11': 'option2', // Correct answer for Q11
        'q12': 'option3',
    };

    for (const question in correctAnswers) {
        const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
        sumQ6toQ12 += (selectedOption && selectedOption.value === correctAnswers[question]) ? 1 : 0;
    }

    // Calculate variables
    const C3 = (sumQ6toQ12 / 7) - (sumQ1toQ5 / 25);
    const C5 = (sumQ1toQ5 / 25) / (sumQ6toQ12 / 7);
    const C4 = (sumQ6toQ12 / 7) / (sumQ1toQ5 / 25);
    const C1 = (sumQ1toQ5 / 25);
    const B6 = document.querySelector('input[name="q7"]:checked').value === correctAnswers['q7'] ? 1 : 0;
    const B2 = document.querySelector('input[name="q11"]:checked').value === correctAnswers['q11'] ? 1 : 0;
    const C6 = ((B6 + B2) / 2) / ((sumQ1toQ5 / 5) / 2);
    const C7 = ((B6 + B2) / 2) - ((sumQ1toQ5 / 5) / 2);
    const IQ = document.getElementById('iqScore').value;

    return { C3, C5, C4, C1, B6, B2, IQ, C6, C7 };
}

function submitAnswers() {
    const variables = calculateVariables();

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'variables': variables }),
    })
    .then(response => response.json())
    .then(data => {
        // Redirect to a new page with the credit score
        window.location.href = `/result?score=${data.credit_score}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


