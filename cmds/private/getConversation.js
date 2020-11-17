module.exports = {
  tag: ["поиск беседы"],
  button: ["getConversation"],
  func: async(context, { vk, _user, game }) => {
    let _conv = [`https://vk.me/join/Mg2AEE67J7/bJoob22PBVQ4ylBdCzWk1P3s=`];
    await context.send(`${_user.name}, Наши официальные беседы:

#1 ${_conv[Math.floor(Math.random() * _conv.length)]}`);
  }
};
