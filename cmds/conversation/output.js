module.exports = {
tag: ["вывод"],
button: ["output"],
func: async(context, { vk, _user, game, cmd, db, util, vkcoin, }) => {
let myBalance = Math.floor(await vkcoin.api.getMyBalance() / 1000);
if(_user.balance <1000)
return context.send({ message: `😰[id${context.senderId}|${_user.name}], минимальный вывод 1000 VK COINS`, keyboard: game.getKeyboard() });
else if(myBalance < _user.balance)
return context.send({ message: `😰[id${context.senderId}|${_user.name}], к сожалению кто-то ограбил бота. Ожидайте...`, keyboard: game.getKeyboard() });
else if(_user.balance > 1000)
await context.send({ message: `Заявка на вывод создана!`, keyboard: game.getKeyboard() });
else if(_user.bonus > 1) return context.send({ message: `😰[id${context.senderId}|${_user.name}], на твоём балансе нет коинов.\n\nОднако, коины есть на твоём бонусном балансе. Их нельзя вывести, но можно поставить! В случае победы ты получишь весь выигрыш на основной баланс и сможешь вывести.`, keyboard: game.getKeyboard() });
await vkcoin.api.sendPayment(context.senderId, Number(_user.balance) * 1000, true).then(async() => {
db.get().collection('users').updateOne({ uid: Number(context.senderId) }, { $inc: { stop: + 2 }, $set: { balance: 0 } });
console.log(`[ ${context.senderId} ] Вывел баланс на сумму ${util.number_format(_user.balance)} VK COINS`);
vk.get()._vk.api.call("messages.send", {
peer_id: Number(context.senderId) ,
random_id: util.random(-200000000, 200000000),
message:`✅[id${context.senderId}|${_user.name}], Ваша заявка на вывод ${util.number_format(_user.balance)} VK COINS одобрена.
Пожалуйста оставьте отзыв: https://vk.com/topic-199989388_46618669`, keyboard: game.getKeyboard() });
}).catch(async(err) => {
vk.get()._vk.api.call("messages.send", {
peer_id: Number(context.senderId) ,
random_id: util.random(-200000000, 200000000),
message:`🚫[id${context.senderId}|${_user.name}], Твой баланс равен 0!`}); //${err}
});
//await context.send({ message: `Заявка на вывод создана!`, keyboard: game.getKeyboard() });
}
};