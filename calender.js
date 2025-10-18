app.get("/birthdays", (req, res) => {
  const birthdays = fs.readJsonSync(birthdaysFile);
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const todayStr = now.toISOString().slice(0, 10); // YYYY-MM-DD

  let todayBirthday = null;
  let upcoming = [];

  Object.keys(birthdays).forEach(date => {
    const d = new Date(date);
    if (date === todayStr) {
      todayBirthday = { date, name: birthdays[date] };
    } else if (d.getMonth() + 1 === currentMonth && d > now) {
      upcoming.push({ date, name: birthdays[date] });
    }
  });

  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

  res.json({ todayBirthday, upcoming });
});
