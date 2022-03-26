// Универсальный обработчик отправки данных клиенту
module.exports.sendData = (type, resStatus, data, res) => {
  const { dataType } = type;
  switch (dataType) {
    case 'user':
      res.status(resStatus).send({
        name: data.name,
        _id: data._id,
        email: data.email,
      });
      break;
    case 'users':
      res.status(resStatus).send(data);
      break;
    case 'card':
      res.status(resStatus).send({
        name: data.name,
        link: data.link,
        owner: data.owner,
        likes: data.likes,
        _id: data._id,
        createdAt: data.createdAt,
      });
      break;
    case 'cards':
      res.status(resStatus).send(data);
      break;
    default:
      return Promise.reject(new Error('Ошибка отправки на сервере. Несуществующий тип передаваемых данных'));
  }
};
