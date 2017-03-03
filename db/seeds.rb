3.times { List.create({ title: Faker::Hacker.verb } )}

15.times do
  Card.create({
    body: Faker::Hacker.say_something_smart,
    list_id: List.all.sample.id
  })
end
