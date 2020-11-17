module.exports = {
  tag: ["nocommand   xrmax просто   я   гей   панимаеш  "], // noob no command
  button: ["deposit_"],
  func: async(context, { vk, _user, game, cmd, db, util, vkcoin, vkapi }) => {
    let _cmd = cmd.cmd.split('_');
    let _name = { 'blue': ``, 'black': ``, 'even': `чётное`, 'noteven': `нечётное`, 'number': `число` };
    let _num = 0; let _coin = 0;

    if(_cmd[1] == `number`) {
      _num = await context.question(`[id${context.senderId}|${_user.name}], число?`);
      if(_num < 0 || _num > 36 || isNaN(_num)) { return context.send(`[id${context.senderId}|${_user.name}], Ошибка! Можно поставить на число - от 0 до 36.`); }
    }

    _coin = await context.question(`[id${context.senderId}|${_user.name}], введите сумму ${(_cmd[1] == `number` ? _num:``)}:`);

    if(_coin < 1 || !_coin || isNaN(_coin) || _coin > _user.balance) return context.send(` ❌  У вас недостаточно денег!`);

    db.get().collection('users').updateOne({ uid: context.senderId }, { $inc: { balance: -_coin, deposit: +_coin }, $push: { inGame: { $each: [ { peer_id: Number(context.peerId), coins: Number(_coin), type: _cmd[1], number: Number(_num) } ] } } });
    await context.send(` ✔  Ваша ставка принята. Сумма ставки ${util.number_format(_coin)} VKC ${_name[_cmd[1]]} ${(_cmd[1] == `number` ? _num:``)}`);
  }
};
