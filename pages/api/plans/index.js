// pages/api/plans/index.js

export default async function handler(req, res) {
  const plans = [
    { id: 1, name: "Basic Plan", amount: 100 },
    { id: 2, name: "Standard Plan", amount: 300 },
    { id: 3, name: "Premium Plan", amount: 500 },
  ];

  res.status(200).json(plans);
}
