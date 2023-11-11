const User = require('../models/user');
const Order = require('../models/order');
const transporter = require('../conf/nodemailer')
const env = require('../env')

module.exports = {
  send: async (req, res, next) => {
    try {

      const user = await User.findById(req.query.idUser)
      const carts = user.cart

      const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        to: req.query.to,
        from: env.USER_NODEMAILER,
        subject: 'Confirm your orders',
        html: `
        <h2>Xin Chào ${req.query.fullname} </h2>
        <p>Phone: ${req.query.phone}</p>
        <p>Address: ${req.query.address}</p>
        <table >
        <thead>
          <tr>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Giá</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          ${carts.map(cart => (
          `<tr>
            <th scope="row">${cart.product.name}</th>
            <td >
            <img src=${cart.product.img1} width='100px' height='auto' >
            </td>
            <td >${convertMoney(cart.product.price)}<br> VND</td>
            <td >${convertMoney(cart.count)}</td>
            <td >${convertMoney(cart.product.price * cart.count)} <br>VND</td>
          </tr>`
        ))}
        </tbody>
      </table>
      <h2>Tổng Thanh Toán:</h2>
      <h2>${convertMoney(getTotal(carts))}</h2>
      <h2>Cảm ơn bạn!</h2>
      `
      }
      transporter.sendMail(mainOptions, async function (err) {
        if (err) {
          throw new Error(err)
        } else {
          const order = new Order({
            orders: user.cart,
            user: {
              id: user._id.toString(),
              fullname: req.query.fullname,
              phone: req.query.phone,
              address: req.query.address
            },
            total: convertMoney(getTotal(carts))
          })
          await order.save()
          user.cart = []
          await user.save()

          res.json({ message: 'oke' })
        }
      });

    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
}

function getTotal(carts) {
  let sub_total = 0;
  carts.forEach((value) => {
    sub_total +=
      parseInt(value.product.price) * parseInt(value.count)
  });
  return sub_total
}

function convertMoney(money) {
  const str = money + "";
  let output = ""
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    count++;
    output = str[i] + output
    if (count % 3 === 0 && i !== 0) {
      output = "." + output
      count = 0;
    }
  }
  return output;
}
