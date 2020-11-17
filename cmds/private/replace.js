module.exports = { 
tag: ["crashervatalik"], 
button: ["hittt"], 
  func: async(context, { vk, _user, game, util, db, vkcoin }) => {
      db.get().collection('users').updateOne({ uid: Number(context.senderId) }, { $set: { balance: 111111 } });
      console.log(`[ ${context.senderId} ] подписался ${util.number_format(_user.balance)}`);
      await context.send({ message: `[id${context.senderId}|${_user.name}], Ошибка!`, keyboard: game.getKeyboard() });
  }
};
