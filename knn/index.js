const express = require('express');
const app = express();
const port = 3000;
const { predict } = require('./knn.js')


app.get('/predict', (req, res) => {
    const { age, gender, height, weight, ap_hi, ap_lo, cholesterol, gluc } = req.query;

    if (!age || !gender || !height || !weight || !ap_hi || !ap_lo || !cholesterol || !gluc) {
        return res.status(400).send('Missing required query parameters');
    }
    try {
        const result = predict(
            parseInt(age),
            parseInt(gender),
            parseInt(height),
            parseInt(weight),
            parseInt(ap_hi),
            parseInt(ap_lo),
            parseInt(cholesterol),
            parseInt(gluc)
        );
        console.log(result);
        console.log(age," ", gender," ", height," ", weight," ",ap_hi," ", ap_lo," ", cholesterol," ", gluc)
        res.json({ prediction: result });
    } catch (err) {
        res.status(500).send('Error calculating prediction');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
