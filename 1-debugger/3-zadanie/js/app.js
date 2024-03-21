let sum = 0;

users.forEach((user) => {
  sum += Number(user.payment);
});

console.log(`Zarobki wszystkich użytkowników: ${sum}`);
